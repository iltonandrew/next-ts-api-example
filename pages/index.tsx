import { Heading, Flex, List, Input, Button, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentItem from '../components/CommentItem';

const IndexPage = () => {
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [commentList, setCommentList] = useState<string[]>([]);
  const [commentText, setCommentText] = useState('');
  useEffect(() => {
    axios.get<string[]>('/api/comments').then(({ data }) => {
      setLoadingComments(false);
      setCommentList(data);
    });
  }, []);
  const handleSubmit = () => {
    setLoadingButton((prev) => !prev);
    axios
      .post<string>(
        '/api/comments',
        { comment: `${commentText}` },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(() => setCommentList((prev) => [...prev, commentText]))
      .then(() => setCommentText(''))
      .then(() => setLoadingButton((prev) => !prev));
  };
  if (loadingComments)
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
      </Flex>
    );
  return (
    <>
      <Heading textAlign="center" padding="12">
        Comenta aí!
      </Heading>
      <Flex alignItems="center" justifyContent="center">
        <List spacing={3}>
          {commentList.map((element: string) => {
            return <CommentItem text={element} />;
          })}
          <Flex direction="row">
            <Input
              variant="outline"
              placeholder="Comentário"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Flex>
          <Button
            onClick={handleSubmit}
            isLoading={loadingButton}
            loadingText="Enviando"
            colorScheme="teal"
            variant="outline"
            width="100%"
          >
            Comentar!
          </Button>
        </List>
      </Flex>
    </>
  );
};

export default IndexPage;
