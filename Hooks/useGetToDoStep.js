import { useSelector } from "react-redux";
import { getToDoStep } from "../Store/ToDoStepReducer";

export default useGetToDoStep = () => {
  console.log(useSelector(getToDoStep));
  return useSelector(getToDoStep);
};
