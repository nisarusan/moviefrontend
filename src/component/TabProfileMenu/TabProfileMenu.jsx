// TabChooser.js
import React, { useState } from 'react';

import './TabProfileMenu.css';
const TabProfileMenu = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div>
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab ${index === activeTab ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeTab].component}
            </div>
        </div>
    );
};

export default TabProfileMenu;
