// the solution element
function $$(parent) {
  return function(selector) {
    return Array.from(parent.querySelectorAll(selector));
  };
}
function $(parent) {
  return function(selector) {
    return parent.querySelector(selector);
  };
}

function observeSolution() {
  // initialize a mutation observer
  let callback = () => console.log('callback fired null');
  const observer = new MutationObserver((mutations) => {
    console.log("mutated")
    callback()
  });
  observer.observe(fromDocument$('section.main').firstElementChild, { childList: true });
  return function() {
    //   return a promise that resolves on next mutation
    return new Promise((accept, reject) => {
      callback = function() {
        if(fromSolution$('.loader.TBS_LOADER')){
          // console.log('wait loading')
          setTimeout(callback,100)
        }else{
          // console.log("updated");
          accept();
        }
      };
    });
  };
}
const fromDocument$ = $(document);
const fromDocument$$ = $$(document);
const solutionWrap = fromDocument$("#solution-player-sdk");
const fromSolution$ = $(solutionWrap);

const solutions = [];
async function run() {
  let nextbutton;
  // let i = 1;
  const mutated = observeSolution(solutionWrap);
  while ((nextbutton = fromSolution$(".arrow.arrow-right"))) {
    addCurrentPage(solutions);
    const topromise = mutated();
    nextbutton.click();
    await topromise;
    // if (i++ >= 5) break;
  }
}

function addCurrentPage(solutions) {
  const title = fromSolution$(".title").cloneNode(true);
  if (fromSolution$(".no-solution")) {
    console.error("no solution", title.textContent);
    return;
  }
  title.style.textAlign = "center";
  title.style.fontSize = "2rem";
  title.style.margin = "1rem 0";
  const solution = fromSolution$(".solution.TBS_SOLUTION").cloneNode(true);
  solutions.push(title, solution);
  console.log("added", title.textContent);
}

function render(solutions) {
  const wrapper = fromSolution$("section.problem");
  const removeEverythingElse = bubbleUp(removeAllSiblings);
  removeAllChildren(wrapper);
  solutions.forEach(sol => wrapper.appendChild(sol));
  maxWidth(wrapper);
}

function removeAllSiblings(me) {
  const parent = me.parentNode;
  let sib;
  removeAllChildren(parent);
  parent.appendChild(me);
  if (parent == document.body) return null;
  else return parent;
}

function removeAllChildren(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
    console.log("removing children");
  }
}

function bubbleUp(ftn) {
  return function(arg) {
    let result = ftn(arg);
    while (result) {
      // continue execution until return null
      result = ftn(result);
    }
  };
}

function maxWidth(me) {
  let current = me;
  do {
    current.style.width = "100%";
    current.style.margin = "auto";
    current.style.padding = "auto";
    current.style.maxWidth = "100%";
    current = current.parentNode;
  } while (current !== document.body);
}

function cleanup() {
  const list = [
    fromDocument$(".feedback-widget"),
    fromDocument$(".toolbar.TBS_TOOLBAR"),
    ...fromDocument$$(".comment-box"),
    fromDocument$(".crs-widget.chapter"),
    fromDocument$(".playerpages-right-content"),
    fromDocument$(".chg-footer"),
    fromDocument$('.chgg-hdr')
  ];
  list.forEach(litter => litter && litter.parentNode.removeChild(litter));
}

run()
  .then(() => render(solutions))
  .then(cleanup);
