import React, { FC } from 'react';

export interface NotificationProps {
  win: boolean;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ win, onClose }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-none z-[9999] animate-expand rounded overflow-hidden">
    <div className="absolute inset-0 bg-backdrop opacity-70 -z-10" />
    <div className="py-5 bg-transparent">
      <span className="text-[22px] text-primary">
        {win ? 'You win! Continue?' : 'Oops...Game Over!'}
      </span>
    </div>
    <button
      onClick={onClose}
      className="outline-none border-none px-4 py-2 leading-7 whitespace-nowrap rounded bg-primary text-foreground cursor-pointer transition-colors duration-300 hover:bg-secondary"
    >
      {win ? 'Continue' : 'Retry'}
    </button>
  </div>
);

export default Notification;
