const crypto = require('crypto');

// Segredo gerado a cada vez que o servidor inicia.
// Isso faz o token de admin expirar sempre que o backend reiniciar (o barbeiro
// precisa logar de novo), o que é suficiente para o escopo deste projeto.
const SERVER_SECRET = crypto.randomBytes(16).toString('hex');

function buildToken(password) {
  return crypto.createHash('sha256').update(password + SERVER_SECRET).digest('hex');
}

function login(req, res) {
  const { password } = req.body;
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }
  res.json({ token: buildToken(password) });
}

function requireAdmin(req, res, next) {
  const token = req.header('x-admin-token');
  const expected = buildToken(process.env.ADMIN_PASSWORD || '');
  if (!token || token !== expected) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }
  next();
}

module.exports = { login, requireAdmin };
