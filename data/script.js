// retornar os dias mais o nome da coluna
// Coluna 28 - 28%6 = 2
// Então nome da coluna vai ser ZB, porque Z é a letra 26 e B é a letra 2

const sheetId = "1xEJLr4pbsElLjyDSBz0nqaKmpOuyYXyBm2KE0-B1ELQ"
const sheetName = "tab"
// const dia = 'Dia 27 de Julho de 2025 - Escola Vivencial conduzido pelo Lucas Tobias e Taynara'
// const sqlQuery = encodeURIComponent(`SELECT '${dia}', SUM(B) WHERE D = true GROUP BY '${dia}' pivot A`)
// const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${sqlQuery}`;
// console.log(sheetURL)
// const listaIndicacoes = item.indicacoes.split(";")

const sqlQuery = encodeURIComponent(`SELECT * WHERE A = 'Cursilhistas'`)
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&tq=${sqlQuery}`;


async function obterDados() {
    const resposta = await fetch(sheetURL)
    const csvText = await resposta.text()
    return await tratarRequisicaoDias(csvText)
}

const botaoAbrirModal = document.getElementById('abrirModal')
const atividadeTitulo = document.querySelector('.atividade-titulo')

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


async function tratarRequisicaoDias(csvText) {
    const objetos = await csvToObjects(csvText);
  
    return objetos
}

function abrirModal(info) {
    atividadeTitulo.textContent = info.event.title
    botaoAbrirModal.click()
}

async function csvToObjects(csv) {
    csv = csv.replaceAll("\"", "")
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

    const csvRows = csv.split(",");
    let dias = []
  
    for (let indice = 0, max = csvRows.length; indice < max; indice++) {
        if (csvRows[indice].trim() === "") continue
      
        const divisao = csvRows[indice].split("-");
        const dataPorExtenso = divisao[0].trim().replaceAll(" de ", "/");

        const momento = moment(dataPorExtenso, "DD/MM/YYYY", "pt-br");

        if (dias.length === 0 && divisao.length > 1 || (divisao.length > 1 && dias.length > 0 && dias[dias.length - 1].title !== divisao[1].trim())) {            
            dias.push({
                id: indice,
                title: divisao[1].trim(),
                start: momento.format("YYYY-MM-DD")
            });
        }
    }

    return dias;
}