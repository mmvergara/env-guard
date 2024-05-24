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
          <button className="group rounded-t-xl p-2 transition-colors hover:bg-white">
            <KeySquareIcon className="h-8 w-8 text-white group-hover:text-blueMain" />
          </button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <button className="group flex items-center gap-2 rounded-sm bg-white p-10 px-20 font-semibold shadow-md   ">
            Set Encryption Key
            <KeySquareIcon className="h-8 w-8 text-blueMain" />
          </button>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            Set Encryption Key{" "}
            <KeySquareIcon className="inline-block h-6 w-6" />
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
          <p className="text-xs text-green-700">
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
