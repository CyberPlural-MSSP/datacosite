import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "~/app/_components/sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datacosite | Admin",
  description: "Datacosite | Admin",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
