function PaymentModal({ onClose, studentId, onSuccess }) {
  const [amount, setAmount] = React.useState('');
  const [method, setMethod] = React.useState('');
  const [processing, setProcessing] = React.useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const reference = 'PAY' + Date.now();
      await trickleCreateObject('payment', {
        StudentId: studentId,
        Amount: parseFloat(amount),
        PaymentType: 'tuition',
        PaymentMethod: method,
        Status: 'completed',
        Reference: reference
      });

      const infoList = await trickleListObjects('student_info', 100, true);
      const studentInfo = infoList.items.find(i => i.objectData.StudentId === studentId);
      
      if (studentInfo) {
        const newBalance = (studentInfo.objectData.TuitionBalance || 0) - parseFloat(amount);
        await trickleUpdateObject('student_info', studentInfo.objectId, {
          ...studentInfo.objectData,
          TuitionBalance: Math.max(0, newBalance),
          TuitionStatus: newBalance <= 0 ? 'paid' : 'pending'
        });
      }

      alert(`Pagamento realizado com sucesso!\nReferência: ${reference}`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erro ao processar pagamento');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Fazer Pagamento</h3>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Valor (AOA)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Método de Pagamento</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Selecione...</option>
              <option value="Multicaixa">Multicaixa Express</option>
              <option value="BFA">BFA Pay</option>
              <option value="BAI">BAI Directo</option>
              <option value="Transferencia">Transferência Bancária</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={processing}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Processando...' : 'Confirmar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}