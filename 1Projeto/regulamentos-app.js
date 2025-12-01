function RegulamentosApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Regulamentos
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Regulamento Interno</h3>
                <p className="text-[var(--text-secondary)]">
                  Define as normas de conduta e funcionamento do instituto.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Regulamento Académico</h3>
                <p className="text-[var(--text-secondary)]">
                  Estabelece as regras para avaliação, frequência e aprovação.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Código de Conduta</h3>
                <p className="text-[var(--text-secondary)]">
                  Orienta o comportamento de estudantes, professores e funcionários.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('RegulamentosApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegulamentosApp />);