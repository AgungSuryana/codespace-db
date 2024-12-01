const addUserForm = document.getElementById('addUserForm');
const userList = document.getElementById('userList');
const editUserForm = document.getElementById('editUserForm');
const editNoTelp = document.getElementById('editNoTelp');
const editNamaPelanggan = document.getElementById('editNamaPelanggan');
const editPassword = document.getElementById('editPassword');

// Menambahkan User
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const no_telp = document.getElementById('no_telp').value;
    const Nama_pelanggan = document.getElementById('Nama_pelanggan').value;
    const password = document.getElementById('password').value;

    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ no_telp, Nama_pelanggan, password }),
    })
        .then((response) => response.json())
        .then(() => {
            alert('User added successfully!');
            fetchUsers();
            addUserForm.reset();
        })
        .catch((error) => console.error('Error adding user:', error));
});

// Mengambil Daftar Pengguna
function fetchUsers() {
    fetch('/api/users')
        .then((response) => response.json())
        .then((users) => {
            userList.innerHTML = '';
            users.forEach((user) => {
                const li = document.createElement('li');
                li.innerHTML = `${user.no_telp} - ${user.Nama_pelanggan} 
                <button onclick="editUser('${user.no_telp}', '${user.Nama_pelanggan}', '${user.password}')">Edit</button>
                <button onclick="deleteUser('${user.no_telp}')">Delete</button>`;
                userList.appendChild(li);
            });
        })
        .catch((error) => console.error('Error fetching users:', error));
}

// Edit User
function editUser(no_telp, Nama_pelanggan, password) {
    editNoTelp.value = no_telp; // No Telp sebagai identifier
    editNamaPelanggan.value = Nama_pelanggan;
    editPassword.value = password;
    editUserForm.style.display = 'block';
}

// Update User
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const no_telp = editNoTelp.value; // Identifier utama
    const Nama_pelanggan = editNamaPelanggan.value;
    const password = editPassword.value;

    fetch(`/api/users/${no_telp}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nama_pelanggan, password }), // no_telp tidak diubah
    })
        .then((response) => response.json())
        .then(() => {
            alert('User updated successfully!');
            fetchUsers();
            editUserForm.style.display = 'none';
            editUserForm.reset();
        })
        .catch((error) => console.error('Error updating user:', error));
});

// Delete User
function deleteUser(no_telp) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${no_telp}`, {
            method: 'DELETE',
        })
            .then(() => {
                alert('User deleted successfully!');
                fetchUsers();
            })
            .catch((error) => console.error('Error deleting user:', error));
    }
}

// Load pengguna saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchUsers);
