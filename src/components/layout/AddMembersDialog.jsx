import React from "react";
import { useState } from "react";
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
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { addMemberToChannel } from "../../lib/api";
import { useToast } from "@/hooks/use-toast";

function AddMembersDialog({
  allUsers,
  isAddMembersDialogOpen,
  setIsAddMembersDialogOpen,
  isPopOverOpen,
  setIsPopOverOpen,
  members,
  setMembers,
  selectedUser,
  setSelectedUser,

  selectedChannel,

  channelMembers,
  setChannelMembers,
}) {
  const { toast } = useToast();
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
    try {
      const selectedMember = members[0]?.id;
      const selectedChannelToBeAdded = selectedChannel.data.id;
      console.log(selectedChannelToBeAdded);
      await addMemberToChannel(selectedChannelToBeAdded, selectedMember);
      console.log("selectedMember:", selectedMember);

      const updatedChannelMembers = {
        email: [...channelMembers.email, members[0].email],
        id: [...channelMembers.id, members[0].id],
      };
      setChannelMembers(updatedChannelMembers);
      toast({
        description: "Member added successfully.",
      });
      setIsAddMembersDialogOpen(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div>
      <Dialog
        open={isAddMembersDialogOpen}
        onOpenChange={setIsAddMembersDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new members</DialogTitle>
            <DialogDescription>
              Enter new member details for your channel here. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Members
              </Label>
              <Popover
                modal
                open={isPopOverOpen}
                onOpenChange={setIsPopOverOpen}
              >
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

                                setIsPopOverOpen(false);
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

export default AddMembersDialog;
