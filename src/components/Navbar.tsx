import { GripVerticalIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SetKeyDialog from "./SetKeyDialog";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { useUserData } from "@/context";

const Navbar = () => {
  const { toast } = useToast();
  const { session, setKey } = useUserData();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setKey(null);
    toast({
      title: "Logged out successfully",
    });
  };
  return (
    <nav className="bg-zinc-200 flex items-center justify-between pt-1 shadow-md">
      <span className="pr-[13vw] sm:pr-[4vw]"></span>
      <SetKeyDialog />
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-blueMain group rounded-t-xl ">
              <GripVerticalIcon className="w-8 h-8 text-blueMain group-hover:text-white " />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              className="flex gap-2 text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOutIcon /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span></span>
      )}
    </nav>
  );
};

export default Navbar;
