import { useContext } from "react";
import { FormContext } from "../context/FormContext";

export const useForm = () => useContext(FormContext);
