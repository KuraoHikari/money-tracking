import React, { useEffect, useMemo, useRef, useState } from "react";

import { View } from "react-native";
import type { RBSheetRef } from "react-native-raw-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";

import { Button, Container, Select, Typography } from "@/common/components";

import { transTypeOptions } from "../../constants";
import type { TransListFilter } from "../../contexts";
import { useTransListContext } from "../../contexts";
import { useGetCategories } from "../../hooks";
import type { ICategory } from "../../interfaces";

type FilterSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters } = useTransListContext();

  const sheetRef = useRef<RBSheetRef>(null);
  const [localValues, setLocalValues] = useState<TransListFilter>(filters);

  const { categories: catIncome } = useGetCategories({ transType: "income" });
  const { categories: catExpense } = useGetCategories({ transType: "expense" });

  const categoryOptions = useMemo(() => {
    const categories = [{ label: "All Category", value: "all" }];

    const handleForeach = (category: ICategory, collection: string) => {
      categories.push({
        label: category.name,
        value: `${collection}/${category.id}`,
      });
    };

    switch (localValues.transType) {
      case "income":
        catIncome.forEach((d) => handleForeach(d, "income_categories"));
        break;
      case "expense":
        catExpense.forEach((d) => handleForeach(d, "categories"));
        break;
      default:
        catIncome.forEach((d) => handleForeach(d, "income_categories"));
        catExpense.forEach((d) => handleForeach(d, "categories"));
        break;
    }

    return categories;
  }, [catExpense, catIncome, localValues.transType]);

  const handleChange = (values: Partial<TransListFilter>) => {
    setLocalValues((prev) => {
      const newValues = { ...prev, ...values };
      if (values.transType && values.transType !== prev.transType) {
        newValues.category = "all";
      }
      return newValues;
    });
  };

  const handleSubmit = () => {
    setFilters(localValues);
    onClose();
    sheetRef.current?.close();
  };

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.open();
    }
  }, [isOpen]);

  return (
    <RBSheet ref={sheetRef} onClose={onClose} height={320}>
      <Container>
        <Typography style={{ fontSize: 18, marginBottom: 16 }} fontWeight="700">
          Filter
        </Typography>

        <View style={{ gap: 16 }}>
          <Select
            options={transTypeOptions}
            label="Transaction type"
            value={localValues.transType ?? undefined}
            placeholder="Select transaction type"
            onChange={(val) => handleChange({ transType: val })}
          />
          <Select
            options={categoryOptions}
            label="Category"
            value={localValues.category ?? undefined}
            placeholder="Catategory"
            onChange={(val) => handleChange({ category: val })}
          />
          <Button onPress={handleSubmit}>Apply</Button>
        </View>
      </Container>
    </RBSheet>
  );
};

export default FilterSheet;
