const apiUrl = "http://localhost:8000/api/";

async function get(url) {
  return (await axios.get(url)).data;
}

async function post(url, body) {
  return (
    await axios.post(url, JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}

// Încarcă lista în tabel
async function loadTable() {
  let data = await get(apiUrl + "getList");
  let tableDiv = document.getElementById("tableData");

  if (!data || !tableDiv) return;

  let html = `<table border="1"><tr><th>ID</th><th>Nume</th><th>Vârstă</th></tr>`;
  for (let item of data) {
    html += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.age}</td></tr>`;
  }
  html += "</table>";

  tableDiv.innerHTML = html;
}

// Trimite date noi
async function sendData() {
  let name = document.getElementById("inputName").value;
  let age = document.getElementById("inputAge").value;

  if (!name || !age) {
    alert("Completează nume și vârstă!");
    return;
  }

  await post(apiUrl + "postList", { name, age });
  await loadTable();
}

// Caută o persoană după ID
async function getById() {
  let id = document.getElementById("inputId").value;
  if (!id) {
    alert("Introdu un ID!");
    return;
  }

  let data = await get(apiUrl + "getList");
  let person = data.find((p) => p.id == id);
  let resultDiv = document.getElementById("result");

  if (person) {
    resultDiv.innerHTML = `<p><strong>Rezultat:</strong> ${person.name}, ${person.age} ani</p>`;
  } else {
    resultDiv.innerHTML = `<p style="color:red;">Persoana cu ID ${id} nu există!</p>`;
  }
}

loadTable();
