document.getElementById('loadBtn').addEventListener('click', function () {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    alert('Pilih file CSV terlebih dahulu.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.trim().split(/\r?\n/).map(r => r.split(/[,;\t]+/));

    // Pastikan format benar
    if (!rows[0][0].toLowerCase().includes('well')) {
      alert('Format CSV tidak valid (kolom pertama harus berisi "Well").');
      return;
    }

    const headers = rows[0].slice(1, 13); // 1–12
    const dataRows = rows.slice(1, 9); // A–H

    const plate = document.getElementById('plateContainer');
    plate.innerHTML = '';

    // Tambahkan baris label atas (1–12)
    plate.appendChild(document.createElement('div')); // kotak kosong di kiri atas
    headers.forEach(num => {
      const div = document.createElement('div');
      div.className = 'label';
      div.textContent = num.trim();
      plate.appendChild(div);
    });

    // Tambahkan isi plate
    dataRows.forEach(row => {
      const rowLabel = row[0].trim();
      const divLabel = document.createElement('div');
      divLabel.className = 'label';
      divLabel.textContent = rowLabel;
      plate.appendChild(divLabel);

      row.slice(1, 13).forEach(value => {
        const div = document.createElement('div');
        div.className = 'well value';
        div.textContent = value.trim();
        plate.appendChild(div);
      });
    });
  };

  reader.readAsText(file);
});
