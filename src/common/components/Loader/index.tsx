import React from "react";

import { Image, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

import Loading from "../Loading";
import Typography from "../Typography";

export type LoaderProps = {
  isLoading: boolean;
  error?: string;
  placeholderHeight?: number;
  children: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
  loaderElement?: React.ReactNode;
};

const Loader: React.FC<LoaderProps> = ({
  isLoading,
  error,
  placeholderHeight = 250,
  children,
  isEmpty,
  emptyMessage = "Tidak ada data",
  loaderElement,
}) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        loaderElement ?? (
          <View
            style={{
              height: placeholderHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </View>
        )
      ) : error ? (
        <Typography style={{ textAlign: "center" }}>{error}</Typography>
      ) : isEmpty ? (
        <View
          style={{
            height: placeholderHeight,
            alignItems: "center",
            paddingVertical: 24,
          }}
        >
          <Image
            source={require("../../../../assets/images/empty.png")}
            style={[{ width: 150, height: 150, objectFit: "contain" }]}
          />
          <Typography
            style={{
              textAlign: "center",
              color: opacityColor(theme.colors.gray, 80),
            }}
          >
            {emptyMessage}
          </Typography>
        </View>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
