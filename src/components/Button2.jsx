export default function Button2({ content }) {
  return (
    <button className=" hover:scale-75 font-semibold italic text-[17px] bg-red-400 w-[8vw] h-[7vh] p-2 m-2 rounded-full">
      {content}
    </button>
  );
}
