const samplingInterval = 50, bufferCount = 500 / samplingInterval;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyzer = audioCtx.createAnalyser()
analyzer.fftSize = 32
analyzer.smoothingTimeConstant = 0;
getAudio().then(stream => {
    const source = audioCtx.createMediaStreamSource(stream)
    const gainNode = audioCtx.createGain()
    gainNode.gain.value = 0
    source.connect(analyzer)
        .connect(gainNode)
        .connect(audioCtx.destination)
})

function getAudio() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
}

const canvas = document.getElementById('wave')

// function configCanvas(canvas) {
canvas.setAttribute('height', document.body.clientHeight * 0.99)
canvas.setAttribute('width', document.body.clientWidth * 0.99)
const ctx = canvas.getContext("2d");
const maxH = canvas.clientHeight
const maxW = canvas.clientWidth
let lastPoint = [0, 0]
function shiftLeft(percent) {
    const pixel = percentToPixel(percent)[0]
    const data = ctx.getImageData(pixel, 0, maxW - pixel, maxH)
    ctx.putImageData(data, 0, 0)
}
function percentToPixel(x = 0, y = 0) {
    return [x * maxW, y * maxH]
}
function newPoint(x, y) {
    const coords = percentToPixel(x, y)
    shiftLeft(0.005)
    ctx.beginPath()
    ctx.moveTo(...lastPoint)
    ctx.lineTo(...coords)
    ctx.stroke()
    lastPoint = [coords[0] - 0.005 * maxW, coords[1]]
}
// }

function sum(arr) {
    return arr.reduce((prev, curr) => prev + curr)
}

// const newPoint = configCanvas(canvas)
const button = document.getElementById('shift')
button.onclick = ev => {
    // const buffer = new Uint8Array(bufferCount)
    sample()
}

function sample() {
    const arr = new Uint8Array(32)
    analyzer.getByteFrequencyData(arr)
    const tot = weightNormalize(arr)
    newPoint(0.5, (1500 - tot) / 1500)
    setTimeout(sample, tot > 500 ? 600 : samplingInterval)
}

function weightNormalize(arr) {
    const max = Math.max(...arr)
    for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = arr[i] / max * 255
    }
    return sum(arr)
}