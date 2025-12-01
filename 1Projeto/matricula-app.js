function MatriculaApp() {
  try {
    const [formData, setFormData] = React.useState({
      nomeCompleto: '',
      dataNascimento: '',
      genero: '',
      biEstudante: '',
      biPai: '',
      biMae: '',
      telefone: '',
      email: '',
      endereco: '',
      cursoPretendido: '',
      classePretendida: '',
      certificado9Classe: '',
      atestadoMedico: '',
      cartaoVacinas: '',
      fotoEstudante: ''
    });

    const [alert, setAlert] = React.useState(null);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        await trickleCreateObject('matricula', formData);
        setAlert({ message: 'Matrícula enviada com sucesso! Entraremos em contacto em breve.', type: 'success' });
        setFormData({
          nomeCompleto: '', dataNascimento: '', genero: '', biEstudante: '', biPai: '', biMae: '',
          telefone: '', email: '', endereco: '', cursoPretendido: '', classePretendida: '',
          certificado9Classe: '', atestadoMedico: '', cartaoVacinas: '', fotoEstudante: ''
        });
      } catch (error) {
        console.error('Submit error:', error);
        setAlert({ message: 'Erro ao enviar matrícula. Por favor, tente novamente.', type: 'error' });
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BI do Estudante *</label>
                    <input type="text" name="biEstudante" value={formData.biEstudante} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BI do Pai *</label>
                    <input type="text" name="biPai" value={formData.biPai} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BI da Mãe *</label>
                    <input type="text" name="biMae" value={formData.biMae} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone *</label>
                    <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
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
                      <option value="Ciências Físicas e Biológicas">Ciências Físicas e Biológicas</option>
                      <option value="Ciências Económicas e Jurídicas">Ciências Económicas e Jurídicas</option>
                      <option value="Ciências Humanas">Ciências Humanas</option>
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
                      <input type="text" name="certificado9Classe" value={formData.certificado9Classe} onChange={handleChange} required placeholder="Insira aqui"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Atestado Médico *</label>
                      <input type="text" name="atestadoMedico" value={formData.atestadoMedico} onChange={handleChange} required placeholder="Insira aqui"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cartão de Vacinas *</label>
                      <input type="text" name="cartaoVacinas" value={formData.cartaoVacinas} onChange={handleChange} required placeholder="Insira aqui"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Foto do Estudante *</label>
                      <input type="text" name="fotoEstudante" value={formData.fotoEstudante} onChange={handleChange} required placeholder="Insira aqui"
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