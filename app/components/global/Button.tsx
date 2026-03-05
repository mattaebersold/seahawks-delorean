import { NavLink } from "react-router";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps & {
  to: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    to?: never;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-dark-bottom text-white hover:bg-teal",
  secondary:
    "bg-teal/20 border border-teal text-teal hover:bg-teal/40",
  ghost: "text-white hover:bg-white/10",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full font-medium transition-colors",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("to" in rest && rest.to) {
    return (
      <NavLink to={rest.to} className={classes}>
        {children}
      </NavLink>
    );
  }

  const { to: _, ...buttonProps } = rest as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
