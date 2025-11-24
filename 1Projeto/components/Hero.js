function Hero() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slides = [
        'https://remedyao.github.io/Remedy/FT2.jpg',
        'https://remedyao.github.io/Remedy/FT3.jpg',
        'https://remedyao.github.io/Remedy/FT1.jpg'
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative text-white overflow-hidden h-[600px]">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        opacity: currentSlide === index ? 1 : 0,
                        backgroundImage: `url(${slide})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
            ))}
            
            <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                        Bem-vindo ao Bondo Matuatunguila
                    </h1>
                    <p className="text-2xl md:text-3xl mb-8 text-white/90 font-semibold">
                        Família vamos construir
                    </p>
                    <p className="text-xl mb-12 text-white/80">
                        Sistema de matrícula online e gestão académica para uma educação de excelência
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-[var(--primary-color)] transition">
                            Fazer Matrícula Online
                        </button>
                        <button className="px-8 py-4 bg-white text-[var(--primary-color)] rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                            Pré-Inscrição
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}