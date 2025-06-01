// https://docs.google.com/spreadsheets/d/1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k/edit?usp=sharing

const sheetId = "1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k"
const sheetName = "referencia"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

async function obterDados() {
  const resposta = await fetch(sheetURL)
  const csvText = await resposta.text()
  const valores = await handleResponse(csvText)

  console.log(valores)
}

async function handleResponse(csvText) {
  console.log(csvText)
  let sheetObjects = await csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  console.log(sheetObjects);
  // ADD CODE HERE
}

async function csvToObjects(csv) {
  const csvRows = csv.split("\n");

  console.log("Valores quebrados \n\n")
  console.log(csvRows)

  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
    }
    objects.push(thisObject);
  }
  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}

obterDados()