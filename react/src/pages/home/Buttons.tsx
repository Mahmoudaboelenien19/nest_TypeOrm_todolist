import { useAppDispatch } from "@/components/shared/helpers/reduxTypes";
import { backendRoute } from "@/lib/url";
import { removeFromTodosRedux, toggleCheckTodo } from "@/redux/todosSlice";
import axios from "axios";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
type Props = { id: string; isDone: boolean };
const Buttons = ({ id, isDone }: Props) => {
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const res = axios.delete(backendRoute + "/todos/" + id);

    toast.promise(res, {
      loading: "Loading...",
      success: () => {
        dispatch(removeFromTodosRedux(id));
        return `task deleted successfully `;
      },
      error: "Error",
    });
  };

  const handleCheck = async () => {
    const res = await axios.patch(backendRoute + "/todos/" + id, {
      isDone: !isDone,
    });
    if (res.status === 200) {
      dispatch(toggleCheckTodo(id));
      toast.success("task updated successfully");
    }
  };

  const update = () => {
    setSearchParams((params) => {
      params.set("update_todo", id);
      return params;
    });
  };
  return (
    <div className="flex gap-2 justify-center items-center w-[100px]">
      <AiFillCheckCircle color="#a59c3a" onClick={handleCheck} />
      <HiPencilAlt color="#178283" onClick={update} />
      <AiFillDelete color="#ee7c75" onClick={handleDelete} />
    </div>
  );
};

export default Buttons;
