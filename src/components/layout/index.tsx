import { Outlet } from "react-router-dom";
import Footer from "./footer";

function Layout() {
  return (
    <div className="flex font-pretendard mx-auto h-full min-w-min-size max-w-max-size px-4 flex-col">
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
