export const formatDate = (date: Date | null) => {
  if (date === null) return "";
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatDashDate = (date: Date | null) => {
  const year = String(date?.getFullYear()).padStart(4, "0");
  const month = String((date?.getMonth() ?? 0) + 1).padStart(2, "0");
  const day = String(date?.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatTime = (date: Date | null) => {
  const year = String(date?.getFullYear()).padStart(4, "0");
  const month = String((date?.getMonth() ?? 0) + 1).padStart(2, "0");
  const day = String(date?.getDate()).padStart(2, "0");
  const hour = String(date?.getHours()).padStart(2, "0");
  const minute = String(date?.getMinutes()).padStart(2, "0");
  const second = String(date?.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};
