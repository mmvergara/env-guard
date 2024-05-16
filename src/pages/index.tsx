import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema, signUpSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const IndexPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignIn, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [{ email, password, confirmPassword }, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (isSignIn) {
      await signIn();
    } else {
      await signUp();
    }
    setIsLoading(false);
  };
  const signIn = async () => {
    const { error } = signInSchema.safeParse({
      email,
      password,
    });

    if (error?.issues && error.issues.length > 0) {
      return setError(error.issues[0].message);
    }

    const { error: AuthError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (AuthError) {
      return setError(AuthError.message);
    }

    toast({
      title: "Logged in successfully",
    });
  };
  const signUp = async () => {
    const { error } = signUpSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (error?.issues && error.issues.length > 0) {
      return setError(error.issues[0].message);
    }

    const { error: AuthError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (AuthError) {
      return setError(AuthError.message);
    }

    toast({
      title: "Account created successfully",
      description: "You are now logged in",
    });
  };

  const handleChangeAuthState = () => setIsLogin((prev) => !prev);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="bg-blueMain h-[100vh] justify-center  flex">
      <form
        className="bg-greyMain p-4  mx-2 w-full max-w-[500px] h-fit mt-[20vh] flex flex-col glass gap-2"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col pb-2">
          <h1 className="font-bold text-xl text-center">
            ENV Guard | {isSignIn ? " Sign In" : " Sign Up"}
          </h1>
          <p className="font-semibold text-center tracking-wide ">
            Keeping your <span className="text-cyan-600 font-bold">Env</span>
            ironment safe.
          </p>
        </div>
        <div className="w-full h-[2px] mb-2 bg-blueMain"></div>
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Enter your email"
          type="email"
          name="email"
          className="bg-zinc-200"
          value={email}
          onChange={handleInputChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          placeholder="●●●●●●●●●●"
          type="password"
          name="password"
          className="bg-zinc-200"
          value={password}
          onChange={handleInputChange}
        />
        {!isSignIn && (
          <>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              placeholder="●●●●●●●●●●"
              type="password"
              name="confirmPassword"
              className="bg-zinc-200"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </>
        )}
        <p className="text-red-500 text-center text-sm">{error}</p>
        <Button type="submit" disabled={isLoading}>
          {isSignIn ? " Sign In" : " Sign Up"}
        </Button>
        <p className="text-center text-md font-semibold tracking-wide">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={handleChangeAuthState}
            className="text-blueMain cursor-pointer hover:underline"
          >
            {isSignIn ? " Sign Up" : " Sign In"}
          </span>
        </p>
      </form>
    </main>
  );
};

export default IndexPage;
