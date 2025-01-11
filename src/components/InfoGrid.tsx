import React, { useEffect, useState } from "react";

interface InfoItem {
  title: string;
  date: string;
  image: string;
}

const InfoGrid: React.FC = () => {
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]); // 상태로 데이터 관리
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // API 호출 함수
  const fetchInfoItems = async () => {
    try {
      const response = await fetch("/api/info-items"); // API 엔드포인트
      if (!response.ok) {
        throw new Error("데이터를 불러오는 데 실패했습니다.");
      }
      const data: InfoItem[] = await response.json(); // JSON 형식으로 데이터 파싱
      setInfoItems(data); // 상태 업데이트
    } catch (err) {
      setError((err as Error).message); // 에러 상태 업데이트
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    fetchInfoItems();
  }, []);

  return (
    <div>
      {/* 로딩 상태 처리 */}
      {isLoading && <p>로딩 중...</p>}

      {/* 에러 처리 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 데이터 표시 */}
      <div className="grid grid-cols-2 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="rounded-lg overflow-hidden border shadow-md bg-white">
            <img src={item.image} alt={item.title} className="w-full h-24 object-cover" />
            <div className="p-2">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoGrid;
