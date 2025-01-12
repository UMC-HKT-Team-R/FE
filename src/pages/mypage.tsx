import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale } from "chart.js";
import { getMonthlySnackData, getMypageData } from "@/services/my";
import profile1 from "../assets/mainlogo.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import profile5 from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, CategoryScale);

interface CategoryProps {
  category: string;
  count: number;
}

const getGourmetInfo = (categories: number): { type: string; image: string } => {
  if (categories <= 10) return { type: "절제 미식가", image: profile1 };
  if (categories <= 30) return { type: "노력하는 미식가", image: profile2 };
  if (categories <= 50) return { type: "갈대같은 미식가", image: profile3 };
  if (categories <= 80) return { type: "충동적인 미식가", image: profile4 };
  return { type: "자극 중독 미식가", image: profile5 };
};

const backgroundColor = [
  "#235FB3",
  "#00BFA6",
  "#FE4040",
  "#51BD1B",
  "#FEE540",
  "#FB8809",
  "#FE40BF",
  "#7F40FE",
];

const options = {
  responsive: true,
  cutout: "80%",
};

function Mypage() {
  const [snackData, setSnackData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  });
  const [mypageData, setMypageData] = useState<{
    nickname: string;
    email: string;
    categories: number;
  } | null>(null);

  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;main

  const fetchMypageData = async () => {
    try {
      const [mypageResponse, snackResponse] = await Promise.all([
        getMypageData(),
        getMonthlySnackData(),
      ]);
      if (mypageResponse.isSuccess) {
        setMypageData(mypageResponse.result);
        const categories: CategoryProps[] = snackResponse.data.result.monthCountPreviewDTOList;
        const labels = categories.map((item) => item.category);
        const counts = categories.map((item) => item.count);
        setSnackData(
          (prev) =>
            ({
              ...prev,
              labels,
              datasets: [
                {
                  ...prev.datasets[0],
                  data: counts,
                },
              ],
            }) as typeof snackData
        );
      } else {
        console.error("Failed to fetch mypage data:", mypageResponse.message);
      }
    } catch (error) {
      console.error("Error fetching mypage data:", error);
    }
  };

  useEffect(() => {
    fetchMypageData();
  }, []);

  if (!mypageData) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p>로딩 중...</p>
      </main>
    );
  }

  const { nickname, email, categories } = mypageData;

  const { type, image } = getGourmetInfo(categories);

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    navigate('/login')
  }

  return (
    <main className="overflow-y-auto">
      <div className="flex gap-4 items-center">
        <img src={image} alt="Profile" className="w-20" />
        <div className="flex flex-col gap-1 w-full">
          <div className="gap-2">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">{nickname}</p>
              <button type="button" className="font-lg text-error underline" onClick={handleClick}>
                로그아웃
              </button>
            </div>
            <div className="px-3 py-1 bg-gray-900 rounded text-white text-md inline-block">
              {type}
            </div>
          </div>
          <p className="text-md text-black2">{email}</p>
        </div>
      </div>
      <div className="h-4 -mx-4 bg-gray-100 mt-5" />
      <div className="mt-6">
        <p className="text-[22px] font-semibold text-center font-pretendard">
          {year}년 {month}월 야식 결산
        </p>
        <div className="py-4 px-14">
          <Doughnut data={snackData} options={options} />
        </div>
        <div className="px-1 pb-9 flex flex-col gap-4">
          {snackData.labels.map((label, index) => (
            <div key={label} className="flex justify-between items-center mb-2">
              <div className="flex gap-3">
                <div
                  className="rounded-sm w-6 h-6"
                  style={{ backgroundColor: backgroundColor[index] }}
                />
                <p className="text-lg font-semibold" style={{ color: backgroundColor[index] }}>
                  {label}
                </p>
              </div>
              <p className="font-md">{snackData.datasets[0].data[index]}회</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Mypage;
