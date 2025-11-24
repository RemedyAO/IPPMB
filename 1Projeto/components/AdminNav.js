function AdminNav({ user }) {
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <div className="icon-settings text-xl text-purple-600"></div>
            </div>
            <div>
              <p className="font-bold text-gray-800">Painel Administrativo</p>
              <p className="text-xs text-gray-600">{user?.objectData.FullName}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <div className="icon-log-out text-lg"></div>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
}