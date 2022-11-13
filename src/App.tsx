import "./App.css";
import { useRepos } from "./api";

function App() {
  const { data } = useRepos({ q: "test" });

  return <div className="App">{data?.items.map((item) => item.name)}</div>;
}

export default App;
