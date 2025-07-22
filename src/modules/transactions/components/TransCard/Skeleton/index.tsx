import React from "react";

import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Skeleton, Typography } from "@/common/components";

const TransCardSkeleton = () => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <Skeleton
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <Skeleton style={{ marginBottom: 4 }}>
          <Typography fontWeight="700" style={styles.cardTitle}>
            Transaction Title
          </Typography>
        </Skeleton>

        <Skeleton>
          <Typography style={{ color: theme.colors.gray }}>
            Category Name
          </Typography>
        </Skeleton>
      </View>
      <View>
        <Skeleton>
          <Typography fontWeight="700" style={[styles.valueText]}>
            Rp 100.000
          </Typography>
        </Skeleton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 2,
  },
});

export default TransCardSkeleton;
