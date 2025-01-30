"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GithubIcon, GoggleIcon } from "@/assets/icons";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "./FormInput";
import { SignInSchema } from "./formSchemas";
import Link from "next/link";
import { useSignIn } from "@/hooks/server/auth";
import { handleError } from "@/lib/form-handler";
import { useRouter } from "next/navigation";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignIn();

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    mutate(values, {
      onSuccess() {
        router.push("/dashboard");
        router.refresh()
      },
      onError(error) {
        handleError(error);
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl font-semibold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground text-sm">
                    Login to your tourbit account
                  </p>
                </div>
                <FormInput
                  control={form.control}
                  inputType="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                />
                <div className="grid gap-0.5 mt-3">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-xs">
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto  underline-offset-2 hover:underline text-xs"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormInput
                    control={form.control}
                    inputType="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" className="w-full" isLoading={isPending}>
                  Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground text-xs">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isPending}
                  >
                    <GoggleIcon />
                    <span className="sr-only">Login with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isPending}
                  >
                    <GithubIcon />
                    <span className="sr-only">Login with Github</span>
                  </Button>
                </div>
                <div className="text-center text-xs">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block w-full bg-red-950">
            {/* <img
              src="/placeholder.svg"
                          alt="Image"
                          width={500}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
