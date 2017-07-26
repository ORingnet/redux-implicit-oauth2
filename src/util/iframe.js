import load from 'load-iframe'

const openIframe = (url) => new Promise((resolve, reject)=>{
  const iframe = load(url)
  iframe.onload = () => resolve(iframe)
  iframe.onerror = (e) => reject(e)
})

export default openIframe
