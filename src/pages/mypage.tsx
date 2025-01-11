import Profile from "@/assets/profile.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale } from "chart.js";

ChartJS.register(ArcElement, CategoryScale);

const data = {
  labels: ["아시안", "패스트푸드", "아시안"],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ["#FF6347", "#FFCD00", "#4CAF50", "#404252", "#EAF0FF"],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  cutout: "80%",
};

function Mypage() {
  return (
    <main className="overflow-y-auto">
      <div className="flex gap-4 items-center">
        <img src={Profile} className="w-20" />
        <div className="flex flex-col gap-1 w-full">
          <div className="gap-2">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">이한비</p>
              <button type="button" className="font-lg text-error underline">
                로그아웃
              </button>
            </div>
            <div className="px-3 py-1 bg-gray-900 rounded text-white text-md inline-block">
              갈대 같은 야식가
            </div>
          </div>
          <p className="text-md text-black2">dlfkscigs@naver.com</p>
        </div>
      </div>
      <div className="h-4 -mx-4 bg-gray-100 mt-5" />
      <div className="mt-6">
        <p className="text-[22px] font-semibold text-center font-pretendard">
          2025년 1월 야식 결산
        </p>
        <div className="py-4 px-14">
          <Doughnut data={data} options={options} />
        </div>
        <div className="px-1 pb-9">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="rounded-sm w-6 h-6 bg-slate-500" />
              <p className="text-lg font-semibold">아시안</p>
            </div>
            <p className="font-md">13% · 3일</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Mypage;
