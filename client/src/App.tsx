import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
    </>
  );
}
