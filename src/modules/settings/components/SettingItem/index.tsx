import React, { forwardRef } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

type SettingItemProps = {
  title: string;
  description: string;
  iconName: string;
  action?: () => void;
};

const SettingItem = forwardRef<View, SettingItemProps>(
  ({ title, description, iconName, action, ...props }, ref) => {
    return (
      <TouchableOpacity onPress={action} ref={ref} {...props}>
        <View style={styles.root}>
          <View style={styles.iconWrapper}>
            <Icon
              name={iconName}
              size={22}
              color={opacityColor("#000000", 50)}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Typography style={styles.title} fontWeight="600">
              {title}
            </Typography>
            <Typography style={styles.description} fontWeight="500">
              {description}
            </Typography>
          </View>

          <View style={{ marginHorizontal: 4 }}>
            <Icon name="chevron-forward" size={16} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

SettingItem.displayName = "SettingItem";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: opacityColor("#000000", 10),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  description: {
    color: "#6a6a6a",
  },
});

export default SettingItem;
