
<script setup>
import swal from 'sweetalert2';
import Moment from "moment";
import { extendMoment } from "moment-range";
import { useUsersStore } from "@/stores/users";

const moment = extendMoment(Moment);
const usersStore = useUsersStore();
const { users } = defineProps(["users"]);

const remove = (key) => {
  swal
    .fire({
      text: "Are you sure you want to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    })
    .then((result) => {
      if (result.isConfirmed) {
        usersStore.removeUser(key);
        swal.fire("Deleted!", "Entry has been removed.", "success");
      }
    });
};

const userExperience = (user) => {
  let exp = "";
  let date_of_joining = moment(user.date_of_joining);
  let date_of_leaving = moment(user.date_of_leaving);
  var years = date_of_leaving.diff(date_of_joining, "year");
  date_of_joining.add(years, "years");
  if (years) exp = years + " years ";

  var months = date_of_leaving.diff(date_of_joining, "months");
  date_of_joining.add(months, "months");
  if (months) exp += months + " months ";

  var days = date_of_leaving.diff(date_of_joining, "days");
  return exp + days + " days";
};
</script>

<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Avatar</th>
        <th scope="col">Name</th>
        <th scope="col">email</th>
        <th scope="col">Experience</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td class="avt"><img src="https://picsum.photos/50/50" /></td>
        <td>{{ user.full_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ userExperience(user) }}</td>
        <td>
          <button type="button" class="btn btn-link" @click="remove(index)">
            X Remove
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
td.avt {
  text-align: center;
}
td.avt img {
  border-radius: 50%;
}
</style>