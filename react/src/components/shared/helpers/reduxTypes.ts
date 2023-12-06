import { RootType, appDispatch } from "@/redux/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;
export const useAppDispatch = () => useDispatch<appDispatch>();
