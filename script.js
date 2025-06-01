// https://docs.google.com/spreadsheets/d/1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k/edit?usp=sharing

const sheetId = "1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k"
const sheetName = "referencia"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

async function obterDados() {
  const resposta = await fetch(sheetURL)
  const csvText = await resposta.text()
  const valores = await handleResponse(csvText)
  console.log(valores)

//   const valores = `"Dia 23 de março de 2025 - Escola Vivencial","Dia 24 de março de 2025 - Organização decoração espiritualidade","Dia 25 de março de 2025 - Terço","Dia 26 de março de 2025 - organização decoração espiritualidade","Dia 30 de março - Espiritualidade","Dia 01 de Abril 2025 - Terço Semanal","Dia 06 de Abrirl de 2025 - Ajudaram Almoço da APAE","Dia 06 de Abril de 2025 - 1º dia Novena 20º cursilho","Dia 08 de Abril de 2025 - 2º dia Novena 20º cursilho","Dia 10 de Abril de 2025 - 3º dia Novena 20º cursilho","Dia 13 de Abril de 2025 - 4º dia Novena 20º cursilho","Dia 15 de Abril de 2025 - 5º dia Novena 20º cursilho","Dia 16 de Abril de 2025 - organizar os doces para páscoa solidário","Dia 16 de Abril de 2025 - venda das velas procissão","Dia 18 de Abril de 2025 - via sacra","Dia 21 de Abril de 2025 - Entrega doces páscoa solidária","Dia 22 de Abril de 2025 - 6º dia Novena 20º cursilho","Dia 23 de Abril de 2025 - 7º dia Novena 20º cursilho","Dia 25 de Abril de 2025 - 8º dia Novena 20º cursilho","Dia 26 de Abril de 2025 - descascar doação mandioca ","Dia 26 de Abril de 2025 - Reunião com os pais","Dia 27 de Abril de 2025 - organizar decoração pré-cursilho","Dia 27 de Abril de 2025 - pré-cursilho","Dia 29 de Abril de 2025 - Terço Semanal","Dia 02 de Maio de 2025 - Terço dos homens","Dia 05 de Maio de 2025 - Apresentação cursilhistas cursilho adulto","Dia 09 de Maio de 2025 - participou Terço dos homens","Dia 17 de Maio de 2025 - Ensaio para Coroação","Dia 18 de Maio de 2025 - Organizar decoração pós cursilho","Dia 18 de Maio de 2025 - Missa Mensal","Dia 18 de Maio de 2025 - Pós Cursilho","Dia 20 de Maio de 2025 - Terço Semanal","Dia 23 de Maio de 2025 - Ensaio para coroação","Dia 25 de Maio de 2025 - Escola Vivencial","Dia 26 de Maio de 2025 - Terço Cursilho Adulto","Dia 27 de Maio de 2025 - Terço Semanal","Dia 30 de Maio de 2025 - Ensaio Coroação","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Camila Miliati","","Camila Miliati","","","Camila Isadora","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Camila Miliati","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Isadora Viana","Daiane Nogueira","Camila Miliati","Isadora Viana","Isabela Moreno","Camila Isadora","Isadora Viana","Cleide","Lucas Severo","Alisson Schollemberg","Nicolas Bruno","Lucas Severo","Alisson Schollemberg","Bruna Miliati","Nicolas Bruno","Jaqueline Barrientos","Bruna Miliati","Nicolas Bruno","Isadora Viana","Bruna Miliati","Gabriel Reginato","Alisson Schollemberg","Nicolas Bruno","Bruna Miliati","Luis Gustavo Tokunaga","Jefferson Pedroso","Jaqueline Barrientos","Kleverson Marques","Cleide","Nicolas Rodrigues","Luis Gustavo Tokunaga","Nicolas Bruno","Nicolas Bruno","Wyldem Barg Veríssimo","Luis Gustavo Tokunaga","Melrrayne Buzzo","Naana Rodrigues","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Isadora Viana","Carolina Mendonça","Nicolas Bruno","Lucas Tobias","Cleide","Yuri Cardoso","Alisson Schollemberg","Luis Gustavo Tokunaga","Cleide","Ronnie Peterson","Alisson Schollemberg","Nicolas Bruno","Daniel Crestani","Daiane Nogueira","Daniel Crestani","Nicolas Bruno","Nicolas Bruno","Arlindo Júnior","Alisson Schollemberg","Camila Miliati","Jaqueline Barrientos","Camila Miliati","Adriana e Vinicius","Pâmila Lima","Polyana Fialho","Wyldem Barg Veríssimo","Cleide","Nicolas Bruno","Kleverson Marques","Bruno Zanesco","Kleverson Marques","Alex Sandro","Kleverson Marques","Pablo Magri","Gabriel Reginato","Felipe (Angélica)","Alex Sandro","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Arlindo Júnior","Alisson Schollemberg","Camila Isadora","Luiz Gustavo Antônio da Silva","Ronnie Peterson","Isabela Machado","Cleide","Polyana Fialho","Jaqueline Barrientos","Kleverson Marques","Kleverson Marques","Pâmila Lima","Arlindo Júnior","","Bruna Miliati","Arlindo Júnior","Lucas Lima","Mario Vissossi","Cleide","Nicolas Bruno","Cleide","Bruna Miliati","Pâmila Lima","Karina Pedro","Nicolas Bruno","Diego dos Santos","Carolina Mendonça","Alex Sandro","Isadora Viana","Wyldem Barg Veríssimo","Nicolas Bruno","Pâmila Lima","Alisson Schollemberg","Alex Sandro","Alisson Schollemberg","Mario Vissossi","Jefferson Pedroso","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Arlindo Júnior","Camila Miliati","Bruna Miliati","Camila Miliati","João Vitor Reginato","Bruna Miliati","Jaqueline Barrientos","Nicolas Bruno","Kleverson Marques","Isadora Viana","Isadora Viana","Mario Vissossi","Karina Pedro","","Juliana Fernandes","Mario Vissossi","Jaqueline Barrientos","Jaqueline Barrientos","Nicolas Bruno","Kleverson Marques","João Vitor Reginato","Nicolas Bruno","Bruna Miliati","Mario Vissossi","Cleide","Naana Rodrigues","Nicolas Bruno","Bruna Miliati","Isabela Machado","Eloísa Fernandes","João Vitor Reginato","Mario Vissossi","Pâmila Lima","Bruno Zanesco","Daiane Nogueira","Clistoph dos Santos","Nicolas Bruno","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Pâmila Lima","Bruna Miliati","Pâmila Lima","Nicolas Bruno","Janaina Dias","Pâmila Lima","","Lucas Tobias","Arlindo Júnior","Jaqueline Barrientos","Bruna Miliati","Arlindo Júnior","Isadora Viana","","Pâmila Lima","Isadora Viana","Luis Gustavo Tokunaga","Kleverson Marques","Bruna Miliati","Lucas Severo","Kleverson Marques","Polyana Fialho","Mario Vissossi","Daiane Nogueira","Kleverson Marques","Lucas Severo","Luis Gustavo Tokunaga","Wyldem Barg Veríssimo","Yuri Cardoso","Alex Sandro","Isabela Moreno","Luis Gustavo Tokunaga","Bruna Miliati","Luis Gustavo Tokunaga","","Arlindo Júnior","Nicolas Rodrigues","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Isabela Moreno","Mario Vissossi","Isadora Viana","Arlindo Júnior","Nicolas Bruno","Luiz Gustavo Antônio da Silva","","Luiz Gustavo Antônio da Silva","Nicolas Bruno","Arlindo Júnior","Camila Miliati","Jaqueline Barrientos","Carol Mezzari","","Isadora Viana","Carolina Mendonça","Karina Pedro","Alisson Schollemberg","Camila Miliati","","Alisson Schollemberg","Mario Vissossi","Camila Miliati","Alisson Schollemberg","Daiane Nogueira","Nicolas Bruno","Gabriel Reginato","Jefferson Pedroso","Bruna Miliati","Yuri Cardoso","Ronnie Peterson","Karina Pedro","Jefferson Pedroso","Felipe (Angélica)","","Antônio Rodrigues","Wyldem Barg Veríssimo","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Yuri Cardoso","Nicolas Bruno","Cleide","Pâmila Lima","Giovana Santos","Camila Miliati","","Alisson Schollemberg","Pâmila Lima","Mario Vissossi","Daiane Nogueira","Daiane Nogueira","Carolina Mendonça","","Arlindo Júnior","Karina Pedro","Isadora Viana","Carolina Mendonça","Lucas Severo","","Polyana Fialho","Jaqueline Barrientos","Daiane Nogueira","Isadora Viana","","Melrrayne Buzzo","Pablo Magri","Naana Rodrigues","Camila Miliati","Jean","Camila Miliati","Arlindo Júnior","Alex Sandro","Isadora Viana","","Paulo Tavares","Bruna Miliati","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Isabela Machado","Kleverson Marques","Alisson Schollemberg","Mario Vissossi","Lucas Tobias","Jaqueline Barrientos","","Lucas Severo","Bruna Miliati","Bianca Trevisan","Jaqueline Barrientos","Kleverson Marques","Kleverson Marques","","Carolina Mendonça","Kleverson Marques","Alisson Schollemberg","Lucas Lima","","","Mario Vissossi","Isadora Viana","Isadora Viana","Camila Isadora","","Carolina Mendonça","Bruno Leal Colzani","Lucas Severo","Lucas Severo","Wyldem Barg Veríssimo","Isadora Viana","João Vitor Reginato","Wyldem Barg Veríssimo","Nicolas Bruno","","Eloísa Fernandes","Pâmila Lima","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Lucas Severo","Bianca Trevisan","Daiane Nogueira","Lucas Severo","Alisson Schollemberg","Lucas Severo","","Gabriel Reginato","Luiz Gustavo Antônio da Silva","Lucas Lima","Cleide","Bruna Miliati","Nicolas Bruno","","Alisson Schollemberg","Lucas Tobias","Lucas Severo","Lucas Severo","","","Bruna Miliati","Lucas Severo","Cleide","Kleverson Marques","","Luis Gustavo Tokunaga","Jefferson Pedroso","","","Bruno Leal Colzani","Isabela Machado","Gabriel Reginato","João Vitor Reginato","João Vitor Reginato","","Jefferson Pedroso","Alisson Schollemberg","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Cleide","Jaqueline Barrientos","Jaqueline Barrientos","Kleverson Marques","Juliana Fernandes","Nicolas Bruno","","Mario Vissossi","Camila Isadora","","Daniel Crestani","Isadora Viana","Pâmila Lima","","Jaqueline Barrientos","Pâmila Lima","Arlindo Júnior","","","","Nicolas Bruno","","Ronnie Peterson","Cleide","","Pâmila Lima","","","","Melrrayne Buzzo","Pâmila Lima","Naana Rodrigues","Gabriel Reginato","Gabriel Reginato","","Bruno Zanesco","Gabriel Reginato","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Mario Vissossi","Karina Pedro","Lucas Severo","Carolina Mendonça","Arlindo Júnior","Kleverson Marques","","Kleverson Marques","Yuri Cardoso","","Lucas Severo","Alisson Schollemberg","Polyana Fialho","","Kleverson Marques","Lucas Severo","Mario Vissossi","","","","Camila Miliati","","Jaqueline Barrientos","Jaqueline Barrientos","","Bruna Miliati","","","","Felipe (Angélica)","Bruna Miliati","Daiane Nogueira","Daiane Nogueira","Luana Brajato","","Jaqueline Barrientos","João Vitor Reginato","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Nicolas Bruno","Luiz Gustavo Antônio da Silva","Lucas Tobias","Daiane Nogueira","Daniel Crestani","","","Daiane Nogueira","Isabela Machado","","","Gabriel Reginato","Jaqueline Barrientos","","Cleide","Alisson Schollemberg","Yuri Cardoso","","","","Arlindo Júnior","","Gabriel Reginato","Polyana Fialho","","Cleide","","","","","Daiane Nogueira","Jefferson Pedroso","Cleide","Alisson Schollemberg","","Bruno Zanesco","Kleverson Marques","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Gabriel Reginato","Gabriel Reginato","Adriana e Vinicius","Karina Pedro","Pâmila Lima","","","Jaqueline Barrientos","Gabriel Reginato","","","João Vitor Reginato","Lucas Tobias","","Mario Vissossi","Adriana e Vinicius","Isabela Machado","","","","","","João Vitor Reginato","João Vitor Reginato","","Alisson Schollemberg","","","","","Bruno Zanesco","Yuri Cardoso","Polyana Fialho","Jaqueline Barrientos","","Isadora Viana","Cleide","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Daniel Crestani","","Gabriel Reginato","Jaqueline Barrientos","Kleverson Marques","","","Pâmila Lima","Mario Vissossi","","","Carolina Mendonça","Lucas Severo","","Daiane Nogueira","Camila Miliati","","","","","","","Luis Gustavo Tokunaga","Nicolas Bruno","","Mario Vissossi","","","","","Bruno Leal Colzani","Jaqueline Barrientos","Nicolas Rodrigues","Melrrayne Buzzo","","Luis Gustavo Tokunaga","Isadora Viana","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Luis Gustavo Tokunaga","","João Vitor Reginato","Alisson Schollemberg","Karina Pedro","","","Bruna Miliati","Antônio Rodrigues","","","","","","Lucas Severo","Bruna Miliati","","","","","","","Lucas Tobias","Gabriel Reginato","","Arlindo Júnior","","","","","Nicolas Rodrigues","Melrrayne Buzzo","Karina Pedro","Cleide","","Camila Miliati","Arlindo Júnior","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Kleverson Marques","","Kleverson Marques","Gabriel Reginato","João Pedro","","","Susana","Paulo Tavares","","","","","","Janaina Dias","","","","","","","","Kleverson Marques","Yuri Cardoso","","Kleverson Marques","","","","","Melrrayne Buzzo","Alisson Schollemberg","Mario Vissossi","Arlindo Júnior","","Nicolas Bruno","Lucas Severo","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Jaqueline Barrientos","","Luana Brajato","","Camila Isadora","","","Isadora Viana","Daiane Nogueira","","","","","","","","","","","","","","Isabela Machado","Lucas Severo","","Daiane Nogueira","","","","","Diego dos Santos","Kleverson Marques","Isadora Viana","Pâmila Lima","","","Mario Vissossi","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Daiane Nogueira","","Karina Pedro","","Lucas Severo","","","Arlindo Júnior","Alisson Schollemberg","","","","","","","","","","","","","","Luana Brajato","","","Jaqueline Barrientos","","","","","Jefferson Pedroso","Clistoph dos Santos","Arlindo Júnior","Camila Miliati","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Alisson Schollemberg","","Isabela Machado","","Luiz Gustavo Antônio da Silva","","","","Isadora Viana","","","","","","","","","","","","","","Isabela Moreno","","","Felipe (Angélica)","","","","","Alex Sandro","Isadora Viana","Lucas Severo","Bruna Miliati","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Carolina Mendonça","","","","Mario Vissossi","","","","","","","","","","","","","","","","","","Yuri Cardoso","","","","","","","","Wyldem Barg Veríssimo","Cleide","Naana Rodrigues","Naana Rodrigues","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "Bruna Miliati","","","","Camila Miliati","","","","","","","","","","","","","","","","","","Camila Isadora","","","","","","","","Eloísa Fernandes","Felipe (Angélica)","","Nando Lourenço","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Carolina Mendonça","","","","","","","","","","","","","","","","","","Karina Pedro","","","","","","","","Felipe (Angélica)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Paulo Tavares","","","","","","","","","","","","","","","","","","Lucas Severo","","","","","","","","Karina Pedro","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Isadora Viana","","","","","","","","","","","","","","","","","","Alisson Schollemberg","","","","","","","","Yuri Cardoso","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Bianca Trevisan","","","","","","","","","","","","","","","","","","","","","","","","","","Alisson Schollemberg","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Isabela Machado","","","","","","","","","","","","","","","","","","","","","","","","","","Carolina Mendonça","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Antônio Rodrigues","","","","","","","","","","","","","","","","","","","","","","","","","","Gabriel Reginato","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Yuri Cardoso","","","","","","","","","","","","","","","","","","","","","","","","","","Polyana Fialho","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Luis Gustavo Tokunaga","","","","","","","","","","","","","","","","","","","","","","","","","","Lucas Tobias","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Polyana Fialho","","","","","","","","","","","","","","","","","","","","","","","","","","Cleide","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Daiane Nogueira","","","","","","","","","","","","","","","","","","","","","","","","","","Jaqueline Barrientos","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Gabriel Reginato","","","","","","","","","","","","","","","","","","","","","","","","","","Lucas Severo","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Adriana e Vinicius","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Bruna Miliati","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Jaqueline Barrientos","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Carol Mezzari","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
// "","","","","Kamilly Roa","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""`

//   await handleResponse(valores)
}

async function handleResponse(csvText) {
  let objetos = await csvToObjects(csvText);

  contagemPorPessoa = {}

  for (let objeto of objetos) {
    for (let presencas of Object.values(objeto)[0]) {
      if (contagemPorPessoa[presencas]) {
        contagemPorPessoa[presencas] = contagemPorPessoa[presencas] + 1
      } else {
        contagemPorPessoa[presencas] = 1
      }
    }
  }

  console.log(contagemPorPessoa)

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