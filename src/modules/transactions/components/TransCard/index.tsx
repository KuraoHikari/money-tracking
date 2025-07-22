import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Typography } from "@/common/components";
import { currencyFormat } from "@/common/utils/number-format";

import type { ITransaction } from "../../interfaces";
import TransCardSkeleton from "./Skeleton";

type TransCardProps = {
  transaction: ITransaction;
  detailRef?: string;
};

const TransCard: React.FC<TransCardProps> = ({
  transaction,
  detailRef = "/transactions",
}) => {
  const theme = useTheme();
  const isPlus = transaction.type === "income";

  return (
    <Link
      href={`/transactions/detail?transId=${transaction.id}&transType=${transaction.type}&ref=${detailRef}`}
      asChild
    >
      <TouchableOpacity>
        <View
          style={[
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              backgroundColor: transaction.category?.color ?? "#7B8CDE",
              borderRadius: 12,
            }}
          >
            <IonIcon
              name={transaction.category?.iconName ?? "apps-outline"}
              color={theme.colors.white}
              size={26}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Typography fontWeight="700" style={styles.cardTitle}>
              {transaction.title}
            </Typography>

            <Typography style={{ color: theme.colors.gray }}>
              {transaction.category?.name ?? "Lainnya"}
            </Typography>
          </View>
          <View>
            <Typography
              fontWeight="700"
              style={[
                styles.valueText,
                {
                  color: theme.colors[isPlus ? "green" : "red"],
                },
              ]}
            >
              {isPlus ? "+" : "-"} {currencyFormat(transaction.amount)}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
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
    marginBottom: 4,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 2,
  },
});

const _TransCard = TransCard as typeof TransCard & {
  Skeleton: typeof TransCardSkeleton;
};

_TransCard.Skeleton = TransCardSkeleton;

export default _TransCard;
