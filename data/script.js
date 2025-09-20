const sheetId = "1xEJLr4pbsElLjyDSBz0nqaKmpOuyYXyBm2KE0-B1ELQ"
const sheetName = "tab"

const sqlQuery = encodeURIComponent(`SELECT * WHERE A = 'Cursilhistas'`)
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${sqlQuery}`;

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const botaoAbrirModal = document.getElementById('abrirModal')
const atividadeTitulo = document.querySelector('.atividade-titulo')
const atividadeData = document.querySelector('.atividade-data')
const cursilhistasPresentes = document.querySelector('.cursilhistas-presentes')

async function carregarCalendario() {
    const eventos = await obterDados()

    const calendarEl = document.getElementById('calendar')
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        headerToolbar: {
            right: 'prev,next'
        },
        locale: 'pt-br',
        height: 'auto',
        events: eventos,
        eventClick: (info) => abrirModal(info)
    })

    calendar.render()
}

carregarCalendario()

async function abrirModal(info) {
    atividadeTitulo.textContent = info.event.title
    atividadeData.textContent = info.event.extendedProps.dataPorExtenso
    botaoAbrirModal.click()

    const listaCursilhistasPresentes = await obterCursilhistasPresentes(info)
    let texto = ""

    for (let i = 0; i < listaCursilhistasPresentes.length; i++) {
        texto += `<b>${i+1}</b> - ` + listaCursilhistasPresentes[i] + "<br/>"
    }

    cursilhistasPresentes.innerHTML = `${texto}`
}

function limparModal() {
    atividadeTitulo.textContent = ""
    cursilhistasPresentes.textContent = ""
}

async function obterDados() {
    const resposta = await fetch(sheetURL)
    const csvText = await resposta.text()
    return await tratarRequisicaoDias(csvText)
}

async function tratarRequisicaoDias(csvText) {
    const objetos = await csvToObjects(csvText);
  
    return objetos
}

async function obterCursilhistasPresentes(info) {
    const dia = info.event.extendedProps.description
    const sqlQuery = encodeURIComponent(`SELECT '${dia}', SUM(B) WHERE \`${info.event.id}\` = true GROUP BY '${dia}' pivot A`)
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${sqlQuery}`
    const resposta = await fetch(sheetURL)
    const texto = await resposta.text()
    const cursilhistasPresentes = texto.split("\n")[0].replaceAll("\"", "").split(",").slice(1)
    
    return cursilhistasPresentes
}

async function csvToObjects(csv) {
    const csvAlterado = csv.replaceAll("\"", "")
        .replaceAll("Dia ", "")
        .replaceAll("Janeiro", "01")
        .replaceAll("Fevereiro", "02")
        .replaceAll("Março", "03")
        .replaceAll("Abril", "04")
        .replaceAll("Maio", "05")
        .replaceAll("Junho", "06")
        .replaceAll("Julho", "07")
        .replaceAll("Agosto", "08")
        .replaceAll("Setembro", "09")
        .replaceAll("Outubro", "10")
        .replaceAll("Novembro", "11")
        .replaceAll("Dezembro", "12")

    const csvRows = csvAlterado.split(",");
    csv = csv.split(",");
    let dias = []
  
    for (let indice = 0, max = csvRows.length; indice < max; indice++) {
        if (csvRows[indice].trim() === "") continue
      
        const divisao = csvRows[indice].split("-");
        const dataPorExtenso = divisao[0].trim().replaceAll(" de ", "/");

        const momento = moment(dataPorExtenso, "DD/MM/YYYY", "pt-br");

        if (dias.length === 0 && divisao.length > 1 || (divisao.length > 1 && dias.length > 0 && dias[dias.length - 1].title !== divisao[1].trim())) {            
            dias.push({
                id: obterId(indice),
                title: divisao[1].trim(),
                description: csv[indice].trim().replaceAll("\"", ""),
                dataPorExtenso: dataPorExtenso,
                start: momento.format("YYYY-MM-DD")
            });
        }
    }

    return dias;
}

function obterId(indice) {
    let id = ""
    if (indice < alfabeto.length) {
        id = alfabeto[indice]
    } else {
        const primeiraLetra = alfabeto[Math.floor(indice / alfabeto.length) - 1]
        const segundaLetra = alfabeto[indice % alfabeto.length]
        id = primeiraLetra + segundaLetra
    }

    return id
}