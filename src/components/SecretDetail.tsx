import React from "react";
import ArrowLeft from "@/assets/arrow-left.svg?react";

interface SecretDetailProps {
  title: string;
  date: string;
  body: string;
  image: string;
  onBack: () => void;
}

const SecretDetail: React.FC<SecretDetailProps> = ({ title, date, body, image, onBack }) => {
  return (
    <div className="flex flex-col bg-white">
      {/* 상단바 */}
      <header className="py-[16px] flex items-center max-w-[468px] px-[16px] fixed top-0 left-1/2 w-full bg-white z-10 -translate-x-1/2">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      {/* 컨텐츠 */}
      <div className="relative">
        <div className="relative -mt-[16px]">
          <img
            src={image}
            alt={title}
            className="w-full h-[252px] object-cover" // 둥글기 제거
            style={{ borderRadius: '0 !important', overflow: 'visible !important'}} // 둥글기를 완전히 없애기 위해 추가
          />
<div
  className="absolute bottom-0 left-0 w-full p-4 f-full"
  style={{
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)", 
  }}
>
  <p className="text-lg text-white mb-1 text-right p-3">{date}</p>
  <h2 className="text-[26px] font-hsBombaram text-white">
    {title.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </h2>
</div>

        </div>
        <div className="p-4">
          <p className="text-md text-gray-700 whitespace-pre-line">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default SecretDetail;

