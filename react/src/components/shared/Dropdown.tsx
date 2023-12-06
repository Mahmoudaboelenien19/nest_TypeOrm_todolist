import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "./helpers/useClickOutside";
type Props = {
  bool: boolean;

  isUser?: boolean;
  addCloseIcon?: boolean;
  children: ReactNode;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};
const dropdownVariant = {
  start: {
    opacity: 0,
    scale: 0.8,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: {
        delay: 0.3,
      },
      scale: {
        delay: 0.3,
      },
    },
  },
  exit: {
    scale: 0.8,

    opacity: 0,
    transition: {
      opacity: { duration: 0.1 },
    },
  },
};

const DropDown = ({ bool, setter, children }: Props) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setter(false);
  }, bool);

  return (
    <section ref={ref}>
      <AnimatePresence mode="wait">
        {bool && (
          <motion.div
            className={"absolute top-full left-0 z-20 bg-body w-full "}
            variants={dropdownVariant}
            initial="start"
            animate="end"
            exit={"exit"}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DropDown;
