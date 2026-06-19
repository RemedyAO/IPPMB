function AdminUsersApp() {
  try {
    const [users, setUsers] = React.useState([]);
    const [filter, setFilter] = React.useState('Todos');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [alert, setAlert] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState(null);
    const [formData, setFormData] = React.useState({
      nomeCompleto: '', email: '', password: '', telefone: '', estado: 'Ativo'
    });

    React.useEffect(() => {
      const session = JSON.parse(localStorage.getItem('userSession') || '{}');
      if (!session.userId || session.userType !== 'admin') {
        window.location.href = 'login.html';
        return;
      }
      loadUsers();
    }, []);

    const loadUsers = async () => {
      try {
        const result = await trickleListObjects('admin_user', 100, true);
        if (result && result.items) {
          setUsers(result.items);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Load users error:', error);
        setUsers([]);
        setAlert({ message: 'Erro ao carregar utilizadores. A lista está vazia.', type: 'warning' });
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      // Phone validation - only numbers
      if (name === 'telefone') {
        const numbersOnly = value.replace(/[^0-9]/g, '');
        setFormData({ ...formData, [name]: numbersOnly });
        return;
      }
      
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.nomeCompleto || !formData.email || !formData.password) {
        setAlert({ message: 'Preencha todos os campos obrigatórios', type: 'error' });
        return;
      }
      
      // Name validation
      if (formData.nomeCompleto.trim().length < 4) {
        setAlert({ message: 'O nome deve ter pelo menos 4 caracteres.', type: 'error' });
        return;
      }
      
      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setAlert({ message: 'Digite um email válido.', type: 'error' });
        return;
      }
      
      // Phone validation
      if (formData.telefone && formData.telefone.length < 9) {
        setAlert({ message: 'Digite um número de telefone válido.', type: 'error' });
        return;
      }
      
      // Phone validation
      if (formData.telefone && formData.telefone.length < 9) {
        setAlert({ message: 'Digite um número de telefone válido.', type: 'error' });
        return;
      }

      const emailExists = users.some(u => 
        u.objectData.email?.toLowerCase() === formData.email.toLowerCase() &&
        (!editingUser || u.objectId !== editingUser.objectId)
      );

      if (emailExists) {
        setAlert({ message: 'Email já existe. Use outro email.', type: 'error' });
        return;
      }

      try {
        if (editingUser) {
          await trickleUpdateObject('admin_user', editingUser.objectId, formData);
          setAlert({ message: 'Utilizador atualizado com sucesso', type: 'success' });
        } else {
          await trickleCreateObject('admin_user', {
            ...formData,
            criadoEm: new Date().toISOString()
          });
          setAlert({ message: 'Utilizador criado com sucesso', type: 'success' });
        }
        
        setShowModal(false);
        setEditingUser(null);
        setFormData({ nomeCompleto: '', email: '', password: '', telefone: '', estado: 'Ativo' });
        loadUsers();
      } catch (error) {
        console.error('Submit error:', error);
        setAlert({ message: 'Erro ao salvar utilizador', type: 'error' });
      }
    };

    const handleEdit = (user) => {
      setEditingUser(user);
      setFormData(user.objectData);
      setShowModal(true);
    };

    const handleDelete = async (userId) => {
      if (!confirm('Tem certeza que deseja eliminar este utilizador?')) return;
      
      try {
        await trickleDeleteObject('admin_user', userId);
        setAlert({ message: 'Utilizador eliminado com sucesso', type: 'success' });
        loadUsers();
      } catch (error) {
        setAlert({ message: 'Erro ao eliminar utilizador', type: 'error' });
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('userSession');
      window.location.href = 'login.html';
    };

    const filtered = users.filter(u => {
      const matchFilter = filter === 'Todos' || u.objectData.estado === filter;
      const matchSearch = !searchTerm || u.objectData.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });

    return (
      <div className="min-h-screen bg-[var(--bg-light)]">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img src="https://remedyao.github.io/Remedy/LGbondo.jpg" alt="Logo" className="h-10 w-10 object-contain" />
                <h1 className="text-2xl font-bold text-[var(--primary-color)]">Painel Administrativo</h1>
              </div>
              <button onClick={handleLogout} className="btn-primary">Sair</button>
            </div>
            <nav className="flex gap-4 border-t pt-4">
              <a href="admin-dashboard.html" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                Matrículas
              </a>
              <a href="admin-pre-inscricoes.html" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                Pré-inscrições
              </a>
              <a href="admin-users.html" className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold">
                Gestão de Utilizadores
              </a>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Utilizadores Administrativos</h2>
              <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
                <div className="icon-user-plus text-xl"></div>
                Criar Utilizador
              </button>
            </div>

            <div className="mb-6 space-y-4">
              <input type="text" placeholder="Pesquisar por nome..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" />
              
              <div className="flex gap-4">
                {['Todos', 'Ativo', 'Desativado'].map(status => (
                  <button key={status} onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      filter === status ? 'bg-[var(--primary-color)] text-white' : 'bg-gray-200'
                    }`}>
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Telefone</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map(user => (
                      <tr key={user.objectId} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{user.objectData.nomeCompleto}</td>
                        <td className="px-4 py-3">{user.objectData.email}</td>
                        <td className="px-4 py-3">{user.objectData.telefone || '-'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.objectData.estado === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.objectData.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline">Editar</button>
                          <button onClick={() => handleDelete(user.objectId)} className="text-red-600 hover:underline">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        Nenhum utilizador encontrado. Clique em "Criar Utilizador" para adicionar o primeiro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingUser ? 'Editar' : 'Criar'} Utilizador</h2>
                <button onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                  setFormData({ nomeCompleto: '', email: '', password: '', telefone: '', estado: 'Ativo' });
                }}>
                  <div className="icon-x text-2xl"></div>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Nome Completo *</label>
                  <input type="text" name="nomeCompleto" value={formData.nomeCompleto}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Senha *</label>
                  <input type="password" name="password" value={formData.password}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Telefone</label>
                  <input type="tel" name="telefone" value={formData.telefone}
                    onChange={handleChange} placeholder="Apenas números"
                    className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Estado *</label>
                  <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg">
                    <option value="Ativo">Ativo</option>
                    <option value="Desativado">Desativado</option>
                  </select>
                </div>
                <button type="submit" className="w-full btn-primary">
                  {editingUser ? 'Atualizar' : 'Criar'} Utilizador
                </button>
              </form>
            </div>
          </div>
        )}

        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>
    );
  } catch (error) {
    console.error('AdminUsersApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminUsersApp />);