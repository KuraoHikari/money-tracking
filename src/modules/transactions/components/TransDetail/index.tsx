import React, { useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-config";

import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategory, ITransaction } from "../../interfaces";
import TransactionForm from "../TransactionForm";

const TransDetail = () => {
  const { user } = useUserAuth();

  const { transId } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<ITransaction>();
  const { isLoading, startLoading, endLoading, setError, errorMessage } =
    useFetchState();

  useEffect(() => {
    const handleGetTrans = async () => {
      startLoading();
      try {
        const docRef = doc(
          db,
          "transactions",
          user?.uid ?? "",
          "user_transactions",
          transId as string
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const trans = docSnap.data();
          const categoryDoc = await getDoc(trans.category);
          setTransaction({
            ...(trans as ITransaction),
            category: {
              ...(categoryDoc.data() as ICategory),
              id: categoryDoc.id,
            },
            id: docSnap.id,
          });
        } else {
          setError(new Error("Data tidak ditemukan"));
        }

        endLoading();
      } catch (error) {
        setError(error);
        endLoading();
      }
    };

    handleGetTrans();
  }, [endLoading, setError, startLoading, transId, user?.uid]);

  return (
    <TransactionForm
      isReadOnly
      transaction={transaction}
      loaderProps={{ isLoading, error: errorMessage }}
    />
  );
};

export default TransDetail;
