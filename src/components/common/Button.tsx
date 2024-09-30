import { MouseEvent } from "react";
import classNames from "classnames";

type ButtonProps = {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
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
  variant,
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
