import { useCallback, useState } from "react";

import type { RefreshControlProps } from "react-native";

export const useRefreshControl = (
  refresher: () => Promise<void>
): RefreshControlProps => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refresher();
    setIsRefreshing(false);
  }, [refresher]);

  return {
    refreshing: isRefreshing,
    onRefresh: handleRefresh,
  };
};
