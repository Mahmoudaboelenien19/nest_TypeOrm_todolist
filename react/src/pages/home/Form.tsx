import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Dialog from "./Dialog";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
const Form = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const updatedTaskId = searchParams.get("update_todo") || "";

  useEffect(() => {
    if (updatedTaskId) {
      setOpen(true);
    }
  }, [updatedTaskId]);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button
          className="bg-mainRed hover:opacity-70  h-20 w-20 rounded-full fixed bottom-4 left-4 grid place-items-center"
          onClick={() => setOpen(true)}
        >
          <FaPlus color="white" size={25} />
        </button>
      </motion.div>
      {open && <Dialog updatedTaskId={updatedTaskId || ""} setOpen={setOpen} />}
    </div>
  );
};

export default Form;
