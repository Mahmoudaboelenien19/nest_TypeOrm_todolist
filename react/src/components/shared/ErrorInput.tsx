import { AnimatePresence, motion } from "framer-motion";

type Props = {
  err: string;
};

const ErrorInput = ({ err }: Props) => {
  return (
    <AnimatePresence>
      {err && (
        <motion.div
          key="err"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 1] }}
          exit={{ opacity: [1, 0.5, 0] }}
          className="capitalize  [text-wrap:balance]   absolute top-[calc(100%_+_5px)]  left-0 w-full h-4  text-center text-red-800  font-semibold text-[10px]"
        >
          {err}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorInput;
