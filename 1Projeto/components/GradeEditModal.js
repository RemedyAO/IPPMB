function GradeEditModal({ classInfo, teacherId, onClose, onSuccess }) {
  const [students, setStudents] = React.useState([]);
  const [grades, setGrades] = React.useState({});
  const [term, setTerm] = React.useState('1º Trimestre');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadClassData();
  }, [term]);

  const loadClassData = async () => {
    try {
      const [usersList, studentInfoList, gradesList] = await Promise.all([
        trickleListObjects('user', 100, true),
        trickleListObjects('student_info', 100, true),
        trickleListObjects('grade', 100, true)
      ]);

      const classStudents = studentInfoList.items
        .filter(info => info.objectData.Class === classInfo.objectData.ClassName)
        .map(info => {
          const user = usersList.items.find(u => u.objectId === info.objectData.StudentId);
          return { ...user, info };
        })
        .filter(s => s.objectId);

      setStudents(classStudents);

      const gradesMap = {};
      classStudents.forEach(student => {
        const studentGrade = gradesList.items.find(g => 
          g.objectData.StudentId === student.objectId &&
          g.objectData.Subject === classInfo.objectData.Subject &&
          g.objectData.Term === term &&
          g.objectData.ClassName === classInfo.objectData.ClassName
        );
        gradesMap[student.objectId] = studentGrade ? {
          id: studentGrade.objectId,
          MAC: studentGrade.objectData.MAC || '',
          PP: studentGrade.objectData.PP || '',
          PT: studentGrade.objectData.PT || ''
        } : { MAC: '', PP: '', PT: '' };
      });
      setGrades(gradesMap);
      setLoading(false);
    } catch (error) {
      console.error('Error loading class data:', error);
      setLoading(false);
    }
  };

  const calculateAverage = (mac, pp, pt) => {
    const values = [mac, pp, pt].filter(v => v !== '' && !isNaN(v)).map(Number);
    if (values.length === 0) return '';
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const handleGradeChange = (studentId, field, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value }
    }));
  };

  const handleSave = async () => {
    try {
      for (const student of students) {
        const gradeData = grades[student.objectId];
        const average = calculateAverage(gradeData.MAC, gradeData.PP, gradeData.PT);
        
        const gradePayload = {
          StudentId: student.objectId,
          Subject: classInfo.objectData.Subject,
          MAC: gradeData.MAC ? parseFloat(gradeData.MAC) : null,
          PP: gradeData.PP ? parseFloat(gradeData.PP) : null,
          PT: gradeData.PT ? parseFloat(gradeData.PT) : null,
          Average: average ? parseFloat(average) : null,
          Term: term,
          Year: '2025',
          ClassName: classInfo.objectData.ClassName
        };

        if (gradeData.id) {
          await trickleUpdateObject('grade', gradeData.id, gradePayload);
        } else if (gradeData.MAC || gradeData.PP || gradeData.PT) {
          await trickleCreateObject('grade', gradePayload);
        }
      }
      alert('Notas atualizadas com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving grades:', error);
      alert('Erro ao salvar notas');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">
              Boletim - {classInfo.objectData.Subject}
            </h3>
            <p className="text-sm text-gray-600">Turma: {classInfo.objectData.ClassName}</p>
          </div>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option>1º Trimestre</option>
            <option>2º Trimestre</option>
            <option>3º Trimestre</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-2 text-left text-sm font-semibold">Nome</th>
                <th className="border px-4 py-2 text-center text-sm font-semibold">MAC</th>
                <th className="border px-4 py-2 text-center text-sm font-semibold">PP</th>
                <th className="border px-4 py-2 text-center text-sm font-semibold">PT</th>
                <th className="border px-4 py-2 text-center text-sm font-semibold">Média</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const studentGrade = grades[student.objectId] || {};
                const average = calculateAverage(studentGrade.MAC, studentGrade.PP, studentGrade.PT);
                return (
                  <tr key={student.objectId}>
                    <td className="border px-4 py-2">{student.objectData.FullName}</td>
                    <td className="border px-2 py-2">
                      <input
                        type="number"
                        value={studentGrade.MAC}
                        onChange={(e) => handleGradeChange(student.objectId, 'MAC', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-center"
                        min="0"
                        max="20"
                        step="0.5"
                      />
                    </td>
                    <td className="border px-2 py-2">
                      <input
                        type="number"
                        value={studentGrade.PP}
                        onChange={(e) => handleGradeChange(student.objectId, 'PP', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-center"
                        min="0"
                        max="20"
                        step="0.5"
                      />
                    </td>
                    <td className="border px-2 py-2">
                      <input
                        type="number"
                        value={studentGrade.PT}
                        onChange={(e) => handleGradeChange(student.objectId, 'PT', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-center"
                        min="0"
                        max="20"
                        step="0.5"
                      />
                    </td>
                    <td className="border px-4 py-2 text-center font-bold text-blue-600">
                      {average}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar Notas
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
