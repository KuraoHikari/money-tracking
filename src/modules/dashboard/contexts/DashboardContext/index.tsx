import type { Dispatch, FC, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import dayjs from "dayjs";

type Refresher = {
  key: string;
  action: () => Promise<void>;
};

type DashboardCtx = {
  monthYear: string;
  setMonthYear: Dispatch<SetStateAction<string>>;
  refreshers: Refresher[];
  setRefreshers: Dispatch<SetStateAction<Refresher[]>>;
  addRefresher: (value: Refresher) => void;
};

export const DashboardContext = createContext<DashboardCtx>({
  monthYear: "",
  setMonthYear: () => {},
  refreshers: [],
  setRefreshers: () => {},
  addRefresher: () => {},
});

type DashboardProviderProps = {
  children: React.ReactNode;
};

export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [monthYear, setMonthYear] = useState(dayjs().format("YYYY-MM"));
  const [refreshers, setRefreshers] = useState<Refresher[]>([]);

  const addRefresher = (value: Refresher) => {
    setRefreshers((prev) => {
      const existedIndex = prev.findIndex((p) => p.key === value.key);
      if (existedIndex === -1) {
        return [...prev, value];
      }
      prev[existedIndex] = value;
      return [...prev];
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        monthYear,
        setMonthYear,
        refreshers,
        setRefreshers,
        addRefresher,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
