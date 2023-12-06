import clsx from "clsx";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import FetchLoading from "./FetchLoading";

type Props = {
  Icon?: IconType;
  btn: string;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;
const MainBtn = ({ btn, Icon, className, loading, ...props }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={btn}
        {...props}
        initial={{ opacity: 1 }}
        exit={{ opacity: [0.5, 0] }}
        whileHover={{ opacity: 0.7 }}
        className={clsx(
          "border-0  text-white/80 flex justify-center items-center gap-1  font-medium p-2",
          className,
          loading && "opacity-70"
        )}
      >
        {!loading ? (
          <>
            <span>{btn}</span>
            {Icon && <Icon size={16} />}
          </>
        ) : (
          <FetchLoading width={"16"} initialX={-20} />
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default MainBtn;
