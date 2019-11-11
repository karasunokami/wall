<template>
    <div class="container h-100 d-flex justify-content-center align-items-center flex-column">
        Регистрация
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="login">Логин</label>
                <input v-model="credentials.login" type="text" id="login" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input v-model="credentials.password" type="password" id="password" class="form-control">
            </div>
            <div v-if="this.error" class="text-danger">{{ this.error }}</div>
            <div class="form-group">
                <button class="btn border w-100">регистрация</button>
            </div>
        </form>
        <router-link to="/">назад</router-link>
    </div>
</template>

<script>
export default {
    name: "login",

    data() {
        return {
            credentials: {
                login: "",
                password: ""
            },
            error: null
        };
    },

    methods: {
        register() {
            this.$store.dispatch("register", this.credentials)
                .catch((error) => {
                    this.error = error;
                });
        }
    }
}
</script>