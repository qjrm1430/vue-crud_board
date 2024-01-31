<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <v-card class="">
          <v-card-title class="primary">
            <h3 class="headline white--text">제목: {{ postList.title }}</h3>
          </v-card-title>
          <v-card-text>
            <div class="subtitle-2">날짜: {{ postList.date }}</div>
            <div class="body-1">내용: {{ postList.content }}</div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <h2>댓글</h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group v-if="postList.comments.length > 0">
                <v-list-item
                  v-for="comment in postList.comments"
                  :key="comment.cid"
                >
                  <v-list-item-content>
                    {{ comment.ctext }}
                    <v-list>
                      <v-list-item-group v-if="postList.comments.length > 0">
                        <v-list-item
                          v-for="reply in comment.replies"
                          :key="reply.rid"
                        >
                          <v-list-item-content>
                            {{ reply.rtext }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      v-if="comment.cid >= 0"
                      @click="toggleReplyForm(comment.cid)"
                      icon
                    >
                      <v-icon>{{
                        repliesOpen[comment.cid]
                          ? "mdi-chevron-up"
                          : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item v-if="repliesOpen[comment.cid]">
                    <v-list-item-content>
                      <v-textarea
                        v-model="newReply"
                        label="대댓글을 입력하세요"
                      ></v-textarea>
                      <v-btn @click="addReplys(comment.cid)" color="primary"
                        >대댓글 추가</v-btn
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>

        <v-textarea v-model="newComment" label="댓글을 입력하세요"></v-textarea>
        <v-btn @click="handleAddComment" color="primary">댓글 추가</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { boardsStore } from "@/store/boardStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
// import AutoSearch from "@/components/AutoSearch.vue";
const route = useRoute();
const newComment = ref("");
const newReply = ref("");
const boardStore = boardsStore();
const { postList } = storeToRefs(boardStore);
const bid = Number(route.query.bid);
const repliesOpen = ref<Record<number, boolean>>({});

const handleAddComment = () => {
  boardStore.addComment(bid, newComment.value);
};

//comment만 넘겨줘서 comment만 바꾼다.
//대댓글
const addReplys = (commentId: number) => {
  const thisComments = postList.value?.comments[commentId];
  boardStore.addReply(bid, commentId, newReply.value);
  repliesOpen.value[thisComments.cid] = false;
  newReply.value = "";
};

const toggleReplyForm = (commentId: number) => {
  repliesOpen.value[commentId] = !repliesOpen.value[commentId];
  postList.value?.comments.forEach((comment: any) => {
    if (comment.cid !== commentId) {
      repliesOpen.value[comment.cid] = false;
    }
  });
};

onMounted(() => {
  boardStore.getPost(bid);
});
</script>
