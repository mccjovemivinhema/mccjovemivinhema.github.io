console.log("hello world")

// https://docs.google.com/spreadsheets/d/1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k/edit?usp=sharing

const sheetId = "1oLSDoPsxTmbXAaohCnrc14ngVLursBJoEpezFsk9s9k"
const sheetName = "referencia"
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
  .then((response) => {
    console.log(response)
    const valor =  response.text()
    console.log(valor)
})
.then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
    console.log(csvText)
  let sheetObjects = csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  console.log(sheetObjects);
  // ADD CODE HERE
}

function csvToObjects(csv) {
  const csvRows = csv.split("\n");
  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
      // BELOW 4 LINES WILL CONVERT DATES IN THE "ENROLLED" COLUMN TO JS DATE OBJECTS
      // if (propertyNames[j] === "Enrolled") {
      //   thisObject[propertyNames[j]] = new Date(row[j]);
      // } else {
      //   thisObject[propertyNames[j]] = row[j];
      // }
    }
    objects.push(thisObject);
  }
  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}
