import React, { useEffect, useRef } from "react";

import { StyleSheet, View } from "react-native";
import type { RBSheetProps, RBSheetRef } from "react-native-raw-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";

import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

import Typography from "../Typography";

type AlertSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  action?: React.ReactNode;
  sheetProps?: RBSheetProps;
};

const AlertSheet: React.FC<AlertSheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  action,
  sheetProps,
}) => {
  const theme = useTheme();
  const sheetRef = useRef<RBSheetRef>(null);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen, onClose]);

  return (
    <RBSheet
      height={200}
      ref={sheetRef}
      onClose={onClose}
      {...sheetProps}
      customStyles={{
        ...sheetProps?.customStyles,
        container: {
          ...styles.container,
          ...sheetProps?.customStyles?.container,
        },
      }}
    >
      <View style={{ paddingHorizontal: 30 }}>
        <Typography fontWeight="700" style={styles.title}>
          {title}
        </Typography>
        <Typography
          fontWeight="500"
          style={[
            styles.description,
            { color: opacityColor(theme.colors.black, 50) },
          ]}
        >
          {description}
        </Typography>
        {action}
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
    maxWidth: 320,
    marginHorizontal: "auto",
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 16,
    maxWidth: 300,
    marginHorizontal: "auto",
  },
});

export default AlertSheet;
