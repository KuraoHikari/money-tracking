import React from "react";

import { withAuth } from "@/common/hocs";
import { AccountContainer } from "@/modules/settings/components";

const AccountScreen = () => {
  return <AccountContainer />;
};

export default withAuth(AccountScreen);
