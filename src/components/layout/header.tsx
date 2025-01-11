import profile from "../../assets/profile.png";

function Header() {
  return (
    <header className="py-[22px] gap-[5px] flex items-center flex-row max-w-[468px] px-[16px] fixed top-0 left-0 w-full bg-white z-10 -translate-x-1/2 left-1/2">
      <img src={profile} alt="로고" className=" w-[26px] h-[26px]" />
      <div className="font-hsBombaram text-[23px]">흑백야식가</div>
    </header>
  );
}

export default Header;
