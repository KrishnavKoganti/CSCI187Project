import EventCalendar from "./components/EventCalendar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
// function App() {

//   <div className="app">
//   <Router>
//     <Routes>
//     <Route path="/" element={<Login />} />
//     </Routes>
//   </Router>
// </div>
//   // return (
//   //   <>
//   //     <EventCalendar />
//   //   </>
//   // )
// }

import Register from "./components/Register";
import Reset from "./components/Reset";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/reset" element={<Reset />} />
          <Route path="/Dashboard" element={<EventCalendar />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
