function EnrollmentHeader({ title }) {
    const logoUrl = localStorage.getItem('schoolLogo') || '';

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {logoUrl && (
                            <img src={logoUrl} alt="Logo" className="h-12 w-12 object-contain" />
                        )}
                        <div>
                            <div className="text-xl font-bold" style={{
                                background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Bondo Matuatunguila
                            </div>
                            <div className="text-sm text-[var(--text-secondary)]">{title}</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => window.location.href = 'index.html'}
                        className="flex items-center gap-2 text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
                    >
                        <div className="icon-arrow-left"></div>
                        <span className="hidden sm:inline">Voltar</span>
                    </button>
                </div>
            </div>
        </header>
    );
}