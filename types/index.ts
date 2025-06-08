export type ThemeColor =
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral"
    | undefined;

export type ThemeVariant =
    | "soft"
    | "outline"
    | "link"
    | "solid"
    | "subtle"
    | "ghost"
    | undefined;

export type NavItem = {
  name: string;
  icon?: string;
  href?: string;
  active?: boolean;
  children?: NavItem[];
  open?: boolean;
  isSectionTitle?: boolean;
}
