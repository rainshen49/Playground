const http2 = require('http2');
const {
    // each of them is a unique string for HTTP2
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS,
    HTTP2_HEADER_CONTENT_TYPE
} = http2.constants;
const mime = require('mime')
const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
});
server.on('error', (err) => console.error(JSON.stringify(error)));

server.on('stream', (stream, headers, flags) => {
    // this is executed first, then the plain old request listener
    const method = headers[HTTP2_HEADER_METHOD];
    const path = headers[HTTP2_HEADER_PATH];

    // stream.respond({ [HTTP2_HEADER_STATUS]: 200 });
    // if only need to send file, no need to initiate response
    if (path === "/" || path.includes('index.html')) {
        // need to match request header path with reponse header path so the browser can match the file with the request


        stream.pushStream({ [HTTP2_HEADER_PATH]: path + "style.css" }, (err, pushStream, subheaders) => {
            if (err) throw err;
            sendFile(pushStream, './style.css', subheaders)
        }, { onError: e => console.log(e) });

        // although this may not be requested, later when the browser asked for package.json, it will load from cache instead of making another request
        stream.pushStream({ [HTTP2_HEADER_PATH]: path + "package.json" }, (err, pushStream, subheaders) => {
            if (err) throw err;
            sendFile(pushStream, './package.json', subheaders)
        }, { onError: e => console.log(e) });
        sendFile(stream, './index.html', headers)
    } else {
        stream.respond({ [HTTP2_HEADER_STATUS]: 404 })
        stream.end()
    }
});

// server.on('request', (req, res) => {
//     // this is executed after steam listener
//     console.log(req)
//     res.end('Node Request Listener')
// })

function sendFile(stream, filepath, headers) {
    return stream.respondWithFile(filepath,
        {
            // need to handle mime type manually
            [HTTP2_HEADER_CONTENT_TYPE]: mime.getType(filepath),
            path: headers.path,
            [HTTP2_HEADER_STATUS]: 200
        })
}

server.listen(8000, (err) => {
    if (err) {
        console.error(err);
        return -1;
    }
    console.log(`Server listening to port ${8000}`);
})