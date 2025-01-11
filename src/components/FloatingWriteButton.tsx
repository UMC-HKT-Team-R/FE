function FloatingWriteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed bottom-[90px] left-1/2 transform -translate-x-1/2 w-[108px] h-[38px] rounded-[8px] bg-[#000] flex items-center justify-center gap-[9px] z-50 shadow-lg text-white font-pretendard font-semibold text-[15px]"
      style={{
        lineHeight: "20px",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
      >
        <path
          d="M9 16H17"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8274 1.54434C13.1759 1.1958 13.6486 1 14.1415 1C14.3856 1 14.6272 1.04807 14.8527 1.14147C15.0782 1.23487 15.2831 1.37176 15.4557 1.54434C15.6282 1.71692 15.7651 1.92179 15.8585 2.14728C15.9519 2.37276 16 2.61443 16 2.85849C16 3.10255 15.9519 3.34422 15.8585 3.5697C15.7651 3.79519 15.6282 4.00006 15.4557 4.17264L4.5044 15.1239L1 16L1.8761 12.4956L12.8274 1.54434Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      글 쓰기
    </button>
  );
}

export default FloatingWriteButton;
