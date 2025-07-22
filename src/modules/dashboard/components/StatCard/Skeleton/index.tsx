import React from "react";

import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Skeleton, Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

type StatCardSkeletonProps = {
  isLarger?: boolean;
};

const StatCardSkeleton: React.FC<StatCardSkeletonProps> = ({ isLarger }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.root,
        { borderColor: opacityColor(theme.colors.gray, 20) },
      ]}
    >
      <View style={styles.content}>
        <View>
          <Skeleton
            style={[
              styles.iconWrapper,
              {
                width: isLarger ? 50 : 36,
                height: isLarger ? 50 : 36,
              },
            ]}
          />

          <Skeleton>
            <Typography style={{ fontSize: isLarger ? 18 : 16 }}>
              Card Label
            </Typography>
          </Skeleton>
        </View>

        <View style={{ flex: 1 }}>
          <Skeleton>
            <Typography
              style={{
                fontSize: isLarger ? 28 : 24,
              }}
              fontWeight="700"
            >
              {isLarger ? "Rp 100.000.000" : "Rp 10 rb"}
            </Typography>
          </Skeleton>
        </View>
      </View>
    </View>
  );
};

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

export default StatCardSkeleton;
