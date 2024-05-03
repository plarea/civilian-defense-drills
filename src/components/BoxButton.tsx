import { ReactNode } from "react";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
};

export default function BoxButton({ children, onClick, className }: Props) {
  return (
    <button
      className={`border-dashed border-white border-2 rounded-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
