function MissaoApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              Nossa Missão
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <span className="icon-target text-5xl text-[var(--primary-color)]"></span>
              </div>
              <p className="text-xl text-center text-[var(--text-secondary)] leading-relaxed">
                Proporcionar educação de excelência, formando cidadãos críticos, éticos e 
                competentes, capazes de contribuir para o desenvolvimento sustentável de Angola 
                e enfrentar os desafios do mundo contemporâneo.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('MissaoApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MissaoApp />);