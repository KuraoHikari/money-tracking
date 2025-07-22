import { useCallback, useState } from "react";

import { useDisclosure } from "../use-disclosure";

type UseDisclosureDataOptions = {
  initialState?: boolean;
  closeDelay?: number;
};

export const useDisclosureData = <T>(options?: UseDisclosureDataOptions) => {
  const initialState = options?.initialState ?? false;
  const closeDelay = options?.closeDelay ?? 200;

  const [isOpen, handlers] = useDisclosure(initialState);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback(
    (d: T) => {
      setData(d);
      handlers.open();
    },
    [handlers]
  );

  const close = useCallback(() => {
    setTimeout(() => {
      setData(null);
    }, closeDelay);
    handlers.close();
  }, [closeDelay, handlers]);

  const _handlers = { open, close, toggle: handlers.toggle };

  return [isOpen, _handlers, data] as [boolean, typeof _handlers, T | null];
};
