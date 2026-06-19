function About() {
  try {
    return (
      <section id="sobre" className="py-20 bg-white" data-name="about" data-file="components/About.js">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6">Sobre Nós</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              O Bondo Matuatunguila é uma instituição de ensino comprometida com a excelência académica e o desenvolvimento integral dos nossos estudantes. Com uma equipa dedicada de profissionais qualificados, oferecemos um ambiente educativo moderno e acolhedor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">500+</div>
                <p className="text-[var(--text-secondary)]">Estudantes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">50+</div>
                <p className="text-[var(--text-secondary)]">Professores</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">10+</div>
                <p className="text-[var(--text-secondary)]">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}