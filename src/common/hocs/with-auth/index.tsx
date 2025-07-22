import type { ComponentType } from "react";

import { Redirect } from "expo-router";

import { useUserAuth } from "@/modules/auth/contexts";

export const withAuth = <P extends object = object>(
  WrappedComponent: ComponentType<P>
) => {
  const Component = (props: P) => {
    const { user } = useUserAuth();

    if (!user) {
      return <Redirect href="/auth" />;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};
