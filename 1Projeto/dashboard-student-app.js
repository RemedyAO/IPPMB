function StudentDashboard() {
  const [user, setUser] = React.useState(null);
  const [studentInfo, setStudentInfo] = React.useState(null);
  const [grades, setGrades] = React.useState([]);
  const [payments, setPayments] = React.useState([]);
  const [showPayment, setShowPayment] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    const userData = JSON.parse(currentUser);
    setUser(userData);
    loadStudentData(userData.objectId);
  }, []);

  const loadStudentData = async (userId) => {
    try {
      const [infoList, gradesList, paymentsList] = await Promise.all([
        trickleListObjects('student_info', 100, true),
        trickleListObjects('grade', 100, true),
        trickleListObjects('payment', 100, true)
      ]);

      const info = infoList.items.find(i => i.objectData.StudentId === userId);
      setStudentInfo(info);
      setGrades(gradesList.items.filter(g => g.objectData.StudentId === userId));
      setPayments(paymentsList.items.filter(p => p.objectData.StudentId === userId));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const canViewGrades = studentInfo?.objectData.TuitionStatus === 'paid';

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Carregando...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="icon-user text-2xl text-blue-600 mr-3"></div>
              <h3 className="text-lg font-semibold">Informações Pessoais</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Nome:</span> {user?.objectData.FullName}</p>
              <p><span className="font-medium">Nº Processo:</span> {user?.objectData.ProcessNumber}</p>
              <p><span className="font-medium">Classe:</span> {studentInfo?.objectData.Class}</p>
              <p><span className="font-medium">Curso:</span> {studentInfo?.objectData.Course}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="icon-credit-card text-2xl text-green-600 mr-3"></div>
              <h3 className="text-lg font-semibold">Estado Financeiro</h3>
            </div>
            <div className="space-y-3">
              <div className={`px-3 py-2 rounded ${
                studentInfo?.objectData.TuitionStatus === 'paid' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-medium">
                  {studentInfo?.objectData.TuitionStatus === 'paid' ? 'Em dia' : 'Pendente'}
                </p>
              </div>
              <p className="text-sm">
                <span className="font-medium">Saldo:</span> {studentInfo?.objectData.TuitionBalance || 0} AOA
              </p>
              <button 
                onClick={() => setShowPayment(true)}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Fazer Pagamento
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="icon-file-text text-2xl text-purple-600 mr-3"></div>
              <h3 className="text-lg font-semibold">Histórico</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>Pagamentos: {payments.length}</p>
              <p>Ano letivo: {studentInfo?.objectData.EnrollmentYear}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Notas e Avaliações</h3>
          {!canViewGrades ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
              <div className="icon-lock text-3xl text-yellow-600 mb-2"></div>
              <p className="text-yellow-800 font-medium">Notas bloqueadas</p>
              <p className="text-sm text-yellow-700 mt-2">
                Regularize suas propinas para visualizar as notas
              </p>
            </div>
          ) : grades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Disciplina</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">MAC</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">PP</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">PT</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Média</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Trimestre</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {grades.map((grade, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{grade.objectData.Subject}</td>
                      <td className="px-4 py-3">{grade.objectData.MAC || '-'}</td>
                      <td className="px-4 py-3">{grade.objectData.PP || '-'}</td>
                      <td className="px-4 py-3">{grade.objectData.PT || '-'}</td>
                      <td className="px-4 py-3 font-semibold text-blue-600">{grade.objectData.Average || '-'}</td>
                      <td className="px-4 py-3">{grade.objectData.Term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhuma nota disponível</p>
          )}
        </div>
      </div>
      
      {showPayment && (
        <PaymentModal 
          onClose={() => setShowPayment(false)}
          studentId={user.objectId}
          onSuccess={() => loadStudentData(user.objectId)}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StudentDashboard />);