import React from 'react';
import ConversationItem from './ConversationItem';

// Define the Conversation type
type Conversation = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  // Add other necessary fields
};

// Define the type for props
type ConversationListProps = {
  conversations: Conversation[];
};

const ConversationList: React.FC<ConversationListProps> = ({ conversations }) => {
  return (
    <div className="conversation-list">
      {conversations.map((conversation, index) => (
        <ConversationItem key={index} conversation={conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
