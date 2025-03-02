import React, { useEffect, useState } from "react";
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
import ChannelsSidebar from "./ChannelsSidebar";
import MessagesSidebar from "./MessagesSidebar";
import CreateChannelDialog from "./CreateChannelDialog";
import { getAllUsersChannels, getAllUsers } from "../../lib/api";

export function AppSidebar({ directMsgUser, messages }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMembersDialogOpen, setIsAddMembersDialogOpen] = useState(false);
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getAllUsers();
      console.log(users);
      setAllUsers(users.data);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchChannels() {
      const data = await getAllUsersChannels();
      console.log(data);
      setChannels(data.data);
    }

    fetchChannels();
  }, []);

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
      dropdownOptions: ["Create new channel"],
      collapsibleContent: (
        <ChannelsSidebar
          channels={channels}
          allUsers={allUsers}
          setChannels={setChannels}
          members={members}
          setMembers={setMembers}
          isAddMembersDialogOpen={isAddMembersDialogOpen}
          setIsAddMembersDialogOpen={setIsAddMembersDialogOpen}
          isPopOverOpen={isPopOverOpen}
          setIsPopOverOpen={setIsPopOverOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          channelMembers={channelMembers}
          setChannelMembers={setChannelMembers}
        />
      ),
      hasCollapsible: true,
    },
    {
      title: "Messages",
      url: "#",
      icon: Inbox,
      hasDropdown: true,
      dropdownOptions: ["Create a message"],
      collapsibleContent: (
        <MessagesSidebar
          directMsgUser={directMsgUser}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          messages={messages}
          allUsers={allUsers}
        />
      ),
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

  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {/* regular items */}
                    {!item.hasDropdown && !item.hasCollapsible && (
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                    {/* collapsible */}
                    {item.hasCollapsible && (
                      <Collapsible>
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
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
                                  <DropdownMenuItem
                                    key={index}
                                    onClick={() => setIsDialogOpen(true)}
                                    className="cursor-pointer"
                                  >
                                    <PlusCircle className="mr-2" size={16} />
                                    <span>{option}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>

                        {/* Collapsible content */}
                        {item.collapsibleContent}
                      </Collapsible>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <CreateChannelDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setChannels={setChannels}
        allUsers={allUsers}
        channels={channels}
        members={members}
        setMembers={setMembers}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}
