import { useCallback } from "react";

import { StackActions } from "@react-navigation/native";
import type { Href } from "expo-router";
import { useNavigationContainerRef, useRouter } from "expo-router";
import type { NavigationOptions } from "expo-router/build/global-state/routing";

export const useRemoveAndReplace = () => {
  const { replace } = useRouter();
  const { dispatch, canGoBack } = useNavigationContainerRef();

  const removeAndReplace = useCallback(
    (href: Href, options?: NavigationOptions) => {
      if (canGoBack()) {
        dispatch(StackActions.popToTop());
      }
      replace(href, options);
    },
    [canGoBack, dispatch, replace]
  );

  return { removeAndReplace };
};
