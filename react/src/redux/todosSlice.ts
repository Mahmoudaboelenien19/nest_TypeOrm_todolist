import { type Todo } from "@/lib/types/todoType";
import { createSlice } from "@reduxjs/toolkit";
type TodoInitialState = {
  todos: Todo[];
};
const initialState: TodoInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo-slice",
  initialState,
  reducers: {
    addToTodosRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.todos = action.payload;
      } else {
        state.todos = [action.payload, ...state.todos];
      }
    },
    updateTodoRedux(state, action) {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload.id
          ? { ...todo, ...action.payload.newTodo, isDone: false }
          : todo;
      });
    },
    toggleCheckTodo(state, action) {
      state.todos = state.todos.map((ob) =>
        ob.id === action.payload ? { ...ob, isDone: !ob.isDone } : ob
      );
    },
    removeFromTodosRedux(state, action) {
      state.todos = state.todos.filter((ob) => ob.id !== action.payload);
    },
    clearAllTodos(state) {
      state.todos = [];
    },
  },
});

export const {
  addToTodosRedux,
  removeFromTodosRedux,
  clearAllTodos,
  toggleCheckTodo,
  updateTodoRedux,
} = todoSlice.actions;
export default todoSlice.reducer;
