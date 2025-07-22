import React, { useCallback, useEffect, useMemo, useState } from "react";

import { StyleSheet, View } from "react-native";
import Fa6icons from "react-native-vector-icons/FontAwesome6";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import {
  collection,
  getAggregateFromServer,
  query,
  sum,
  where,
} from "firebase/firestore";
import { db } from "firebase-config";

import { Loader } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { compactNumber, currencyFormat } from "@/common/utils/number-format";
import { useUserAuth } from "@/modules/auth/contexts";

import { useDashboardContext } from "../../contexts";
import StatCard from "../StatCard";

const Stats = () => {
  const theme = useTheme();
  const { user } = useUserAuth();

  const { addRefresher, monthYear } = useDashboardContext();

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const balance = useMemo(() => {
    return income - expense;
  }, [expense, income]);

  const { isLoading, startLoading, endLoading, setError } = useFetchState();

  const handleGetSummary = useCallback(async () => {
    startLoading();
    try {
      const startDate = dayjs(`${monthYear}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = dayjs(`${monthYear}-01`)
        .endOf("month")
        .format("YYYY-MM-DD");

      const coll = collection(
        db,
        "transactions",
        user?.uid ?? "",
        "user_transactions"
      );
      const qIncome = query(
        coll,
        where("type", "==", "income"),
        where("date", ">=", startDate),
        where("date", "<=", endDate)
      );
      const qExpense = query(
        coll,
        where("type", "==", "expense"),
        where("date", ">=", startDate),
        where("date", "<=", endDate)
      );

      const snapshotIncome = await getAggregateFromServer(qIncome, {
        total: sum("amount"),
      });

      console.log("🚀 ~ handleGetSummary ~ snapshotIncome:", snapshotIncome);

      const snapshotExpense = await getAggregateFromServer(qExpense, {
        total: sum("amount"),
      });

      setIncome(snapshotIncome.data().total);
      setExpense(snapshotExpense.data().total);

      endLoading();
    } catch (error) {
      console.log("🚀 ~ handleGetSummary ~ error:", error);
      setError(error);
      endLoading();
    }
  }, [endLoading, monthYear, setError, startLoading, user?.uid]);

  useEffect(() => {
    handleGetSummary();
  }, [handleGetSummary, monthYear]);

  useEffect(() => {
    addRefresher({
      key: "summary",
      action: handleGetSummary,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGetSummary]);

  return (
    <View style={styles.root}>
      <Loader
        isLoading={isLoading}
        loaderElement={
          <>
            <StatCard.Skeleton isLarger />
            <View style={styles.inner}>
              <StatCard.Skeleton />
              <StatCard.Skeleton />
            </View>
          </>
        }
      >
        <StatCard
          isHighlight
          label="Your Balance"
          value={`${currencyFormat(balance)}`}
          isLarger
          icon={
            <Fa6icons
              name="money-bill-transfer"
              size={24}
              color={theme.colors.primary}
            />
          }
        />
        <View style={styles.inner}>
          <StatCard
            label="Income"
            value={`Rp ${compactNumber(income)}`}
            icon={
              <Fa6icons
                name="money-bill-trend-up"
                size={16}
                color={theme.colors.primary}
              />
            }
          />
          <StatCard
            label="Expense"
            value={`Rp ${compactNumber(expense)}`}
            icon={
              <Fa6icons
                name="money-bill-wave"
                size={16}
                color={theme.colors.primary}
              />
            }
          />
        </View>
      </Loader>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 18,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    gap: 18,
  },
});

export default Stats;
