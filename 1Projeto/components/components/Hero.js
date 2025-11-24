function Hero() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slides = [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
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
                        <button className="btn-primary bg-white text-[var(--primary-color)] hover:bg-gray-100">
                            Fazer Matrícula Online
                        </button>
                        <button className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-color)]">
                            Saber Mais
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