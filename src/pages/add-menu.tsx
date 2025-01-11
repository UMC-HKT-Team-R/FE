import ArrowLeft from "@/assets/arrow-left.svg?react";
import { FOOD_TYPE } from "@/constants/food-type";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Photo from "@/assets/photo.svg?react";

const DEFAULT_VALUE = {
  date: "",
  category: "",
  type: "",
  content: "",
  photo: "",
};

function AddMenu() {
  const navigate = useNavigate();
  const [data, setData] = useState(DEFAULT_VALUE);
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonDisabled =
    !data.date || !data.category || !data.type || !data.content;

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

  return (
    <main>
      <header className="py-6 px-4">
        <button onClick={onGoBack}>
          <ArrowLeft />
        </button>
      </header>
      <section className="flex flex-col gap-9 pb-28">
        <div className="flex items-center gap-[50px]">
          <p className="font-semibold text-lg">날짜</p>
          <button
            className={`py-1.5 px-3 rounded-lg bg-grey100 outline-none ${
              !data.date && "text-grey300"
            }`}
          >
            {data.date || "날짜를 선택하세요."}
          </button>
        </div>
        <div className="flex items-center gap-[17px]">
          <p className="font-semibold text-lg">카테고리</p>
          <button
            className={`py-1.5 px-3 rounded-lg bg-grey100 outline-none ${
              !data.date && "text-grey300"
            }`}
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
        className={`fixed bottom-0 w-[calc(100%-32px)] max-w-[468px] py-3 rounded-lg bg-grey900 text-white text-md mt-56 mb-9 ${
          buttonDisabled && "bg-grey200 text-white"
        }`}
      >
        저장
      </button>
    </main>
  );
}

export default AddMenu;
