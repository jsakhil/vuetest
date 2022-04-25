
<script setup>
import UserRecordsTable from "@/components/UserRecordsTable.vue";
import UserInputPopup from "@/components/UserInputPopup.vue";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";

const usersStore = useUsersStore();
const showInputPopup = ref(false);

</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <h2 class="navbar-brand">User Records</h2>
      <button
        type="button"
        @click="showInputPopup = !showInputPopup"
        class="btn btn-primary"
      >
        Add new
      </button>
    </div>
  </nav>
  <div class="row">
    <div v-if="usersStore.users.length">
      <UserRecordsTable :users="usersStore.users" />
    </div>
    <div v-else>
      <p class="h3 text-center">Empty.</p>
    </div>
  </div>
  <UserInputPopup
    @close="showInputPopup = !showInputPopup"
    v-if="showInputPopup"
  />
</template>