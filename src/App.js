import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import RoutesURL from "./RoutesURL";

function App() {
    return (
        <Router>
            <div className="App font-montserrat font-bold">
                <NavBar />

                <RoutesURL />

                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
