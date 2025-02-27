import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import { IoArrowBack } from 'react-icons/io5';
import Tabs from '../../components/Tabs';
import { useMainContext, useWeb3Context } from '../../context';
import { PATH, TOKEN } from '../../consts';
import ItemsTab from './components/ItemsTab'; // Import the new ItemsTab component
import BorderSizeTab from './components/BorderSizeTab'; // Import the new BorderSizeTab component
import ThemeTab from './components/ThemeTab'; // Import the new ThemeTab component
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { TUser } from '../../types';

export const ShopContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState({item: false, rows: false, cols: false});
  const { user, handleBuyTheme, handleUpdateUser } = useMainContext();
  const { buyItemsWithGameTokens } = useWeb3Context();
  const navigate = useNavigate();

  const handlePurchase = async (item: {
    name: string;
    price: number;
    type: 'item' | 'theme' | 'border-rows' | 'border-cols';
    quantity: Partial<TUser>
    id?: string;
  }) => {
    if(item.type === 'item')
      setIsPaying({...isPaying, item: true});
    if(item.type === 'border-rows')
      setIsPaying({...isPaying, rows: true});
    if(item.type === 'border-cols')
      setIsPaying({...isPaying, cols: true});
    try {
      console.log(item.price);
      await buyItemsWithGameTokens(item.price);
      // const quantities = ['hammer', 'upgrade', 'powerup'];

      // const updatedUser = quantities.reduce((acc, key) => {
      //   acc[key] = (user?.[key] || 0) + Number(item.quantity[key] || 0);
      //   return acc;
      // }, {});
      let updateData: Partial<TUser> = {};

      if (item.type === "item") {
        updateData = {
          hammer: Number(user?.hammer) + Number(item.quantity.hammer),
          upgrade: Number(user?.upgrade) + Number(item.quantity.upgrade),
          powerup: Number(user?.powerup) + Number(item.quantity.powerup)
        };
      }
      if (item.type === "border-rows") {
        updateData = {
          rows: Number(user?.rows) + 1,
        }
      }
      if (item.type === "border-cols") {
        updateData = {
          cols: Number(user?.cols) + 1,
        }
      }
      handleUpdateUser({
        ...updateData
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsPaying({item: false, rows: false, cols: false});
    }
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
        content: <ItemsTab handlePurchase={handlePurchase} isPaying={isPaying.item} />,
      },
      {
        label: 'Border Size',
        content: <BorderSizeTab user={user} handlePurchase={handlePurchase} isPaying={{rows: isPaying.rows, cols: isPaying.cols}}/>,
      },
      {
        label: 'Theme',
        content: <ThemeTab handlePurchase={handlePurchaseTheme} />,
      },
    ],
    [user, isPaying],
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
                className={`flex items-center justify-center gap-4 p-3 rounded-md ${token === tk.name
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
