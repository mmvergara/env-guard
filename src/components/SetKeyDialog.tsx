import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { KeySquareIcon } from "lucide-react";
import SetKeyDialogForm from "./SetKeyDialogForm";

const SetKeyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-blueMain group rounded-t-xl ">
          <KeySquareIcon className="w-8 h-8 text-blueMain group-hover:text-white " />
        </button>
      </DialogTrigger>
      <SetKeyDialogForm />
    </Dialog>
  );
};

export default SetKeyDialog;
