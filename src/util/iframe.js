import load from 'load-iframe'

const openIframe = (url) => new Promise((resolve, reject)=>{
  const iframe = load(url)
  iframe.onload = () => resolve(iframe)
  iframe.onerror = (e) => reject(e) //CORS 情況下好像不會觸發
})

export default openIframe
