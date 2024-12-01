const db = require('../db/db');

// CREATE
exports.createUser = (req, res) => {
    const { no_telp, Nama_pelanggan, password } = req.body;
    const query = 'INSERT INTO pelanggan (no_telp, Nama_pelanggan, password) VALUES (?, ?, ?)';
    db.query(query, [no_telp, Nama_pelanggan, password], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Server Error' });
        }
        res.status(201).json({ message: 'User created successfully', no_telp });
    });
};

// READ (Get all users)
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM pelanggan';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).json({ message: 'Server Error' });
        }
        res.status(200).json(results);
    });
};

// READ (Get user by no_telp)
exports.getUserByNoTelp = (req, res) => {
    const { no_telp } = req.params;
    const query = 'SELECT * FROM pelanggan WHERE no_telp = ?';
    db.query(query, [no_telp], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ message: 'Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(results[0]);
    });
};

// DELETE USER by no_telp
exports.deleteUser = (req, res) => {
    const { no_telp } = req.params;
    const query = 'DELETE FROM pelanggan WHERE no_telp = ?';
    db.query(query, [no_telp], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

// UPDATE USER by no_telp
exports.updateUser = (req, res) => {
    const { no_telp } = req.params;
    const { Nama_pelanggan, password } = req.body;
    const query = 'UPDATE pelanggan SET Nama_pelanggan = ?, password = ? WHERE no_telp = ?';
    db.query(query, [Nama_pelanggan, password, no_telp], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
};
