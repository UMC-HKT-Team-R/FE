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
  selectedDates: Date[];
  onChange: (dates: Date[] | null) => void;
}

const InlineCalendar = ({ selectedDates, onChange }: CalendarProps) => {
  const activeColor = () => {
    const outsideMonth = document.querySelectorAll<HTMLElement>(
      ".react-datepicker__day--outside-month"
    );
    outsideMonth.forEach((day) => {
      day.style.color = "#B3B5BD";
    });
  };

  return (
    <div className="inline-calendar">
      <DatePicker
        dateFormatCalendar="yyyy년"
        onChange={onChange}
        startDate={new Date()}
        selectedDates={selectedDates}
        inline
        selectsMultiple
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
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <ArrowLeft color={prevMonthButtonDisabled ? "#B3B5BD" : "#262626"} />
            </button>
            <span className="font-semibold text-xl">
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>
            <div className="flex gap-6">
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

export default InlineCalendar;
