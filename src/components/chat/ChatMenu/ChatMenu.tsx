import { ChatRequestList } from "../ChatRequests";
import ChannelListUI, {
  ChannelListActionTypes,
} from "../ChannelList/ChannelListUI";

import Tabs from "./Tabs";
import { Input } from "@/components/ui/input";

import { TAB } from "@/interfaces/chat";
import "./chat-menu.css";
import { useChatStore } from "@/store/useChatStore";
import FavoriteUserList from "@/components/favorites/FavoriteUserList";
import { IFavoriteUserPopulated } from "@/interfaces/favoriteUser";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";

const TAB_LIST = [TAB.CHAT, TAB.FAVORITES, TAB.REQUESTS];

export default function ChatMenu() {
  const {
    activeTab,
    setActiveTab,
    setChannelSearchQuery,
  } = useChatStore();
  const { allChannels, channelListDispatcher } = useChannelListContext();

  const onFavoriteUserChatClick = ({
    chatChannelUrl,
  }: IFavoriteUserPopulated) => {
    if (chatChannelUrl) {
      const channel = allChannels.find(
        (channel) => channel.url === chatChannelUrl
      );
      if (channel) {
        channelListDispatcher({
          type: ChannelListActionTypes.SET_CURRENT_CHANNEL,
          payload: channel,
        });
        setActiveTab(TAB.CHAT);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 max-h-full">
      {/* Tabs */}
      <Tabs
        items={TAB_LIST}
        activeItem={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex items-center justify-between">
        {activeTab === TAB.CHAT && (
          <Input
            placeholder="Search chats..."
            onChange={(e) => setChannelSearchQuery(e.target.value)}
          />
          // Add filter button
        )}
      </div>

      {/* Chat List | Favorites | Chat Requests */}
      <div className="overflow-y-auto">
        {activeTab === TAB.CHAT ? (
          <ChannelListUI />
        ) : activeTab === TAB.REQUESTS ? (
          <ChatRequestList />
        ) : activeTab === TAB.FAVORITES ? (
          <FavoriteUserList onChatButtonClick={onFavoriteUserChatClick} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
