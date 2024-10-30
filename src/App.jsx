import "./App.css";
import { Chart } from "./chart";

const data = [
  { date: "2023-01-01", amount: 100 },
  { date: "2023-02-01", amount: 150 },
  { date: "2023-03-01", amount: 200 },
  { date: "2023-04-01", amount: 170 },
  { date: "2023-05-01", amount: 210 },
];

function App() {
  return <Chart data={data} />;
}

export default App;
