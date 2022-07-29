import { useDispatch, useSelector } from "react-redux";
import { getToDoStep, setToDoStep } from "../Store/ToDoStepReducer";

export default useToDoStepUpdate = () => {
  const dispatch = useDispatch();
  const prevState = useSelector(getToDoStep);
  dispatch(
    setToDoStep({
      nowStep: prevState.nextStep,
      nextStep: prevState.nextStep + 1,
    })
  );
};
