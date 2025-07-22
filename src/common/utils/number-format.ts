export const thousandsFormat = (value: number | string, separator?: string) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator || ",");
};

export const currencyFormat = (value?: string | number | null) => {
  const numberedValue = Number(value || "0");
  const currency = "IDR";
  const localeString = "id-ID";

  const formatted = numberedValue.toLocaleString(localeString, {
    style: "currency",
    currency,
  });

  let result = `${formatted}`;

  if (currency === "IDR") {
    result = result.slice(0, -3);
  }

  return result;
};

export const compactNumber = (value?: string | number | null) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(Number(value ?? 0));
};
