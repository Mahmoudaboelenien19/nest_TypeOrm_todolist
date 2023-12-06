import Buttons from "./Buttons";
import { type Todo } from "@/lib/types/todoType";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  i: number;
} & Todo;
const Task = ({
  i,
  id,
  title,
  category,
  description,
  isDone,
  createdAt,
  finishedAt,
}: Props) => {
  const getDate = (date: Date) =>
    date.toDateString() + "   " + date.toTimeString().split(" ")[0];

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: isDone ? 0.4 : [0.4, 1] }}
        exit={{ opacity: [1, 0.5, 0] }}
        transition={{ delay: 0.2 + 0.075 * i }}
        className="relative flex w-full min-h-[120px] border-2 border-white/80 text-white/70 px-2 justify-between "
        key={id}
      >
        <div className="p-2 w-[calc(100%_-_80px)]  overflow-hidden">
          <h2 className="text-l flex items-center">
            {title}&nbsp; &nbsp;
            <span className="text-[10px] text-mainRed"> ( {category} )</span>
          </h2>
          <p className="text-xs opacity-70 lowercase">{description}</p>
          <div className="flex gap-4 text-[9px] opacity-70 py-1 capitalize mt-1 absolute bottom-1 left-4">
            <p className="">
              <span className="capitalize mr-1 text-green-400">created at</span>
              {getDate(new Date(createdAt))}
            </p>
            <p>
              <span className="capitalize mr-1 text-yellow-300">
                should done At
              </span>
              {getDate(new Date(finishedAt))}
            </p>
          </div>
        </div>
        <Buttons id={id || ""} isDone={isDone} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Task;
