import Home from "@/assets/home.svg?react";
import Recommend from "@/assets/recommend.svg?react";
import Post from "@/assets/post.svg?react";
import History from "@/assets/history.svg?react";
import Mypage from "@/assets/mypage.svg?react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "홈", path: "/", icon: Home },
  { name: "추천", path: "/recommend", icon: Recommend },
  { name: "게시판", path: "/post", icon: Post },
  { name: "기록", path: "/history", icon: History },
  { name: "마이페이지", path: "/mypage", icon: Mypage },
];

function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className="fixed bottom-0 w-full max-w-[468px] px-7 bg-white z-10 -translate-x-1/2 left-1/2">
      <nav className="w-full box-border">
        <ul className="flex justify-between pt-3 pb-7 text-xs">
          {navItems.map((item) => (
            <Link to={item.path} key={item.name}>
              <li className="flex flex-col items-center gap-2">
                <item.icon
                  color={pathname === item.path ? "#000000" : "#D3D4DA"}
                />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
