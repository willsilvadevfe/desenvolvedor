import { useEffect, useState } from 'react';
import { formatDateBR } from '../utils/date.js';
import { apiFetch } from '../utils/api.js';
import '../styles/admin.css';

const TOKEN_KEY = 'barbershop_admin_token';

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    try {
      const data = await apiFetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  async function loadAppointments() {
    setLoading(true);
    setError('');
    try {
      const query = dateFilter ? `?date=${dateFilter}` : '';
      const data = await apiFetch(`/appointments${query}`, {
        headers: { 'x-admin-token': token },
      });
      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('autorizado')) handleLogout();
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    if (!confirm('Cancelar este agendamento?')) return;
    try {
      await apiFetch(`/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (token) loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dateFilter]);

  if (!token) {
    return (
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={handleLogin}>
          <h1>Painel do barbeiro</h1>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </label>
          {loginError && <p className="admin-login__error">{loginError}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <h1>Agendamentos</h1>
        <div className="admin__actions">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button type="button" onClick={() => setDateFilter('')}>
              Limpar filtro
            </button>
          )}
          <button type="button" onClick={handleLogout} className="admin__logout">
            Sair
          </button>
        </div>
      </header>

      {loading && <p>Carregando…</p>}
      {error && <p className="admin__error">{error}</p>}

      {!loading && appointments.length === 0 && <p>Nenhum agendamento encontrado.</p>}

      {!loading && appointments.length > 0 && (
        <table className="admin__table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Cliente</th>
              <th>WhatsApp</th>
              <th>E-mail</th>
              <th>Serviço</th>
              <th>Obs.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{formatDateBR(a.date)}</td>
                <td>{a.time}</td>
                <td>{a.name}</td>
                <td>{a.whatsapp}</td>
                <td>{a.email}</td>
                <td>{a.service}</td>
                <td>{a.notes}</td>
                <td>
                  <button type="button" className="admin__cancel" onClick={() => handleCancel(a.id)}>
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
