import kakaologin from "../assets/kakaoicon.svg";
import mainlogo from "../assets/mainlogo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가
    login();
    navigate("/");
  };

  const handleBrowseWithoutLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center pt-[228px]  min-h-screen px-[20px] bg-[#101123]">
      <div className="flex flex-col items-center">
        <img src={mainlogo} alt="흑백야식가 로고" className="w-[120px] h-[120px]" />
        <div className="mt-[28px] text-[#fff] tracking-wider text-[50px] font-bold  font-hsBombaram">
          흑백야식가
        </div>
      </div>

      <div className="mt-[172px] w-full space-y-4">
        <button
          className="flex items-center justify-center w-full py-[12px] bg-[#FEE500] rounded-[8px]  hover:bg-yellow2"
          onClick={handleKakaoLogin}
        >
          <span className="mr-[8px]">
            <img src={kakaologin} alt="카카오아이콘" className="w-[18px] h-[18px]" />
          </span>
          <span className="text-grey1000 font-pretendard text-md leading-[20px]">
            카카오로 로그인
          </span>
        </button>

        <button
          className="w-full py-[12px] bg-[#fff] rounded-[8px]  hover:bg-grey700"
          onClick={handleBrowseWithoutLogin}
        >
          <span className="text-grey1000 font-pretendard text-md leading-[20px]">
            로그인 없이 둘러보기
          </span>
        </button>
      </div>
    </div>
  );
}

export default Login;
