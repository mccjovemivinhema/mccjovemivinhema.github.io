const sheetId = "1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k"
const sheetName = "referencia"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// requisição para obter as indicações

const sheetId2 = "139-UmXyXXh95mAQwKh_fFgzQALDpTKXGxC_pwm1jghQ"
const sheetName2 = "cursilhistas"
const sheetURL2 = `https://docs.google.com/spreadsheets/d/${sheetId2}/gviz/tq?tqx=out:csv&sheet=${sheetName2}`;


async function obterDados() {
  const resposta = await fetch(sheetURL)
  const csvText = await resposta.text()
  const valores = await tratarRequisicaoPresencas(csvText)
  const indicacoes = await obterIndicacoes(valores)

  return indicacoes
}

async function obterIndicacoes(cursilhistas) {
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
      indicacoes: valores[20],
      ...cursilhistas[valores[0]]
    }

    objetos.push(objeto)
  }
  

  return objetos
}

async function tratarRequisicaoPresencas(csvText) {
  const objetos = await csvToObjects(csvText);

  return await tratarRespostas(objetos)
}

async function tratarRespostas(objetos) {
  contagemPorPessoa = {}

  for (let objeto of objetos) {
    for (let presencas of Object.values(objeto)[0]) {
      if (contagemPorPessoa[presencas]) {
        contagemPorPessoa[presencas] = {
          presencas: contagemPorPessoa[presencas].presencas + 1,
          dias: [...contagemPorPessoa[presencas].dias, Object.keys(objeto)[0].replaceAll("\"", "")]
        }
      } else {
        contagemPorPessoa[presencas] = {
          presencas: 1,
          dias: [Object.keys(objeto)[0].replaceAll("\"", "")]
        }
      }
    }
  }

  return contagemPorPessoa
}

async function csvToObjects(csv) {
  const csvRows = csv.split("\n");

  const titulos = csvRows[0].split(",")
  
  let objects = []
  let linhaDividida = {}

  for (let indiceTitulos = 0, max = titulos.length; indiceTitulos < max; indiceTitulos++) {
    if (titulos[indiceTitulos] === "\"\"") continue
    
    let thisObject = {};
    const presencas = []

    for (let j = 1, max = csvRows.length; j < max; j++) {
      if (linhaDividida[j] === undefined) {
        linhaDividida[j] = csvSplit(csvRows[j]);
      }

      if (linhaDividida[indiceTitulos] !== '') presencas.push(linhaDividida[j][indiceTitulos]);
    }
    
    thisObject[titulos[indiceTitulos]] = presencas
    objects.push(thisObject);
  }

  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
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
