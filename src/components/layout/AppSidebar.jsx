import {
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
  PlusCircle,
  Rss,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    hasDropdown: false,
    hasCollapsible: false,
  },
  {
    title: "Channels",
    url: "#",
    icon: Rss,
    hasDropdown: true,
    dropdownOptions: ["Create a Channel"],
    hasCollapsible: true,
  },
  {
    title: "Messages",
    url: "#",
    icon: Inbox,
    hasDropdown: true,
    dropdownOptions: ["Create a Message"],
    hasCollapsible: true,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    hasDropdown: false,
    hasCollapsible: false,
  },
  {
    title: "Sign out",
    url: "#",
    icon: LogOut,
    hasDropdown: false,
    hasCollapsible: false,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="flex justify-between items-center w-full"
                >
                  {/* regular items */}
                  {!item.hasDropdown && !item.hasCollapsible && (
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center w-full">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}

                  {/* collapsible */}
                  {item.hasCollapsible && (
                    <Collapsible className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="flex-grow">
                            <item.icon />
                            <span className="ml-2">{item.title}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {/* dropdown */}
                        {item.hasDropdown && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="ml-2">
                                <ChevronDown />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {item.dropdownOptions.map((option, index) => (
                                <DropdownMenuItem key={index}>
                                  <PlusCircle className="mr-2" size={16} />
                                  <span>{option}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>

                      {/* Collapsible menu */}

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>
                              <span>New {item.title} 1</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>
                              <span>New {item.title} 2</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
