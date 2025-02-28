import React from 'react';
import Text from '../../../components/Text';
import './ThemeTab.css';
import { useThemeTab } from '../../../hooks/useThemeTab';

interface ThemeComponentProps {
  title: string;
  description: string;
  image: string;
  uuid: string;
  owned: boolean;
  handleBuyTheme: (themeId: string) => Promise<void>;
}
const ThemeComponent: React.FC<ThemeComponentProps> = ({
  title,
  description,
  image,
  uuid,
  owned,
  handleBuyTheme,
}) => {
  return (
    <div className="flex items-center w-full min-h-40 border-2 border-primary dark:border-primary-dark rounded-2xl p-2 gap-4">
      <div className="relative">
        {owned && (
          <div className="absolute -left-[6px] -top-[6px] overflow-hidden min-w-20 min-h-20 max-w-20 bg-transparent flex items-center justify-center">
            <div className="z-20 relative -top-[8.5px] -left-[8.5px] bg-blue-600 text-white text-xs font-bold min-w-28 h-6 text-center transform -rotate-45 flex items-center justify-center">
              Purchased
            </div>
            <div className="z-10 absolute top-0 right-0 min-w-[6px] min-h-[6px] bg-blue-800"></div>
            <div className="z-10 absolute bottom-0 left-0 min-w-[6px] min-h-[6px] bg-blue-800"></div>
          </div>
        )}
        <img
          src={image}
          alt="theme"
          className="min-w-40 min-h-40 max-w-40 max-h-40"
        />
      </div>
      <div className="w-full flex flex-col justify-start py-2 gap-2">
        <Text as="h2" color="tile32" fontSize={24} className="font-semibold">
          {title}
        </Text>
        <Text
          as="div"
          color="primary"
          fontSize={16}
          className="text-left font-bold"
        >
          {description}
        </Text>
        <div className="w-full flex justify-end">
          {!owned && (
            <button
              onClick={() => handleBuyTheme(uuid)}
              className="hover:scale-105 bg-transparent transition-transform max-w-min flex items-center gap-2 text-nowrap font-bold text-primary dark:text-primary-dark border-2 border-primary dark:border-primary-dark rounded-md px-2 py-1"
            >
              Get For 1$
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const ThemeTab: React.FC<{
  handlePurchaseModal: (themeId: string) => Promise<void>;
}> = ({ handlePurchaseModal }) => {
  const { themes } = useThemeTab();
  return (
    <div className="w-full flex flex-col gap-2">
      {themes.map((theme) => (
        <ThemeComponent
          key={theme.uuid}
          title={theme.title}
          description={theme.description}
          image={theme[2].sm}
          uuid={theme.uuid}
          owned={theme.owned}
          handleBuyTheme={handlePurchaseModal}
        />
      ))}
    </div>
  );
};

export default ThemeTab;
