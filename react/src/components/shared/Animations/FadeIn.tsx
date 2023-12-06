import { AnimatePresence, MotionProps, motion } from "framer-motion";
import { HTMLAttributes, ReactNode } from "react";
type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

const FadeIn = ({ children, ...props }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...props}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1] }}
        exit={{ opacity: [0.5, 0] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeIn;
