import profile from "../../assets/logo.png";

function Header() {
  return (
    <header className="py-[22px] flex items-center flex-row max-w-[468px] px-[16px] fixed top-0 left-0 w-full bg-white z-10 -translate-x-1/2 left-1/2">
      <img src={profile} alt="로고" className=" w-[131.2px] h-[24px]" />
    </header>
  );
}

export default Header;
