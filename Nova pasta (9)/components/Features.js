function Features() {
  try {
    const features = [
      { icon: 'book-open', title: 'Matrícula Digital', desc: 'Faça sua matrícula online de forma rápida, segura e intuitiva.' },
      { icon: 'credit-card', title: 'Pagamento Online', desc: 'Pague propinas e taxas através de Multicaixa, BFA e Paypal.' },
      { icon: 'bell', title: 'Notificações', desc: 'Receba comunicados e avisos importantes em tempo real.' },
      { icon: 'users', title: 'Gestão Académica', desc: 'Acompanhe presenças, horários e calendário escolar.' },
      { icon: 'file-text', title: 'Consulta de Notas', desc: 'Acesse suas notas e avaliações a qualquer momento.' },
      { icon: 'shield-check', title: 'Sistema Seguro', desc: 'Seus dados protegidos com tecnologia de segurança avançada.' }
    ];

    return (
      <section className="py-20 bg-[var(--bg-light)]" data-name="features" data-file="components/Features.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Funcionalidades do Portal</h2>
            <p className="text-xl text-[var(--text-secondary)]">Tudo o que precisa para uma gestão escolar moderna e eficiente</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-blue-100">
                  <div className={`icon-${feature.icon} text-2xl text-[var(--primary-color)]`}></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Features component error:', error);
    return null;
  }
}