import React from 'react';
import { IoHammerSharp } from 'react-icons/io5';
import { FaBolt } from 'react-icons/fa';
import { GiUpgrade } from 'react-icons/gi';
import { useMainContext } from '../../context/MainContext';
import { MOUSE } from '../../consts';
import { ItemBoard } from '../ItemBoard';
import { toast } from 'react-toastify';

const Footer: React.FC = () => {
  const {
    cursor,
    setCursor,
    onPowerupOpen,
    powerupStatus,
    setPowerupStatus,
    user,
    handleUpdateUser,
    itemUsed,
    setItemUsed,
  } = useMainContext();
  return (
    <div className="fixed bottom-0 w-full grid grid-cols-3 border-t-2 border-primary dark:border-primary-dark">
      <ItemBoard
        onClick={() => {
          if (user?.hammer && user.hammer > 0) {
            setCursor(cursor === MOUSE.Hammer ? MOUSE.Default : MOUSE.Hammer);
          }
        }}
        icon={<IoHammerSharp />}
        count={user?.hammer || 0}
      />
      <ItemBoard
        onClick={() => {
          if (itemUsed.upgrade) {
            toast.info('Already used Upgrade!');
          }
          if (!itemUsed.upgrade && user?.upgrade && user?.upgrade > 0) {
            setCursor(cursor === MOUSE.X2 ? MOUSE.Default : MOUSE.X2);
          }
        }}
        icon={<GiUpgrade />}
        count={user?.upgrade || 0}
      />
      <ItemBoard
        onClick={() => {
          if (itemUsed.powerup) {
            toast.info('Already used Power Up!');
          }
          if (!itemUsed.powerup && user?.powerup && user?.powerup > 0) {
            setPowerupStatus({
              enabled: true,
              currentStart:
                JSON.parse(localStorage.getItem('react-2048') || '{}').count ||
                0,
            });
            onPowerupOpen();
            handleUpdateUser({ powerup: user?.powerup ? user?.powerup - 1 : 0 });
            setItemUsed({ ...itemUsed, powerup: true });
          }
        }}
        icon={<FaBolt />}
        count={user?.powerup || 0}
        checktatus
        status={powerupStatus.enabled}
      />
    </div>
  );
};

export default Footer;
