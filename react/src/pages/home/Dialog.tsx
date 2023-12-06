import FadeIn from "@/components/shared/Animations/FadeIn";
import ErrorInput from "@/components/shared/ErrorInput";
import Input from "@/components/shared/Input";
import MainBtn from "@/components/shared/MainBtn";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/shared/helpers/reduxTypes";
import { taskSchena } from "@/lib/schemas/taskSchema";
import { addToTodosRedux, updateTodoRedux } from "@/redux/todosSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import axios from "axios";
import { backendRoute } from "@/lib/url";
import { Todo } from "@/lib/types/todoType";
import { useSearchParams } from "react-router-dom";
const categories = ["work", "personal", "study", "shopping"];

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updatedTaskId: string;
};

const Dialog = ({ setOpen, updatedTaskId }: Props) => {
  const [_, setSearchParams] = useSearchParams();

  const resetSearchParams = () => setSearchParams({});

  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const { userId } = useAppSelector((state) => state.auth);

  const { description, category, title } =
    todos?.find((todo: Todo) => todo.id === updatedTaskId) || {};

  const methods = useForm({ resolver: yupResolver(taskSchena) });
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = methods;
  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      resetSearchParams();
    }
  };

  const addTask = async (data: FieldValues) => {
    const task = {
      ...data,
      user_id: userId,
      isDone: false,
    };
    const res = await axios.post(backendRoute + "/todos", task, {
      withCredentials: true,
    });
    if (res?.data) {
      handleClose();
      setTimeout(() => {
        dispatch(addToTodosRedux(res?.data));
      }, 400);
    }
  };

  const updateTask = async (data: FieldValues) => {
    console.log({ data, updatedTaskId });

    const res = await axios.patch(
      backendRoute + "/todos/" + updatedTaskId,
      { ...data, isDone: false },
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      handleClose();
      setTimeout(() => {
        dispatch(updateTodoRedux({ id: updatedTaskId, newTodo: data }));
      }, 400);
    }
  };
  const onSubmit = async (data: FieldValues) => {
    if (!updatedTaskId) {
      await addTask(data);
    } else {
      await updateTask(data);
    }
  };
  return (
    <FadeIn
      className="fixed top-0 left-0 w-full h-full bg-slate-400/70 z-20 flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-[550px]  w-full max-w-[600px]"
      >
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            noValidate
            className="w-full h-full bg-todo  shadow-2xl rounded gap-8 flex flex-col p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-white/70 w-fit  capitalize text-2xl h-20">
              {updatedTaskId ? "update task" : "add task"}
            </h2>
            <Input
              placeholder="task title"
              type="text"
              name="title"
              defaultValue={title}
            />
            <select
              {...register("category")}
              defaultValue={category || "work"}
              className="h-11 p-1 bg-transparent border border-body  text-white/70"
            >
              {categories.map((item) => {
                return (
                  <option value={item} className="text-black" key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <div className="relative">
              <input
                {...register("finishedAt")}
                //!  do it later how to adddefaultValue for this input
                type="datetime-local"
                className="h-11 p-1 
            bg-transparent border border-body w-full text-white/70  tracking-wider        "
              />
              <ErrorInput err={errors.date?.message?.toString() || ""} />
            </div>
            <div className="relative">
              <textarea
                defaultValue={description}
                {...register("description")}
                className="h-20 bg-transparent border border-body w-full text-white/70 p-1 tracking-wider "
              />
              <ErrorInput
                err={errors?.description?.message?.toString() || ""}
              />
            </div>
            <MainBtn
              btn={!updatedTaskId ? "Add Task" : "Update Task"}
              type="submit"
              className="  h-11 border bg-body  border-body w-full  rounded tracking-wider"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </form>
        </FormProvider>
      </div>
    </FadeIn>
  );
};

export default Dialog;
