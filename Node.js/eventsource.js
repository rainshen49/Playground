const http = require('http')
const fs = require('fs')
const server = http.createServer()
server.listen(3000)
console.log('server listening on port 3000')
server.on('request', (req, res) => {
    console.log(req.method)
    console.log(req.headers)
    console.log(req.url)
    const url = req.url === "/" ? "/index.html" : req.url
    switch (req.method) {
        case "GET":
            if (fs.existsSync(`.${url}`)) {
                const file = fs.createReadStream(`.${url}`)
                file.pipe(res)
                file.on('error', () => res.end('File Read Error'))
            } else {
                nonResource(req, res)
            }
            break;
        case "POST":
            break;
    }
})

function nonResource(req, res) {
    console.log('non resource request', req.headers.accept)
    if (req.headers.accept.includes('text/event-stream')) {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            // "Access-Control-Allow-Origin": '*',
        });
        // res.write("retry: 10000\n");
        // res.write("event: connecttime\n");
        // res.write("data: " + (new Date()) + "\n\n");
        res.write("data: 123456\n\n");

        // interval = setInterval(function () {
        //     res.write("data: " + (new Date()) + "\n\n");
        // }, 5000);

        // req.connection.addListener("close", function () {
        //     clearInterval(interval);
        // }, false);
    }
}