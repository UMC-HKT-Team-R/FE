import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import Layout from "./components/layout";
import Recommend from "./pages/recommend";
import Post from "./pages/post";
import History from "./pages/history";
import Mypage from "./pages/mypage";
import PostDetail from "./components/PostDetail";
import PostWrite from "./components/PostWrite";
import AddMenu from "./pages/add-menu";
import Callback from "./pages/callback";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="post-write" element={<PostWrite />} />
        <Route path="post-detail/:postId" element={<PostDetail />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/post" element={<Post />} />
          <Route path="/history" element={<History />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
