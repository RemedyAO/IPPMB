function ContabilidadeApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Contabilidade
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <span className="icon-calculator text-4xl text-[var(--primary-color)] mr-4"></span>
                <h2 className="text-2xl font-semibold">Serviços Financeiros</h2>
              </div>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                A secção de contabilidade gere todas as questões financeiras relacionadas 
                com propinas, pagamentos e documentação financeira.
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Pagamento de propinas online</li>
                <li>• Emissão de recibos e comprovativos</li>
                <li>• Planos de pagamento flexíveis</li>
                <li>• Atendimento: Segunda a Sexta, 8h - 16h</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ContabilidadeApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContabilidadeApp />);