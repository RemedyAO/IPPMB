function CheckStatusApp() {
  try {
    const [email, setEmail] = React.useState('');
    const [bi, setBi] = React.useState('');
    const [enrollment, setEnrollment] = React.useState(null);
    const [alert, setAlert] = React.useState(null);

    const handleCheck = async (e) => {
      e.preventDefault();
      try {
        const result = await trickleListObjects('matricula', 100, true);
        if (!result || !result.items) {
          setAlert({ message: 'Erro ao consultar dados. Tente novamente.', type: 'error' });
          return;
        }
        
        const found = result.items.find(e => 
          e.objectData.email?.toLowerCase() === email.toLowerCase() && 
          e.objectData.biEstudante === bi
        );
        
        if (found) {
          setEnrollment(found.objectData);
          setAlert(null);
        } else {
          setEnrollment(null);
          setAlert({ message: 'Matrícula não encontrada. Verifique os dados.', type: 'error' });
        }
      } catch (error) {
        console.error('Check status error:', error);
        setAlert({ message: 'Erro de conexão. Tente novamente.', type: 'error' });
      }
    };

    const getStatusColor = (status) => {
      const colors = {
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Em Análise': 'bg-blue-100 text-blue-800',
        'Aprovado': 'bg-green-100 text-green-800',
        'Recusado': 'bg-red-100 text-red-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-8">
              Consultar Estado da Matrícula
            </h1>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <form onSubmit={handleCheck} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">BI do Estudante</label>
                  <input type="text" value={bi} onChange={(e) => setBi(e.target.value)} required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                </div>
                <button type="submit" className="w-full btn-primary">Consultar</button>
              </form>
            </div>

            {enrollment && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-bold mb-4">Resultado</h2>
                <div className="space-y-3">
                  <p><strong>Nome:</strong> {enrollment.nomeCompleto}</p>
                  <p><strong>Curso:</strong> {enrollment.cursoPretendido}</p>
                  <p><strong>Classe:</strong> {enrollment.classePretendida}</p>
                  <div className="flex items-center gap-2">
                    <strong>Estado:</strong>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>
    );
  } catch (error) {
    console.error('CheckStatusApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CheckStatusApp />);