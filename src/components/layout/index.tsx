import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";

function Layout() {
  const { pathname } = useLocation();

  const isFooterShow =
    pathname === "/" ||
    pathname === "/recommend" ||
    pathname === "/post" ||
    pathname === "/history" ||
    pathname === "/mypage";

  return (
    <>
      <Outlet />
      {isFooterShow && <Footer />}
    </>
  );
}

export default Layout;
