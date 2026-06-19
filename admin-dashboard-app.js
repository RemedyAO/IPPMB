function AdminDashboardApp() {
  try {
    const [enrollments, setEnrollments] = React.useState([]);
    const [filter, setFilter] = React.useState('Todos');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [alert, setAlert] = React.useState(null);
    const [selected, setSelected] = React.useState(null);
    const [rejectionReason, setRejectionReason] = React.useState('');
    const [customReason, setCustomReason] = React.useState('');
    const [observations, setObservations] = React.useState('');
    const [sending, setSending] = React.useState(false);
    const [viewingDocument, setViewingDocument] = React.useState(null);

    React.useEffect(() => {
      const session = JSON.parse(localStorage.getItem('userSession') || '{}');
      if (!session.userId || session.userType !== 'admin') {
        window.location.href = 'login.html';
      }
      loadEnrollments();
    }, []);

    const loadEnrollments = async () => {
      try {
        const result = await trickleListObjects('matricula', 100, true);
        if (result && result.items) {
          setEnrollments(result.items);
        } else {
          setEnrollments([]);
        }
      } catch (error) {
        console.error('Load enrollments error:', error);
        setEnrollments([]);
        setAlert({ message: 'Erro ao carregar dados. A lista de matrículas está vazia.', type: 'warning' });
      }
    };

    const sendNotifications = async (email, phone, studentName) => {
      const emailSubject = 'Documentos aprovados para o teste de admissão';
      const emailBody = `Olá ${studentName},\n\nA sua pré-inscrição foi analisada e os seus documentos foram marcados como APTOS.\n\nIsto significa que já pode se dirigir à escola para realizar o teste de admissão.\n\nPor favor, entre em contacto com a secretaria ou dirija-se à escola para receber as próximas orientações.\n\nBondo Matuatunguila\nFamília vamos construir`;
      
      const whatsappMessage = `Olá ${studentName},\n\nA sua pré-inscrição foi analisada e os seus documentos foram marcados como APTOS.\n\nIsto significa que já pode se dirigir à escola para realizar o teste de admissão.\n\nPor favor, entre em contacto com a secretaria ou dirija-se à escola para receber as próximas orientações.\n\nBondo Matuatunguila`;
      
      // Send Email using EmailJS or similar service
      // Configure your email service credentials in the code below
      try {
        // Example using fetch to send email via API
        // Replace with your actual email service endpoint and API key
        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: 'YOUR_SERVICE_ID', // Configure your EmailJS service ID
            template_id: 'YOUR_TEMPLATE_ID', // Configure your EmailJS template ID
            user_id: 'YOUR_USER_ID', // Configure your EmailJS user ID
            template_params: {
              to_email: email,
              subject: emailSubject,
              message: emailBody,
              to_name: studentName
            }
          })
        });
        
        // Send WhatsApp using WhatsApp Business API or Twilio
        // Replace with your actual WhatsApp service credentials
        const whatsappResponse = await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            From: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
            To: `whatsapp:${phone}`,
            Body: whatsappMessage
          })
        });
        
        return { email: emailResponse.ok, whatsapp: whatsappResponse.ok };
      } catch (error) {
        console.error('Notification error:', error);
        return { email: false, whatsapp: false };
      }
    };

    const updateStatus = async (enrollmentId, newStatus, extraData = {}) => {
      try {
        setSending(true);
        const enrollment = enrollments.find(e => e.objectId === enrollmentId);
        if (!enrollment) {
          setAlert({ message: 'Inscrição não encontrada', type: 'error' });
          setSending(false);
          return;
        }
        
        const finalReason = rejectionReason === 'Outro' ? customReason : rejectionReason;
        await trickleUpdateObject('matricula', enrollmentId, {
          ...enrollment.objectData,
          status: newStatus,
          ...extraData,
          rejectionReason: finalReason || '',
          observations: observations || '',
          lastUpdated: new Date().toISOString()
        });
        
        // Send notifications if status is "Apto"
        if (newStatus === 'Apto') {
          const notificationResult = await sendNotifications(
            enrollment.objectData.email,
            enrollment.objectData.telefone,
            enrollment.objectData.nomeCompleto
          );
          
          if (notificationResult.email || notificationResult.whatsapp) {
            setAlert({ message: 'Estado atualizado e notificações enviadas!', type: 'success' });
          } else {
            setAlert({ message: 'Estado atualizado mas houve erro ao enviar notificações', type: 'warning' });
          }
        } else {
          setAlert({ message: 'Estado atualizado com sucesso', type: 'success' });
        }
        
        await loadEnrollments();
        setSelected(null);
        setRejectionReason('');
        setCustomReason('');
        setObservations('');
        setSending(false);
      } catch (error) {
        console.error('Update status error:', error);
        setAlert({ message: 'Erro ao atualizar. Tente novamente.', type: 'error' });
        setSending(false);
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('userSession');
      window.location.href = 'login.html';
    };

    const filtered = enrollments.filter(e => {
      const matchFilter = filter === 'Todos' || e.objectData.status === filter;
      const matchSearch = !searchTerm || e.objectData.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });

    const stats = {
      total: enrollments.length,
      pendente: enrollments.filter(e => e.objectData.status === 'Pendente').length,
      apto: enrollments.filter(e => e.objectData.status === 'Apto').length,
      naoApto: enrollments.filter(e => e.objectData.status === 'Não apto').length
    };

    const rejectionReasons = [
      'Falsificação de documentos',
      'Falta de documentos',
      'Documentos ilegíveis',
      'Dados incorretos',
      'Sem vagas disponíveis',
      'Curso indisponível',
      'Outro'
    ];

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
              <a href="admin-dashboard.html" className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold">
                Matrículas
              </a>
              <a href="admin-pre-inscricoes.html" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
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
                {['Todos', 'Pendente', 'Em análise', 'Apto', 'Não apto'].map(status => (
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
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map(enrollment => (
                      <tr key={enrollment.objectId} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{enrollment.objectData.nomeCompleto}</td>
                        <td className="px-4 py-3">{enrollment.objectData.cursoPretendido}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                            {enrollment.objectData.status || 'Pendente'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setSelected(enrollment)}
                            className="text-[var(--primary-color)] hover:underline">
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                        Nenhuma matrícula encontrada. As matrículas enviadas pelos estudantes aparecerão aqui.
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
                <h2 className="text-2xl font-bold">Detalhes da Inscrição</h2>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">
                  <div className="icon-x text-2xl"></div>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold border-b pb-2">Dados Pessoais</h3>
                <p><strong>Nome Completo:</strong> {selected.objectData.nomeCompleto}</p>
                <p><strong>Data de Nascimento:</strong> {selected.objectData.dataNascimento}</p>
                <p><strong>Género:</strong> {selected.objectData.genero}</p>
                <p><strong>BI do Estudante:</strong> {selected.objectData.biEstudante}</p>
                
                <h3 className="text-lg font-semibold border-b pb-2 mt-6">Dados dos Pais</h3>
                <p><strong>BI do Pai:</strong> {selected.objectData.biPai}</p>
                <p><strong>BI da Mãe:</strong> {selected.objectData.biMae}</p>
                
                <h3 className="text-lg font-semibold border-b pb-2 mt-6">Contactos</h3>
                <p><strong>Telefone:</strong> {selected.objectData.telefone}</p>
                <p><strong>Email:</strong> {selected.objectData.email}</p>
                <p><strong>Endereço:</strong> {selected.objectData.endereco}</p>
                
                <h3 className="text-lg font-semibold border-b pb-2 mt-6">Informação Académica</h3>
                <p><strong>Curso Pretendido:</strong> {selected.objectData.cursoPretendido}</p>
                <p><strong>Classe Pretendida:</strong> {selected.objectData.classePretendida}</p>
                <p><strong>Estado:</strong> <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">{selected.objectData.status || 'Pendente'}</span></p>
                
                {selected.objectData.documents && (
                  <>
                    <h3 className="text-lg font-semibold border-b pb-2 mt-6">Documentos Anexados</h3>
                    <div className="space-y-3">
                      {(() => {
                        try {
                        const docs = JSON.parse(selected.objectData.documents);
                        const docLabels = {
                          certificado9Classe: 'Certificado da 9ª Classe',
                          atestadoMedico: 'Atestado Médico',
                          cartaoVacinas: 'Cartão de Vacinas',
                          fotoEstudante: 'Foto do Estudante'
                        };
                        return Object.entries(docs).map(([key, value]) => (
                          value && value.data && (
                              <div key={key} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                  <div className="icon-file-text text-2xl text-[var(--primary-color)]"></div>
                                  <div>
                                    <p className="font-semibold text-[var(--text-primary)]">{docLabels[key] || key}</p>
                                    <p className="text-sm text-[var(--text-secondary)]">{value}</p>
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
              </div>

              <div className="space-y-6 border-t pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Marcar Documentos como Aptos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Ao marcar como apto, significa que os documentos estão corretos e o estudante pode fazer o teste de admissão. O estudante receberá notificação automática por email e WhatsApp.
                  </p>
                  <button 
                    onClick={() => updateStatus(selected.objectId, 'Apto')} 
                    disabled={sending}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold">
                    {sending ? 'Enviando notificações...' : 'Aprovar Documentos (Apto)'}
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Marcar como Não Apto</h3>
                  <select value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-4">
                    <option value="">Selecione o motivo</option>
                    {rejectionReasons.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                  {rejectionReason === 'Outro' && (
                    <input type="text" value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Especifique o motivo"
                      className="w-full px-4 py-2 border rounded-lg mb-4" />
                  )}
                  <button 
                    onClick={() => updateStatus(selected.objectId, 'Não apto')}
                    disabled={sending}
                    className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-semibold">
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
    console.error('AdminDashboardApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminDashboardApp />);