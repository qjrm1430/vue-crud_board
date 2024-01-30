import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
export const boardsStore = defineStore("postStore", () => {
  const route = useRoute();
  const boardsList = ref([
    {
      bid: 0,
      name: "",
      title: "",
      date: "",
      content: "",
      comments: ref([{ cid: 0, text: "" }]),
    },
  ]);
  const getBoards = computed(() => boardsList);
  const getPost = computed(
    () =>
      boardsList.value.find((post) => post.bid == Number(route.query.bid)) || {
        bid: 0,
        name: "",
        title: "",
        date: "",
        content: "",
        comments: ref([{ cid: 0, text: "" }]),
      }
  );
  const addPost = (post: any) => {
    const lastPost = boardsList.value[boardsList.value.length - 1];
    const newBid = lastPost ? lastPost.bid + 1 : 1;
    const newPost = {
      bid: newBid,
      ...post,
      comments: ref([{ cid: 0, text: "" }]),
    };
    boardsList.value.push(newPost);
  };
  const addComment = (comment: any) => {
    const findBoard = boardsList.value.findIndex(
      (post) => post.bid === Number(route.query.bid)
    );
    const lastComment =
      boardsList.value[findBoard].comments[
        boardsList.value[findBoard].comments.length - 1
      ];

    const newCid = lastComment ? lastComment.cid + 1 : 1;
    const newCommant = {
      cid: newCid,
      ...comment,
    };
    boardsList.value[findBoard].comments.push(newCommant);
  };
  return { boardsList, getBoards, getPost, addPost, addComment };
});
