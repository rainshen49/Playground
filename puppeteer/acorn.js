const puppeteer = require('puppeteer');
const acorn = require('./acorn.json');
// todo: click 100 times
const retries = 100
// todo: make correct date
const enroldate = new Date(2018, 6, 16, 10, 40, 1)
const selectors = {
  login: "div.login-box > form > button",
  userheader: ".header-username",
  coursecode: ".enrolment-code",
  updateEnrolment: 'a.updateEnrolment',
  enrolBtn: "#enrolFromPlan",
  success: ".alert-success"
};

let prevbrowser;

exports.run = async (notify) => {
  if (prevbrowser)
    prevbrowser.close();
  const browser = await puppeteer.launch({ headless: false })
  prevbrowser = browser
  const page = await browser.newPage()
  page.setViewport({ width: 1280, height: 700 })
  await page.goto('https://acorn.utoronto.ca/sws/welcome.do?welcome.dispatch#/courses/0')
  await page.type('#username', acorn.username)
  await page.type('#password', acorn.password)
  // wait till time has come
  // month starts from 0
  wait(enroldate, () => {
    page.$eval(selectors.login, btn => btn.textContent = new Date().toTimeString())
  })
  .then(()=>page.keyboard.press("Enter"))
  .then(()=>notify("登陆成功\n"))
  await page.waitForSelector(selectors.userheader)
  await page.goto('https://acorn.utoronto.ca/sws/welcome.do?welcome.dispatch#/courses/1')
  await page.waitForSelector(selectors.coursecode)
  const coursecodes = await page.$$eval(selectors.coursecode, (courses) => {
    return courses.map(c => c.textContent)
  })
  notify(`准备抢这些课:\n${coursecodes.map(s => s.trim()).join('\n')}\n`)
  await Promise.all(coursecodes.map(cc => spawnFrame(page, cc)))
  const currframe = await page.mainFrame()
  const childFrames = await currframe.childFrames()
  await Promise.all(childFrames.map((cf, i) => clickEnrol(cf, coursecodes[i]).then((success) => notify(success ? `抢到了 ${coursecodes[i].trim()}\n` : `没抢到 ${coursecodes[i].trim()}\n`))))
}

function spawnFrame(page, cc) {
  // const page = await browser.newPage()
  return page.evaluate((cc) => {
    const courseCode = document.createElement('p')
    courseCode.textContent = cc
    const frame = document.createElement('iframe')
    frame.src = window.location.href
    frame.width = 600
    frame.height = 400
    const wrapper = document.createElement('div')
    wrapper.appendChild(frame)
    wrapper.appendChild(courseCode)
    wrapper.style.display = "inline-block"
    document.body.appendChild(wrapper)
    return frame
  }, cc)
}

async function clickEnrol(frame, coursecode) {
  await frame.waitForSelector(selectors.coursecode)
  const coursecodes = await frame.$$eval(selectors.coursecode, (courses) => {
    return courses.map(c => c.textContent)
  })
  const i = coursecodes.indexOf(coursecode)
  // find the box of that course name
  // click the right button
  await frame.$$eval(selectors.updateEnrolment, (btns, i) => {
    btns[i].click()
  }, i)
  await frame.waitForSelector(selectors.enrolBtn);
  let success = false
  let tries = retries;
  frame.waitForSelector(selectors.success, { visible: true }).then(() => success = true).catch(console.error.bind(console))
  while (!success && tries-- > 0) {
    await frame.$eval(selectors.enrolBtn, btn => btn.click())
  }
  return success;
}

function wait(till, callback) {
  return new Promise(y => {
    if (new Date() < till) {
      // wait by seconds
      setTimeout(() => wait(till, callback).then(y), 1000)
      callback()
    }
    else
      y()
  })
}