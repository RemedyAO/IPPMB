function Features() {
  try {
    const features = [
      {
        icon: 'user-check',
        title: 'Matrícula Digital',
        description: 'Faça a sua matrícula online de forma rápida, segura e sem filas.'
      },
      {
        icon: 'credit-card',
        title: 'Pagamento Online',
        description: 'Pague propinas e taxas através de Multicaixa, BFA Pay e outros.'
      },
      {
        icon: 'file-text',
        title: 'Consulta de Notas',
        description: 'Acesse suas notas e avaliações a qualquer momento pelo portal.'
      },
      {
        icon: 'bell',
        title: 'Notificações',
        description: 'Receba comunicados e avisos importantes em tempo real.'
      },
      {
        icon: 'calendar',
        title: 'Gestão Académica',
        description: 'Acompanhe presenças, horários e calendário escolar online.'
      },
      {
        icon: 'shield-check',
        title: 'Sistema Seguro',
        description: 'Seus dados protegidos com tecnologia de segurança avançada.'
      }
    ];

    return (
      <section id="cursos" className="py-20 bg-[var(--bg-light)]" data-name="features" data-file="components/Features.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades do Portal</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              Tudo o que precisa para uma gestão escolar moderna e eficiente
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-16 h-16 rounded-lg bg-[var(--secondary-color)] bg-opacity-10 flex items-center justify-center mb-4">
                  <div className={`icon-${feature.icon} text-2xl text-[var(--primary-color)]`}></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
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