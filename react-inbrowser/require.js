// this is a naive exports object that dumps all exports into one place
// developer needs to take care of name clashes
const exports = {}
function require(path) {
    console.log('importing', path)
    if(globals.hasOwnProperty(path)){
        return globals[path]
    }else if(window.hasOwnProperty(path)){
        return window[path]
    }else{
        return exports
    }
}
// a mapping of package name to actual global variable name. e.g. Package 'react' makes React available in the global scope
const globals = {
    "react":React,
    "react-dom":ReactDOM,
    "reactstrap":Reactstrap
}