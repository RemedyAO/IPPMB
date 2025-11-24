function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navigateToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `index.html#${sectionId}`;
      }
      setIsMenuOpen(false);
    };

    return (
      <header className="bg-white shadow-md sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[var(--secondary-color)] bg-opacity-10 flex items-center justify-center">
                <div className="icon-graduation-cap text-2xl text-[var(--primary-color)]"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--primary-color)]">Bondo Matuatunguila</h1>
                <p className="text-xs text-[var(--text-secondary)]">Família vamos construir</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigateToSection('inicio')} className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition">
                Início
              </button>
              <button onClick={() => navigateToSection('sobre')} className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition">
                Sobre Nós
              </button>
              <button onClick={() => navigateToSection('cursos')} className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium transition">
                Cursos
              </button>
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
              <nav className="flex flex-col space-y-4">
                <button onClick={() => navigateToSection('inicio')} className="text-left text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium">
                  Início
                </button>
                <button onClick={() => navigateToSection('sobre')} className="text-left text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium">
                  Sobre Nós
                </button>
                <button onClick={() => navigateToSection('cursos')} className="text-left text-[var(--text-primary)] hover:text-[var(--primary-color)] font-medium">
                  Cursos
                </button>
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