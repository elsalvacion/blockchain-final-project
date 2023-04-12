import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CommunicationScreen from "./screens/CommunicationScreen";
const App = () => {
  return (
    <div className="h-screen bg-gray-300">
      <BrowserRouter>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/communication" component={CommunicationScreen} />
      </BrowserRouter>
    </div>
  );
};

export default App;
