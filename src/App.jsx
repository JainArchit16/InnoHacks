import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Seller from "./Seller";
import Home from "./Home";
import Buyer from "./Buyer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/Seller" element={<Seller />}></Route>
          <Route exact path="/Buyer" element={<Buyer />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;