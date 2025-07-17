const sheetId = "1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k"
const sheetName = "ranking"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`

async function obterDados() {
    const resposta = await fetch(sheetURL)
    const csvText = await resposta.text()
    const presencas = await tratarRequisicaoPresencas(csvText)
  
    const listaPresencas = document.getElementById("listaPresencas")
    let maiorQuantidadePresencas = 0

    const listaNovos = [
        'Alex Sandro Aparecido da Silva',
        'Bruno Leal Colzani Rodrigues',
        'Bruno Zanesco Crivelaro',
        'Diego dos Santos',
        'Eloisa Fernandes Martins',
        'Jefferson de Moura Pedroso',
        'Melrrayne Buzzo',
        'Naana Maria Rodrigues Ferreira',
        'Nicolas Rodrigues Oliveira',
        'Pablo Iguinans Pires Magri',
        'Wyldem Barg Veríssimo da Silva'
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
            nomeValor.style.backgroundColor = corPrimeiroLugar
            presencasValor.style.backgroundColor = corPrimeiroLugar
            nomeValor.style.color = 'black'
            presencasValor.style.color = 'black'
        } else if (Number(presenca[1]) >= sessentaPorcento) {
            nomeValor.style.backgroundColor = corSessentaPorcento
            presencasValor.style.backgroundColor = corSessentaPorcento
            nomeValor.style.color = 'black'
            presencasValor.style.color = 'black'
        } else if (Number(presenca[1]) >= ciquentaPorcento) {
            nomeValor.style.backgroundColor = corCiquantaPorcento
            presencasValor.style.backgroundColor = corCiquantaPorcento
            nomeValor.style.color = 'black'
            presencasValor.style.color = 'black'
        } else if (Number(presenca[1]) >= quarentaPorcento) {
            nomeValor.style.backgroundColor = corQuarentaPorcento
            presencasValor.style.backgroundColor = corQuarentaPorcento
            nomeValor.style.color = 'black'
            presencasValor.style.color = 'black'
        } else if (Number(presenca[1]) >= trintaPorcento) {
            nomeValor.style.backgroundColor = corTrintaPorcento
            presencasValor.style.backgroundColor = corTrintaPorcento
            nomeValor.style.color = 'black'
            presencasValor.style.color = 'black'
        } else if (listaNovos.includes(presenca[0])) {
            nomeValor.style.backgroundColor = amareloClaro
            presencasValor.style.backgroundColor = amareloClaro
            nomeValor.style.color = 'black'
            nomeValor.style.fontWeight = 'bold'
            presencasValor.style.color = 'black'
            presencasValor.style.fontWeight = 'bold'
        } else if (Number(presenca[1]) < trintaPorcento) {
            nomeValor.style.backgroundColor = vermelhoCerejaClaro
            presencasValor.style.backgroundColor = vermelhoCerejaClaro
            nomeValor.style.color = 'black'
            presencasValor.style.color = 'black'
        }

        tr.appendChild(nomeValor)
        tr.appendChild(presencasValor)
        listaPresencas.appendChild(tr)
    }
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
