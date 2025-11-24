function AdminDashboard() {
  const [user, setUser] = React.useState(null);
  const [stats, setStats] = React.useState({
    students: 0,
    teachers: 0,
    payments: 0,
    totalAmount: 0
  });
  const [users, setUsers] = React.useState([]);
  const [payments, setPayments] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('overview');

  React.useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    const userData = JSON.parse(currentUser);
    setUser(userData);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersList, paymentsList] = await Promise.all([
        trickleListObjects('user', 100, true),
        trickleListObjects('payment', 100, true)
      ]);

      const students = usersList.items.filter(u => u.objectData.Role === 'student');
      const teachers = usersList.items.filter(u => u.objectData.Role === 'teacher');
      const totalAmount = paymentsList.items.reduce((sum, p) => sum + (p.objectData.Amount || 0), 0);

      setStats({
        students: students.length,
        teachers: teachers.length,
        payments: paymentsList.items.length,
        totalAmount
      });
      setUsers(usersList.items);
      setPayments(paymentsList.items);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Painel Administrativo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Estudantes</p>
                <p className="text-3xl font-bold text-blue-600">{stats.students}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="icon-users text-xl text-blue-600"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Professores</p>
                <p className="text-3xl font-bold text-green-600">{stats.teachers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="icon-user-check text-xl text-green-600"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pagamentos</p>
                <p className="text-3xl font-bold text-purple-600">{stats.payments}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="icon-credit-card text-xl text-purple-600"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Recebido</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalAmount} AOA</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="icon-wallet text-xl text-orange-600"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              >
                Utilizadores
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 font-medium ${activeTab === 'payments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              >
                Pagamentos
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="text-center py-8">
                <p className="text-gray-600">Estatísticas gerais do sistema</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Nome</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Perfil</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Nº Processo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((u, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3">{u.objectData.FullName}</td>
                        <td className="px-4 py-3">{u.objectData.Email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            u.objectData.Role === 'student' ? 'bg-blue-100 text-blue-800' :
                            u.objectData.Role === 'teacher' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {u.objectData.Role}
                          </span>
                        </td>
                        <td className="px-4 py-3">{u.objectData.ProcessNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Referência</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Valor</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Método</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {payments.map((p, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 font-mono text-sm">{p.objectData.Reference}</td>
                        <td className="px-4 py-3 font-semibold">{p.objectData.Amount} AOA</td>
                        <td className="px-4 py-3">{p.objectData.PaymentMethod}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            {p.objectData.Status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminDashboard />);
