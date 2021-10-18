import React, { useState } from "react";

export const SearchContext = React.createContext<IProps>({itemId: '', setSearch: (nombre: string) => null, resetSearch: () => null});

interface IProps {
  itemId: string;
  setSearch: (nombre: string) => void;
  resetSearch: () => void; 
}
export const SearchProvider: React.FC = ({ children }) => { 
  const [ itemId, setSearch ] = useState<string>('');

  const ponBusqueda = (toolId: string) => {
    setSearch(toolId);
  }

  const reseteaBusqueda = () => {
    setSearch('');
  }
  const value: IProps = {itemId: itemId, setSearch: ponBusqueda, resetSearch: reseteaBusqueda};
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};