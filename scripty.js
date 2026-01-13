// Utility: buat elemen DOM
function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  Object.assign(e, props);
  children.forEach(child => e.appendChild(child));
  return e;
}

// Toggle header input
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[name="headerType"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const isText = document.getElementById('headerText').checked;
      document.getElementById('textHeaderGroup').style.display = isText ? 'block' : 'none';
      document.getElementById('logoHeaderGroup').style.display = isText ? 'none' : 'block';
    });
  });

  // Isi awal
  addSection('Makanan Utama', 'makanan-utama');
  addSection('Minuman Segar', 'minuman');
  addExtraImage('bg-pattern.png');
  addExtraImage('divider-floral.png');
});

// --- SECTIONS (KATEGORI + MENU ITEM) ---
function addMenuItemInSection(sectionDiv) {
  const itemsContainer = sectionDiv.querySelector('.menu-items');
  const itemDiv = el('div', { className: 'menu-item' }, [
    el('input', { type: 'text', placeholder: 'Nama Menu' }),
    el('textarea', { placeholder: 'Deskripsi' }),
    el('input', { type: 'text', placeholder: 'Nama File Gambar (di /img/)' }),
    el('input', { type: 'number', placeholder: 'Harga (angka saja)', min: '0' }),
    el('button', {
      className: 'btn-remove',
      textContent: '×',
      onclick: () => itemsContainer.removeChild(itemDiv)
    })
  ]);
  itemsContainer.appendChild(itemDiv);
}

function addSection(name = '', id = '') {
  const container = document.getElementById('sectionsContainer');
  const autoId = id || (name ? name.toLowerCase().replace(/\s+/g, '-') : 'section-' + Date.now());

  const sectionDiv = el('div', { className: 'section-block' }, [
    el('strong', { textContent: 'Kategori' }),
    el('input', {
      type: 'text',
      placeholder: 'ID unik (misal: makanan-utama)',
      value: autoId,
      style: 'margin-top: 6px; width: 100%;'
    }),
    el('input', {
      type: 'text',
      placeholder: 'Nama Kategori (ditampilkan)',
      value: name,
      style: 'margin-top: 6px; width: 100%;'
    }),

    el('div', { className: 'menu-items', style: 'margin: 16px 0;' }),

    el('div', { className: 'array-controls' }, [
      el('button', {
        type: 'button',
        className: 'btn',
        style: 'padding: 6px 12px; font-size: 14px; margin-right: 8px;',
        textContent: '+ Tambah Menu',
        onclick: () => addMenuItemInSection(sectionDiv)
      }),
      el('button', {
        type: 'button',
        className: 'btn-remove',
        style: 'float: none; background: #e67e22;',
        textContent: '× Hapus Kategori',
        onclick: () => container.removeChild(sectionDiv)
      })
    ])
  ]);

  container.appendChild(sectionDiv);

  // Isi contoh menu jika kategori default
  if (name === 'Makanan Utama') {
    const item = el('div', { className: 'menu-item' }, [
      el('input', { type: 'text', value: 'Nasi Goreng Spesial' }),
      el('textarea', { innerText: 'Nasi goreng dengan telur, ayam, udang, dan sayuran segar.' }),
      el('input', { type: 'text', value: 'nasi-goreng.jpg' }),
      el('input', { type: 'number', value: '25000' }),
      el('button', {
        className: 'btn-remove',
        textContent: '×',
        onclick: () => sectionDiv.querySelector('.menu-items').removeChild(item)
      })
    ]);
    sectionDiv.querySelector('.menu-items').appendChild(item);
  } else if (name === 'Minuman Segar') {
    const item = el('div', { className: 'menu-item' }, [
      el('input', { type: 'text', value: 'Es Teh Manis' }),
      el('textarea', { innerText: 'Teh manis dingin yang menyegarkan tenggorokan.' }),
      el('input', { type: 'text', value: 'es-teh.jpg' }),
      el('input', { type: 'number', value: '5000' }),
      el('button', {
        className: 'btn-remove',
        textContent: '×',
        onclick: () => sectionDiv.querySelector('.menu-items').removeChild(item)
      })
    ]);
    sectionDiv.querySelector('.menu-items').appendChild(item);
  }
}

// --- EXTRA IMAGES ---
function addExtraImage(filename = '') {
  const container = document.getElementById('extraImagesContainer');
  const itemDiv = el('div', { style: 'margin: 8px 0;' }, [
    el('input', {
      type: 'text',
      placeholder: 'Nama file gambar (di /img/)',
      value: filename,
      style: 'width: calc(100% - 40px);'
    }),
    el('button', {
      className: 'btn-remove',
      textContent: '×',
      style: 'float: none; margin-left: 8px;',
      onclick: () => container.removeChild(itemDiv)
    })
  ]);
  container.appendChild(itemDiv);
}

// --- GENERATE CONFIG ---
function generateConfig() {
  // Header
  const headerType = document.querySelector('input[name="headerType"]:checked').value;
  const header = headerType === 'text'
    ? { type: 'text', text: document.getElementById('headerTextValue').value.trim(), logoFilename: '' }
    : { type: 'logo', text: '', logoFilename: document.getElementById('headerLogoFile').value.trim() };

  // Tagline
  const tagline = document.getElementById('tagline').value.trim();

  // Sections
  const sections = Array.from(document.querySelectorAll('#sectionsContainer .section-block')).map(sectionDiv => {
    const inputs = sectionDiv.querySelectorAll('input');
    const id = inputs[0].value.trim() || 'section-' + Date.now();
    const name = inputs[1].value.trim() || 'Tanpa Nama';

    const items = Array.from(sectionDiv.querySelectorAll('.menu-items .menu-item')).map(itemDiv => {
      const [nameInp, descInp, imgInp, priceInp] = itemDiv.querySelectorAll('input, textarea');
      return {
        id: nameInp.value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        name: nameInp.value.trim(),
        description: descInp.value.trim(),
        imageFilename: imgInp.value.trim(),
        price: Number(priceInp.value) || 0
      };
    });

    return { id, name, items };
  });

  // Extra Images
  const extraImages = Array.from(document.querySelectorAll('#extraImagesContainer input'))
    .map(inp => inp.value.trim())
    .filter(v => v !== '');

  // Contact
  const contact = {
    address: document.getElementById('address').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.trim()
  };

  // Social Media
  const socialMedia = {
    instagram: document.getElementById('ig').value.trim(),
    facebook: document.getElementById('fb').value.trim(),
    youtube: document.getElementById('yt').value.trim(),
    twitter: document.getElementById('tw').value.trim()
  };

  // Build config
  const config = {
    header,
    tagline,
    sections,
    extraImages,
    contact,
    socialMedia
  };

  // Generate & download
  const jsContent = `const restaurantConfig = ${JSON.stringify(config, null, 2)};`;
  const blob = new Blob([jsContent], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}