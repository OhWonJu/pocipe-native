import { useDispatch, useSelector } from "react-redux";
import { getToDoAutoRun, setToDoAutoRun } from "../Store/ToDoAutoRunReducer";

export default useToggleToDoAutoRun = (param) => {
  const dispatch = useDispatch();
  const prevState = useSelector(getToDoAutoRun);
  if (param !== undefined) {
    dispatch(setToDoAutoRun({ isAutoRun: param }));
  } else {
    dispatch(setToDoAutoRun({ isAutoRun: !prevState.isAutoRun }));
  }
};
