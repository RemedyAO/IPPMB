function LoginApp() {
  try {
    const [formData, setFormData] = React.useState({ email: '', password: '' });
    const [alert, setAlert] = React.useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      
      // Fixed admin credentials
      const ADMIN_EMAIL = 'admin@matriculaonline.com';
      const ADMIN_PASSWORD = 'Admin@2026';
      
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        localStorage.setItem('userSession', JSON.stringify({
          userId: 'admin-001',
          userType: 'admin',
          email: ADMIN_EMAIL,
          name: 'Administrador Principal',
          isSuperAdmin: true
        }));
        window.location.href = 'admin-dashboard.html';
        return;
      }
      
      setAlert({ message: 'Email ou senha incorretos. Por favor, verifique os dados.', type: 'error' });
    };

    return (
      <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--primary-color)]">Área Administrativa</h1>
            <p className="text-[var(--text-secondary)] mt-2">Acesse o painel de gestão</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Senha</label>
              <input type="password" value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})} required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
            </div>
            <button type="submit" className="w-full btn-primary py-3">Entrar</button>
          </form>

          <div className="mt-6 text-center">
            <a href="index.html" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
              ← Voltar ao site
            </a>
          </div>
        </div>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>
    );
  } catch (error) {
    console.error('LoginApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginApp />);