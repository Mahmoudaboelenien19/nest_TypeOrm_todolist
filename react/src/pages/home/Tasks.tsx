import { Todo } from "@/lib/types/todoType";
import Task from "./Task";
import FadeIn from "@/components/shared/Animations/FadeIn";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/shared/helpers/reduxTypes";
import axios from "axios";
import { useEffect } from "react";
import { addToTodosRedux } from "@/redux/todosSlice";
import { backendRoute } from "@/lib/url";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((st) => st.todos);
  const { userId } = useAppSelector((st) => st.auth);
  const gnetTodos = () => {
    return axios.get(backendRoute + `/todos?userid=${userId}`);
  };

  useEffect(() => {
    if (!todos.length && userId) {
      gnetTodos().then(({ data }) => dispatch(addToTodosRedux(data.reverse())));
    }
  }, [userId]);
  return (
    <div className="tasks overflow-y-auto overflow-x-hidden mx-auto flex flex-col gap-4  h-4/5  w-full p-4 [scrollbar-gutter: stable both-edges]">
      {todos?.length ? (
        <>
          {todos?.map((todo: Todo, i: number) => {
            return <Task {...todo} key={todo.id} i={i} />;
          })}
        </>
      ) : (
        <FadeIn key="no-todos" className="m-auto text-white/60   ">
          No todos to show
        </FadeIn>
      )}
    </div>
  );
};

export default Tasks;
