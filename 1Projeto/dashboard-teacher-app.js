function TeacherDashboard() {
  const [user, setUser] = React.useState(null);
  const [teacherSubjects, setTeacherSubjects] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [showGradeModal, setShowGradeModal] = React.useState(false);

  React.useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    const userData = JSON.parse(currentUser);
    setUser(userData);
    loadData(userData.objectId);
  }, []);

  const loadData = async (teacherId) => {
    try {
      const subjects = await trickleListObjects('teacher_subject', 100, true);
      const mySubjects = subjects.items.filter(s => s.objectData.TeacherId === teacherId);
      setTeacherSubjects(mySubjects);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNav user={user} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Minhas Turmas e Disciplinas</h2>
        
        {teacherSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherSubjects.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="icon-book-open text-xl text-blue-600"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{subject.objectData.Subject}</h3>
                    <p className="text-sm text-gray-600">Turma: {subject.objectData.ClassName}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Bibliografia:</p>
                  <p className="text-xs text-gray-600">{subject.objectData.Bibliography}</p>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedClass(subject);
                    setShowGradeModal(true);
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Atualizar Notas
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="icon-inbox text-4xl text-gray-400 mb-3"></div>
            <p className="text-gray-600">Nenhuma turma atribuída</p>
          </div>
        )}
      </div>

      {showGradeModal && selectedClass && (
        <GradeEditModal
          classInfo={selectedClass}
          teacherId={user.objectId}
          onClose={() => {
            setShowGradeModal(false);
            setSelectedClass(null);
          }}
          onSuccess={() => loadData(user.objectId)}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TeacherDashboard />);