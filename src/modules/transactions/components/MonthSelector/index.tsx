import React, { useMemo, useRef } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import type { RBSheetRef } from "react-native-raw-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";

import { MonthYearPicker, Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

type MonthSelectorProps = {
  value: string;
  onSelect: (value: string) => void;
  customButton?: (props: { onOpen: () => void }) => React.ReactNode;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({
  value,
  onSelect,
  customButton,
}) => {
  const theme = useTheme();
  const refRBSheet = useRef<RBSheetRef>(null);

  const dateLabel = useMemo(() => {
    return dayjs(`${value}-01`).format("MMMM YYYY");
  }, [value]);

  return (
    <>
      {customButton ? (
        customButton({ onOpen: () => refRBSheet.current?.open() })
      ) : (
        <View style={styles.root}>
          <TouchableOpacity
            style={[
              styles.monthFilter,
              { borderColor: opacityColor(theme.colors.primary, 10) },
            ]}
            onPress={() => refRBSheet.current?.open()}
          >
            <Typography fontWeight="600">{dateLabel}</Typography>
            <Ionicons
              name="chevron-down"
              color={theme.colors.primary}
              size={16}
              style={{ marginTop: 2 }}
            />
          </TouchableOpacity>
        </View>
      )}

      <RBSheet ref={refRBSheet} useNativeDriver={false} height={380}>
        <View style={{ padding: 16 }}>
          <Typography
            fontWeight="700"
            style={{
              marginBottom: 16,
              fontSize: 20,
            }}
          >
            Select Month
          </Typography>
          <MonthYearPicker
            maxDate={new Date()}
            value={value}
            onSelect={(v) => {
              onSelect(v);
              refRBSheet.current?.close();
            }}
          />
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
  },
  monthFilter: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    alignItems: "center",
    gap: 6,
  },
});

export default MonthSelector;
