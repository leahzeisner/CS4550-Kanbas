import { API_BASE } from "../../Kanbas/constants";
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

function Assignment5() {
  const welcome_url = `${API_BASE}/a5/welcome`;
  return (
    <div className="container mb-4">
      <h1>Assignment 5</h1>
      <a href={welcome_url}>Welcome</a>

      <EncodingParametersInURLs />
      <WorkingWithObjects />
      <WorkingWithArrays />
    </div>
  );
}
export default Assignment5;
