// Data dummy untuk grafik
const reservationData = [5, 10, 15, 12, 8, 7]; // Jumlah reservasi tiap bulan
const earningsData = [10000000, 15000000, 12000000, 18000000, 20000000, 17000000]; // Pendapatan dalam rupiah

// Membuat grafik menggunakan Chart.js
const reservationsChart = new Chart(document.getElementById('reservationsChart'), {
    type: 'line',
    data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
        datasets: [{
            label: 'Reservasi',
            data: reservationData,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
    }
});

const earningsChart = new Chart(document.getElementById('earningsChart'), {
    type: 'bar',
    data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
        datasets: [{
            label: 'Pendapatan (Rp)',
            data: earningsData,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
    }
});

// Mengambil waktu lokal menggunakan World Time API dengan HTTPS
fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta')
    .then(response => {
        console.log('Response:', response); // Logging respons API
        return response.json(); // Parsing respons ke format JSON
    })
    .then(data => {
        console.log('Data waktu:', data); // Logging data waktu dari API
        // Format dan tampilkan waktu lokal di halaman
        const formattedDate = new Date(data.datetime).toLocaleString();
        document.getElementById('timeDisplay').textContent = 'Waktu Lokal: ' + formattedDate;
    })
    .catch(error => {
        console.error('Error:', error); // Logging jika ada error
    });
    // 
    document.getElementById('menuToggle').addEventListener('click', function () {
        const menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
    });