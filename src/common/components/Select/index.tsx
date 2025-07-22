import React, { forwardRef, useMemo } from "react";

import type { StyleProp, TextInput, ViewStyle } from "react-native";
import { Platform, StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

import type { InputProps } from "../Input";
import Input from "../Input";
import Typography from "../Typography";

type SelectProps = {
  options: Array<{ label: string; value: string }>;
  selectRef?: React.LegacyRef<SelectDropdown>;
  value?: string;
  onChange?: (val: string) => void;
  style?: StyleProp<ViewStyle>;
} & Omit<InputProps, "value" | "onChange" | "style">;

const emptyOptions = [
  { label: "Tidak ada pilihan", value: "__emptyPlaceholder" },
];

const Select = forwardRef<TextInput, SelectProps>(
  ({ selectRef, value, onChange, options, style, readOnly, ...props }, ref) => {
    const theme = useTheme();
    const defaultValue = useMemo(() => {
      return options.find((o) => o.value === value);
    }, [options, value]);

    const selectedValue = useMemo(() => {
      return options.find((o) => o.value === defaultValue?.value);
    }, [defaultValue?.value, options]);

    return (
      <View style={style}>
        {readOnly ? (
          <View>
            <Input
              {...props}
              onChange={() => {}}
              onChangeText={() => {}}
              ref={ref}
              readOnly
              value={selectedValue?.label}
            />
          </View>
        ) : (
          <SelectDropdown
            defaultValue={defaultValue}
            data={options.length ? options : emptyOptions}
            ref={selectRef}
            disabledIndexes={!options.length ? [0] : undefined}
            onSelect={(selectedItem) => {
              if (options.length) {
                onChange?.(selectedItem.value);
              }
            }}
            dropdownOverlayColor={opacityColor(theme.colors.black, 10)}
            renderButton={(selectedItem, isOpened) => {
              const selected = options.find(
                (o) => o.value === selectedItem?.value
              );

              return (
                <View>
                  <Input
                    {...props}
                    onChange={() => {}}
                    onChangeText={() => {}}
                    ref={ref}
                    readOnly
                    rightContent={
                      <IonIcon
                        name="chevron-down"
                        size={18}
                        style={{
                          marginRight: 4,
                          transform: [{ rotate: isOpened ? "180deg" : "0deg" }],
                        }}
                      />
                    }
                    value={selected?.label}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return item?.value === "__emptyPlaceholder" ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 100,
                    gap: 8,
                  }}
                >
                  <IonIcon
                    name="file-tray-outline"
                    size={30}
                    color={opacityColor(theme.colors.gray, 80)}
                  />
                  <Typography
                    style={{ color: opacityColor(theme.colors.gray, 80) }}
                  >
                    {item.label}
                  </Typography>
                </View>
              ) : (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {
                      backgroundColor: opacityColor(theme.colors.primary, 10),
                    }),
                  }}
                >
                  <Typography
                    style={[
                      styles.dropdownItemTxtStyle,
                      { color: isSelected ? theme.colors.primary : undefined },
                    ]}
                    fontWeight={isSelected ? "600" : "400"}
                  >
                    {item.label}
                  </Typography>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
              backgroundColor: theme.colors.white,
              borderRadius: 8,
              marginTop: Platform.OS === "ios" ? 0 : -30,
            }}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownItemTxtStyle: {
    flex: 1,
  },
});

export default Select;
