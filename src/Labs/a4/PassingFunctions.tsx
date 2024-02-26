function PassingFunctions({ theFunction }: { theFunction: () => void }) {
  return (
    <div>
      <h2>Passing Functions</h2>
      <button type="button" onClick={theFunction}>
        Invoke the Function
      </button>
    </div>
  );
}
export default PassingFunctions;
