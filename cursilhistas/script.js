const sheetId = "1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k"
const sheetName = "referencia"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// requisição para obter as indicações

const sheetId2 = "139-UmXyXXh95mAQwKh_fFgzQALDpTKXGxC_pwm1jghQ"
const sheetName2 = "cursilhistas"
const sheetURL2 = `https://docs.google.com/spreadsheets/d/${sheetId2}/gviz/tq?tqx=out:csv&sheet=${sheetName2}`;


async function obterDados() {
  const indicacoes = await obterIndicacoes()
  const resposta = await fetch(sheetURL)
  const csvText = await resposta.text()
  const valores = await tratarRequisicaoPresencas(csvText)

  console.log(indicacoes)
  console.log(valores)
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
          dias: [...contagemPorPessoa[presencas].dias, Object.keys(objeto)]
        }
      } else {
        contagemPorPessoa[presencas] = {
          presencas: 1,
          dias: [Object.keys(objeto)]
        }
      }
    }
  }

  return contagemPorPessoa
}

async function csvToObjects(csv) {
  const csvRows = csv.split("\n");

  const titulos = csvRows[0].split(",")

  let objects = [];

  for (let i = 0, max = titulos.length; i < max; i++) {
    if (titulos[i] === "\"\"") break
    
    let thisObject = {};
    const presencas = []

    for (let j = 1, max = csvRows.length; j < max; j++) {
      let row = csvSplit(csvRows[j]);

      if (row[i] !== '') presencas.push(row[i]);
    }
    thisObject[titulos[i]] = presencas
    objects.push(thisObject);
  }

  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}

obterDados()