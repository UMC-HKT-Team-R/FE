import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex font-pretendard mx-auto h-full min-w-[360px] max-w-[500px] px-4 flex-col">
      <Outlet />
    </div>
  );
}

export default Layout;
