const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const UserRoutes = require('./routes/UserRoutes');

const app = express();

// Middleware untuk melayani file statis (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Routes API untuk CRUD User
app.use('/api', UserRoutes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
