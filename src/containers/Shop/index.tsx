import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import { IoArrowBack } from 'react-icons/io5';
import Tabs from '../../components/Tabs';
import { useMainContext } from '../../context/MainContext';
import { PATH } from '../../consts';
import ItemsTab from './components/ItemsTab'; // Import the new ItemsTab component
import BorderSizeTab from './components/BorderSizeTab'; // Import the new BorderSizeTab component
import ThemeTab from './components/ThemeTab'; // Import the new ThemeTab component
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import CheckoutForm from './components/CheckoutForm';

export const ShopContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    price: number;
    type: 'item' | 'theme' | 'border';
    id?: string;
  } | null>(null);
  const { user } = useMainContext();
  const navigate = useNavigate();

  const handlePurchase = (item: {
    name: string;
    price: number;
    type: 'item' | 'theme' | 'border';
    id?: string;
  }) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const tabs = useMemo(
    () => [
      {
        label: 'Items',
        content: <ItemsTab handlePurchase={handlePurchase} />,
      },
      {
        label: 'Border Size',
        content: <BorderSizeTab user={user} handlePurchase={handlePurchase} />,
      },
      {
        label: 'Theme',
        content: <ThemeTab handlePurchase={handlePurchase} />,
      },
    ],
    [user],
  );

  return (
    <div className="relative flex flex-col items-center justify-start h-[calc(100vh-144px)] w-full gap-3">
      <Tabs tabs={tabs} />
      <Button
        onClick={() => navigate(PATH.GAME)}
        className="absolute bottom-0 group w-full flex items-center justify-center gap-2"
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return to Game
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Purchase">
        <div className="w-full flex flex-col gap-4">
          {selectedItem && (
            <>
              <Text as="h2" color="tile32" fontSize={24} className="font-semibold">
                Purchase {selectedItem.name}
              </Text>
              <Text color="primary" fontSize={16}>
                Price: ${selectedItem.price / 100}
              </Text>
              <CheckoutForm
                amount={selectedItem.price}
                itemType={selectedItem.type}
                itemId={selectedItem.id}
                onSuccess={() => {
                  setIsModalOpen(false);
                  setSelectedItem(null);
                }}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
