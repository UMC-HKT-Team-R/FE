import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

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
      <Header />
      <Outlet />
      {isFooterShow && <Footer />}
    </>
  );
}

export default Layout;
