document.getElementById("loadBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Silakan pilih file CSV terlebih dahulu!");
    return;
  }

  Papa.parse(file, {
    complete: function (results) {
      const data = results.data;
      if (!data || data.length === 0) {
        alert("File kosong atau tidak terbaca.");
        return;
      }

      // Bersihkan baris kosong dari CSV
      const cleanData = data.filter(row => row.some(cell => cell.trim() !== ""));

      // Pastikan baris pertama berisi header
      const headers = cleanData[0];
      const firstCell = headers[0].trim().toUpperCase();

      if (firstCell !== "WELL" && firstCell !== "A" && firstCell !== "1") {
        alert("File tidak sesuai format microplate (baris harus dimulai dengan Well, A, B, C, dst).");
        return;
      }

      renderTable(cleanData);
    },
    error: function (err) {
      alert("Terjadi kesalahan saat membaca file: " + err.message);
    }
  });
});

function renderTable(data) {
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  data.forEach((row, i) => {
    const tr = document.createElement("tr");

    row.forEach(cell => {
      const td = document.createElement(i === 0 ? "th" : "td");
      td.textContent = cell;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
