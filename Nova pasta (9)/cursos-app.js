function CursosApp() {
  try {
    const courses = [
      {
        area: 'Saúde',
        icon: 'heart-pulse',
        color: 'bg-red-100 text-red-600',
        cursos: [
          { name: 'Análises Clínicas', desc: 'Formação em técnicas laboratoriais e análises médicas' },
          { name: 'Enfermagem', desc: 'Cuidados de saúde e assistência médica profissional' }
        ]
      },
      {
        area: 'Construção Civil',
        icon: 'hard-hat',
        color: 'bg-orange-100 text-orange-600',
        cursos: [
          { name: 'Desenhador Projectista', desc: 'Elaboração de projectos e desenhos técnicos' }
        ]
      },
      {
        area: 'Informática',
        icon: 'monitor',
        color: 'bg-blue-100 text-blue-600',
        cursos: [
          { name: 'Informática e Gestão de Sistemas Informáticos', desc: 'Desenvolvimento e gestão de sistemas tecnológicos' }
        ]
      },
      {
        area: 'Eletricidade, Eletrónica e Telecomunicações',
        icon: 'zap',
        color: 'bg-yellow-100 text-yellow-600',
        cursos: [
          { name: 'Eletrónica e Telecomunicações', desc: 'Sistemas eletrónicos e redes de comunicação' }
        ]
      },
      {
        area: 'Administração e Serviços',
        icon: 'briefcase',
        color: 'bg-green-100 text-green-600',
        cursos: [
          { name: 'Contabilidade e Gestão', desc: 'Gestão financeira e administrativa empresarial' }
        ]
      }
    ];

    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[var(--bg-light)] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">Nossos Cursos</h1>
              <p className="text-xl text-[var(--text-secondary)]">Escolha a área que melhor se adapta aos seus objetivos</p>
            </div>

            <div className="space-y-12">
              {courses.map((area, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${area.color}`}>
                      <div className={`icon-${area.icon} text-3xl`}></div>
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">{area.area}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {area.cursos.map((curso, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{curso.name}</h3>
                        <p className="text-[var(--text-secondary)] mb-4">{curso.desc}</p>
                        <a href="pre-inscricao.html" className="inline-block px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition">
                          Fazer Pré-Inscrição
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('CursosApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CursosApp />);