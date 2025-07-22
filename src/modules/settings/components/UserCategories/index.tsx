import React, { useState } from "react";

import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "firebase-config";

import {
  AlertSheet,
  Button,
  Container,
  Loader,
  Typography,
} from "@/common/components";
import { useDisclosureData, useFetchState } from "@/common/hooks";
import { opacityColor } from "@/common/utils/colors";
import { CategoryForm } from "@/modules/transactions/components";
import { useGetCategories } from "@/modules/transactions/hooks";
import type {
  ICategory,
  TransactionType,
} from "@/modules/transactions/interfaces";

const buttonFilter = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];

const UserCategories = () => {
  const theme = useTheme();
  const [transType, setTransType] = useState<TransactionType>("expense");
  const [isOpen, { open, close }, editData] =
    useDisclosureData<ICategory | null>();
  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<ICategory | null>({ closeDelay: 0 });

  const {
    categories,
    handleGetCategories,
    fetchState: { isLoading, errorMessage },
  } = useGetCategories({
    transType,
    isUserOnly: true,
  });

  const {
    isLoading: isLoadingDelete,
    startLoading: startLoadingDelete,
    endLoading: endLoadingDelete,
  } = useFetchState();

  const handleDelete = async () => {
    startLoadingDelete();
    if (deleteData) {
      try {
        const colName =
          transType === "income" ? "income_categories" : "categories";
        await deleteDoc(doc(db, colName, deleteData.id));
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Successfully deleted category",
        });
        closeDelete();
        endLoadingDelete();
        handleGetCategories();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (error as any)?.message ?? "Failed to delete category",
        });
        endLoadingDelete();
      }
    }
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Typography
            style={{ fontSize: 18, marginBottom: 4 }}
            fontWeight="700"
          >
            Categories
          </Typography>
          <Typography
            style={{
              color: opacityColor(theme.colors.black, 50),
              fontSize: 12,
            }}
          >
            You can add custom categories according to your preferences.
          </Typography>
        </View>
        <Button isCompact onPress={() => open(null)}>
          <IonIcon name="add" size={18} />
        </Button>
      </View>

      <View
        style={{
          marginVertical: 16,
          flexDirection: "row",
          gap: 14,
        }}
      >
        {buttonFilter.map((filter) => {
          const isActive = filter.value === transType;

          return (
            <Button
              key={filter.value}
              style={{ flex: 1 }}
              isCompact
              variant={isActive ? "filled" : "light"}
              onPress={() => setTransType(filter.value as TransactionType)}
            >
              {filter.label}
            </Button>
          );
        })}
      </View>

      <Loader
        isLoading={isLoading}
        error={errorMessage}
        isEmpty={!categories.length}
      >
        <ScrollView>
          <View style={{ gap: 12 }}>
            {categories.map((c) => (
              <View
                key={c.id}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  borderRadius: 12,
                  flexDirection: "row",
                  backgroundColor: theme.colors.white,
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Typography fontWeight="500" style={{ flex: 1, fontSize: 16 }}>
                  {c.name}
                </Typography>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Button isCompact color="blue" onPress={() => open(c)}>
                    <IonIcon name="pencil" />
                  </Button>
                  <Button isCompact color="red" onPress={() => openDelete(c)}>
                    <IonIcon name="trash" />
                  </Button>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Loader>

      <CategoryForm
        isOpen={isOpen}
        onClose={close}
        transType={transType ?? ""}
        onCompleted={handleGetCategories}
        editData={editData}
      />

      <AlertSheet
        isOpen={isOpenDelete}
        title="Delete Category"
        description={`Are you sure you want to delete the category ${
          deleteData?.name ?? "this"
        }?`}
        action={
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              style={{ flex: 1 }}
              variant="light"
              onPress={handleDelete}
              isLoading={isLoadingDelete}
            >
              Hapus
            </Button>
            <Button
              style={{ flex: 1 }}
              onPress={closeDelete}
              disabled={isLoadingDelete}
            >
              Batal
            </Button>
          </View>
        }
        onClose={closeDelete}
      />
    </Container>
  );
};

export default UserCategories;
