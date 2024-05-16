import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { KeySquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/context";
import { useEffect, useRef, useState } from "react";

type Props = {
  trigger: "page" | "button";
};
const SetKeyDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const { setKey } = useUserData();
  const [keyValue, setKeyValue] = useState<string>("");
  const keyInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey(keyValue);
    setOpen(false);
  };
  useEffect(() => {
    keyInputRef.current?.focus();
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger === "button" ? (
        <DialogTrigger asChild>
          <button className="p-2 hover:bg-blueMain group rounded-t-xl ">
            <KeySquareIcon className="w-8 h-8 text-blueMain group-hover:text-white " />
          </button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <button className="p-2 font-semibold px-10 hover:bg-zinc-100 bg-white group rounded-sm shadow-md flex gap-2 items-center">
            Set Encryption Key
            <KeySquareIcon className="w-8 h-8 text-blueMain" />
          </button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl flex gap-2 items-center">
            Set Encryption Key{" "}
            <KeySquareIcon className="w-6 h-6 inline-block" />
          </DialogTitle>
          <DialogDescription className="text-sm">
            The encryption key is used to encrypt your data, make sure to keep
            it safe.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitKey} className="flex flex-col gap-2">
          <Input
            ref={keyInputRef}
            id="username"
            type="password"
            className=" bg-zinc-00"
            placeholder="Enter your encryption key"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
          />
          <p className="text-green-700 text-xs">
            The key is not stored, you will have to re-enter it if you quit this
            tab.
          </p>
          <Button type="submit" className="mt-4">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetKeyDialog;
