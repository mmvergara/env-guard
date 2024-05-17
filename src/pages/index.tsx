import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from "@/context";
import { signInSchema, signUpSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const IndexPage = () => {
  const { session } = useUserData();
  if (session) {
    return <Navigate to="/projects" />;
  }
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
    <main className="flex h-[100vh] justify-center  bg-blueMain">
      <form
        className="glass-auth mx-2 mt-[20vh] flex h-fit w-full max-w-[500px] flex-col gap-2 rounded-lg bg-greyMain p-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col pb-2">
          <h1 className="text-center text-xl font-bold">
            ENV Guard | {isSignIn ? " Sign In" : " Sign Up"}
          </h1>
          <p className="text-center font-semibold tracking-wide ">
            Keeping your <span className="font-bold text-cyan-600">Env</span>
            ironment safe.
          </p>
        </div>
        <div className="mb-2 h-[2px] w-full bg-blueMain"></div>
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
        <p className="text-center text-sm text-red-500">{error}</p>
        <Button type="submit" disabled={isLoading}>
          {isSignIn
            ? isLoading
              ? "Signing In..."
              : "Sign In"
            : isLoading
              ? "Signing Up..."
              : "Sign Up"}
        </Button>
        <p className="text-md text-center font-semibold tracking-wide">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={handleChangeAuthState}
            className="cursor-pointer text-blueMain hover:underline"
          >
            {isSignIn ? " Sign Up" : " Sign In"}
          </span>
        </p>
      </form>
    </main>
  );
};

export default IndexPage;
