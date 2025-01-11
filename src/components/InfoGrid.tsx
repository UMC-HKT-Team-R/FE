import React, { useEffect, useState } from "react";

interface InfoItem {
  postId: number;
  title: string;
  date: string;
  image_url: string;
}

const InfoGrid: React.FC<{ onPostClick: (postId: number) => void }> = ({ onPostClick }) => {
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInfoItems = async () => {
    try {
      const response = await fetch("/api/info-items");
      if (!response.ok) {
        throw new Error("데이터를 불러오는 데 실패했습니다.");
      }
      const data = await response.json();
      setInfoItems(data.data.posts);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfoItems();
  }, []);

  return (
    <div className="min-h-[300px]">
      {isLoading && <p className="text-center mt-4">로딩 중...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {infoItems.map((item) => (
          <div
            key={item.postId}
            className="rounded-lg overflow-hidden border shadow-md bg-white cursor-pointer"
            onClick={() => onPostClick(item.postId)}
          >
            <img src={item.image_url} alt={item.title} className="w-full h-24 object-cover" />
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
