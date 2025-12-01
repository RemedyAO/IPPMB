function InstitutoApp() {
  try {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold text-center text-[var(--primary-color)] mb-8">
              O Instituto
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                O Instituto Bondo Matuatunguila é uma instituição de ensino de referência em Angola, 
                dedicada à formação integral dos jovens e ao desenvolvimento da excelência académica.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Com instalações modernas e uma equipa de professores altamente qualificados, 
                proporcionamos um ambiente de aprendizagem estimulante e acolhedor.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('InstitutoApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<InstitutoApp />);