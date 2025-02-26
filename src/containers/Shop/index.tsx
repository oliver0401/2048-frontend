import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import { IoArrowBack } from 'react-icons/io5';
import Tabs from '../../components/Tabs';
import { useMainContext } from '../../context/MainContext';
import { PATH, TOKEN } from '../../consts';
import ItemsTab from './components/ItemsTab'; // Import the new ItemsTab component
import BorderSizeTab from './components/BorderSizeTab'; // Import the new BorderSizeTab component
import ThemeTab from './components/ThemeTab'; // Import the new ThemeTab component
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

export const ShopContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    price: number;
    type: 'item' | 'theme' | 'border';
    id?: string;
  } | null>(null);
  const { user, handleBuyTheme } = useMainContext();
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

  const [themeId, setThemeId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handlePurchaseTheme = async (id: string) => {
    setThemeId(id);
    setIsModalOpen(true);
  };

  const tokens = useMemo(
    () => [
      TOKEN.PUSDT,
      TOKEN.BUSDT,
      TOKEN.AUSDT,
      TOKEN.PUSDC,
      TOKEN.BUSDC,
      TOKEN.AUSDC,
    ],
    [],
  );

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
        content: <ThemeTab handlePurchase={handlePurchaseTheme} />,
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Purchase"
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {tokens.map((tk) => (
              <div
                key={tk.name}
                onClick={() => setToken(tk.name)}
                className={`flex items-center justify-center gap-4 p-3 rounded-md ${
                  token === tk.name
                    ? 'border-2 border-primary/50 dark:border-primary-dark/50'
                    : 'border border-primary/50 dark:border-primary-dark/50 hover:bg-primary/5 dark:hover:bg-primary-dark/5'
                } transition-all`}
              >
                {tk.icon}
              </div>
            ))}
          </div>
          <div className="text-primary dark:text-primary-dark">
            Current Balance: <span className="font-bold">100 USDT</span>
          </div>
          <div className="text-primary dark:text-primary-dark">
            Purchase Price: <span className="font-bold">1 USDT</span>
          </div>
          <Button onClick={() => setIsModalOpen(false)} className="w-full">
            Purchase
          </Button>
        </div>
      </Modal>
    </div>
  );
};
