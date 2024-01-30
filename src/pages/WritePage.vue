<template>
  <div>
    <v-card class="ma-8">
      <v-form class="ma-4" @submit.prevent="submitForm">
        <v-text-field label="이름" v-model="post.name"></v-text-field>
        <v-text-field label="제목" v-model="post.title"></v-text-field>
        <v-textarea label="내용" v-model="post.content"></v-textarea>
        <v-btn type="submit">저장</v-btn>
        <v-btn> 취소 </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { boardsStore } from "@/store/boardStore";
import { format } from "date-fns";

const router = useRouter();
const boardStore = boardsStore();
const currentTime = ref(new Date());
// console.log(boardStore.getBoards);
// console.log(boardStore.boardsList.values.length);
const post = ref({ name: "", title: "", content: "" });
const submitForm = () => {
  boardStore.addPost({
    name: post.value.name,
    title: post.value.title,
    content: post.value.content,
    date: format(currentTime.value, "yyyy-MM-dd HH:mm:ss"),
  });

  router.push({ path: "/" });
};
</script>
