import React from 'react';
import Button from '../../../components/Button';
import { api } from '../../../utils/api';

interface CheckoutFormProps {
  amount: number;
  itemType: 'item' | 'theme' | 'border';
  itemId?: string;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  itemType,
  itemId,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // Create checkout session
      const { data } = await api().post('/payment/create-checkout', {
        amount,
        itemType,
        itemId,
      });

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full"
      color="primary"
    >
      {loading ? 'Processing...' : 'Proceed to Checkout'}
    </Button>
  );
};

export default CheckoutForm; 