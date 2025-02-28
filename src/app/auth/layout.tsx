import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
}