import InlineCalendar from "@/components/calendar/inline-calendar";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import food from "@/assets/food.png";
import Card from "@/components/card";
import { useNavigate } from "react-router-dom";
import Add from "@/assets/add.svg?react";

const histories = [
  {
    id: 1,
    name: "연어 아보카도 포케",
    category: "양식",
    type: "WHITE" as const,
    src: food,
  },
  {
    id: 2,
    name: "연어 아보카도 포케",
    category: "양식",
    type: "BLACK" as const,
    src: food,
  },
];

function History() {
  const [date, setDate] = useState<Date[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modal, setModal] = useState({
    open: false,
    id: -1,
    name: "",
  });

  const navigate = useNavigate();

  const onClickAddHistory = () => {
    navigate("/add-menu");
  };

  const onSelectedDate = (date: Date[] | null) => {
    setSelectedDate(date ? date[0] : new Date());
  };

  const onOpenModal = (id: number, name: string) => {
    setModal({ open: true, id, name });
  };

  const onClickDelete = () => {
    // 삭제 API 요청
    onCloseModal();
  };

  const onCloseModal = () => {
    setModal({ open: false, id: -1, name: "" });
  };

  useEffect(() => {
    setDate([]);
  }, []);

  return (
    <main>
      <InlineCalendar selectedDate={date} onChange={onSelectedDate} />
      <section className="flex items-center gap-2 text-md">
        <p className="border border-black flex-1 text-center py-2 rounded-lg">
          백색 야식 <span className="font-semibold">13일</span>
        </p>
        <p className="border border-black flex-1 text-center py-2 rounded-lg bg-black text-white">
          흑색 야식 <span className="font-semibold">13일</span>
        </p>
      </section>
      <section className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">{formatDate(selectedDate)}</p>
          <button
            onClick={onClickAddHistory}
            className="text-xl bg-yellow1 text-white w-8 h-8 rounded-full flex justify-center items-center"
          >
            <Add />
          </button>
        </div>
        {histories.length > 0 ? (
          <div className="flex flex-col gap-3">
            {histories.map((history) => (
              <Card key={history.id} {...history} onClickDelete={onOpenModal} />
            ))}
          </div>
        ) : (
          <div className="text-center p-16">
            상단 +버튼을 눌러
            <br />
            야식을 기록해보세요.
          </div>
        )}
      </section>
      {modal.open && (
        <section className="fixed flex justify-center items-center left-0 top-0 bg-black bg-opacity-50 w-full h-full z-20">
          <div className="bg-white pt-9 pb-3 px-4 rounded-lg space-y-8">
            <div className="space-y-1 text-center">
              <p className="text-xl text-error font-semibold">연어 아보카도 포케</p>
              <p className="font-medium text-md">야식 기록을 삭제할까요?</p>
            </div>
            <div className="flex font-medium text-md gap-2">
              <button className="min-w-36 flex-1 rounded-lg py-2 bg-grey100" onClick={onCloseModal}>
                취소
              </button>
              <button
                className="min-w-36 flex-1 rounded-lg py-2 bg-error text-white"
                onClick={onClickDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default History;
