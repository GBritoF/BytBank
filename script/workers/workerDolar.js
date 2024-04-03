async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    const conectaConvertida = await conecta.json()
    postMessage(conectaConvertida.USDBRL)
}

addEventListener("message", () => {
    conectaAPI()
    setInterval(() => conectaAPI(), 5000)
})