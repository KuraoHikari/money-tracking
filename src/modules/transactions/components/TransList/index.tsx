import React, { useMemo } from "react";

import { StyleSheet, View } from "react-native";

import {
  Container,
  Loader,
  RefreshableScrollView,
  Typography,
} from "@/common/components";

import { useTransListContext } from "../../contexts";
import { useGetTransactions } from "../../hooks";
import TransCard from "../TransCard";

const TransList = () => {
  const { searchValue, monthYear, filters } = useTransListContext();

  const { transactions, isLoading, errorMessage, handleGetTransactions } =
    useGetTransactions({ monthYear, filters });
  const filteredTrans = useMemo(() => {
    return transactions
      .map((t) => {
        return {
          ...t,
          items: t.items
            .filter((item) => {
              if (!searchValue) {
                return true;
              }

              return item.title
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .sort(
              (a, b) =>
                Number(b.time.split(":").join("")) -
                Number(a.time.split(":").join(""))
            ),
        };
      })
      .filter((t) => t.items.length);
  }, [searchValue, transactions]);

  return (
    <RefreshableScrollView refresher={handleGetTransactions}>
      <Container>
        <Loader
          isLoading={isLoading}
          error={errorMessage}
          isEmpty={!filteredTrans.length}
          emptyMessage="Transactions not found"
          loaderElement={
            <View style={styles.listWrapper}>
              {[...Array(6)].map((_, i) => {
                return <TransCard.Skeleton key={i} />;
              })}
            </View>
          }
        >
          <View style={styles.listWrapper}>
            {filteredTrans.map((trans) => {
              return (
                <View key={trans.title} style={{ gap: 12 }}>
                  <Typography fontWeight="700" style={{ fontSize: 18 }}>
                    {trans.title}
                  </Typography>
                  {trans.items.map((item, i) => {
                    return <TransCard key={i} transaction={item} />;
                  })}
                </View>
              );
            })}
          </View>
        </Loader>
      </Container>
    </RefreshableScrollView>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    gap: 16,
    paddingBottom: 200,
  },
});

export default TransList;
