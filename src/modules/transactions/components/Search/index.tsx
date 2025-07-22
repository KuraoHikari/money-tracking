import React from "react";

import IonIcon from "react-native-vector-icons/Ionicons";

import { Input } from "@/common/components";

import { useTransListContext } from "../../contexts";

const Search = () => {
  const { searchValue, setSearchValue } = useTransListContext();

  return (
    <Input
      leftContent={<IonIcon name="search" size={18} />}
      placeholder="Find Transaction..."
      value={searchValue}
      onChangeText={setSearchValue}
    />
  );
};

export default Search;
