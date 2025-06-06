const sheetId = "139-UmXyXXh95mAQwKh_fFgzQALDpTKXGxC_pwm1jghQ"
const sheetName = "aniversarios"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

async function obterDados() {
    const resposta = await fetch(sheetURL)
    const csvText = await resposta.text()
    const aniversarios = await tratarRequisicaoPresencas(csvText)
  
    const tituloProximosAniversarios = document.getElementById("tituloProximosAniversarios")
    const listaAniversarios = document.getElementById("listaAniversarios")

    tituloProximosAniversarios.textContent = `Próximos Aniversários (${aniversarios.length})`

    for (let aniversario of aniversarios) {
        const tr = document.createElement("tr")
        const nomeValor = document.createElement("td")
        const dataAniversarioValor = document.createElement("td")
        const diasValor = document.createElement("td")
    
        const quantidadeDiasAteAniversario = aniversario[3]

        nomeValor.textContent = aniversario[0]
        dataAniversarioValor.textContent = aniversario[1]
        diasValor.textContent = quantidadeDiasAteAniversario

        if (quantidadeDiasAteAniversario <= 3) {
            nomeValor.style.color = "#8B0000"
            dataAniversarioValor.style.color = "#8B0000"
            diasValor.style.color = "#8B0000"
        } else if (quantidadeDiasAteAniversario <= 5) {
            nomeValor.style.color = "#FF5733"
            dataAniversarioValor.style.color = "#FF5733"
            diasValor.style.color = "#FF5733"
        } else if (quantidadeDiasAteAniversario <= 10) {
            nomeValor.style.color = "#023020"
            dataAniversarioValor.style.color = "#023020"
            diasValor.style.color = "#023020"
        }

        if (quantidadeDiasAteAniversario === "0") {
            diasValor.textContent = "Hoje"
        } else if (quantidadeDiasAteAniversario === "1") {
            diasValor.textContent = "Amanhã"
        }

        
        tr.appendChild(nomeValor)
        tr.appendChild(dataAniversarioValor)
        tr.appendChild(diasValor)
        listaAniversarios.appendChild(tr)
    }
}

async function tratarRequisicaoPresencas(csvText) {
    const objetos = await csvToObjects(csvText);
  
    return objetos
}

async function csvToObjects(csv) {
    csv = csv.replaceAll("\"", "")
    const csvRows = csv.split("\n");

    let linhaDividida = []
  
    for (let indice = 0, max = csvRows.length; indice < max; indice++) {
      if (linhaDividida[indice] === "\"\"") continue
      
      linhaDividida.push(csvRows[indice].split(","));
    }

    return linhaDividida;
}

obterDados()
