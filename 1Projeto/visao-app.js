function VisaoApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Nossa Visão
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <span className="icon-eye text-5xl text-[var(--primary-color)]"></span>
              </div>
              <p className="text-xl text-center text-[var(--text-secondary)] leading-relaxed">
                Ser reconhecido como instituição de referência no ensino secundário em Angola, 
                destacando-se pela qualidade educativa, inovação pedagógica e formação de 
                líderes preparados para construir um futuro melhor para o país.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('VisaoApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<VisaoApp />);