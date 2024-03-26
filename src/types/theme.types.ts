export interface ThemeContextInterface {
  activeMode: boolean;
  activateTheme: (theme: string) => void;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
}
