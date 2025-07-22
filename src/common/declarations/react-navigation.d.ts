import "@react-navigation/native";

declare module "@react-navigation/native" {
  export type ColorsKey =
    | "primary"
    | "secondary"
    | "background"
    | "card"
    | "text"
    | "border"
    | "notification"
    | "blue"
    | "white"
    | "green"
    | "yellow"
    | "red"
    | "gray"
    | "black";

  interface NativeTheme {
    dark: boolean;
    colors: Record<ColorsKey, string>;
    fonts: {
      regular: FontStyle;
      medium: FontStyle;
      bold: FontStyle;
      heavy: FontStyle;
    };
  }

  export type Theme = NativeTheme;

  export function useTheme(): Theme;
}
