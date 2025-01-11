import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";

import ArrowLeft from "@/assets/arrow-left.svg?react";

import "./style.css";

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

interface CalendarProps {
  selectedDate: Date | null;
  onChange: (dates: Date | null) => void;
}

const PopupCalendar = ({ selectedDate, onChange }: CalendarProps) => {
  const activeColor = () => {
    const outsideMonth = document.querySelectorAll<HTMLElement>(
      ".react-datepicker__day--outside-month"
    );
    outsideMonth.forEach((day) => {
      day.style.color = "#B3B5BD";
    });
  };

  return (
    <div className="popup-calendar">
      <DatePicker
        dateFormatCalendar="yyyy년 MM월"
        selected={selectedDate}
        onChange={onChange}
        startDate={selectedDate || new Date()}
        inline
        locale={ko}
        onMonthChange={activeColor}
        maxDate={new Date()}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }: CustomHeaderProps) => (
          <div className="flex justify-between">
            <span className="font-bold">
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>
            <div className="flex gap-6">
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <ArrowLeft color={prevMonthButtonDisabled ? "#B3B5BD" : "#262626"} />
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="rotate-180"
              >
                <ArrowLeft color={nextMonthButtonDisabled ? "#B3B5BD" : "#262626"} />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PopupCalendar;
