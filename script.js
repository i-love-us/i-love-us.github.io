const links = document.querySelectorAll('.remote-box a');
const channelUrls = Array.from(links).map(a => a.href);
let currentIndex = 0;

const iframe = document.querySelector('.screen');
let isPlaying = true; // matches autoplay=1 starting state

function togglePause() {
    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
    );
    isPlaying = !isPlaying;
}

function goToChannel(index) {
    currentIndex = (index + channelUrls.length) % channelUrls.length; // wraps around both ends
    iframe.src = channelUrls[currentIndex];
}

document.querySelector('.btn-back').addEventListener('click', () => goToChannel(currentIndex - 1));
document.querySelector('.btn-forward').addEventListener('click', () => goToChannel(currentIndex + 1));
document.querySelector('.btn-down').addEventListener('click', ()=> togglePause());