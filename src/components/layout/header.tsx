import logo from "../../assets/logo.svg";

function Header() {
  return (
    <header className="py-[22px] px-[16px] fixed top-0 left-0 w-full bg-white z-10">
      <img src={logo} alt="로고" className="w-[131.2px] h-[24px]" />
    </header>
  );
}

export default Header;
