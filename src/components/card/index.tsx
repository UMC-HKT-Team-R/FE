import Trash from "@/assets/trash.svg?react";
import { FoodType } from "@/constants/food-type";

interface CardProps {
  id: number;
  src: string;
  name: string;
  category: string;
  type?: FoodType;
  onClickDelete: (id: number, name: string) => void;
}

function Card({
  id,
  src,
  name,
  category,
  type = "WHITE",
  onClickDelete,
}: CardProps) {
  const isBlack = type === "BLACK";

  return (
    <div
      className={`border border-grey200 rounded-lg p-3 flex justify-between text-md ${
        isBlack && "bg-black text-white"
      }`}
    >
      <div className="flex gap-3 items-center">
        <img src={src} alt="음식 사진" width={60} height={60} />
        <div className="flex flex-col gap-1 justify-center truncate mr-4">
          <p className="truncate font-semibold">{name}</p>
          <p>{category}</p>
        </div>
      </div>
      <button
        className="justify-self-end"
        onClick={() => onClickDelete(id, name)}
      >
        <Trash />
      </button>
    </div>
  );
}

export default Card;
