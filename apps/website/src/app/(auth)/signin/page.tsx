import { SignInForm } from "@/components/shared/forms";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-[55rem]">
        <SignInForm />
      </div>
    </div>
  );
}
