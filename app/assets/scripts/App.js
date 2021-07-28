import '../styles/styles.css'

if(module.hot) {
  module.hot.accept()
}

if(navigator.userAgent.match(/chrome|opera/i))
{
  document.body.style.textShadow='rgba(0,0,0,0.31) 0px 0px 1px';
}