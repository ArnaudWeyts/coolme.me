console.info('PSHHHHHT, do you want some soure code?');
console.info('https://github.com/arnaudweyts/coolmeme');

const thumb = document.querySelector('.title div');
const audio = document.querySelector('audio');
let clicked = false;

function toggleGrow() {
  if (!clicked) {
     audio.play();
    // scales emoji and centers it on the page
    this.style.transform = `
      translateX(-${this.parentElement.offsetWidth / 2 - this.offsetWidth / 2}px)
      scale(4)
      rotate(1080deg)
    `;
  } else {
    this.style.transform = '';
  }
  clicked = !clicked;
}

thumb.addEventListener('mousedown', toggleGrow);
