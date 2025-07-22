import React from "react";

import { withAuth } from "@/common/hocs";
import { TransDetail } from "@/modules/transactions/components";

const DetailTransScreen = () => {
  return <TransDetail />;
};

export default withAuth(DetailTransScreen);
