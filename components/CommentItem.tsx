import { ReactElement } from 'react';
import { ListItem, ListIcon } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';

const CommentItem = ({ text }: { text: string; key?: number }): ReactElement => {
  const colors: string[] = ['teal', 'green', 'blue', 'yellow', 'orange', 'cyan', 'purple', 'pink'];
  const generateRandomColor = (colors: string[]): string => colors[Math.floor(Math.random() * colors.length)];
  return (
    <ListItem>
      <ListIcon as={FaUserAlt} color={`${generateRandomColor(colors)}.500`} />
      {text}
    </ListItem>
  );
};

export default CommentItem;
