import { createContext, useState } from "react";

interface RefreshContextType {
  outletShow: boolean;
  updateOutletShow: (val: boolean) => void;
}

export const RefreshContext = createContext<RefreshContextType>({
  outletShow: true,
  updateOutletShow: () => {}
});

// todo
// todo Context 全局上下文
export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [outletShow, setOutletShow] = useState(true);

  const updateOutletShow = (val: boolean) => {
    console.log("/context/Refresh.tsx/更新updateOutletShow！");
    setOutletShow(val);
  };

  const contextValue = {
    outletShow,
    updateOutletShow
  };
  // console.log(children); // children是DOM-Component
  return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>;
};
