import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const PaginationComponent = ({
  buttonsPage,
  setCurrentPage,
  currentPage,
}: {
  buttonsPage: number[];
  currentPage?: number;
  setCurrentPage?: (num: number) => void;
}) => {
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(5);

  const handleClickPage = (i: number) => {
    if (setCurrentPage) {
      setCurrentPage(i);
    }
    if (i >= start + 2 && end < buttonsPage.length) {
      setStart(i - 2);
      setEnd(i + 2);
    } else if (i <= start + 1 && start > 1) {
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
