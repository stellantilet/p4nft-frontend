import { MouseEventHandler, ReactNode } from "react";

const Button = ({
  onClick,
  children,
  className,
  ...rest
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <button
      {...rest}
      className={"text-white bg-black hover:bg-gray-700 rounded-full px-6 py-2"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
