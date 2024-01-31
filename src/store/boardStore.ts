import { ref } from "vue";
import { defineStore } from "pinia";
import PostBoard from "@/types/index";
export const boardsStore = defineStore(
  "postStore",
  () => {
    const boardsList = ref<PostBoard.Board[]>([]);
    const postList = ref<PostBoard.Board>({
      bid: -1,
      name: "",
      title: "",
      date: "",
      content: "",
      comments: [],
    });
    // get = api가져오는
    // 얘는 로컬에서 가져오는
    const getBoards = () => {
      const item = localStorage.getItem("boardsList") || "";
      boardsList.value = JSON.parse(item);
      // boardsList - mutation(local storage)
    };
    // 1. getPost 기능
    // 조건(bid값이 서로 일치하는)에 해당하는 객체를 find한 다음
    // 값을 가져와야한다.
    const getPost = (bid: number) => {
      if (boardsList.value.length > 0) {
        const post: PostBoard.Board | undefined = boardsList.value.find(
          (post) => post.bid === bid
        );
        if (!post) return;
        postList.value = post;
      } else {
        // 게시글 없음
      }
    };
    // 포스트 추가
    const addPost = (post: any) => {
      const lastPost = boardsList.value[boardsList.value.length - 1];
      const newBid = lastPost ? lastPost.bid + 1 : 1;
      const newPost = {
        bid: newBid,
        ...post,
        comments: [],
      };
      boardsList.value.push(newPost);
    };
    // 댓글 추가
    // bid - 어떤 게시글
    // cid - 댓글이 달릴 할 위치
    const addComment = (bid: number, comment: any) => {
      // 게시글을 찾아
      const post: number = boardsList.value.findIndex(
        (post) => post.bid === bid
      );
      const findPost = boardsList.value[post].comments;
      // 게시글에 댓글 다는 로직
      if (comment.trim() !== "") {
        const lastComment = findPost[findPost.length - 1];
        const newCid = lastComment ? lastComment.cid + 1 : 1;
        const newComment = {
          cid: newCid,
          ctext: comment,
          replies: [],
        };
        findPost.push(newComment);
      }
    };
    // 대댓글 추가
    // bid - 어떤 게시글
    // cid - 어떤 댓글에 달렸나
    // rid - 어떤 댓글에 대댓글이 달려야하나
    const addReply = (bid: number, commentId: number, newReplyText: any) => {
      // 게시글을 찾아
      const post: number = boardsList.value.findIndex(
        (post) => post.bid === bid
      );
      const findBoard = boardsList.value[post];
      if (findBoard.comments.length > 0) {
        // 댓글을 찾는 로직
        const comment = findBoard.comments.find((c) => c.cid === commentId);
        // 댓글을 찾았다.
        // 대댓글을 다는 로직
        if (comment && newReplyText.trim() !== "") {
          const reply = comment.replies;
          const lastReply = reply[reply.length - 1];
          const newRid = lastReply ? lastReply.rid + 1 : 1;
          const newReply = {
            rid: newRid,
            rtext: newReplyText,
          };

          comment.replies.push(newReply);
        }
      } else {
        return;
      }
    };
    return {
      boardsList,
      postList,
      getBoards,
      getPost,
      addPost,
      addComment,
      addReply,
    };
  },
  { persist: true }
);
