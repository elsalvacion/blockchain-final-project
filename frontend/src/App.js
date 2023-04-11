import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
const App = () => {
  return (
    <div className="h-screen bg-gray-300">
      <BrowserRouter>
        <Route exact path="/" component={HomeScreen} />
      </BrowserRouter>
    </div>
  );
};

export default App;
