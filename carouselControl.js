import { backwards, pause, pass } from './app.js'
const backwardsBtn = document.querySelector('.carousel-controls__button--back')
const pauseBtn = document.querySelector('.carousel-controls__button--pause')
const nextBtn = document.querySelector('.carousel-controls__button--next')
const contrastBtn = document.querySelector('.contrast-button')
const controlsMenu = document.querySelector('.carousel-controls')
let wasContrasted = false

backwardsBtn.addEventListener('click', backwards)
pauseBtn.addEventListener('click', pause)
nextBtn.addEventListener('click', pass)

const contrastSwitch = () => {
  wasContrasted = !wasContrasted

  if(wasContrasted){
    controlsMenu.classList.add('whiteBg')
    return
  } 
  controlsMenu.classList.remove('whiteBg')
}

contrastBtn.addEventListener('click', contrastSwitch)