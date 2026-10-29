import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'autowash_db',
  waitForConnections: true,
  connectionLimit: 10
});

// Fetch all services / packages
app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve services.' });
  }
});

// Save booking
app.post('/api/bookings', async (req, res) => {
  const {
    package_name,
    category,
    price,
    owner_name,
    vehicle_number,
    mobile_number,
    service_address,
    service_date,
    time_slot
  } = req.body;

  try {
    const sql = `
      INSERT INTO bookings 
      (package_name, category, price, owner_name, vehicle_number, mobile_number, service_address, service_date, time_slot) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      package_name,
      category,
      price,
      owner_name,
      vehicle_number,
      mobile_number,
      service_address,
      service_date,
      time_slot
    ]);

    res.status(201).json({
      message: 'Booking confirmed!',
      bookingId: `AW-${result.insertId}`
    });
  } catch (err) {
    if (err.errno === 1062) {
      return res.status(409).json({ error: 'This slot is already booked. Please choose another time.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});