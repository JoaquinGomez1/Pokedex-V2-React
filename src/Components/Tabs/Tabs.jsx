import React, { useState } from "react";
import "./Tabs.css";

export default function Tabs(props) {
  const ChildrenArray = React.Children.toArray(props.children);
  const [currentTab, setCurrentTab] = useState(0);
  const [tabs] = useState(ChildrenArray);

  return (
    <div className='tabs-container'>
      <div className='details-tabs'>
        {tabs.map((each, index) => (
          <div
            key={each.props.name}
            onClick={() => setCurrentTab(index)}
            className={`tab-item` + (index === currentTab ? ` current` : "")}>
            <h2>{each.props.name}</h2>
          </div>
        ))}
      </div>

      <div className={`tabs-content ` + ChildrenArray[currentTab].props.name}>
        {ChildrenArray[currentTab]} {/* Figure out why this doesnt work*/}
      </div>
    </div>
  );
}
