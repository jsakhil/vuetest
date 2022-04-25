<script setup>
import { useUsersStore } from "@/stores/users";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { reactive } from "vue";

const emit = defineEmits(["close"]);
const usersStore = useUsersStore();
const state = reactive({
  user: {
    email: "",
    full_name: "",
    date_of_joining: "",
    date_of_leaving: "",
    stillworking: false,
    image: "",
  },
  errors: {
    email: "",
    full_name: "",
    date_of_joining: "",
    date_of_leaving: "",
    stillworking: false,
    image: "",
  },
  email_r:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
});

const addUser = () => {
  if (!state.user.email.length) {
    state.errors.email = "Please enter the email";
    return;
  }
  if (!state.user.full_name.length) {
    state.errors.full_name = "Please enter the name";
    return;
  }
  if (!state.email_r.test(state.user.email)) {
    state.errors.email = state.user.email + "is invalid email id";
    return;
  }

  usersStore.addUser(state.user);
  emit("close");
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-3 row">
        <h4 class="text-center">Add new record</h4>
      </div>
      <div class="mb-3 row">
        <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-7">
          <input
            type="text"
            class="form-control"
            id="inputEmail"
            v-model="state.user.email"
            required
          />
          <div
            class="invalid-feedback"
            :style="state.errors.email ? 'display: block;' : ''"
          >
            {{ state.errors.email }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputFName" class="col-sm-4 col-form-label"
          >Full Name</label
        >
        <div class="col-sm-7">
          <input
            type="text"
            class="form-control"
            v-model="state.user.full_name"
            id="inputFName"
          />
          <div
            class="invalid-feedback"
            :style="state.errors.full_name ? 'display: block;' : ''"
          >
            {{ state.errors.full_name }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="doj" class="col-sm-4 col-form-label">Date of joining</label>
        <div class="col-sm-5 date">
          <date-picker
            valueType="format"
            v-model:value="state.user.date_of_joining"
          ></date-picker>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="dol" class="col-sm-4 col-form-label">Date of Leaving</label>
        <div class="col-sm-5 date">
          <date-picker
            valueType="format"
            v-model:value="state.user.date_of_leaving"
          ></date-picker>
        </div>
        <div class="col-sm-3 form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            v-model="state.user.stillworking"
            id="flexCheckChecked"
            checked
          />
          <label class="form-check-label" for="flexCheckChecked">
            Still working
          </label>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputFName" class="col-sm-4 col-form-label"
          >Upload image</label
        >
        <div class="col-sm-5">
          <input class="form-control" type="file" id="formFile" />
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" @click="emit('close')" class="btn btn-primary">
          Cancel
        </button>
        <button type="button" @click="addUser" class="btn btn-primary mx-2">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 510px;
  margin: auto;
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
}
.date .mx-datepicker {
  max-width: 158px;
}
</style>