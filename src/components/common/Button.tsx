import { MouseEvent } from "react";
import classNames from "classnames";

type ButtonProps = {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  className,
  children,
  onClick,
  size,
  disabled = false,
  variant,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        variant,
        size === "sm"
          ? "h-8 text-sm"
          : size === "md"
            ? "text-md h-10"
            : "h-12 text-lg",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
