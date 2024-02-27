import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { add } from "./addReducer";
import { LabState } from "../../../store";
function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: LabState) => state.addReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(add({ a, b }));
  }, [a, b]);

  return (
    <div className="w-25">
      <h1>Add Redux</h1>
      <h2>
        {a} + {b} = {sum}
      </h2>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
        className="form-control"
      />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
        className="form-control"
      />
      <button onClick={() => dispatch(add({ a, b }))}>Add Redux</button>
    </div>
  );
}
export default AddRedux;
