import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="font-pretendard">
      <Outlet />
    </div>
  );
}

export default Layout;
