import { useAuth } from "@/contexts/AuthContext";
import kakaologin from "../assets/kakaoicon.svg";
import { useNavigate } from "react-router-dom";


function Guest() {
  const navigate = useNavigate();
    const { login } = useAuth();

  const handleKakaoLogin = () => {
    const link =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8943f39e2168778d67d5cf0b2e85055c&redirect_uri=http://localhost:5173/callback";
    window.location.href = link;
    login();
    navigate("/");
  };

  return (
    <main className="flex justify-center items-center text-center">
      <p className="text-xl  mb-3">
      로그인 하고 <br />
      더 많은 서비스를 <br />
      즐겨보세요!
      </p>
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
    </main>
  )
}

export default Guest;
