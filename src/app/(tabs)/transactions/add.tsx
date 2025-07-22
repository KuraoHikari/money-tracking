import React from "react";

import { withAuth } from "@/common/hocs";
import { TransactionForm } from "@/modules/transactions/components";

const AddTransScreen = () => {
  return <TransactionForm />;
};

export default withAuth(AddTransScreen);
