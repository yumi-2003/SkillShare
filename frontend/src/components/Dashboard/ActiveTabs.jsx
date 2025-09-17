import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const ActiveTabs = ({ tabs, storageKeys = "activeTab" }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    sessionStorage.setItem(storageKeys, activeTab);
  }, [activeTab, storageKeys]);

  return (
    <div className="w-full">
      <div className="flex gap-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-gray-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.icon && <tab.icon size={18} />}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
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
