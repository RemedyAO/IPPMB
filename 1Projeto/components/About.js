function About() {
  try {
    return (
      <section id="sobre" className="py-20 bg-white" data-name="about" data-file="components/About.js">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Sobre Nós</h2>
              <p className="text-xl text-[var(--text-secondary)]">
                Conheça a nossa missão e visão educacional
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <div className="icon-target text-2xl text-green-600"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Nossa Missão</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Proporcionar educação de qualidade, formando cidadãos conscientes e preparados para os desafios do futuro, 
                  com valores éticos e competências académicas sólidas.
                </p>
              </div>
              <div className="card">
                <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <div className="icon-eye text-2xl text-purple-600"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Nossa Visão</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Ser uma instituição de referência em Angola, reconhecida pela excelência educacional, 
                  inovação pedagógica e compromisso com o desenvolvimento integral dos nossos estudantes.
                </p>
              </div>
            </div>
            
          </div>

        </div>
        <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6"></h2>
                        <p className="text-[var(--text-secondary)] text-lg mb-6">
                            O Bondo Matuatunguila é uma instituição de ensino comprometida com a excelência académica 
                            e o desenvolvimento integral dos nossos alunos.
                        </p>
                        <p className="text-[var(--text-secondary)] text-lg mb-6">
                            Com um corpo docente qualificado e infraestruturas modernas, proporcionamos um ambiente 
                            propício ao aprendizado e ao crescimento pessoal.
                        </p>
                        <button className="btn-primary">Saber Mais</button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">500+</div>
                            <p className="text-[var(--text-secondary)]">Alunos</p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">30+</div>
                            <p className="text-[var(--text-secondary)]">Professores</p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">15+</div>
                            <p className="text-[var(--text-secondary)]">Anos</p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">98%</div>
                            <p className="text-[var(--text-secondary)]">Aprovação</p>
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