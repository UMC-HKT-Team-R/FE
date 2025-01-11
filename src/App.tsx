import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Layout from "./components/layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;