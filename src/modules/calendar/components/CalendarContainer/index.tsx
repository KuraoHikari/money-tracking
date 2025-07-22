import React, { useState } from "react";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";

import {
  Container,
  Loader,
  RefreshableScrollView,
  Typography,
} from "@/common/components";
import { AddButton, TransCard } from "@/modules/transactions/components";
import { useGetTransactions } from "@/modules/transactions/hooks";

import Calendar from "../Calendar";

const CalendarContainer = () => {
  const theme = useTheme();
  const [activeDate, setActiveDate] = useState(dayjs().format("YYYY-MM-DD"));
  const insets = useSafeAreaInsets();

  const { transactions, isLoading, errorMessage, handleGetTransactions } =
    useGetTransactions({
      date: activeDate,
    });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "52%",
          backgroundColor: theme.colors.primary,
          borderBottomStartRadius: 24,
          borderBottomEndRadius: 24,
        }}
      >
        <View style={{ flex: 1, paddingTop: insets.top }}>
          <Container style={{ flex: 1 }}>
            <Calendar value={activeDate} onChange={setActiveDate} />
          </Container>
        </View>
      </View>

      <View
        style={{
          height: "48%",
        }}
      >
        <Container>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography style={{ flex: 1, fontSize: 18 }} fontWeight="700">
              {dayjs(activeDate).format("DD MMMM YYYY")}
            </Typography>
            <AddButton initialDate={activeDate} routeRef="/calendar" />
          </View>
        </Container>

        <RefreshableScrollView refresher={handleGetTransactions}>
          <Container style={{ paddingTop: 0 }}>
            <Loader
              isLoading={isLoading}
              error={errorMessage}
              isEmpty={!transactions.length}
              emptyMessage="Transactions not found"
              loaderElement={
                <View style={{ gap: 16 }}>
                  {[...Array(6)].map((_, i) => {
                    return <TransCard.Skeleton key={i} />;
                  })}
                </View>
              }
            >
              <View style={{ gap: 16 }}>
                {transactions.map((trans) => {
                  return (
                    <View key={trans.title} style={{ gap: 12 }}>
                      {trans.items.map((item, i) => {
                        return (
                          <TransCard
                            detailRef="/calendar"
                            key={i}
                            transaction={item}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </Loader>
          </Container>
        </RefreshableScrollView>
      </View>
    </View>
  );
};

export default CalendarContainer;
