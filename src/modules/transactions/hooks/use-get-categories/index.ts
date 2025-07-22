import { useCallback, useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-config";

import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategory, TransactionType } from "../../interfaces";

type UseGetCategoriesProps = {
  transType: TransactionType;
  isUserOnly?: boolean;
};

export const useGetCategories = ({
  transType,
  isUserOnly,
}: UseGetCategoriesProps) => {
  const { user } = useUserAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchState = useFetchState();
  const { startLoading, endLoading, setError } = fetchState;

  const handleGetCategories = useCallback(async () => {
    startLoading();
    const colName = transType === "income" ? "income_categories" : "categories";
    const collectionRef = collection(db, colName);
    const qAll = query(collectionRef, where("userId", "==", ""));
    const qUser = query(collectionRef, where("userId", "==", user?.uid));

    const _categories: ICategory[] = [];

    try {
      if (!isUserOnly) {
        const querySnapshot = await getDocs(qAll);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          _categories.push({
            ...(data as ICategory),
            id: doc.id,
          });
        });
      }

      const querySnapshotUser = await getDocs(qUser);
      querySnapshotUser.forEach((doc) => {
        const data = doc.data();
        _categories.push({
          ...(data as ICategory),
          id: doc.id,
        });
      });

      _categories.sort(
        (a, b) => ((a.name > b.name) as any) - ((a.name < b.name) as any)
      );

      const otherIndex = _categories.findIndex((c) => c.name === "Lainnya");
      if (otherIndex !== -1) {
        _categories.push(_categories.splice(otherIndex, 1)[0]);
      }

      setCategories(_categories);
      endLoading();
    } catch (error: any) {
      endLoading();
      setError(error.message ?? "Terjadi kesalahan");
    }
  }, [endLoading, isUserOnly, setError, startLoading, transType, user?.uid]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  return { categories, handleGetCategories, fetchState };
};
