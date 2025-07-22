import React from "react";

import { withAuth } from "@/common/hocs";
import { TransContainer } from "@/modules/transactions/components";
import { TransListProvider } from "@/modules/transactions/contexts";

const TransactionsScreen = () => {
  return (
    <TransListProvider>
      <TransContainer />
    </TransListProvider>
  );
};

export default withAuth(TransactionsScreen);
