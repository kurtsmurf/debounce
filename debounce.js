const canvas = document.querySelector('canvas')
canvas.style.background  = 'black'
const scale = 16
let w
let h

const ctx = canvas.getContext('2d')
ctx.strokeStyle = 'white'
ctx.fillStyle = 'white'

const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = Math.min(window.innerHeight, 256)
    w = canvas.width / 16
    h = canvas.height / 16
    ctx.scale(scale, scale)
}
resizeCanvas()

// Prevents callback from executing until 'wait' millis have elapsed since last invocation
const debounce = (func, wait) => {
    let timeout
    return () => {
        const later = () => {
            timeout = null
            func()
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

window.onresize = debounce(resizeCanvas, 10)

let x = 0
const tickAnimation = () => {
    x = x > w ? 0 : x + 1
    let period = 2 * Math.PI
    let angle = (x / w) * period
    let amplitude = h / 2 - 2
    let y = Math.sin(angle) * amplitude + h / 2

    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0,0,w,h)
    ctx.fillStyle = 'white'
    ctx.fillRect(x,y,1,1)

    requestAnimationFrame(tickAnimation)
}
requestAnimationFrame(tickAnimation)