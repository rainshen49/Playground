const fs = require('fs')
const { execFileSync } = require('child_process')
const entry = process.argv[2]
console.log(entry, 'is being watched')
function compileandrun(filename) {
    console.log('compiling', filename)
    const compiletask = execFileSync("g++", [
        "-g",
        filename
    ], { stdio: 'inherit' })
    console.log('running', filename)
    const runtask = execFileSync("./a.out", { stdio: 'inherit' })
}

const reload = debounce(() => {
    console.log('')
    compileandrun(entry)
    console.log('')
}, 500)
fs.watch('.', {}, (ev, filename) => {
    console.log(filename, ev)
    if (ev === 'change' && filename.includes('.cpp')) {
        reload()
    }
})



// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func = () => { }, wait = 500, immediate = false) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};