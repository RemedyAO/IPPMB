function CursoCFBApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Ciências Físicas e Biológicas
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <span className="icon-flask-conical text-4xl text-[var(--primary-color)] mr-4"></span>
                <h2 className="text-2xl font-semibold">Sobre o Curso</h2>
              </div>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                O curso de Ciências Físicas e Biológicas prepara os estudantes para carreiras 
                nas áreas de Medicina, Engenharia, Biologia e outras ciências naturais.
              </p>
              <h3 className="text-xl font-semibold mb-3">Disciplinas Principais:</h3>
              <ul className="space-y-2 text-[var(--text-secondary)] mb-6">
                <li>• Física</li>
                <li>• Química</li>
                <li>• Biologia</li>
                <li>• Matemática</li>
              </ul>
              <a href="matricula.html" className="btn-primary">Fazer Matrícula</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('CursoCFBApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CursoCFBApp />);