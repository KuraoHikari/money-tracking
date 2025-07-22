import React, { forwardRef } from "react";

import type { RefreshControlProps, ScrollViewProps } from "react-native";
import { RefreshControl, ScrollView } from "react-native";

import { useRefreshControl } from "@/common/hooks";

type RefreshableScrollViewProps = {
  refresher: () => Promise<void>;
  refreshControlProps?: RefreshControlProps;
} & ScrollViewProps;

const RefreshableScrollView = forwardRef<
  ScrollView,
  RefreshableScrollViewProps
>(({ refresher, children, refreshControlProps: rcProps, ...props }, ref) => {
  const refreshControlProps = useRefreshControl(refresher);

  return (
    <ScrollView
      ref={ref}
      {...props}
      refreshControl={<RefreshControl {...rcProps} {...refreshControlProps} />}
    >
      {children}
    </ScrollView>
  );
});

export default RefreshableScrollView;
