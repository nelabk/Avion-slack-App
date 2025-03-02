import React, { useEffect, useState } from "react";

import { getAllUsers } from "../../lib/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Trash2 } from "lucide-react";
import { createChannel } from "../../lib/api";

function CreateChannelDialog({
  channels,
  setChannels,
  allUsers,
  isDialogOpen,
  setIsDialogOpen,
  members,
  setMembers,
  isOpen,
  setIsOpen,
  selectedUser,
  setSelectedUser,
}) {
  const [channelName, setChannelName] = useState("");

  function handleDelete(userToRemove) {
    const updatedMembers = members.filter(
      (member) => member.email !== userToRemove
    );
    setMembers(updatedMembers);

    const updatedSelectedUser = selectedUser.filter(
      (user) => user.email !== userToRemove
    );
    setSelectedUser(updatedSelectedUser);
  }

  const handleSave = async () => {
    const memberId = members.map((member) => member.id);

    const newChannel = { name: channelName };

    await createChannel(channelName, memberId);

    setChannels([...channels, newChannel]);

    setIsDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new channel</DialogTitle>
            <DialogDescription>
              Enter details for your new channel here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter channel name"
                className="col-span-3"
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Members
              </Label>
              <Popover modal open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {selectedUser.length > 0
                      ? selectedUser.map((user) => user.email)
                      : "Select members..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
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
                          {allUsers.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.email}
                              onSelect={(currentValue) => {
                                const selectedUserObj = allUsers.find(
                                  (user) => user.email === currentValue
                                );

                                if (
                                  selectedUserObj &&
                                  !selectedUser.some(
                                    (user) => user.id === selectedUserObj.id
                                  )
                                ) {
                                  setSelectedUser([
                                    ...selectedUser,
                                    selectedUserObj,
                                  ]);
                                  setMembers([...members, selectedUserObj]);
                                }

                                setIsOpen(false);
                              }}
                            >
                              {user.email}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  selectedUser === allUsers.email
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
            </div>
          </div>
          <div>
            {members.length > 0 &&
              members.map((user, index) => (
                <Button key={index} className="m-2">
                  {user.email}
                  <span onClick={() => handleDelete(user.email)}>
                    <Trash2 />
                  </span>
                </Button>
              ))}
          </div>
          <DialogFooter>
            <Button onClick={handleSave} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateChannelDialog;
