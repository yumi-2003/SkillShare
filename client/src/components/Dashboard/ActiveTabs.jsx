import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const ActiveTabs = ({
  tabs,
  storageKeys = "activeTab",
  marginTop = "mt-2",
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    sessionStorage.setItem(storageKeys, activeTab);
  }, [activeTab, storageKeys]);

  return (
    <div className={`w-full ${marginTop}`}>
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 sm:gap-6 border-b px-2 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-gray-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab.icon && <tab.icon size={18} />}
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="animate-fadeIn">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ActiveTabs;
