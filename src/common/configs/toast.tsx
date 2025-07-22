import type { ToastConfig } from "react-native-toast-message";
import { ErrorToast, SuccessToast } from "react-native-toast-message";

const baseProps = {
  text1Style: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  text2Style: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
};

export const toastConfig: ToastConfig = {
  success: (props) => <SuccessToast {...props} {...baseProps} />,
  error: (props) => <ErrorToast {...props} {...baseProps} />,
};
