import Trash from "@/assets/trash.svg?react";
import { HistoryProps } from "@/pages/history";

interface CardProps extends HistoryProps {
  onClickDelete: (calendarId: number, detailFood: string) => void;
}

function Card({
  calendarId,
  imageUrl,
  detailFood,
  category,
  color = "WHITE",
  onClickDelete,
}: CardProps) {
  const isBlack = color === "BLACK";

  return (
    <div
      className={`border border-grey200 rounded-lg p-3 flex justify-between text-md ${
        isBlack && "bg-black text-white"
      }`}
    >
      <div className="flex gap-3 items-center">
        <img src={imageUrl} alt="음식 사진" width={60} height={60} />
        <div className="flex flex-col gap-1 justify-center truncate mr-4">
          <p className="truncate font-semibold">{detailFood}</p>
          <p>{category}</p>
        </div>
      </div>
      <button className="justify-self-end" onClick={() => onClickDelete(calendarId, detailFood)}>
        <Trash />
      </button>
    </div>
  );
}

export default Card;
