function Footer() {
  try {
    return (
      <footer className="bg-[var(--text-primary)] text-white py-12" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bondo Matuatunguila</h3>
              <p className="text-gray-300 mb-2">Família vamos construir</p>
              <p className="text-gray-400 text-sm">
                Educação de qualidade para um futuro melhor
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="pre-inscricao.html" className="text-gray-300 hover:text-white transition">Pré-Inscrição</a></li>
                <li><a href="matricula.html" className="text-gray-300 hover:text-white transition">Matrícula</a></li>
                <li><a href="login.html" className="text-gray-300 hover:text-white transition">Portal do Estudante</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <div className="icon-mail text-lg mr-2"></div>
                  info@bindomatuatunguila.ao
                </p>
                <p className="flex items-center">
                  <div className="icon-phone text-lg mr-2"></div>
                  +244 XXX XXX XXX
                </p>
                <p className="flex items-center">
                  <div className="icon-map-pin text-lg mr-2"></div>
                  Luanda, Angola
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Bindo Matuatunguila. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}