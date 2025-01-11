import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

function Layout() {
  const { pathname } = useLocation();

  const isLayoutShow =
    pathname === "/" ||
    pathname === "/recommend" ||
    pathname === "/post" ||
    pathname === "/history" ||
    pathname === "/mypage";

  return (
    <>
      {isLayoutShow && <Header />}
      <Outlet />
      {isLayoutShow && <Footer />}
    </>
  );
}

export default Layout;
