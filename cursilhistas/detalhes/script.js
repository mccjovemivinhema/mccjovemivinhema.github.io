const item = JSON.parse(localStorage.getItem("cursilhista"))

if (item === null || item === undefined) {
    window.location.href = "/cursilhistas"
}

const nomeValor = document.getElementById("nomeValor")
const dataAniversarioValor = document.getElementById("dataAniversarioValor")
const cursilhoValor = document.getElementById("cursilhoValor")
const padrinhoMadrinhaValor = document.getElementById("padrinhoMadrinhaValor")
const quantidadeIndicacoes = document.getElementById("quantidadeIndicacoes")
const indicacoes = document.getElementById("listaIndicacoes")

const listaIndicacoes = item.indicacoes.split(";")

if (listaIndicacoes.length > 0 && listaIndicacoes[0] !== "Nenhuma indicação") {
    quantidadeIndicacoes.textContent = `${listaIndicacoes.length} indicações`
}

nomeValor.textContent = item.nome
dataAniversarioValor.textContent = item.dataAniversario
cursilhoValor.textContent = item.cursilho

for (let indicacao of listaIndicacoes) {
    const tr = document.createElement("tr")
    const td = document.createElement("td")

    td.textContent = indicacao

    tr.appendChild(td)
    indicacoes.appendChild(tr)
}

console.log(item)

if (item.padrinhoMadrinha1 !== '' && item.padrinhoMadrinha2 !== '') {
    padrinhoMadrinhaValor.textContent = item.padrinhoMadrinha1 + ", " + item.padrinhoMadrinha2
} else {
    padrinhoMadrinhaValor.textContent = item.padrinhoMadrinha1
}


window.onload = function() {
    localStorage.clear()
}