const item = JSON.parse(localStorage.getItem("cursilhista"))

if (item === null || item === undefined) {
    window.location.href = "/cursilhistas"
}

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
    }
    
    for (let indicacao of listaIndicacoes) {
        const tr = document.createElement("tr")
        const td = document.createElement("td")
    
        td.textContent = indicacao
    
        tr.appendChild(td)
        indicacoes.appendChild(tr)
    }
}

async function criarListaPresencas() {
    if (item.dias) {
        quantidadePresencas.textContent = `Quantidade: ${item.presencas}`
        for (let dia of item.dias) {
            const tr = document.createElement("tr")
            const td = document.createElement("td")
        
            td.textContent = dia
        
            tr.appendChild(td)
        
            listaPresencas.appendChild(tr)
        }
    } else {
        quantidadePresencas.textContent = `Quantidade: 0`
        const tr = document.createElement("tr")
        const td = document.createElement("td")
    
        td.textContent = "Nenhuma presença"
    
        tr.appendChild(td)
    
        listaPresencas.appendChild(tr)
    }
}
