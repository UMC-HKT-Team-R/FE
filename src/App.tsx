import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Layout from "./components/layout";
import Recommend from "./pages/recommend";
import Post from "./pages/post";
import History from "./pages/history";
import Mypage from "./pages/mypage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/post" element={<Post />} />
        <Route path="/history" element={<History />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;