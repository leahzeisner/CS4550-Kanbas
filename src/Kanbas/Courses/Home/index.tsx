import ModuleList from "../Modules/List";
import Status from "./Status";
import "../../styles.css";

function Home() {
  return (
    <div className="main-content">
      <ModuleList />
      <Status />
    </div>
  );
}
export default Home;
