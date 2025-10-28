document.getElementById('loadBtn').addEventListener('click', function () {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Silakan pilih file CSV terlebih dahulu.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.trim().split(/\r?\n/).map(r => r.split(/[,;\t]+/));
    
    // Validasi header (harus ada "Well" di kolom pertama)
    if (!rows[0][0].toLowerCase().includes('well')) {
      alert('File tidak sesuai format microplate (kolom pertama harus berisi "Well").');
      return;
    }

    // Ambil header
    const headers = rows[0];
    const dataRows = rows.slice(1);

    // Render tabel
    const table = document.getElementById('dataTable');
    table.innerHTML = '';

    // Buat header tabel
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h.trim();
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Buat body tabel
    const tbody = document.createElement('tbody');
    dataRows.forEach(row => {
      if (row.length > 1 && row[0].trim() !== '') {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell.trim();
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
    });
    table.appendChild(tbody);
  };

  reader.readAsText(file);
});
