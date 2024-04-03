import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.querySelector("#graficoDolar")

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
});
  
function gerarHorario() {
  let data = new Date()
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()
  return horario
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados)
  })
  grafico.update()
}

let workerDolar = new Worker("./script/workers/workerDolar.js")
workerDolar.postMessage('usd')

workerDolar.addEventListener("message", (evento) => {
  let tempo = gerarHorario()
  let valor = evento.data.ask
  selecionaCotacao("dolar", valor)
  adicionarDados(graficoParaDolar, tempo, valor)
})

const graficoIane = document.querySelector("#graficoIene")

const graficoParaIane = new Chart(graficoIane, {
  type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iane',
        data: [],
        borderWidth: 1
      }]
    },
})

let workerIane = new Worker("./script/workers/workerIane.js")
workerIane.postMessage("iane")

workerIane.addEventListener("message", (evento) => {
  let tempo = gerarHorario()
  let valor = evento.data.ask
  selecionaCotacao("iane", valor)
  adicionarDados(graficoParaIane, tempo, valor)
})

