function MatriculaApp() {
  try {
    const [formData, setFormData] = React.useState({
      nomeCompleto: '', dataNascimento: '', genero: '', biEstudante: '',
      biPai: '', biMae: '', telefone: '', email: '', endereco: '',
      cursoPretendido: '', classePretendida: ''
    });
    const [documents, setDocuments] = React.useState({
      certificado9Classe: null, atestadoMedico: null,
      cartaoVacinas: null, fotoEstudante: null
    });
    const [alert, setAlert] = React.useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      if (name === 'telefone') {
        const numbersOnly = value.replace(/[^0-9]/g, '');
        setFormData({ ...formData, [name]: numbersOnly });
        return;
      }
      
      if (name === 'biEstudante' || name === 'biPai' || name === 'biMae') {
        const hexOnly = value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 12).toUpperCase();
        setFormData({ ...formData, [name]: hexOnly });
        return;
      }
      
      setFormData({ ...formData, [name]: value });
    };
    
    const validateForm = () => {
      if (formData.nomeCompleto.trim().length < 4) {
        setAlert({ message: 'O nome do estudante deve ter pelo menos 4 caracteres.', type: 'error' });
        return false;
      }
      
      if (formData.biEstudante.length !== 12) {
        setAlert({ message: 'O BI do estudante deve ter exatamente 12 caracteres hexadecimais.', type: 'error' });
        return false;
      }
      
      if (formData.biPai.length !== 12) {
        setAlert({ message: 'O BI do pai deve ter exatamente 12 caracteres hexadecimais.', type: 'error' });
        return false;
      }
      
      if (formData.biMae.length !== 12) {
        setAlert({ message: 'O BI da mãe deve ter exatamente 12 caracteres hexadecimais.', type: 'error' });
        return false;
      }
      
      if (formData.telefone.length < 9) {
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.nomeCompleto || !formData.email || !formData.telefone) {
        setAlert({ message: 'Preencha todos os campos obrigatórios', type: 'error' });
        return;
      }
      
      if (!validateForm()) {
        return;
      }
      
      try {
        const enrollmentData = {
          ...formData,
          documents: JSON.stringify(documents),
          status: 'Pendente',
          submittedAt: new Date().toISOString()
        };
        
        const result = await trickleCreateObject('matricula', enrollmentData);
        if (result) {
          setAlert({ message: 'Matrícula enviada com sucesso!', type: 'success' });
          setTimeout(() => window.location.href = 'check-status.html', 2000);
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
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-2">Matrícula Online</h1>
              <p className="text-center text-[var(--text-secondary)] mb-8">Preencha o formulário abaixo para realizar sua matrícula</p>

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BI do Estudante * (12 caracteres hex)</label>
                    <input type="text" name="biEstudante" value={formData.biEstudante} onChange={handleChange} required
                      maxLength="12" placeholder="Ex: 123456789ABC"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] uppercase" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BI do Pai * (12 caracteres hex)</label>
                    <input type="text" name="biPai" value={formData.biPai} onChange={handleChange} required
                      maxLength="12" placeholder="Ex: 123456789ABC"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] uppercase" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BI da Mãe * (12 caracteres hex)</label>
                    <input type="text" name="biMae" value={formData.biMae} onChange={handleChange} required
                      maxLength="12" placeholder="Ex: 123456789ABC"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] uppercase" />
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Endereço *</label>
                  <textarea name="endereco" value={formData.endereco} onChange={handleChange} required rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"></textarea>
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

                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">Documentos Necessários</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Certificado da 9ª Classe *</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'certificado9Classe')} required accept=".pdf,.jpg,.png"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Atestado Médico *</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'atestadoMedico')} required accept=".pdf,.jpg,.png"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cartão de Vacinas *</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'cartaoVacinas')} required accept=".pdf,.jpg,.png"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Foto do Estudante *</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'fotoEstudante')} required accept=".jpg,.png"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  Submeter Matrícula
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
    console.error('MatriculaApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MatriculaApp />);