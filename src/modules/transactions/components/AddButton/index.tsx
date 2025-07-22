import React, { useRef } from "react";

import {
  Animated,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from "react-native";
import Popover from "react-native-popover-view";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

const items = [
  { label: "Income", value: "income", icon: "plus" },
  { label: "Expense", value: "expense", icon: "minus" },
];

type AddButtonProps = {
  customButton?: React.ReactNode;
  initialDate?: string;
  routeRef?: string;
};

const AddButton: React.FC<AddButtonProps> = ({
  customButton,
  initialDate,
  routeRef,
}) => {
  const theme = useTheme();
  const ref = useRef<Popover>(null);

  const rotateAnim = useAnimatedValue(0);
  const spinDeg = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <Popover
      ref={ref}
      popoverStyle={{ borderRadius: 12, backgroundColor: theme.colors.primary }}
      onCloseComplete={() => {
        Animated.timing(rotateAnim, {
          duration: 200,
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }}
      onOpenStart={() => {
        Animated.timing(rotateAnim, {
          duration: 200,
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }}
      backgroundStyle={{
        backgroundColor: opacityColor(theme.colors.black, 10),
      }}
      from={
        customButton ?? (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: opacityColor(theme.colors.gray, 20),
              }}
            >
              <Animated.View style={{ transform: [{ rotate: spinDeg }] }}>
                <IonIcon name="add" size={18} color={theme.colors.white} />
              </Animated.View>
            </View>
          </TouchableOpacity>
        )
      }
    >
      <View style={{ paddingVertical: 8, width: 160 }}>
        {items.map((item, index) => {
          const params = new URLSearchParams();
          params.append("transType", item.value);
          if (initialDate) {
            params.append("initialDate", initialDate);
          }

          if (routeRef) {
            params.append("ref", routeRef);
          }

          return (
            <React.Fragment key={item.value}>
              <Link href={`/transactions/add?${params.toString()}`} asChild>
                <TouchableOpacity
                  onPress={() => ref.current?.requestClose()}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                  }}
                >
                  <FeatherIcon
                    name={item.icon}
                    size={16}
                    color={theme.colors.white}
                  />
                  <Typography style={{ color: theme.colors.white }}>
                    {item.label}
                  </Typography>
                </TouchableOpacity>
              </Link>

              {index === 0 ? (
                <View
                  style={{
                    marginVertical: 6,
                    marginHorizontal: 10,
                    height: 1,
                    backgroundColor: opacityColor(theme.colors.white, 50),
                  }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>
    </Popover>
  );
};

export default AddButton;
