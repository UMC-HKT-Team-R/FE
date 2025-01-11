import ArrowLeft from "@/assets/arrow-left.svg?react";
import { FOOD_TYPE } from "@/constants/food-type";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Photo from "@/assets/photo.svg?react";
import Calendar from "@/components/calendar";
import { formatDate } from "@/utils/date";
import useOutsideClick from "@/hooks/use-outside-click";

interface Data {
  date: Date | null;
  category: string;
  type: string;
  content: string;
  photo: string;
}

const categories = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "패스트푸드",
  "카페",
  "고기",
];

const DEFAULT_VALUE = {
  date: null,
  category: "",
  type: "",
  content: "",
  photo: "",
};

function AddMenu() {
  const { state } = useLocation();

  const [data, setData] = useState<Data>(state || DEFAULT_VALUE);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  const [calendarRef] = useOutsideClick<HTMLDivElement>(() =>
    setCalendarOpen(false)
  );
  const [bottomDrawerRef] = useOutsideClick<HTMLDivElement>(() =>
    setBottomDrawerOpen(false)
  );

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonDisabled =
    !data.date || !data.category || !data.type || !data.content;

  const bottomDrawerStyle = {
    transition: "height 0.3s",
    height: bottomDrawerOpen ? "264px" : "0",
  };

  const onGoBack = () => {
    navigate(-1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      content: e.target.value,
    });
  };

  const onSelectType = (type: string) => {
    setData({
      ...data,
      type,
    });
  };

  const onSelectCategory = (category: string) => {
    setData({
      ...data,
      category,
    });
    setBottomDrawerOpen(false);
  };

  const onPhotoUpload = () => {
    inputRef.current?.click();
  };

  const onUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setData({
        ...data,
        photo: reader.result as string,
      });
    };
  };

  const onToggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCalendarOpen((prev) => !prev);
  };

  const onOpenBottomDrawer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setBottomDrawerOpen(true);
  };

  const onSelectDate = (date: Date | null) => {
    setData({
      ...data,
      date: date as Date,
    });
    setCalendarOpen(false);
  };

  return (
    <main>
      <header className="py-6 px-4 top-0 fixed bg-white z-10 w-full">
        <button onClick={onGoBack}>
          <ArrowLeft />
        </button>
      </header>
      <section className="relative flex flex-col gap-9 pb-28">
        <div className="flex items-center gap-[50px]">
          <p className="font-semibold text-lg">날짜</p>
          <button
            className={`py-1.5 px-3 rounded-lg bg-grey100 outline-none ${
              !data.date && "text-grey300"
            }`}
            onClick={onToggleCalendar}
          >
            {formatDate(data.date) || "날짜를 선택하세요."}
          </button>
          {calendarOpen && (
            <div ref={calendarRef} className="border border-black">
              <Calendar
                selectedDate={data.date ? new Date(data.date) : new Date()}
                onChange={onSelectDate}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-[17px]">
          <p className="font-semibold text-lg">카테고리</p>
          <button
            className={`py-1.5 px-3 rounded-lg bg-grey100 outline-none ${
              !data.category && "text-grey300"
            }`}
            onClick={onOpenBottomDrawer}
          >
            {data.category || "카테고리를 선택하세요."}
          </button>
        </div>
        <div className="flex items-center gap-[50px]">
          <p className="font-semibold text-lg min-w-max">유형</p>
          <div className="flex gap-2 w-full">
            <button
              className={`py-1.5 flex-1 rounded-lg border border-grey200 text-grey300 ${
                data.type === FOOD_TYPE.BLACK && "bg-black text-white"
              }`}
              onClick={() => onSelectType(FOOD_TYPE.BLACK)}
            >
              흑색
            </button>
            <button
              className={`py-1.5 flex-1 rounded-lg border border-grey200 text-grey300 ${
                data.type === FOOD_TYPE.WHITE && "bg-black text-white"
              }`}
              onClick={() => onSelectType(FOOD_TYPE.WHITE)}
            >
              백색
            </button>
          </div>
        </div>
        <div className="flex items-center gap-[50px]">
          <p className="font-semibold text-lg min-w-max">내용</p>
          <div className="py-1.5 px-3 rounded-lg bg-grey100 w-full flex items-center justify-between">
            <input
              value={data.content}
              placeholder="내용을 입력하세요."
              className="bg-transparent placeholder:text-grey300 flex-1 outline-none"
              onChange={onChange}
              maxLength={14}
            />
            <span className="text-sm text-grey300">
              {data.content.length} / 14
            </span>
          </div>
        </div>
        <div className="flex gap-[50px]">
          <p className="font-semibold text-lg min-w-max">사진</p>
          {data.photo ? (
            <div className="flex flex-col gap-3">
              <img
                src={data.photo}
                alt="Preview"
                className="w-full aspect-square rounded-lg object-cover"
              />
              <button
                className="self-end underline underline-offset-4"
                onClick={onPhotoUpload}
              >
                다시 선택
              </button>
            </div>
          ) : (
            <button
              onClick={onPhotoUpload}
              className="flex p-10 rounded-lg bg-grey100"
            >
              <Photo />
            </button>
          )}
          <input
            type="file"
            hidden
            ref={inputRef}
            accept="image/*"
            onChange={onUploadPhoto}
          />
        </div>
      </section>
      <button
        disabled={buttonDisabled}
        className={`fixed bottom-0 w-[calc(100%-32px)] max-w-[468px] py-3 rounded-lg text-md text-white mb-9 ${
          buttonDisabled ? "bg-grey200" : "bg-grey900"
        }`}
      >
        저장
      </button>
      {bottomDrawerOpen && (
        <div className="fixed left-0 bg-black bg-opacity-50 h-full w-full" />
      )}
      <div
        className="bg-white w-full max-w-max-size bottom-0 fixed left-1/2 -translate-x-1/2 px-20 rounded-t-3xl space-y-7 overflow-hidden"
        style={bottomDrawerStyle}
        ref={bottomDrawerRef}
      >
        <h1 className="text-blue1 text-lg text-center font-semibold mt-6">
          카테고리
        </h1>
        <ul className="grid grid-cols-2 gap-5 mb-11">
          {categories.map((category) => (
            <li
              key={category}
              className={`flex-1 text-center ${
                category === data.category && "text-blue1"
              }`}
            >
              <button onClick={() => onSelectCategory(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AddMenu;
