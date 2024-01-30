<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <v-card class="">
          <v-card-title class="primary">
            <h3 class="headline white--text">제목: {{ post.title }}</h3>
          </v-card-title>
          <v-card-text>
            <div class="subtitle-2">날짜: {{ post.date }}</div>
            <div class="body-1">내용: {{ post.content }}</div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <h2>댓글</h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group v-if="post.comments.length > 0">
                <v-list-item
                  v-for="comment in post.comments"
                  :key="comment.cid"
                >
                  <v-list-item-content>
                    {{ comment.text }}
                    <!-- <v-list>
                      <v-list-item-group v-if="post.comments.length > 0">
                        <v-list-item
                          v-for="reply in comment.replies"
                          :key="reply.id"
                        >
                          <v-list-item-content>
                            {{ reply.text }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list> -->
                  </v-list-item-content>
                  <!-- <v-list-item-action>
                    <v-btn @click="toggleReplyForm(comment.id)" icon>
                      <v-icon>{{
                        repliesOpen[comment.id]
                          ? "mdi-chevron-up"
                          : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-list-item-action> -->
                </v-list-item>

                <!-- <v-list-item v-if="repliesOpen[comment.id]">
                  <v-list-item-content>
                    <v-textarea
                      v-model="comment.newReply"
                      label="대댓글을 입력하세요"
                    ></v-textarea>
                    <v-btn @click="addReply(comment.id)" color="primary"
                      >대댓글 추가</v-btn
                    >
                  </v-list-item-content>
                </v-list-item> -->
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>

        <v-textarea v-model="newComment" label="댓글을 입력하세요"></v-textarea>
        <v-btn @click="addComments" color="primary">댓글 추가</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { boardsStore } from "@/store/boardStore";
// import AutoSearch from "@/components/AutoSearch.vue";
const newComment = ref("");
const boardStore = boardsStore();
console.log(boardStore.getPost);
const post = ref(boardStore.getPost);
const addComments = () => {
  boardStore.addComment({
    text: newComment,
  });
};
</script>
