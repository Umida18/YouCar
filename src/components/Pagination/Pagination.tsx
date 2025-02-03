import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const PaginationComponent = ({ buttonsPage }: { buttonsPage: number[] }) => {
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPage = (i: number) => {
    setCurrentPage(i);
    if (i >= start + 3 && end < buttonsPage.length) {
      setStart(i - 1);
      setEnd(i + 2);
    } else if (i <= start && start > 1) {
      setStart(start - 1);
      setEnd(end - 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 my-10">
      {start > 1 && <BsThreeDots className="text-[#DCDCDC] text-[20px]" />}
      {buttonsPage.slice(start - 1, end).map((i) => (
        <button
          onClick={() => handleClickPage(i)}
          className={`${
            currentPage === i ? "bg-[#293843]" : "bg-[#CDCDCD]"
          } h-[40px] w-[40px] rounded-full border-0 text-white`}
          key={i}
        >
          {i}
        </button>
      ))}
      {end < buttonsPage.length && (
        <BsThreeDots className="text-[#DCDCDC] text-[20px]" />
      )}
    </div>
  );
};

export default PaginationComponent;
