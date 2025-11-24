function LoginApp() {
  try {
    const [role, setRole] = React.useState('');
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });

    const handleLogin = async (e) => {
      e.preventDefault();
      
      if (!role) {
        alert('Por favor, selecione o seu perfil');
        return;
      }

      try {
        const users = await trickleListObjects('user', 100, true);
        const user = users.items.find(u => 
          u.objectData.Email === credentials.email && 
          u.objectData.Password === credentials.password &&
          u.objectData.Role === role
        );

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          const redirectMap = {
            student: 'dashboard-student.html',
            teacher: 'dashboard-teacher.html',
            admin: 'dashboard-admin.html'
          };
          window.location.href = redirectMap[role];
        } else {
          alert('Email, senha ou perfil incorretos');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Erro ao fazer login. Tente novamente.');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <div className="icon-graduation-cap text-3xl text-[var(--primary-color)]"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Bindo Matuatunguila</h1>
            <p className="text-gray-600">Família vamos construir</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Selecione o seu perfil</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'student', icon: 'user', label: 'Estudante' },
                  { value: 'teacher', icon: 'book-open', label: 'Professor' },
                  { value: 'admin', icon: 'settings', label: 'Admin' }
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRole(item.value)}
                    className={`p-4 rounded-lg border-2 transition ${
                      role === item.value 
                        ? 'border-[var(--primary-color)] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`icon-${item.icon} text-2xl mb-2 ${role === item.value ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}></div>
                    <p className="text-xs font-medium">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email ou Nº de Processo</label>
              <input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                required
              />
            </div>

            <button type="submit" className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition">
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <a href="#" className="block text-sm text-[var(--primary-color)] hover:underline">Esqueci a senha</a>
            <a href="index.html" className="block text-sm text-gray-600 hover:text-gray-800">Voltar ao início</a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginApp />);