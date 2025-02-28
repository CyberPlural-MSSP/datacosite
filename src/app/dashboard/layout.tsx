import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "~/app/_components/sidebar"

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
