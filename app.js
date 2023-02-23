const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#74d6a8', '#ff3468', '#e79cff', '#8b93e1', '#4e655a', '#d6ad7c']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

resetBtn.addEventListener('click', (event) => {
    finishGame()
})

resetBtn.addEventListener('click', function() {
    setTimeout ( () => {
    window.location.reload();
    }, 2000)
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandonCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandonCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}


function setColor(element) {
    const color = getRandonColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1> `
}

function createRandonCircle() {
    const circle = document.createElement('div')
    const size = getRandonNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandonNumber(0, width - size)
    const y = getRandonNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    setColor(circle)

    board.append(circle)
}

function getRandonNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

function getRandonColor() {
    const index =  Math.floor(Math.random() * colors.length)
    return colors[index]
}