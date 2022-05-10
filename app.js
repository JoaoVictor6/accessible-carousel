const carouselImages = [
  'https://images.unsplash.com/photo-1652162539309-c96b2694f02b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1655&q=80',
  'https://images.unsplash.com/photo-1652031020082-09b0c584e721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1595&q=80',
  'https://images.unsplash.com/photo-1642170064123-7364c7d40358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
]
const carouselContainer = document.querySelector('.carousel')
let carouselWasPaused = false

const pass = () => currentPosition.currentItem = ++currentPosition.currentItem
const backwards = () => currentPosition.currentItem = --currentPosition.currentItem
const pause = () => carouselWasPaused = !carouselWasPaused
function renderCarousel(currentItem){
  carouselContainer.innerHTML = ''
  
  carouselImages.forEach((url, position, {length} ) => {
    
    const item = document.createElement('div')
    item.classList.add('carousel__item')
    item.classList.add(`carousel__item--${position}`)
    
    item.ariaLabel = `${++position} of ${length}`
    item.ariaRoleDescription = 'slide'
    if(currentItem === position-1){
      item.ariaLive = 'polite'
      item.classList.remove('hidden') 
    } else {
      item.ariaLive = 'off'
      item.classList.add('hidden')
    }
    
    const img = document.createElement('img')
    img.src = url
    img.alt = `slide number ${++position}`
    
    item.appendChild(img)
    carouselContainer.appendChild(item)
  })
}

const currentPosition = new Proxy({currentItem: 0}, {
  set: (obj, type, receivedValue) => {
    if(receivedValue > carouselImages.length-1){
      obj[type] = 0
      
      renderCarousel(obj[type])
      return true 
    }
    if(receivedValue < 0){
      obj[type] = carouselImages.length - 1
      
      renderCarousel(obj[type])
      return true 
    }
    carouselImages.forEach((_, position) => {
      if(position === receivedValue){
        renderCarousel(receivedValue)
      }
    })
    obj[type] = receivedValue
    return true
  }
})

currentPosition.currentItem = 0
setInterval(() => {
  if(!carouselWasPaused){
    pass()
  }
}, 5000)