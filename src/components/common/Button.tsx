import { MouseEvent } from "react";
import classNames from "classnames";

type ButtonProps = {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  // @TODO Create and implement all btn variants
  variant?: "btn-1";
  size?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  className,
  children,
  onClick,
  size,
  disabled = false,
  variant = "btn-1",
}: ButtonProps) => {
  return (
    <button
      className={classNames(variant, size && `btn-${size}`, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
