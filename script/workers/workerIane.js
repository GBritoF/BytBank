addEventListener("message", event => {
    conectaAPI() 
    setInterval(() => conectaAPI(), 5000)
})

async function conectaAPI() {
    const conecta = await fetch("https://economia.awesomeapi.com.br/last/JPY-BRL")
    const conectaConvertida = await conecta.json()
    postMessage(conectaConvertida.JPYBRL)
}