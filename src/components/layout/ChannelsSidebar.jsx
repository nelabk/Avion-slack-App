import React, { useEffect, useState } from "react";
import {
  getAllUsersChannels,
  getAllUsers,
  getChannelDetails,
} from "../../lib/api";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import AddMembersDialog from "./AddMembersDialog";

// import { deleteChannel } from "../../lib/api";

function ChannelsSidebar({
  channels,
  allUsers,
  setChannels,
  members,
  setMembers,
  isAddMembersDialogOpen,
  setIsAddMembersDialogOpen,
  isPopOverOpen,
  setIsPopOverOpen,
  selectedUser,
  setSelectedUser,
  channelMembers,
  setChannelMembers,
}) {
  const [selectedChannel, setSelectedChannel] = useState(null);

  const navigate = useNavigate();

  const handleChannelClick = async (channelId) => {
    navigate(`/channels/${channelId}/messages`);

    const channelData = await getChannelDetails(channelId);
    setSelectedChannel(channelData);
    console.log("channeldata:", channelData);
    const memberIds = channelData.data.channel_members.map(
      (member) => member.user_id
    );

    const memberEmails = memberIds.map((user_id) => {
      const user = allUsers.find((user) => user.id === user_id);
      return user ? user.email : null;
    });

    setChannelMembers({ email: memberEmails.filter(Boolean), id: memberIds });
  };

  function getInitials(email) {
    return email.slice(0, 1).toUpperCase();
  }

  const handleClickDelete = async (channelId) => {
    try {
      // await deleteChannel(channelId);
      const updatedChannels = channels.filter(
        (channel) => channel.id !== channelId
      );
      setChannels(updatedChannels);
      console.log(channels);
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <Collapsible>
          <SidebarMenu>
            {channels.map((channel) => (
              <SidebarMenuItem key={channel.id}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleChannelClick(channel.id)}
                    >
                      {channel.name}
                    </span>
                    <span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction>
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem>
                            <span
                              onClick={() => {
                                setIsAddMembersDialogOpen(true);
                              }}
                            >
                              Add members
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span onClick={() => handleClickDelete(channel.id)}>
                              Delete channel
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {selectedChannel &&
                  selectedChannel.data &&
                  selectedChannel.data.id === channel.id &&
                  channelMembers.email?.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {channelMembers.email.map((email, index) => (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton
                              className="cursor-pointer"
                              onClick={() => {
                                navigate(
                                  `/messages/${channelMembers.id?.[index]}/messages`
                                );
                              }}
                            >
                              <span className="bg-neutral-400 w-6 h-6 items-center justify-center flex rounded-full">
                                {getInitials(email)}
                              </span>
                              <span>{email}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </Collapsible>

        <AddMembersDialog
          isAddMembersDialogOpen={isAddMembersDialogOpen}
          setIsAddMembersDialogOpen={setIsAddMembersDialogOpen}
          isPopOverOpen={isPopOverOpen}
          setIsPopOverOpen={setIsPopOverOpen}
          allUsers={allUsers}
          members={members}
          setMembers={setMembers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          channels={channels}
          setChannels={setChannels}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          channelMembers={channelMembers}
          setChannelMembers={setChannelMembers}
        />
      </div>
    </div>
  );
}

export default ChannelsSidebar;
