function NoticiasApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Notícias
            </h1>
            <div className="grid gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Matrícula 2025 Aberta</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Estão abertas as matrículas para o ano lectivo 2025. 
                  Faça já a sua inscrição online.
                </p>
                <a href="matricula.html" className="btn-primary">Fazer Matrícula</a>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Novos Cursos Disponíveis</h3>
                <p className="text-[var(--text-secondary)]">
                  Conheça os cursos oferecidos: Ciências Físicas e Biológicas, 
                  Ciências Económicas e Jurídicas, e Ciências Humanas.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('NoticiasApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NoticiasApp />);