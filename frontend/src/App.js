import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CommunicationScreen from "./screens/CommunicationScreen";
import io from "socket.io-client";
import { backendBaseUrl } from "./constants/generalConstants";
const socket = io.connect(backendBaseUrl);
const App = () => {
  return (
    <div className="h-screen bg-gray-300">
      <BrowserRouter>
        <Route exact path="/" component={() => <HomeScreen />} />
        <Route
          exact
          path="/communication"
          component={() => <CommunicationScreen socket={socket} />}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
