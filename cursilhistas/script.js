const sheetId2 = "139-UmXyXXh95mAQwKh_fFgzQALDpTKXGxC_pwm1jghQ"
const sheetName2 = "cursilhistas"
const sheetURL2 = `https://docs.google.com/spreadsheets/d/${sheetId2}/gviz/tq?tqx=out:csv&sheet=${sheetName2}`;

async function obterDados() {
  const indicacoes = await obterIndicacoes()

  return indicacoes
}

async function obterIndicacoes() {
  const resposta = await fetch(sheetURL2)
  const csvText = await resposta.text()
  const textoLimpo = csvText.replaceAll("\"", "")
  const linhas = textoLimpo.split("\n");

  const objetos = []

  for (let linha = 1; linha < linhas.length; linha++) {
    let valores = linhas[linha].split(",")
    const objeto = {
      nome: valores[0],
      dataAniversario: valores[1],
      cursilho: valores[2],
      padrinhoMadrinha1: valores[3],
      padrinhoMadrinha2: valores[4],
      indicacoes: valores[20]
    }
    objetos.push(objeto)
  }
  

  return objetos
}

function redirecionarPaginaDadosCursilhista(cursilhista) {
  localStorage.setItem("cursilhista", JSON.stringify(cursilhista))

  window.location.href = "/cursilhistas/detalhes"
}

async function preencherInformacoesPagina() {
  const resposta = await obterDados()

  const lista = document.getElementById("lista-cursilhistas")

  for (let cursilhista of resposta) {
    const elemento = document.createElement('li')
    elemento.classList.add("list-group-item", "d-flex", "justify-content-between", "font-weight-bold")
    elemento.style.cursor = "pointer"
    elemento.onclick = () => redirecionarPaginaDadosCursilhista(cursilhista)

    const span = document.createElement('span')
    span.classList.add("pt-2")
    span.style.fontWeight = "bold"
    span.style.fontSize = "15px"
    span.textContent = cursilhista.nome
    elemento.appendChild(span)

    const icone = document.createElement("i")
    icone.classList.add("bi", "bi-arrow-right-square", "align-self-end")
    icone.style.fontSize = '25px'
    icone.style.cursor = 'pointer'
    elemento.appendChild(icone)

    lista.appendChild(elemento)
  }

}

preencherInformacoesPagina()
