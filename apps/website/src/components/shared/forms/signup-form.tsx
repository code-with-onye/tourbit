"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, GoggleIcon } from "@/assets/icons";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, FormInputWrapper } from "./FormInput";
import { SignUpSchema } from "./formSchemas";
import { useSignUp } from "@/hooks/server/auth";
import { handleError } from "@/lib/form-handler";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate } = useSignUp();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    mutate(values, {
      onSuccess() {
        router.push("/signin");
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
                  <h1 className="text-xl font-semibold">Create an account</h1>
                  <p className="text-balance text-muted-foreground text-xs">
                    Sign up for a new Tourbit account
                  </p>
                </div>
                <FormInputWrapper>
                  <FormInput
                    control={form.control}
                    inputType="text"
                    name="name"
                    label="Name"
                    placeholder="Enter your full name"
                  />
                  <FormInput
                    control={form.control}
                    inputType="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                </FormInputWrapper>
                <FormInput
                  control={form.control}
                  inputType="password"
                  name="password"
                  label="Password"
                  placeholder="Create a password"
                />
                <FormInput
                  control={form.control}
                  inputType="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground text-xs">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <GoggleIcon />
                    <span className="sr-only">Sign up with Google</span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <GithubIcon />
                    <span className="sr-only">Sign up with Github</span>
                  </Button>
                </div>
                <div className="text-center text-xs">
                  Already have an account?{" "}
                  <Link href="/signin" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block w-full bg-red-950">
            {/* Add relevant image or content */}
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
