function TransportesApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Transportes Escolares
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <span className="icon-bus text-4xl text-[var(--primary-color)] mr-4"></span>
                <h2 className="text-2xl font-semibold">Serviço de Transporte</h2>
              </div>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                Oferecemos serviço de transporte escolar seguro e confiável para os nossos estudantes, 
                cobrindo várias zonas de Luanda.
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Viaturas modernas e seguras</li>
                <li>• Motoristas experientes e treinados</li>
                <li>• Rotas que cobrem toda Luanda</li>
                <li>• Sistema de rastreamento GPS</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('TransportesApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TransportesApp />);