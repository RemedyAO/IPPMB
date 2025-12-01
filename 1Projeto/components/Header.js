function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState(null);

    const navigateToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `index.html#${sectionId}`;
      }
      setIsMenuOpen(false);
      setActiveDropdown(null);
    };

    const menuItems = {
      servicos: [
        { label: 'Biblioteca', url: 'biblioteca.html' },
        { label: 'Transportes', url: 'transportes.html' },
        { label: 'Contabilidade', url: 'contabilidade.html' }
      ],
      cursos: [
        { label: 'Ciências Físicas e Biológicas', url: 'curso-cfb.html' },
        { label: 'Ciências Económicas e Jurídicas', url: 'curso-cej.html' },
        { label: 'Ciências Humanas', url: 'curso-ch.html' }
      ],
      sobre: [
        { label: 'Nossa História', url: 'historia.html' },
        { label: 'Órgãos do Instituto', url: 'orgaos.html' },
        { label: 'Regulamentos', url: 'regulamentos.html' },
        { label: 'Missão', url: 'missao.html' },
        { label: 'Visão', url: 'visao.html' }
      ]
    };

    return (
      <header className="bg-white shadow-md sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="index.html" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="icon-graduation-cap text-2xl text-[var(--primary-color)]"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--primary-color)]">Bondo Matuatunguila</h1>
                <p className="text-xs text-[var(--text-secondary)]">Família vamos construir</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigateToSection('inicio')} className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition">
                Início
              </button>

              <div className="relative" onMouseEnter={() => setActiveDropdown('servicos')} onMouseLeave={() => setActiveDropdown(null)}>
                <a href="biblioteca.html" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition flex items-center">
                  Serviços
                  <div className="icon-chevron-down text-sm ml-1"></div>
                </a>
                {activeDropdown === 'servicos' && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                    {menuItems.servicos.map(item => (
                      <a key={item.url} href={item.url} className="block px-4 py-2 text-[var(--text-primary)] hover:bg-gray-100 hover:text-[var(--primary-color)] transition">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" onMouseEnter={() => setActiveDropdown('cursos')} onMouseLeave={() => setActiveDropdown(null)}>
                <a href="curso-cfb.html" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition flex items-center">
                  Cursos
                  <div className="icon-chevron-down text-sm ml-1"></div>
                </a>
                {activeDropdown === 'cursos' && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-56 z-50">
                    {menuItems.cursos.map(item => (
                      <a key={item.url} href={item.url} className="block px-4 py-2 text-[var(--text-primary)] hover:bg-gray-100 hover:text-[var(--primary-color)] transition">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="instituto.html" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition">
                Instituto
              </a>

              <div className="relative" onMouseEnter={() => setActiveDropdown('sobre')} onMouseLeave={() => setActiveDropdown(null)}>
                <a href="historia.html" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition flex items-center">
                  Sobre Nós
                  <div className="icon-chevron-down text-sm ml-1"></div>
                </a>
                {activeDropdown === 'sobre' && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                    {menuItems.sobre.map(item => (
                      <a key={item.url} href={item.url} className="block px-4 py-2 text-[var(--text-primary)] hover:bg-gray-100 hover:text-[var(--primary-color)] transition">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="noticias.html" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition">
                Notícias
              </a>

              <a href="login.html" className="btn-primary">
                Entrar
              </a>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[var(--primary-color)]">
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-3">
                <button onClick={() => navigateToSection('inicio')} className="text-left text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium">
                  Início
                </button>
                
                <div>
                  <div className="text-left text-[var(--text-primary)] font-semibold mb-2">Serviços</div>
                  {menuItems.servicos.map(item => (
                    <a key={item.url} href={item.url} className="block pl-4 py-1 text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                      {item.label}
                    </a>
                  ))}
                </div>

                <div>
                  <div className="text-left text-[var(--text-primary)] font-semibold mb-2">Cursos</div>
                  {menuItems.cursos.map(item => (
                    <a key={item.url} href={item.url} className="block pl-4 py-1 text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                      {item.label}
                    </a>
                  ))}
                </div>

                <a href="instituto.html" className="text-left text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium">
                  Instituto
                </a>

                <div>
                  <div className="text-left text-[var(--text-primary)] font-semibold mb-2">Sobre Nós</div>
                  {menuItems.sobre.map(item => (
                    <a key={item.url} href={item.url} className="block pl-4 py-1 text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                      {item.label}
                    </a>
                  ))}
                </div>

                <a href="noticias.html" className="text-left text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium">
                  Notícias
                </a>
                <a href="login.html" className="btn-primary text-center">
                  Entrar
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}