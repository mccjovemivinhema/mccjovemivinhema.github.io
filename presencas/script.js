const sheetId = "1xEJLr4pbsElLjyDSBz0nqaKmpOuyYXyBm2KE0-B1ELQ"
const sheetName = "ranking"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`

async function obterDados() {
    const resposta = await fetch(sheetURL)
    const csvText = await resposta.text()
    const presencas = await tratarRequisicaoPresencas(csvText)
  
    const listaPresencas = document.getElementById("listaPresencas")
    let maiorQuantidadePresencas = 0

    const listaNovos = [
        'Carla Louzada',
        'Daniela Nogueira',
        'Elizabeth Medrado Alsamendia',
        'Geovana Moreira Carminati',
        'Leandro Achar Fontoura',
        'Maria Vitória Tavares',
        'Pedro Henrique Gomes da Silva',
        'Rodrigo Santos Novais',
        'Ruslan Lourencone Nunes',
        'Stefani Francini Moreira Azevedo'
    ]

    if (presencas.length > 0) {
        maiorQuantidadePresencas = Number(presencas[0][1])
    }

    const corPrimeiroLugar = '#ff99ac'
    const corSessentaPorcento = '#ead1dc'
    const corCiquantaPorcento = '#cfe2f3'
    const corQuarentaPorcento = '#fff2cc'
    const corTrintaPorcento = '#d0e0e3'
    const vermelhoCerejaClaro = '#e6b8af'
    const amareloClaro = '#ffffab'

    const sessentaPorcento = Math.round(maiorQuantidadePresencas * 0.60)
    const ciquentaPorcento = Math.round(maiorQuantidadePresencas * 0.50)
    const quarentaPorcento = Math.round(maiorQuantidadePresencas * 0.40)
    const trintaPorcento = Math.round(maiorQuantidadePresencas * 0.30)

    for (let presenca of presencas) {
        const tr = document.createElement("tr")
        const nomeValor = document.createElement("td")
        const presencasValor = document.createElement("td")

        nomeValor.textContent = presenca[0]
        presencasValor.textContent = presenca[1]

        if (Number(presenca[1]) === maiorQuantidadePresencas) {
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, corPrimeiroLugar)
        } else if (listaNovos.includes(presenca[0])) {
            nomeValor.style.fontWeight = 'bold'
            presencasValor.style.fontWeight = 'bold'
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, amareloClaro)
        } else if (Number(presenca[1]) >= sessentaPorcento) {
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, corSessentaPorcento)
        } else if (Number(presenca[1]) >= ciquentaPorcento) {
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, corCiquantaPorcento)
        } else if (Number(presenca[1]) >= quarentaPorcento) {
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, corQuarentaPorcento)
        } else if (Number(presenca[1]) >= trintaPorcento) {
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, corTrintaPorcento)
        } else if (Number(presenca[1]) < trintaPorcento) {
            estilizarLinhaPorPorcentualPresenca(nomeValor, presencasValor, vermelhoCerejaClaro)
        }

        tr.appendChild(nomeValor)
        tr.appendChild(presencasValor)
        listaPresencas.appendChild(tr)
    }
}

function estilizarLinhaPorPorcentualPresenca(nomeComponente, presencaComponente, cor) {
    nomeComponente.style.backgroundColor = cor
    presencaComponente.style.backgroundColor = cor
    nomeComponente.style.color = 'black'
    presencaComponente.style.color = 'black'
}

async function tratarRequisicaoPresencas(csvText) {
    const objetos = await csvToObjects(csvText);
  
    return objetos
}

async function csvToObjects(csv) {
    csv = csv.replaceAll("\"", "")
    const csvRows = csv.split("\n").slice(1);

    let linhaDividida = []
  
    for (let indice = 0, max = csvRows.length; indice < max; indice++) {
      if (linhaDividida[indice] === "\"\"") continue
      
      linhaDividida.push(csvRows[indice].split(","));
    }

    return linhaDividida;
}

obterDados()
