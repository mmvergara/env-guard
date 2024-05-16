import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/context";
import { KeySquareIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SetKeyDialogForm = () => {
  const { setKey } = useUserData();
  const [keyValue, setKeyValue] = useState<string>("");
  const keyInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey(keyValue);
  };
  useEffect(() => {
    keyInputRef.current?.focus();
  }, []);
  return (
    <DialogContent className="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-2xl flex gap-2 items-center">
          Set Encryption Key <KeySquareIcon className="w-6 h-6 inline-block" />
        </DialogTitle>
        <DialogDescription className="text-sm">
          The encryption key is used to encrypt your data, make sure to keep it
          safe.
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
  );
};

export default SetKeyDialogForm;
