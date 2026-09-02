const links = document.querySelectorAll('.remote-box a');
const channelUrls = Array.from(links).map(a => a.href);
let currentIndex = 0;

const iframe = document.querySelector('.screen');

function goToChannel(index) {
    currentIndex = (index + channelUrls.length) % channelUrls.length; // wraps around both ends
    iframe.src = channelUrls[currentIndex];
}

document.querySelector('.btn-back').addEventListener('click', () => goToChannel(currentIndex - 1));
document.querySelector('.btn-forward').addEventListener('click', () => goToChannel(currentIndex + 1));