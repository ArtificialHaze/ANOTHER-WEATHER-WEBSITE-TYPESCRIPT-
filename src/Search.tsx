import { IoMdSearch } from "react-icons/io";
import { cn } from "./utilities";

type Props = {
  className: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const Search = ({ onChange, onSubmit, value, className }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
    >
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder="Search.."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <IoMdSearch className="" />
      </button>
    </form>
  );
};

export default Search;
