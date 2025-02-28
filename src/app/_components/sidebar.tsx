import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import UserActions from "./user-actions";
import Image from "next/image";
import Link from "next/link";
import { BarChartIcon, SearchIcon, PlusIcon, HomeIcon } from "lucide-react";
const DataItems = [
  {
    label: "Overviews",
    href: "/dashboard/charts",
    icon: BarChartIcon,
  },
  {
    label: "Search",
    href: "/dashboard/search",
    icon: SearchIcon,
  },
  {
    label: "Add Data",
    href: "/dashboard/add-data",
    icon: PlusIcon,
  },
]
export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Image className="mx-auto my-4" src={"/logo.svg"} alt="cyberplural logo" width={90} height={130}/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            DATA
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {DataItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserActions />
      </SidebarFooter>
    </Sidebar>
  )
}