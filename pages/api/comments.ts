import { NextApiRequest, NextApiResponse } from 'next';

let commentList: Array<string> = [];

const comments = (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'GET') {
    response.json(commentList);
  }
  if (request.method === 'POST') {
    console.log(request.body);
    console.log(request.body.comment);
    commentList.push(request.body.comment);
    response.send(200);
  }
};

export default comments;
