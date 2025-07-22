import React, { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { Button, Select } from "@/common/components";
import { useDisclosure } from "@/common/hooks";
import { useGetCategories } from "@/modules/transactions/hooks";
import type {
  ITransactionForm,
  TransactionType,
} from "@/modules/transactions/interfaces";

import CategoryForm from "../../CategoryForm";

type CategoryFieldProps = {
  isReadOnly?: boolean;
  isReadOnlyField?: boolean;
  transType?: string;
};

const CategoryField: React.FC<CategoryFieldProps> = ({
  isReadOnly,
  isReadOnlyField,
  transType,
}) => {
  const [isOpen, { open, close }] = useDisclosure();

  const { categories, handleGetCategories } = useGetCategories({
    transType: (transType ?? "expense") as TransactionType,
  });
  const categoryOptions = useMemo(() => {
    return categories.map((c) => ({ label: c?.name, value: c?.id }));
  }, [categories]);

  const {
    control,
    formState: { errors },
  } = useFormContext<ITransactionForm>();

  return (
    <>
      <Controller
        control={control}
        name="category"
        rules={{
          required: "Category is required",
        }}
        render={({ field }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Select
                isRequired={!isReadOnly}
                options={categoryOptions}
                label="Category"
                placeholder="Select category"
                style={{ flex: 1 }}
                errorMessage={errors.category?.message}
                readOnly={isReadOnlyField}
                {...field}
              />
              {!isReadOnlyField ? (
                <Button isCompact style={{ marginTop: 24 }} onPress={open}>
                  <IonIcon name="add" size={16} />
                </Button>
              ) : null}
            </View>
          );
        }}
      />

      <CategoryForm
        isOpen={isOpen}
        onClose={close}
        transType={transType ?? ""}
        onCompleted={handleGetCategories}
      />
    </>
  );
};

export default CategoryField;
