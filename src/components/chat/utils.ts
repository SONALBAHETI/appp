import type { GroupChannel, Member } from "@sendbird/chat/groupChannel";

/**
 * Generates the name of the channel - which is the name of the other member
 * of that channel
 *
 * @param channel - The group channel to generate the name for
 * @param currentUserId - Id of the current user to exclude it from the name
 * @returns an object with the following properties:
 * chatUser (the other member), channelName, channelImageUrl
 */
export const generateChannelName = (
  channel: GroupChannel,
  currentUserId: string
): { chatUser: Member | null; channelName: string; channelImageUrl: string } => {
  if (!channel) {
    return {
      chatUser: null,
      channelName: "No Title",
      channelImageUrl: "", // TODO: use default image
    };
  }
  const members = channel.members.filter(
    (member) => member.userId !== currentUserId
  );
  return {
    chatUser: members[0],
    channelName: members[0]?.nickname,
    channelImageUrl: members[0]?.plainProfileUrl || channel.coverUrl,
  };
};
