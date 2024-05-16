import { KeySquareIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 flex items-center justify-center pt-1 shadow-md">
      <button className="p-2 hover:bg-blueMain group rounded-t-xl ">
        <KeySquareIcon className="w-8 h-8 text-blueMain group-hover:text-white " />
      </button>
    </nav>
  );
};

export default Navbar;
