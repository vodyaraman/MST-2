function updateMask() {
  const section = document.querySelector('.animated-headline');
  const svg     = section.querySelector('.mask-svg');
  const vb      = svg.getBoundingClientRect();
  const holes   = svg.querySelectorAll('.hole');

  // получаем окна по версиям
  const windowsDesktop = section.querySelectorAll('.headline--desktop .window');
  const windowsMobile  = section.querySelectorAll('.headline--mobile .window');

  // определяем, какие окна показываются
  const activeWindows = getComputedStyle(section.querySelector('.headline--mobile')).display === 'none'
    ? windowsDesktop
    : windowsMobile;

  activeWindows.forEach((win, i) => {
    const r = win.getBoundingClientRect();
    const x = ((r.left   - vb.left)   / vb.width ) * 100;
    const y = ((r.top    - vb.top)    / vb.height) * 100;
    const w = ( r.width  / vb.width )  * 100;
    const h = ( r.height / vb.height)  * 100;

    if (!holes[i]) return;

    holes[i].setAttribute('x',      x.toFixed(2) + '%');
    holes[i].setAttribute('y',      y.toFixed(2) + '%');
    holes[i].setAttribute('width',  w.toFixed(2) + '%');
    holes[i].setAttribute('height', h.toFixed(2) + '%');
  });

  // отключаем лишние дырки
  for (let i = activeWindows.length; i < holes.length; i++) {
    holes[i].setAttribute('width', '0%');
    holes[i].setAttribute('height', '0%');
  }
}


window.addEventListener('load',   updateMask);
window.addEventListener('resize', () => {
  clearTimeout(window._maskT);
  window._maskT = setTimeout(updateMask, 50);
});


updateMask();