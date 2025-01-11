import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "@/services/member";
import { useAuth } from "@/contexts/AuthContext";

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        try {
          const response = await getLogin(code);
          const { accessToken, refreshToken } = response.data.result;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          login();
          navigate("/");
        } catch (error) {
          console.error("로그인 실패", error);
        }
      }
    };

    fetchData();
  }, [navigate, login]);

  return <div>로그인 처리 중...</div>;
};

export default Callback;
