(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-64481180-2', 'auto');
ga('send', 'pageview');

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
    audio.currentTime = 0;
  } else {
    this.style.transform = '';
  }
  clicked = !clicked;
}

thumb.addEventListener('mousedown', toggleGrow);
