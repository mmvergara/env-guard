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
    <nav className="flex items-center justify-between bg-zinc-200 pt-1 shadow-md">
      <span className="pr-[13vw] sm:pr-[4vw]"></span>
      <SetKeyDialog trigger="button" />
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group rounded-t-xl p-2 hover:bg-blueMain ">
              <GripVerticalIcon className="h-8 w-8 text-blueMain transition-colors group-hover:text-white " />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              className="flex cursor-pointer gap-2 text-red-600"
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
