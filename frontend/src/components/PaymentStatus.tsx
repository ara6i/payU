import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '../services/api';
import { PaymentStatus as PaymentStatusType } from '../types';

const PaymentStatus: React.FC = () => {
  const { txnid } = useParams<{ txnid: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PaymentStatusType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!txnid) {
        setError('Transaction ID not found');
        setLoading(false);
        return;
      }

      try {
        const paymentStatus = await verifyPayment(txnid);
        setStatus(paymentStatus);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to verify payment status');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [txnid]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="text-center">
        {status?.status === 'success' ? (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h2>
            <p className="text-gray-600 mb-2">Transaction ID: {status.txnid}</p>
            <p className="text-gray-600 mb-6">Amount: ₹{status.amount}</p>
          </>
        ) : (
          <>
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{status?.message || 'Unknown error occurred'}</p>
          </>
        )}
        <button
          onClick={handleBackToHome}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus; 