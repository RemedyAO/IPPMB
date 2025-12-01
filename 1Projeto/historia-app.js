function HistoriaApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Nossa História
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                O Instituto Bondo Matuatunguila foi fundado com o objetivo de proporcionar 
                educação de qualidade e formar cidadãos capazes de contribuir para o 
                desenvolvimento de Angola.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Ao longo dos anos, temos mantido o compromisso com a excelência académica 
                e a formação integral dos nossos estudantes, preparando-os para os desafios 
                do futuro.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('HistoriaApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HistoriaApp />);