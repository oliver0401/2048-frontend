import React from 'react';
import { IoHammerSharp } from 'react-icons/io5';
import { FaBolt } from 'react-icons/fa';
import { GiUpgrade } from 'react-icons/gi';
import { useMainContext } from '../../context/MainContext';
import { MOUSE } from '../../consts';
import { ItemBoard } from '../ItemBoard';

const Footer: React.FC = () => {
  const {
    cursor,
    setCursor,
    onBoltOpen,
    boltStatus,
    setBoltStatus,
    user,
    handleUpdateUser,
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
          if (user?.hammer && user.hammer > 0) {
            setCursor(cursor === MOUSE.X2 ? MOUSE.Default : MOUSE.X2);
          }
        }}
        icon={<GiUpgrade />}
        count={user?.bomb || 0}
      />
      <ItemBoard
        onClick={() => {
          if (!boltStatus.enabled && user?.bolt && user.bolt > 0) {
            setBoltStatus({
              enabled: true,
              currentStart:
                JSON.parse(localStorage.getItem('react-2048') || '{}').count ||
                0,
            });
            onBoltOpen();
            handleUpdateUser({ bolt: user?.bolt ? user?.bolt - 1 : 0 });
          }
        }}
        icon={<FaBolt />}
        count={user?.bolt || 0}
        checktatus
        status={boltStatus.enabled}
      />
    </div>
  );
};

export default Footer;
