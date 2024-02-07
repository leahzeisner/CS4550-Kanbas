import WorkingWithArrays from "./arrays/WorkingWithArrays";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import BooleanVariables from "./variables/BooleanVariables";
import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";

function JavaScript() {
  console.log("Hello World");

  return (
    <div>
      <h1>JavaScript</h1>

      {/* Variables */}
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />

      {/* Conditionals */}
      <IfElse />
      <TernaryOperator />

      {/* Functions */}
      <WorkingWithFunctions />

      {/* Arrays */}
      <WorkingWithArrays />
    </div>
  );
}
export default JavaScript;
