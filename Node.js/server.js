const http = require('http')
const https = require('https')
const fs = require('fs')
const URL = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.createReadStream('./index.html').pipe(res)
    } else {
        const { headers, url, method } = req
        const options = { headers, method }
        const urlInfo = URL.parse(url.slice(1))
        Object.assign(options, urlInfo)
        headers["host"] = urlInfo.host
        console.log(options)
        let client = http
        if (urlInfo.protocol === "https:") client = https
        client.request(options, outres => {
            outres.on('data',chunk=>console.log(chunk.toString()))
        }).on('error', err => console.error(err)).end()
        // res.end(JSON.stringify(options, null, 2))
    }
})
server.listen(3000, () => console.log("server started on 3000"))