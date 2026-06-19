function PreInscricaoApp() {
  try {
    const [formData, setFormData] = React.useState({
      nomeCompleto: '',
      dataNascimento: '',
      genero: '',
      telefone: '',
      email: '',
      cursoPretendido: '',
      classePretendida: '',
      mensagem: ''
    });
    const [documents, setDocuments] = React.useState({
      biEstudante: null,
      biPai: null,
      biMae: null,
      certificado: null,
      foto: null
    });
    const [alert, setAlert] = React.useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      if (name === 'telefone') {
        const numbersOnly = value.replace(/[^0-9]/g, '');
        setFormData({ ...formData, [name]: numbersOnly });
        return;
      }
      
      setFormData({ ...formData, [name]: value });
    };
    
    const handleFileChange = async (e, fieldName) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          
          setDocuments({ 
            ...documents, 
            [fieldName]: {
              name: file.name,
              type: file.type,
              size: file.size,
              data: base64
            }
          });
        } catch (error) {
          console.error('File read error:', error);
          setAlert({ message: 'Erro ao carregar ficheiro', type: 'error' });
        }
      }
    };
    
    const validateForm = () => {
      if (formData.nomeCompleto.trim().length < 4) {
        setAlert({ message: 'O nome deve ter pelo menos 4 caracteres.', type: 'error' });
        return false;
      }
      
      if (formData.telefone && formData.telefone.length < 9) {
        setAlert({ message: 'Digite um número de telefone válido.', type: 'error' });
        return false;
      }
      
      if (formData.dataNascimento) {
        const birthDate = new Date(formData.dataNascimento);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (age < 14 || (age === 14 && monthDiff < 0)) {
          setAlert({ message: 'O estudante deve ter no mínimo 14 anos.', type: 'error' });
          return false;
        }
      }
      
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setAlert({ message: 'Digite um email válido.', type: 'error' });
        return false;
      }
      
      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.nomeCompleto || !formData.telefone) {
        setAlert({ message: 'Preencha todos os campos obrigatórios', type: 'error' });
        return;
      }
      
      if (!validateForm()) {
        return;
      }
      
      try {
        const preInscricaoData = {
          ...formData,
          documents: JSON.stringify(documents),
          status: 'Pendente',
          submittedAt: new Date().toISOString()
        };
        
        const result = await trickleCreateObject('pre_inscricao', preInscricaoData);
        if (result) {
          setAlert({ message: 'Pré-inscrição enviada com sucesso!', type: 'success' });
          setFormData({
            nomeCompleto: '', dataNascimento: '', genero: '', telefone: '',
            email: '', cursoPretendido: '', classePretendida: '', mensagem: ''
          });
        } else {
          setAlert({ message: 'Erro ao enviar. Tente novamente.', type: 'error' });
        }
      } catch (error) {
        console.error('Submit error:', error);
        setAlert({ message: 'Erro de conexão. Tente novamente.', type: 'error' });
      }
    };

    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-2">Pré-Inscrição</h1>
              <p className="text-center text-[var(--text-secondary)] mb-8">Manifeste o seu interesse em estudar connosco</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
                  <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Data de Nascimento *</label>
                    <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Género *</label>
                    <select name="genero" value={formData.genero} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
                      <option value="">Selecione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone *</label>
                    <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required
                      placeholder="Apenas números"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Curso Pretendido *</label>
                    <select name="cursoPretendido" value={formData.cursoPretendido} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
                      <option value="">Selecione o curso</option>
                      <optgroup label="Saúde">
                        <option value="Análises Clínicas">Análises Clínicas</option>
                        <option value="Enfermagem">Enfermagem</option>
                      </optgroup>
                      <optgroup label="Construção Civil">
                        <option value="Desenhador Projectista">Desenhador Projectista</option>
                      </optgroup>
                      <optgroup label="Informática">
                        <option value="Informática e Gestão de Sistemas Informáticos">Informática e Gestão de Sistemas Informáticos</option>
                      </optgroup>
                      <optgroup label="Eletricidade, Eletrónica e Telecomunicações">
                        <option value="Eletrónica e Telecomunicações">Eletrónica e Telecomunicações</option>
                      </optgroup>
                      <optgroup label="Administração e Serviços">
                        <option value="Contabilidade e Gestão">Contabilidade e Gestão</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Classe Pretendida *</label>
                    <select name="classePretendida" value={formData.classePretendida} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
                      <option value="">Selecione</option>
                      <option value="10ª Classe">10ª Classe</option>
                      <option value="11ª Classe">11ª Classe</option>
                      <option value="12ª Classe">12ª Classe</option>
                      <option value="13ª Classe">13ª Classe</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem (opcional)</label>
                  <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} rows="4"
                    placeholder="Deixe aqui qualquer informação adicional..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"></textarea>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">Documentos (Opcional)</h3>
                  <p className="text-sm text-gray-600">Pode anexar documentos agora ou enviar posteriormente na matrícula oficial</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">BI do Estudante</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'biEstudante')} accept=".pdf,.jpg,.png,.jpeg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                      {documents.biEstudante && <p className="text-xs text-green-600 mt-1">✓ {documents.biEstudante.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">BI do Pai</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'biPai')} accept=".pdf,.jpg,.png,.jpeg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                      {documents.biPai && <p className="text-xs text-green-600 mt-1">✓ {documents.biPai.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">BI da Mãe</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'biMae')} accept=".pdf,.jpg,.png,.jpeg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                      {documents.biMae && <p className="text-xs text-green-600 mt-1">✓ {documents.biMae.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Certificado 9ª Classe</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'certificado')} accept=".pdf,.jpg,.png,.jpeg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                      {documents.certificado && <p className="text-xs text-green-600 mt-1">✓ {documents.certificado.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Foto do Estudante</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'foto')} accept=".jpg,.png,.jpeg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                      {documents.foto && <p className="text-xs text-green-600 mt-1">✓ {documents.foto.name}</p>}
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  Enviar Pré-Inscrição
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>
    );
  } catch (error) {
    console.error('PreInscricaoApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PreInscricaoApp />);