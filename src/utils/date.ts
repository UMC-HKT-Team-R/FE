export const formatDate = (date: Date | null) => {
  if (date === null) return "";
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
