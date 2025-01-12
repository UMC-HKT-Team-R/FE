import InlineCalendar from "@/components/calendar/inline-calendar";
import { useEffect, useState } from "react";
import { formatDashDate, formatDate } from "@/utils/date";
import Card from "@/components/card";
import { useNavigate } from "react-router-dom";
import Add from "@/assets/add.svg?react";
import { api } from "@/services/api";
import { FoodType } from "@/constants/food-type";
import { getCalendarByDate, getMontlyCalendar } from "@/services/calendar";

export interface HistoryProps {
  foodId: number;
  imgUrl: string;
  foodName: string;
  category: string;
  color: FoodType;
}

function History() {
  const [data, setData] = useState<HistoryProps[]>([]);
  const [isLoading, setIsLoaidng] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [monthlyData, setMontlyData] = useState({
    blackCount: 0,
    whiteCount: 0,
    calendarInfoDTOS: [],
  });
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

  const onClickDelete = async () => {
    setIsLoaidng(true);
    try {
      await api.delete(`/api/calendar/${modal.id}`);
      await fetchHistories();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaidng(false);
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    setModal({ open: false, id: -1, name: "" });
  };
  console.log(data);
  const fetchHistories = async () => {
    try {
      const [dailyResponse, monthlyResponse] = await Promise.all([
        getCalendarByDate(formatDashDate(selectedDate)),
        getMontlyCalendar(selectedDate.getMonth() + 1, selectedDate.getFullYear()),
      ]);
      setData(dailyResponse.data.result);
      setMontlyData({
        ...monthlyResponse.data.result,
        calendarInfoDTOS: monthlyResponse.data.result.calendarInfoDTOS.map(
          ({ date }: { date: string }) => new Date(date)
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, [selectedDate]);

  return (
    <main>
      <InlineCalendar selectedDates={monthlyData.calendarInfoDTOS} onChange={onSelectedDate} />
      <section className="flex items-center gap-2 text-md">
        <p className="border border-black flex-1 text-center py-2 rounded-lg">
          백색 야식 <span className="font-semibold">{monthlyData.whiteCount}일</span>
        </p>
        <p className="border border-black flex-1 text-center py-2 rounded-lg bg-black text-white">
          흑색 야식 <span className="font-semibold">{monthlyData.blackCount}일</span>
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
        {data.length > 0 ? (
          <div className="flex flex-col gap-3 pb-24">
            {data.map((item) => (
              <Card key={item.foodId} {...item} onClickDelete={onOpenModal} />
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
              <p className="text-xl text-error font-semibold">{modal.name}</p>
              <p className="font-medium text-md">야식 기록을 삭제할까요?</p>
            </div>
            <div className="flex font-medium text-md gap-2">
              <button
                disabled={isLoading}
                className="min-w-36 flex-1 rounded-lg py-2 bg-grey100"
                onClick={onCloseModal}
              >
                취소
              </button>
              <button
                disabled={isLoading}
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
