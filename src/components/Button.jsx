export default function Button({ content }) {
  return (
    <button className="bg-red-500 h-14 w-[10vw] rounded-[20px] mt-8 text-center text-xl font-semibold ">
      {content}
    </button>
  );
}
