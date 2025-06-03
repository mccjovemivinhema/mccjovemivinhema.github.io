const item = JSON.parse(localStorage.getItem("cursilhista"))

if (item === null || item === undefined) {
    window.location.href = "/cursilhistas"
}

const nomeValor = document.getElementById("nomeValor")
const dataAniversarioValor = document.getElementById("dataAniversarioValor")
const cursilhoValor = document.getElementById("cursilhoValor")
const padrinhoMadrinhaValor = document.getElementById("padrinhoMadrinhaValor")
const indicacoes = document.getElementById("indicacoes")

nomeValor.textContent = item.nome
dataAniversarioValor.textContent = item.dataAniversario
cursilhoValor.textContent = item.cursilho
indicacoes.textContent = item.indicacoes

console.log(item)

if (item.padrinhoMadrinha1 !== '' && item.padrinhoMadrinha2 !== '') {
    padrinhoMadrinhaValor.textContent = item.padrinhoMadrinha1 + ", " + item.padrinhoMadrinha2
} else {
    padrinhoMadrinhaValor.textContent = item.padrinhoMadrinha1
}


window.onload = function() {
    localStorage.clear()
}