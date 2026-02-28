import { ReactNode } from "react";

type containerProps = {
  children: ReactNode;
  className?:ReactNode
};


const Container = ({ children,className }: containerProps) => {
  return <div className={`max-w-355    px-2 md:px-0 ${className}`}>{children}</div>;

}

export default Container;