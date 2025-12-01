function OrgaosApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Órgãos do Instituto
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Direcção</h3>
                <p className="text-[var(--text-secondary)]">
                  Responsável pela gestão geral do instituto e definição de estratégias.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Conselho Pedagógico</h3>
                <p className="text-[var(--text-secondary)]">
                  Coordena as actividades académicas e pedagógicas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Secretaria</h3>
                <p className="text-[var(--text-secondary)]">
                  Gere documentação e processos administrativos.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('OrgaosApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OrgaosApp />);