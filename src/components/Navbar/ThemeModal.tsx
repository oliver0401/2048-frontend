import React, { useState } from 'react';
import Modal from '../Modal';
import { useMainContext } from '../../context';
import { FaCheck } from 'react-icons/fa';
import { preloadImages } from '../../utils/preloadImg';
import { CiImageOn } from 'react-icons/ci';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ThemeModal = ({ isOpen, onClose }: ThemeModalProps) => {
  const { theme, setTheme, themes, setThemeImages } = useMainContext();
  const [preloading, setPreloading] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Theme">
      {preloading && (
        <div className="z-20 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 font-bold text-primary-dark bg-black/80 rounded-md">
          <CiImageOn className="animate-bounce" size={32} />
          Importing images...
        </div>
      )}
      <div className="relative grid grid-cols-3 gap-4 rounded-md">
        <div className="flex flex-col items-center gap-2 relative">
          <div
            className="relative min-w-32 min-h-32 max-w-32 max-h-32"
            onClick={() => {
              setTheme('default');
              setThemeImages({
                2: '',
                4: '',
                8: '',
                16: '',
                32: '',
                64: '',
                128: '',
                256: '',
                512: '',
                1024: '',
                2048: '',
                4096: '',
                8192: '',
              });
            }}
          >
            <div className="bg-tile-2 dark:bg-tile-2-dark rounded-2xl text-primary dark:text-primary-dark w-32 h-32 flex items-center justify-center text-[64px] font-bold">
              2
            </div>
            {theme === 'default' && (
              <FaCheck
                size={24}
                className="absolute bottom-2 right-2 text-white bg-green-500 rounded-full p-1"
              />
            )}
          </div>
          <h1 className="text-nowrap text-primary dark:text-primary-dark font-bold">
            Basic
          </h1>
        </div>
        {themes.map((t) => (
          <div key={t.uuid} className="flex flex-col items-center gap-2">
            <div
              className="relative max-w-32 max-h-32 min-w-32 min-h-32"
              onClick={async () => {
                setTheme(t.uuid);
                setThemeImages({
                  2: t[2],
                  4: t[4],
                  8: t[8],
                  16: t[16],
                  32: t[32],
                  64: t[64],
                  128: t[128],
                  256: t[256],
                  512: t[512],
                  1024: t[1024],
                  2048: t[2048],
                  4096: t[4096],
                  8192: t[8192],
                });
                setPreloading(true);
                try {
                  await preloadImages([
                    t[2],
                    t[4],
                    t[8],
                    t[16],
                    t[32],
                    t[64],
                    t[128],
                    t[256],
                    t[512],
                    t[1024],
                    t[2048],
                    t[4096],
                    t[8192],
                  ]);
                } catch (error) {
                  console.error("Failed to preload images:", error);
                } finally {
                  setPreloading(false);
                }
              }}
            >
              <img src={t[2]} alt={t.title} className="max-w-32 max-h-32" />
              {theme === t.uuid && (
                <FaCheck
                  size={24}
                  className="absolute bottom-2 right-2 text-white bg-green-500 rounded-full p-1"
                />
              )}
            </div>
            <h1 className="text-wrap text-center text-primary dark:text-primary-dark font-bold">
              {t.title}
            </h1>
          </div>
        ))}
      </div>
    </Modal>
  );
};
