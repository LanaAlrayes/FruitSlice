// Elements
const canvas = document.querySelector('#canvas')
const fruit = document.querySelector('.fruit')
const lives = document.querySelector('#lives')
const score = document.querySelector('#score-val')
const startBtn = document.querySelector('#start-btn')

// Game State
const state = {
  fruitPosition: -200,
  lives: 3,
  score: 0,
}

// the variable used by setInterval
let timer

const fruits = [
  'apple.png',
  'banana.png',
  'cherries.png',
  'grapes.png',
  'mango.png',
  'orange.png',
  'peach.png',
  'pear.png',
  'watermelon.png'
]

const giveMeRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min) // min - max (int)

const changeToRandomeFruit = () => {
  fruit.style.backgroundImage = `url(images/${fruits[giveMeRandomNumber(0, fruits.length - 1)]})`
}
const decreaseLives = () => {
  state.lives--
  lives.children[state.lives].style.opacity = 0.3
}

const resetFruitPosition = () => {
  fruit.style.top = state.fruitPosition = -200
  fruit.style.left = `${giveMeRandomNumber(0, canvas.clientWidth - fruit.clientWidth)}px`
  changeToRandomeFruit()
}

const moveFruit = () => {
  state.fruitPosition += 1
  fruit.style.top = `${state.fruitPosition}px`

  if (state.fruitPosition > canvas.clientHeight) {
    resetFruitPosition()
    decreaseLives()
    if (!state.lives) {
      alert(`Game Over! Your score is ${state.score}`)
      location.reload()
    }
  }
}

const increaseScore = () => { score.textContent = ++state.score }

const start = () => {
  lives.style.opacity = 1
  changeToRandomeFruit()
  timer = setInterval(moveFruit, 1)
  // hover event
  fruit.onmouseover = sliceTheFruit
  startBtn.style.display = 'none'
}

const sliceTheFruit = () => {
  increaseScore()
  fruit.classList.add('sliced')
  setTimeout(() => {
    resetFruitPosition()
    fruit.classList.remove('sliced')
  }, 500)
  
}

startBtn.onclick = start