import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ChatbotHeader from "./ChatbotHeader";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Space from "../ui/space";
import { Input } from "../ui/input";

export default function Chatbot() {
  return (
    <div className="flex flex-col flex-grow max-h-screen p-6 w-full">
      <Card className="flex-grow">
        <CardHeader className="py-3">
          <ChatbotHeader />
        </CardHeader>
        <CardContent className="bg-muted">
          <div className="flex flex-col gap-6">
            {/* First message should have some space at the top */}
            <Space h={8} />
            <BotMessage message="Hello Pankaj, I am scottie, an AI chatbot. How can I help you today!" />
            <UserMessage message="Hello, I am looking for a mentor who has specialization in something." />
          </div>
        </CardContent>
        <CardFooter className="pt-6">
          <Input placeholder="Type your question" className="w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
