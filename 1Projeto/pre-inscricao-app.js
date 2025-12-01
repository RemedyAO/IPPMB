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

    const [alert, setAlert] = React.useState(null);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        await trickleCreateObject('pre_inscricao', formData);
        setAlert({ message: 'Pré-inscrição enviada com sucesso! Entraremos em contacto em breve.', type: 'success' });
        setFormData({
          nomeCompleto: '', dataNascimento: '', genero: '', telefone: '',
          email: '', cursoPretendido: '', classePretendida: '', mensagem: ''
        });
      } catch (error) {
        console.error('Submit error:', error);
        setAlert({ message: 'Erro ao enviar pré-inscrição. Por favor, tente novamente.', type: 'error' });
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem (opcional)</label>
                  <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} rows="4"
                    placeholder="Deixe aqui qualquer informação adicional..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"></textarea>
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
