
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const full = player.querySelector('.full')

// Build Functios

function togglePlay(e){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

function updateButton(){
    const icon = video.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
}

function skip(){
    const skipTime = this.dataset.skip
    video.currentTime += parseFloat(skipTime)
}

function handleRangeUpdate(){
    video[this.name] = this.value
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration
    video.currentTime = scrubTime
}

function toggleScreen(){
    if(!isFull){
        isFull = true
        player.requestFullscreen()
    }else{
        isFull = false
       
        document.exitFullscreen()
    }
}

// Hook up event Listeners

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach( button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate))

let mouseDown = false
let isFull = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e))

progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

full.addEventListener('click',toggleScreen)