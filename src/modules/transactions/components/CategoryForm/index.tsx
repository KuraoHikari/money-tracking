import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { View } from "react-native";
import type { RBSheetRef } from "react-native-raw-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";

import { Button, Container, Input, Typography } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategory, ICategoryForm } from "../../interfaces";

type CategoryFormProps = {
  isOpen: boolean;
  onClose: () => void;
  transType: string;
  onCompleted: () => void;
  editData?: ICategory | null;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  transType,
  onCompleted,
  editData,
}) => {
  const { user } = useUserAuth();
  const sheetRef = useRef<RBSheetRef>(null);

  const { isLoading, startLoading, endLoading } = useFetchState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategoryForm>();

  const submitHandler = async (values: ICategoryForm) => {
    startLoading();
    values.userId = user?.uid ?? "";
    const baseValues = {
      userId: user?.uid,
      iconName: "add",
      color: "#5C677D",
    };

    try {
      const categoryColName =
        transType === "income" ? "income_categories" : "categories";

      if (editData) {
        await updateDoc(doc(db, categoryColName, editData.id), {
          ...values,
          ...baseValues,
        });
      } else {
        await addDoc(collection(db, categoryColName), {
          ...values,
          ...baseValues,
        });
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: `Category successfully ${editData ? "updated" : "added"}`,
      });
      onClose();
      onCompleted();
      endLoading();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (error as any)?.message ?? "Failed to save category",
      });
      endLoading();
    }
  };

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.open();
      if (editData) {
        const { name, userId } = editData;
        reset({ name, userId });
      } else {
        reset();
      }
    } else {
      sheetRef.current?.close();
    }
  }, [editData, isOpen, onClose, reset]);

  return (
    <RBSheet ref={sheetRef} onClose={onClose} height={224}>
      <Container>
        <Typography style={{ fontSize: 18, marginBottom: 16 }} fontWeight="700">
          {editData ? "Update" : "Add"} Category
        </Typography>
        <View style={{ gap: 16 }}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Category name is required",
            }}
            render={({ field }) => {
              return (
                <Input
                  label="Category Name"
                  {...field}
                  placeholder="Category Namee"
                  onChangeText={field.onChange}
                  errorMessage={errors.name?.message}
                  isRequired
                />
              );
            }}
          />
          <Button isLoading={isLoading} onPress={handleSubmit(submitHandler)}>
            Save
          </Button>
        </View>
      </Container>
    </RBSheet>
  );
};

export default CategoryForm;
