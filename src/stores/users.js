import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [],
  }),
  getters: {
    // allUsers: (state) => state.users
  },
  actions: {
    addUser(user){
      this.users.push(user)
    },
    removeUser(key) {
      this.users.splice(key, 1);
    }
  }
})
