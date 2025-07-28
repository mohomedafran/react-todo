import Todo from "./Todo";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserAuth from "./UserAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/auth" element={<UserAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
