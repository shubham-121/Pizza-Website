export default function Button2({ content, onClick, style, color, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        color || "bg-red-400"
      } hover:scale-110 font-semibold italic text-[17px] w-[8vw] h-[7vh] p-2 m-2 rounded-full ${
        disabled ? " bg-gray-400 cursor-not-allowed y" : ""
      }`}
      style={style}
    >
      {content}
    </button>
  );
}
