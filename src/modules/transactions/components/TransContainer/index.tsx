import React from "react";

import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";

import { Container } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

import Navbar from "../Navbar";
import Search from "../Search";
import TransList from "../TransList";

const TransContainer = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.white,
          paddingTop: insets.top,
          boxShadow: `0px 8px 14px 0px ${opacityColor(theme.colors.gray, 5)}`,
        }}
      >
        <Container>
          <Navbar />
          <Search />
        </Container>
      </View>
      <SafeAreaView edges={["bottom", "left", "right"]}>
        <TransList />
      </SafeAreaView>
    </>
  );
};

export default TransContainer;
