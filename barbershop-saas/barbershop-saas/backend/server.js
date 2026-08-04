require('dotenv').config();
const express = require('express');
const cors = require('cors');

const appointmentsRouter = require('./routes/appointments');
const { login } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/admin/login', login);
app.use('/api/appointments', appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
