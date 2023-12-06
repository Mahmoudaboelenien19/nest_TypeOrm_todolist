import ErrorInput from "@/components/shared/ErrorInput";
import MainBtn from "@/components/shared/MainBtn";
import { Todo } from "@/lib/types/todoType";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "sonner";

const Form = () => {
  const userId = "";
  const [err, setErr] = useState("");
  //   const search = useSearchParams();
  //   const updateVal = search.get("update") || "";
  //   const todoId = search.get("todoId") || "";

  const [todo, setTodo] = React.useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    if (err && e.target.value.length < 25) {
      setErr("");
    }
  };
  const inpRef = useRef<HTMLInputElement>(null);
  //   useEffect(() => {
  //     if (updateVal && inpRef.current) {
  //       inpRef.current.value = updateVal;
  //       setTodo(updateVal);
  //     }
  //   }, [updateVal]);
  const addToDoFn = async () => {
    const todoObj: Todo = {
      content: todo || "",
      isDone: false,
    };
    if (userId) {
      if (todoObj?.content !== "" && todoObj?.content.length < 25) {
        if (err) {
          setErr("");
        }
        const res = AddTodo(userId, todoObj);

        toast.promise(res, {
          loading: "Loading...",
          success: (data: { msg: string }) => {
            formRef.current?.reset();
            setTodo("");
            return `${data.msg} `;
          },
          error: "Error",
        });
      } else if (todoObj?.content.length >= 25) {
        setErr("you can't exceed 24 letter.");
      } else {
        setErr("add a todo ... !");
      }
    } else {
      setErr("you must sign in to add todo ... !");
    }
  };

  const updateTodoFn = async () => {
    if (userId) {
      if (todo !== "" && todo.length < 25) {
        if (err) {
          setErr("");
        } else if (todo.length >= 25) {
          setErr("you can't exceed 24 letter.");
        } else {
          setErr("add a todo ... !");
        }
      } else {
        setErr("you must sign in to add todo ... !");
      }
    }
  };
  const handleSUbmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSUbmit}
      className="w-full h-12 flex justify-between  my-10 mx-auto text-xs md:text-base relative "
    >
      <ErrorInput err={err} />
      <input
        ref={inpRef}
        onChange={handleChange}
        type="text"
        placeholder="What needs to be done "
        className="border-0 outline-none h-full pl-2 rounded-l w-[80%]"
      />
      <MainBtn
        className=" w-1/5 bg-body  rounded-r"
        onClick={updateVal ? updateTodoFn : addToDoFn}
        btn={updateVal?.length >= 1 ? "Update" : "Add"}
        Icon={FiArrowUpRight}
      />
    </form>
  );
};

export default Form;
