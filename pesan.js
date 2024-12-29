// Data pemesanan simulasi
const bookings = [
    {
        guestName: "Supri",
        checkinDate: "2024-11-15",
        checkoutDate: "2024-11-18",
        status: "Dikonfirmasi"
    },
    {
        guestName: "Ari",
        checkinDate: "2024-11-19",
        checkoutDate: "2024-11-22",
        status: "Menunggu Konfirmasi"
    },
    {
        guestName: "Budi",
        checkinDate: "2024-12-01",
        checkoutDate: "2024-12-05",
        status: "Dikonfirmasi"
    }
];

// Fungsi untuk menampilkan daftar pemesanan di tabel
function displayBookings(bookingsToDisplay) {
    const bookingTable = document.getElementById('bookingTable');
    bookingTable.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data baru

    if (bookingsToDisplay.length === 0) {
        bookingTable.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-600">Tidak ada pemesanan yang ditemukan</td></tr>';
    } else {
        bookingsToDisplay.forEach(booking => {
            const row = document.createElement('tr');
            row.classList.add('border-b');

            row.innerHTML = `
                <td class="py-2 px-4">${booking.guestName}</td>
                <td class="py-2 px-4">${formatDate(booking.checkinDate)}</td>
                <td class="py-2 px-4">${formatDate(booking.checkoutDate)}</td>
                <td class="py-2 px-4 text-${booking.status === 'Dikonfirmasi' ? 'green' : 'yellow'}-500">${booking.status}</td>
                <td class="py-2 px-4">
                    <button onclick="showGuestDetails('${booking.guestName}')" class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Detail Tamu</button>
                    <button onclick="cancelBooking('${booking.guestName}')" class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 ml-2">Batalkan</button>
                </td>
            `;
            bookingTable.appendChild(row);
        });
    }
}

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Fungsi untuk memfilter pemesanan berdasarkan tanggal
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Silakan pilih tanggal mulai dan tanggal selesai.');
        return;
    }

    const filteredBookings = bookings.filter(booking => {
        return booking.checkinDate >= startDate && booking.checkoutDate <= endDate;
    });

    displayBookings(filteredBookings);
});

document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
});    

// Fungsi untuk menampilkan detail tamu di modal
function showGuestDetails(guestName) {
    const booking = bookings.find(b => b.guestName === guestName);
    const guestDetails = document.getElementById('guestDetails');
    guestDetails.innerHTML = `
        <p><strong>Nama Tamu:</strong> ${booking.guestName}</p>
        <p><strong>Tanggal Check-in:</strong> ${formatDate(booking.checkinDate)}</p>
        <p><strong>Tanggal Check-out:</strong> ${formatDate(booking.checkoutDate)}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
    `;

    document.getElementById('guestModal').classList.remove('hidden');
}

// Fungsi untuk menutup modal detail tamu
function closeGuestModal() {
    document.getElementById('guestModal').classList.add('hidden');
}

// Fungsi untuk membatalkan pemesanan
function cancelBooking(guestName) {
    const confirmed = confirm(`Apakah Anda yakin ingin membatalkan pemesanan untuk ${guestName}?`);
    if (confirmed) {
        const index = bookings.findIndex(b => b.guestName === guestName);
        if (index !== -1) {
            bookings.splice(index, 1);
            displayBookings(bookings); // Refresh daftar pemesanan
            alert('Pemesanan berhasil dibatalkan.');
        }
    }
}

// Tampilkan semua pemesanan saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    displayBookings(bookings);
});
