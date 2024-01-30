<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { boardsStore } from "@/store/boardStore";
// import AutoSearch from "@/components/AutoSearch.vue";

const router = useRouter();
const boardStore = boardsStore();
const list = ref(boardStore.getBoards);
const search = ref("");
const moveWrite = () => {
  router.push({ path: "/write" });
};

const onCellClick = (item: any) => {
  router.push({ path: "/post", query: { bid: item.bid } });
};
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="게시판"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="네비바"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="align-center justify-center" style="min-height: 300px">
      <div class="ma-8">검색</div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="ma-8"
      ></v-text-field>
      <div align="right" class="mr-8">
        <v-btn @click="moveWrite()"> 글쓰기 </v-btn>
      </div>
      <v-card class="ma-8">
        <v-data-table :items="list.slice(1)">
          <template v-slot:item="{ item }">
            <tr>
              <!-- 여기에 각 셀에 해당하는 내용을 표시합니다. -->
              <td>{{ item.bid }}</td>
              <td>{{ item.name }}</td>
              <td @click="onCellClick(item)" :class="`cursor-pointer`">
                {{ item.title }}
              </td>
              <td>{{ item.date }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-main>
  </v-layout>
</template>
