function DocumentViewer({ document, onClose }) {
  try {
    if (!document) return null;

    const isImage = document.type?.startsWith('image/');
    const isPDF = document.type === 'application/pdf';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{document.name}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <div className="icon-x text-2xl"></div>
            </button>
          </div>
          
          <div className="mb-4">
            {isImage && (
              <img src={document.data} alt={document.name} className="w-full h-auto rounded-lg" />
            )}
            {isPDF && (
              <iframe src={document.data} className="w-full h-[600px] rounded-lg border" title={document.name}></iframe>
            )}
            {!isImage && !isPDF && (
              <div className="text-center py-12">
                <div className="icon-file text-5xl text-gray-400 mb-4"></div>
                <p className="text-gray-600 mb-4">Pré-visualização não disponível para este tipo de ficheiro</p>
                <a href={document.data} download={document.name} className="btn-primary">
                  Fazer Download
                </a>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 justify-end border-t pt-4">
            <a href={document.data} download={document.name} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Fazer Download
            </a>
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DocumentViewer error:', error);
    return null;
  }
}