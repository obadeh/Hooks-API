import React, {useState} from 'react';

export const SettingsContext = React.createContext();

function SettingProvider(props) {
  const [display, setDisplay] = useState(true);
  const [itemsNum, setItemsNum] = useState(0);
  const state = {
    display,
    itemsNum,
    changeDisplay:setDisplay,
    changeTwitter:setItemsNum,
  };
  return(
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingProvider;
