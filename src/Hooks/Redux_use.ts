import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Root_Dispacht, Root_State_store } from "../Redux/store";

export const use_app_selector:TypedUseSelectorHook<Root_State_store> = useSelector
