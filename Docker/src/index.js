const express = require('express')
const os = require('os')
const app = express()
app.get('/', (req, res) => res.send('Hello World! '+os.hostname()))

app.listen(process.env.port, () => console.log('Example app listening on port '+process.env.port))