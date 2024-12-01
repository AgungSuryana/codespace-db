const mysql = require('mysql2');

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // ganti dengan username MySQL Anda
  password: '', // ganti dengan password MySQL Anda
  database: 'restoran', // pastikan database ini sudah ada
});

// Menghubungkan ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
