import type { Dispatch, FC, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import dayjs from "dayjs";

export type TransListFilter = {
  category: string | null;
  transType: string | null;
};

type TransListCtx = {
  monthYear: string;
  setMonthYear: Dispatch<SetStateAction<string>>;
  filters: TransListFilter;
  setFilters: Dispatch<SetStateAction<TransListFilter>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const TransListContext = createContext<TransListCtx>({
  monthYear: "",
  setMonthYear: () => {},
  searchValue: "",
  setSearchValue: () => {},
  filters: {
    category: null,
    transType: null,
  },
  setFilters: () => {},
});

type TransListProviderProps = {
  children: React.ReactNode;
};

export const TransListProvider: FC<TransListProviderProps> = ({ children }) => {
  const [monthYear, setMonthYear] = useState(dayjs().format("YYYY-MM"));
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<TransListFilter>({
    category: "all",
    transType: "all",
  });

  return (
    <TransListContext.Provider
      value={{
        monthYear,
        setMonthYear,
        filters,
        setFilters,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </TransListContext.Provider>
  );
};

export const useTransListContext = () => useContext(TransListContext);
