const $ = document.querySelector.bind(document)
const textarea = $('#typing')
const observer = Rx.Observable.fromEvent(textarea, 'input')
observer.scan((count, ev) => {
    console.log(ev)
    return count + 1
}, 0).subscribe(count => console.log(count))