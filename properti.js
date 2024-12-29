// Inisialisasi LocalStorage jika belum ada
if (!localStorage.getItem('properties')) {
    localStorage.setItem('properties', JSON.stringify([]));
}
if (!localStorage.getItem('galleryImages')) {
    localStorage.setItem('galleryImages', JSON.stringify([]));
}

let editingPropertyId = null; // Untuk menyimpan ID properti yang sedang diedit

// Fungsi untuk menyimpan data properti ke LocalStorage
function savePropertyToLocalStorage(property) {
    let properties = JSON.parse(localStorage.getItem('properties'));
    
    if (editingPropertyId === null) {
        // Tambahkan properti baru
        property.id = Date.now(); // Buat ID unik menggunakan timestamp
        properties.push(property);
    } else {
        // Edit properti yang ada
        const index = properties.findIndex(p => p.id === editingPropertyId);
        properties[index] = { ...property, id: editingPropertyId }; // Update data
        editingPropertyId = null; // Reset ID editing
    }
    
    localStorage.setItem('properties', JSON.stringify(properties));
    displayProperties();
}

// Fungsi untuk menyimpan foto ke LocalStorage
function saveImageToLocalStorage(imageSrc) {
    let galleryImages = JSON.parse(localStorage.getItem('galleryImages'));
    galleryImages.push(imageSrc);
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    displayGalleryImages();
}

// Fungsi untuk menampilkan properti
function displayProperties() {
    const properties = JSON.parse(localStorage.getItem('properties'));
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = '';

    properties.forEach(property => {
        const li = document.createElement('li');
        li.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md');
        li.innerHTML = `
            <h3 class="text-lg font-bold">${property.title}</h3>
            <p>Lokasi: ${property.location}</p>
            <p>Harga: IDR ${property.price}</p>
            <p>Fasilitas: ${property.facilities}</p>
            <p>Deskripsi: ${property.description}</p>
            <button class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600" onclick="editProperty(${property.id})">Edit</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2" onclick="deleteProperty(${property.id})">Hapus</button>
        `;
        propertyList.appendChild(li);
    });
}

// Fungsi untuk menampilkan galeri foto
function displayGalleryImages() {
    const galleryImages = JSON.parse(localStorage.getItem('galleryImages'));
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    galleryImages.forEach((imageSrc, index) => {
        const div = document.createElement('div');
        div.classList.add('relative');
        div.innerHTML = `
            <img src="${imageSrc}" class="rounded-lg shadow-md w-full h-auto">
            <button class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg" onclick="deleteImage(${index})">Hapus</button>
        `;
        gallery.appendChild(div);
    });
}

// Fungsi untuk edit properti
function editProperty(id) {
    const properties = JSON.parse(localStorage.getItem('properties'));
    const property = properties.find(p => p.id === id);

    if (property) {
        // Isi ulang form dengan data properti yang akan diedit
        document.getElementById('title').value = property.title;
        document.getElementById('location').value = property.location;
        document.getElementById('price').value = property.price;
        document.getElementById('facilities').value = property.facilities;
        document.getElementById('description').value = property.description;

        editingPropertyId = id; // Simpan ID properti yang sedang diedit
    }
}

// Fungsi untuk hapus properti
function deleteProperty(id) {
    let properties = JSON.parse(localStorage.getItem('properties'));
    properties = properties.filter(property => property.id !== id);
    localStorage.setItem('properties', JSON.stringify(properties));
    displayProperties();
}

// Fungsi untuk hapus gambar
function deleteImage(index) {
    let galleryImages = JSON.parse(localStorage.getItem('galleryImages'));
    galleryImages.splice(index, 1); // Hapus gambar berdasarkan indeks
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    displayGalleryImages();
}

// Event Listener untuk submit form properti
document.getElementById('propertyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const property = {
        title: document.getElementById('title').value,
        location: document.getElementById('location').value,
        price: document.getElementById('price').value,
        facilities: document.getElementById('facilities').value,
        description: document.getElementById('description').value,
    };

    savePropertyToLocalStorage(property);

    // Reset form setelah disimpan
    document.getElementById('propertyForm').reset();
});

// Event Listener untuk unggah gambar
document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('photoUpload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveImageToLocalStorage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
});

// Tampilkan properti dan galeri saat halaman dimuat
window.addEventListener('DOMContentLoaded', function() {
    displayProperties();
    displayGalleryImages();
});
