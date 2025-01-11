import Profile from "@/assets/profile.png";

function Mypage() {
  return (
    <main>
      <div className="flex gap-4">
        <img src={Profile} className="w-16" />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <p className="text-lg font-semibold">이한비</p>
            <div className="px-3 py-1 bg-gray-900 rounded text-white text-sm">
              갈대 같은 야식가
            </div>
          </div>
          <p className="text-sm text-black2">dlfkscigs@naver.com</p>
        </div>
      </div>
      <div className="h-4 w-full -mx-4 px-4 bg-gray-100 mt-5" />
      <div>2025년 1월 야식 결산</div>
      <div className="h-4 w-full -mx-4 px-4 bg-gray-100 mb-7" />
      <div className="px-1 flex flex-col">
        <button type="button" className="h-[52px] text-start">
          자주 묻는 질문
        </button>
        <button type="button" className="h-[52px] text-start">
          고객 지원
        </button>
        <button type="button" className="h-[52px] text-start">
          서비스 이용 약관
        </button>
        <button type="button" className="h-[52px] text-start">
          탈퇴하기
        </button>
      </div>
    </main>
  );
}

export default Mypage;
