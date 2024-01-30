declare namespace PostBoard {
  interface boardsList {
    [id: number, name: string, title: string, date: string, content: string];
  }
  interface Comments {
    [id: number, text: string, replies: Reply[], newReply: string];
  }
  interface Reply {
    id: number;
    text: string;
  }
}
export default PostBoard;
