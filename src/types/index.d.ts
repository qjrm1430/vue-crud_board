declare namespace PostBoard {
  interface Board {
    bid: number;
    name: string;
    title: string;
    date: string;
    content: string;
    comments: Comment[];
  }
  interface Post {
    bid: number;
    name: string;
    title: string;
    date: string;
    content: string;
    comments: Comment[];
  }
  interface Comment {
    cid: number;
    ctext: string;
    replies: Reply[];
  }
  interface Reply {
    rid: number;
    rtext: string;
  }
}
export default PostBoard;
