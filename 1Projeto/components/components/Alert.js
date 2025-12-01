function Alert({ message, type = 'success', onClose }) {
  try {
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle'
    };

    const colors = {
      success: 'bg-green-50 text-green-800 border-green-200',
      error: 'bg-red-50 text-red-800 border-red-200',
      warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
    };

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border-2 shadow-lg ${colors[type]} max-w-md`} data-name="alert" data-file="components/Alert.js">
        <div className="flex items-start">
          <div className={`icon-${icons[type]} text-xl mr-3 mt-0.5`}></div>
          <div className="flex-1">
            <p className="font-medium">{message}</p>
          </div>
          <button onClick={onClose} className="ml-3">
            <div className="icon-x text-lg"></div>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Alert component error:', error);
    return null;
  }
}