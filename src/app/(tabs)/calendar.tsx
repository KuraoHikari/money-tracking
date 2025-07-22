import React from "react";

import { withAuth } from "@/common/hocs";
import { CalendarContainer } from "@/modules/calendar/components";

const CalendarScreen = () => {
  return <CalendarContainer />;
};

export default withAuth(CalendarScreen);
