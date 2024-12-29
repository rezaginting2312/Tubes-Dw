const messageTable = document.getElementById('messageTable');
        const newMessageModal = document.getElementById('newMessageModal');
        const chatModal = document.getElementById('chatModal');
        const chatMessages = document.getElementById('chatMessages');
        const chatGuestName = document.getElementById('chatGuestName');
        const newMessageForm = document.getElementById('newMessageForm');
        const replyMessage = document.getElementById('replyMessage');
        
        let conversations = JSON.parse(localStorage.getItem('conversations')) || {};

        // Fungsi untuk menyimpan percakapan ke LocalStorage
        function saveConversations() {
            localStorage.setItem('conversations', JSON.stringify(conversations));
        }

        // Fungsi untuk menutup modal pesan baru
        function closeNewMessageModal() {
            newMessageModal.classList.add('hidden');
        }

        // Fungsi untuk menutup modal percakapan
        function closeChatModal() {
            chatModal.classList.add('hidden');
        }

        // Fungsi untuk membuka percakapan
        function openChat(guestName) {
            chatGuestName.innerText = guestName;
            chatMessages.innerHTML = '';

            if (conversations[guestName]) {
                conversations[guestName].forEach(msg => {
                    chatMessages.innerHTML += `<div class="mb-2 p-2 ${msg.sender === 'pemilik' ? 'bg-blue-100 text-right rounded-lg' : 'bg-gray-100 text-left rounded-lg'}">${msg.message}</div>`;
                });
            }
            chatModal.classList.remove('hidden');
        }

        // Fungsi untuk mengirim pesan baru
        newMessageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const guestName = document.getElementById('guestName').value;
            const messageText = document.getElementById('messageText').value;
            const currentDate = new Date().toLocaleDateString();

            if (!conversations[guestName]) {
                conversations[guestName] = [];
                messageTable.innerHTML += `
                    <tr class="border-b">
                        <td class="py-2 px-4">${guestName}</td>
                        <td class="py-2 px-4">${messageText}</td>
                        <td class="py-2 px-4">${currentDate}</td>
                        <td class="py-2 px-4">
                            <button onclick="openChat('${guestName}')" class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Lihat Percakapan</button>
                        </td>
                    </tr>`;
            }

            conversations[guestName].push({ sender: 'pemilik', message: messageText });
            saveConversations(); // Simpan ke LocalStorage
            closeNewMessageModal();
        });

        // Fungsi untuk mengirim balasan
        function sendReply() {
            const guestName = chatGuestName.innerText;
            const replyText = replyMessage.value;

            if (replyText.trim() !== '') {
                conversations[guestName].push({ sender: 'pemilik', message: replyText });
                chatMessages.innerHTML += `<div class="mb-2 p-2 bg-blue-100 text-right rounded-lg">${replyText}</div>`;
                replyMessage.value = '';
                saveConversations(); // Simpan ke LocalStorage
            }
        }

        // Fungsi untuk membuka modal pesan baru
        document.getElementById('newMessageBtn').addEventListener('click', function() {
            newMessageModal.classList.remove('hidden');
        });

        // Render ulang tabel percakapan setelah refresh
        function renderMessageTable() {
            for (let guest in conversations) {
                const lastMessage = conversations[guest][conversations[guest].length - 1].message;
                const currentDate = new Date().toLocaleDateString();

                messageTable.innerHTML += `
                    <tr class="border-b">
                        <td class="py-2 px-4">${guest}</td>
                        <td class="py-2 px-4">${lastMessage}</td>
                        <td class="py-2 px-4">${currentDate}</td>
                        <td class="py-2 px-4">
                            <button onclick="openChat('${guest}')" class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Lihat Percakapan</button>
                        </td>
                    </tr>`;
            }
        }

        document.getElementById('menuToggle').addEventListener('click', function () {
            const menu = document.getElementById('menu');
            menu.classList.toggle('hidden');
        });
        
        // Panggil fungsi render saat halaman dimuat
        window.onload = renderMessageTable;