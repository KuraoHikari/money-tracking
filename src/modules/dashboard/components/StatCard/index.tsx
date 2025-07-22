import React, { forwardRef } from "react";

import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

import StatCardSkeleton from "./Skeleton";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  isHighlight?: boolean;
  isLarger?: boolean;
} & ViewProps;

const StatCard = forwardRef<View, StatCardProps>(
  ({ style, icon, label, value, isHighlight, isLarger, ...props }, ref) => {
    const theme = useTheme();

    return (
      <View
        style={[
          styles.root,
          {
            backgroundColor: isHighlight
              ? theme.colors.primary
              : theme.colors.white,
            borderColor: opacityColor(
              theme.colors.primary,
              isHighlight ? 100 : 20
            ),
          },
          style,
        ]}
        {...props}
        ref={ref}
      >
        {isHighlight ? (
          <>
            <View
              style={{
                position: "absolute",
                width: isLarger ? 150 : 100,
                height: isLarger ? 150 : 100,
                backgroundColor: opacityColor(theme.colors.white, 10),
                borderRadius: 999,
                right: -40,
                top: -30,
              }}
            />
            <View
              style={{
                position: "absolute",
                width: isLarger ? 120 : 80,
                height: isLarger ? 120 : 80,
                backgroundColor: opacityColor(theme.colors.white, 10),
                borderRadius: 999,
                right: -60,
                top: isLarger ? 30 : 10,
              }}
            />
          </>
        ) : null}

        <View style={styles.content}>
          <View>
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: isHighlight
                    ? theme.colors.white
                    : opacityColor(theme.colors.blue, 20),
                },
                {
                  width: isLarger ? 50 : 36,
                  height: isLarger ? 50 : 36,
                },
              ]}
            >
              {icon}
            </View>
            <Typography
              style={{
                color: isHighlight ? theme.colors.white : undefined,
                fontSize: isLarger ? 18 : 16,
              }}
              fontWeight="600"
            >
              {label}
            </Typography>
          </View>

          <View style={{ flex: 1 }}>
            <Typography
              style={{
                color: isHighlight ? theme.colors.white : undefined,
                fontSize: isLarger ? 28 : 24,
              }}
              fontWeight="700"
            >
              {value}
            </Typography>
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    position: "relative",
    overflow: "hidden",
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10,
    position: "relative",
    zIndex: 2,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 6,
  },
});

const _StatCard = StatCard as typeof StatCard & {
  Skeleton: typeof StatCardSkeleton;
};

_StatCard.Skeleton = StatCardSkeleton;

export default _StatCard;
