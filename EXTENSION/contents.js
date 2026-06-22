
let model
let blurCounter
async function Classify (){
    let isNSFW =  false
    console.log("Classify running")
    let frame = document.querySelector ('video')
    let canvaELEM = document.createElement ('canvas')
    canvaELEM.width = frame.videoWidth
    canvaELEM.height = frame.videoHeight
    let context = canvaELEM.getContext ('2d')
    context.drawImage (frame, 0,0)
    const predictions = await model.classify(canvaELEM);
    predictions.forEach(prediction => {
        if ((prediction.className == "Porn" && prediction.probability >= 0.7721698880195618) || 
            (prediction.className == "Hentai" && prediction.probability >= 0.5) ||
            (prediction.className == "Sexy" && prediction.probability >= 0.5)){
            isNSFW = true
        }
        console.log (predictions)
    })
    if (isNSFW){
       frame.style.filter = "blur(70px)"
    }else {frame.style.filter = "none"}
}
async function init (){
    model = await nsfwjs.load(chrome.runtime.getURL('model/'))
    setInterval(Classify, 1000)

}
init ()
 


