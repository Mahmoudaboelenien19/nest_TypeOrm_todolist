import { HTMLAttributes, ReactNode } from "react";

import { MotionProps, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;
const Container = ({ children, className, ...props }: Props) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <motion.div
      {...props}
      className={clsx(
        "w-full min-h-[calc(100vh_-_50px)] flex justify-center items-center",
        className
      )}
      initial={{ opacity: 0, x: isHome ? -100 : 100 }}
      animate={{ opacity: [0.5, 1], x: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
