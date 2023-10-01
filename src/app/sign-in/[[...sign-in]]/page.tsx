import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center mb-3 text-5xl font-semibold">Docxy</h1>
        <SignIn />
      </div>
    </div>
  );
}
