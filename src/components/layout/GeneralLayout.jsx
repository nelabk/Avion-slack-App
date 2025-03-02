import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GeneralLayout({
  children,
  message,
  setMessage,
  handleSendMessage,
  directMsgUser,
  messages,
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <div>
          <AppSidebar directMsgUser={directMsgUser} messages={messages} />
        </div>

        <div className="ml-4 mr-4 rounded-3xl bg-gray-100 p-6 flex-grow flex flex-col">
          {/* Chat Window */}
          <div className="flex flex-col h-full">
            <div className="p-4 h-full flex-grow overflow-y-auto">
              {children}
            </div>
            {/* Chat Input */}
            <div className="bg-white border-t p-4 rounded-lg flex items-center">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mr-4"
                placeholder="Type your message..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
