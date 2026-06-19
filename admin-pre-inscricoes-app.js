function AdminPreInscricoesApp() {
  try {
    const [preInscricoes, setPreInscricoes] = React.useState([]);
    const [filter, setFilter] = React.useState('Todos');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [alert, setAlert] = React.useState(null);
    const [selected, setSelected] = React.useState(null);
    const [observations, setObservations] = React.useState('');
    const [viewingDocument, setViewingDocument] = React.useState(null);

    React.useEffect(() => {
      const session = JSON.parse(localStorage.getItem('userSession') || '{}');
      if (!session.userId || session.userType !== 'admin') {
        window.location.href = 'login.html';
      }
      loadPreInscricoes();
    }, []);

    const loadPreInscricoes = async () => {
      try {
        const result = await trickleListObjects('pre_inscricao', 100, true);
        if (result && result.items) {
          setPreInscricoes(result.items);
        } else {
          setPreInscricoes([]);
        }
      } catch (error) {
        console.error('Load pre-inscricoes error:', error);
        setPreInscricoes([]);
        setAlert({ message: 'Erro ao carregar dados. A lista de pré-inscrições está vazia.', type: 'warning' });
      }
    };

    const updateStatus = async (preInscricaoId, newStatus) => {
      try {
        const preInscricao = preInscricoes.find(p => p.objectId === preInscricaoId);
        if (!preInscricao) {
          setAlert({ message: 'Pré-inscrição não encontrada', type: 'error' });
          return;
        }
        
        await trickleUpdateObject('pre_inscricao', preInscricaoId, {
          ...preInscricao.objectData,
          status: newStatus,
          observations: observations || '',
          lastUpdated: new Date().toISOString()
        });
        
        setAlert({ message: 'Estado atualizado com sucesso', type: 'success' });
        await loadPreInscricoes();
        setSelected(null);
        setObservations('');
      } catch (error) {
        console.error('Update status error:', error);
        setAlert({ message: 'Erro ao atualizar. Tente novamente.', type: 'error' });
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('userSession');
      window.location.href = 'login.html';
    };

    const filtered = preInscricoes.filter(p => {
      const matchFilter = filter === 'Todos' || p.objectData.status === filter;
      const matchSearch = !searchTerm || p.objectData.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });

    const stats = {
      total: preInscricoes.length,
      pendente: preInscricoes.filter(p => p.objectData.status === 'Pendente').length,
      apto: preInscricoes.filter(p => p.objectData.status === 'Apto').length,
      naoApto: preInscricoes.filter(p => p.objectData.status === 'Não apto').length
    };

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
              <a href="admin-pre-inscricoes.html" className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold">
                Pré-inscrições
              </a>
              <a href="admin-users.html" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                Gestão de Utilizadores
              </a>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Total</p>
                  <p className="text-3xl font-bold text-[var(--primary-color)]">{stats.total}</p>
                </div>
                <div className="icon-users text-3xl text-blue-500"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendente}</p>
                </div>
                <div className="icon-clock text-3xl text-yellow-500"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Aptos</p>
                  <p className="text-3xl font-bold text-green-600">{stats.apto}</p>
                </div>
                <div className="icon-circle-check text-3xl text-green-500"></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">Não Aptos</p>
                  <p className="text-3xl font-bold text-red-600">{stats.naoApto}</p>
                </div>
                <div className="icon-x-circle text-3xl text-red-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6 space-y-4">
              <input type="text" placeholder="Pesquisar por nome..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]" />
              
              <div className="flex flex-wrap gap-4">
                {['Todos', 'Pendente', 'Apto', 'Não apto'].map(status => (
                  <button key={status} onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
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
                    <th className="px-4 py-3 text-left">Curso</th>
                    <th className="px-4 py-3 text-left">Telefone</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map(preInscricao => (
                      <tr key={preInscricao.objectId} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{preInscricao.objectData.nomeCompleto}</td>
                        <td className="px-4 py-3">{preInscricao.objectData.cursoPretendido}</td>
                        <td className="px-4 py-3">{preInscricao.objectData.telefone}</td>
                        <td className="px-4 py-3">{preInscricao.objectData.email || '-'}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                            {preInscricao.objectData.status || 'Pendente'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setSelected(preInscricao)}
                            className="text-[var(--primary-color)] hover:underline">
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        Nenhuma pré-inscrição encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 my-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Detalhes da Pré-inscrição</h2>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">
                  <div className="icon-x text-2xl"></div>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <p><strong>Nome Completo:</strong> {selected.objectData.nomeCompleto}</p>
                <p><strong>Data de Nascimento:</strong> {selected.objectData.dataNascimento}</p>
                <p><strong>Género:</strong> {selected.objectData.genero}</p>
                <p><strong>Telefone:</strong> {selected.objectData.telefone}</p>
                <p><strong>Email:</strong> {selected.objectData.email || '-'}</p>
                <p><strong>Curso Pretendido:</strong> {selected.objectData.cursoPretendido}</p>
                <p><strong>Classe Pretendida:</strong> {selected.objectData.classePretendida}</p>
                {selected.objectData.mensagem && (
                  <p><strong>Mensagem:</strong> {selected.objectData.mensagem}</p>
                )}
                <p><strong>Estado:</strong> <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">{selected.objectData.status || 'Pendente'}</span></p>
              </div>

              {selected.objectData.documents && (
                <>
                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">Documentos Anexados</h3>
                  <div className="space-y-3">
                    {(() => {
                      try {
                        const docs = JSON.parse(selected.objectData.documents);
                        const docLabels = {
                          biEstudante: 'BI do Estudante',
                          biPai: 'BI do Pai',
                          biMae: 'BI da Mãe',
                          certificado: 'Certificado 9ª Classe',
                          foto: 'Foto do Estudante'
                        };
                        return Object.entries(docs).map(([key, value]) => (
                          value && value.data && (
                            <div key={key} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-3">
                                <div className="icon-file-text text-2xl text-[var(--primary-color)]"></div>
                                <div>
                                  <p className="font-semibold text-[var(--text-primary)]">{docLabels[key] || key}</p>
                                  <p className="text-sm text-[var(--text-secondary)]">{value.name}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => setViewingDocument(value)} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-semibold flex items-center gap-1">
                                  <div className="icon-eye text-lg"></div>
                                  Visualizar
                                </button>
                                <a href={value.data} download={value.name} className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-semibold flex items-center gap-1">
                                  <div className="icon-download text-lg"></div>
                                  Baixar
                                </a>
                              </div>
                            </div>
                          )
                        ));
                      } catch (e) {
                        return <p className="text-sm text-gray-500">Nenhum documento anexado</p>;
                      }
                    })()}
                  </div>
                </>
              )}

              <div className="space-y-6 border-t pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Marcar como Apto</h3>
                  <button onClick={() => updateStatus(selected.objectId, 'Apto')}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold">
                    Aprovar (Apto)
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Marcar como Não Apto</h3>
                  <button onClick={() => updateStatus(selected.objectId, 'Não apto')}
                    className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 font-semibold">
                    Marcar como Não Apto
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Observações Internas</h3>
                  <textarea value={observations} onChange={(e) => setObservations(e.target.value)}
                    rows="3" placeholder="Adicionar observações..."
                    className="w-full px-4 py-2 border rounded-lg"></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        {viewingDocument && <DocumentViewer document={viewingDocument} onClose={() => setViewingDocument(null)} />}
      </div>
    );
  } catch (error) {
    console.error('AdminPreInscricoesApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminPreInscricoesApp />);