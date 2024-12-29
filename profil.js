// Fungsi untuk Membuka Modal Edit Profil
function openEditProfileModal() {
    document.getElementById("edit-profile-modal").classList.remove("hidden");

    // Isi data di modal dengan data profil saat ini
    document.getElementById("edit-name").value = document.getElementById("profile-name").innerText;
    document.getElementById("edit-email").value = document.getElementById("profile-email").innerText;
    document.getElementById("edit-phone").value = document.getElementById("profile-phone").innerText;
}

// Fungsi untuk Menutup Modal Edit Profil
function closeEditProfileModal() {
    document.getElementById("edit-profile-modal").classList.add("hidden");
}

// Fungsi untuk Menyimpan Perubahan Profil
document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari input form
    const newName = document.getElementById("edit-name").value;
    const newEmail = document.getElementById("edit-email").value;
    const newPhone = document.getElementById("edit-phone").value;

    // Perbarui data profil di halaman
    document.getElementById("profile-name").innerText = newName;
    document.getElementById("profile-email").innerText = newEmail;
    document.getElementById("profile-phone").innerText = newPhone;

    // Tutup modal
    closeEditProfileModal();
});

document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
});