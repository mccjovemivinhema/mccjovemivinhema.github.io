const item = JSON.parse(localStorage.getItem("cursilhista"))

if (item === null || item === undefined) {
    window.location.href = "/cursilhistas"
}

const sheetId = "1xEJLr4pbsElLjyDSBz0nqaKmpOuyYXyBm2KE0-B1ELQ"
const sheetName = "tab"
const sqlQuery = encodeURIComponent(`SELECT * WHERE A = '${item.nome}'`)
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${sqlQuery}`;

const listaIndicacoes = item.indicacoes.split(";")

const nomeValor = document.getElementById("nomeValor")
const dataAniversarioValor = document.getElementById("dataAniversarioValor")
const cursilhoValor = document.getElementById("cursilhoValor")
const padrinhoMadrinhaValor = document.getElementById("padrinhoMadrinhaValor")
const quantidadeIndicacoes = document.getElementById("quantidadeIndicacoes")
const indicacoes = document.getElementById("listaIndicacoes")
const quantidadePresencas = document.getElementById("quantidadePresencas")
const listaPresencas = document.getElementById("listaPresencas")

if (item.padrinhoMadrinha1 !== '' && item.padrinhoMadrinha2 !== '') {
    padrinhoMadrinhaValor.textContent = item.padrinhoMadrinha1 + ", " + item.padrinhoMadrinha2
} else {
    padrinhoMadrinhaValor.textContent = item.padrinhoMadrinha1
}

nomeValor.textContent = item.nome
dataAniversarioValor.textContent = item.dataAniversario
cursilhoValor.textContent = item.cursilho

// lista de indicações e presenças
Promise.allSettled([criarListaIndicacoes(), criarListaPresencas()])

window.onload = function() {
    localStorage.clear()
}

async function criarListaIndicacoes() {
    if (listaIndicacoes.length > 0 && listaIndicacoes[0] !== "Nenhuma indicação") {
        quantidadeIndicacoes.textContent = `${listaIndicacoes.length} indicações`
    
        for (let indicacao of listaIndicacoes) {
            const tr = document.createElement("tr")
            const td = document.createElement("td")
        
            td.textContent = indicacao
        
            tr.appendChild(td)
            indicacoes.appendChild(tr)
        }
    } else {
        quantidadeIndicacoes.textContent = 'Nenhuma indicação'
    }
}

async function criarListaPresencas() {
    const dias = await obterDados()
    
    if (dias.length > 0) {
        quantidadePresencas.textContent = `Quantidade: ${dias.length}`
        for (let dia of dias) {
            const tr = criarElementoDiaPresenca(dia)
        
            listaPresencas.appendChild(tr)
        }
    } else {
        quantidadePresencas.textContent = `Quantidade: 0`
        const tr = criarElementoDiaPresenca("Nenhuma presença")

        listaPresencas.appendChild(tr)
    }
}

function criarElementoDiaPresenca(dia) {
    const tr = document.createElement("tr")
    const td = document.createElement("td")
    td.textContent = dia
    tr.appendChild(td)
    return tr
}

//

async function obterDados() {
  const resposta = await fetch(sheetURL)
  const csvText = await resposta.text()
  const valores = await tratarRequisicaoPresencas(csvText)
  return valores
}

async function tratarRequisicaoPresencas(csvText) {
  const text = csvText.replaceAll("\"", "")
  const objetos = await csvToObjects(text);

  return objetos
}

async function csvToObjects(csv) {
  const csvRows = csv.split("\n");

  const titulos = csvRows[0].split(",")
  const presencas = csvRows[1].split(",")
  const diasPresencas = []

  for (let [index, presenca] of presencas.entries()) {
    if (presenca === 'TRUE' && titulos[index] !== '') {
        diasPresencas.push(titulos[index])
    }
  }

  return diasPresencas
}
