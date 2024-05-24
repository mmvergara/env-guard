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
    <nav className="flex items-center justify-between bg-blueMain pt-1 shadow-md">
      <span className="pr-[13vw] sm:pr-[4vw]"></span>
      <SetKeyDialog trigger="button" />
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group rounded-t-xl p-2 hover:bg-white ">
              <GripVerticalIcon className="group-hover:text- h-8 w-8 text-white transition-colors hover:text-blueMain " />
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
