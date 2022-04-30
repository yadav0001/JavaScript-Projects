let countdown;
const timeLeft = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const timerButtons = document.querySelectorAll('[data-time]')
const form = document.querySelector('form')
const input = document.querySelector('input')


function showTimeLeft(time){
    clearInterval(countdown)
    let totalSeconds = time
    const date = new Date()
    const hourLeft = parseInt(totalSeconds/3600)
    const minLeft = parseInt((totalSeconds%3600)/60)
    const hour = date.getHours() + hourLeft
    const min = date.getMinutes() + minLeft
    endTime.innerHTML = `Be back at ${hour}:${min}`

    countdown = setInterval(() => {
        if(totalSeconds<0) {
            clearInterval(countdown) 
            return
        }
        const mins = parseInt(totalSeconds/60)
        const secs = totalSeconds%60
        console.log(mins,secs)
        timeLeft.innerHTML = `${mins}:${secs}`
        totalSeconds--
    },1000)
   
}

function show(e){
    e.preventDefault()
    const seconds = input.value*60
    showTimeLeft(seconds)
    this.reset()
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    showTimeLeft(seconds);
  }
  
timerButtons.forEach(btn => btn.addEventListener('click', startTimer))
form.addEventListener('submit', show)