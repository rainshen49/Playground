const source = new EventSource('sse')
source.addEventListener('message', e => {
    console.log(e)
})
source.addEventListener('open', function (e) {
    console.log("Connection was opened.")
});

source.addEventListener('error', function (e) {
    console.error(e)
});