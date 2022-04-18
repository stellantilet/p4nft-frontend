import { MouseEventHandler, ReactNode } from "react";

const Button = ({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
