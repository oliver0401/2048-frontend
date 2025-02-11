import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="flex flex-col items-center justify-start w-full gap-3">
      {/* Tab Navigation */}
      <div className="flex mb-4 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`p-2 text-primary-dark dark:text-primary-dark ${activeTab === tab.label ? 'font-bold border-b-2 border-primary-dark dark:border-primary-dark' : ''}`}
            style={{width: `${100 / tabs.length}%`}}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}

          </button>
        ))}
      </div>

      {/* Tab Content with Sliding Effect */}
      <div className="tab-content w-full">
        {tabs.map((tab) => (
          activeTab === tab.label && (
            <div key={tab.label} className="slide-in w-full">
              {tab.content}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Tabs; 