import React, { useMemo, useState } from "react";

import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";

import Button from "../Button";
import Typography from "../Typography";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

type MonthYearPickerProps = {
  value?: string;
  minDate?: Date;
  maxDate?: Date;
  onSelect?: (value: string) => void;
};

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  value,
  minDate,
  maxDate,
  onSelect,
}) => {
  const theme = useTheme();

  const defaultValue = useMemo(
    () => (value ? new Date(`${value}-01`) : new Date()),
    [value]
  );

  const [activeMonth, setActiveMonth] = useState(defaultValue.getMonth());
  const [activeYear, setActiveYear] = useState(defaultValue.getFullYear());

  const canPrevYear = useMemo(() => {
    return minDate ? !(activeYear <= minDate?.getFullYear()) : true;
  }, [activeYear, minDate]);
  const handlePrev = () => {
    setActiveYear((prev) => prev - 1);
  };

  const canNextYear = useMemo(() => {
    return maxDate ? !(activeYear >= maxDate?.getFullYear()) : true;
  }, [activeYear, maxDate]);
  const handleNext = () => {
    setActiveYear((prev) => prev + 1);
  };

  const handleSelect = () => {
    onSelect?.(dayjs(`${activeYear}-${activeMonth + 1}-01`).format("YYYY-MM"));
  };

  const buttonSize = (Dimensions.get("window").width - 32) / 3;

  return (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Button
          isCompact
          variant="light"
          disabled={!canPrevYear}
          style={{ opacity: !canPrevYear ? 0.3 : 1 }}
          onPress={handlePrev}
        >
          <IonIcon name="chevron-back" size={20} />
        </Button>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Typography
            style={{ textAlign: "center", fontSize: 16 }}
            fontWeight="600"
          >
            {activeYear}
          </Typography>
        </TouchableOpacity>
        <Button
          isCompact
          variant="light"
          disabled={!canNextYear}
          style={{ opacity: !canNextYear ? 0.3 : 1 }}
          onPress={handleNext}
        >
          <IonIcon name="chevron-forward" size={20} />
        </Button>
      </View>
      <FlatList
        data={months}
        keyExtractor={(i) => i}
        numColumns={3}
        renderItem={({ item: month, index }) => {
          const isActive = activeMonth === index;
          const isShow =
            activeYear === maxDate?.getFullYear()
              ? maxDate.getMonth() >= index
              : activeYear === minDate?.getFullYear()
              ? minDate.getMonth() <= index
              : true;

          return (
            <React.Fragment key={index}>
              {isShow ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      width: buttonSize,
                      backgroundColor: isActive
                        ? theme.colors.primary
                        : "transparent",
                    },
                  ]}
                  onPress={() => {
                    setActiveMonth(index);
                  }}
                >
                  <Typography
                    fontWeight="500"
                    style={{
                      color: isActive ? theme.colors.white : undefined,
                    }}
                  >
                    {month}
                  </Typography>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.button,
                    {
                      width: buttonSize,
                      opacity: 0,
                    },
                  ]}
                >
                  <Typography fontWeight="500">Placeholder</Typography>
                </View>
              )}
            </React.Fragment>
          );
        }}
      />
      <Button style={{ marginTop: 10 }} onPress={handleSelect}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
});

export default MonthYearPicker;
