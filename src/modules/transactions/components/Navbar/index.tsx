import React from "react";

import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";

import { useDisclosure } from "@/common/hooks";
import { opacityColor } from "@/common/utils/colors";

import { useTransListContext } from "../../contexts";
import AddButton from "../AddButton";
import FilterSheet from "../FilterSheet";
import MonthSelector from "../MonthSelector";

const Navbar = () => {
  const theme = useTheme();
  const { monthYear, setMonthYear } = useTransListContext();

  const [isOpenFilter, { open: openFilter, close: closeFilter }] =
    useDisclosure();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <TouchableOpacity onPress={openFilter}>
        <View
          style={{
            backgroundColor: theme.colors.white,
            padding: 12,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: opacityColor(theme.colors.gray, 20),
          }}
        >
          <Ionicons name="filter" size={18} />
        </View>
      </TouchableOpacity>
      <View>
        <MonthSelector value={monthYear} onSelect={setMonthYear} />
      </View>

      <AddButton />

      <FilterSheet isOpen={isOpenFilter} onClose={closeFilter} />
    </View>
  );
};

export default Navbar;
