import React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { MoreHorizontal } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MessagesSidebar({
  directMsgUser,
  isOpen,
  setIsOpen,
  messages,
  allUsers,
}) {
  const [selectedDmUser, setSelectedDmUser] = useState([]);
  console.log("selectedDmUser:", selectedDmUser);

  const navigate = useNavigate();
  return (
    <div>
      <Collapsible>
        <SidebarMenu>
          {messages && (
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <span className="cursor-pointer">{directMsgUser}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Popover modal open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton role="combobox" aria-expanded={open}>
                      Select members...
                      <ChevronsUpDown className="opacity-50" />
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput
                        placeholder="Search members..."
                        className="h-9"
                      />
                      <CommandList>
                        <ScrollArea className="h-[200px]">
                          <CommandEmpty>No members found.</CommandEmpty>
                          <CommandGroup>
                            {allUsers.map((user, index) => (
                              <CommandItem
                                className="cursor-pointer"
                                key={index}
                                value={user.email}
                                onSelect={(currentValue) => {
                                  const selectedUser = allUsers.find(
                                    (user) => user.email === currentValue
                                  );
                                  setSelectedDmUser([
                                    ...selectedDmUser,
                                    selectedUser,
                                  ]);

                                  navigate(
                                    `/messages/${allUsers[index].id}/messages`
                                  );

                                  setIsOpen(false);
                                }}
                              >
                                {user.email}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    selectedDmUser === allUsers.email
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
      </Collapsible>
    </div>
  );
}

export default MessagesSidebar;
