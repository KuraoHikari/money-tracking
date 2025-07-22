import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Avatar } from "@/common/components";
import { useUserAuth } from "@/modules/auth/contexts";
import { MonthSelector } from "@/modules/transactions/components";

import { useDashboardContext } from "../../contexts";

const Navbar = () => {
  const { user } = useUserAuth();
  const theme = useTheme();

  const { monthYear, setMonthYear } = useDashboardContext();

  return (
    <View style={styles.root}>
      <Avatar name={user?.displayName} />

      <View style={{ flex: 1 }}>
        <MonthSelector value={monthYear} onSelect={setMonthYear} />
      </View>

      <Link href="/settings" asChild>
        <TouchableOpacity style={{ borderRadius: "50%" }}>
          <Icon name="cog" size={24} color={theme.colors.gray} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default Navbar;
