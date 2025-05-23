import { isValid, parseISO, format } from "date-fns";

export const isBrowser = typeof window !== "undefined";

export const clx = (...classnames: (string | boolean)[]) => classnames?.filter(Boolean).join(" ");

export const formatDateTime = (date: string) => {
  try {
    const _date = parseISO(date);

    if (!isValid(_date)) {
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    return format(_date, "hh:mm a");
  } catch (error) {
    console.error("Error parsing date:", date, error);
    return "Invalid Date";
  }
};

export const formatDate = (date: string) => {
  try {
    const _date = parseISO(date);

    if (!isValid(_date)) {
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    return format(_date, "dd-MMM-yyyy");
  } catch (error) {
    console.error("Error parsing date:", date, error);
    return "Invalid Date";
  }
};

export class LocalStorage {
  static get(key: string) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key: string, value: any) {
    if (!isBrowser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export const AuthStorage = {
  get: (key: string) => LocalStorage.get(key),
  set: (key: string, value: any) => LocalStorage.set(key, value),
  clear: () => {
    LocalStorage.set("user", null);
    LocalStorage.set("admin-user", null);
    LocalStorage.set("authentified", false);
    LocalStorage.set("tokens", null);
  },
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function removeCircularReferences(obj: any) {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    })
  );
}

// Format card number with spaces after every 4 digits
export const formatCardNumber = (cardNumber?: string): string => {
  if (!cardNumber) return "";
  const digitsOnly = cardNumber.replace(/\D/g, "").slice(0, 16);
  return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

// Format expiry date as MM/YY
export const formatCardExpiry = (expiry?: string): string => {
  if (!expiry) return "";
  const digitsOnly = expiry.replace(/\D/g, "").slice(0, 4);
  return digitsOnly.length > 2 ? `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}` : digitsOnly;
};
