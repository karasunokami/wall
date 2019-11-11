<template>
    <div class="container">

        <nav class="navbar navbar-dark bg-dark justify-content-between">
            <a class="navbar-brand text-light">WALL</a>
            <div v-if="isLoggedIn">
                <span class="text-light mr-2">{{ user.login }}</span>
                <button class="btn btn-outline-success my-2 my-sm-0" @click="logout">выход</button>
            </div>
            <div v-else>
                <router-link to="/register">
                    <button class="btn btn-outline-success my-2 my-sm-0">регистрация</button>
                </router-link>
                
                <router-link to="/login">
                    <button class="btn btn-outline-success my-2 my-sm-0">войти</button>
                </router-link>
            </div>
        </nav>

        <div v-if="isLoggedIn">
            <input @keyup.enter="sendMessage" v-model="newMessageText" class="form-control w-100"
                placeholder="Новое сообщение" />
        </div>

        <hr>

        <div class="row">
            <div class="col-sm-12">
                <div v-for="message in messages" :key="message.id">
                    <message-card :message="message" :current_user="user"/>
                </div>
                <button class="btn btn-primary w-100" @click="getMessages">загрузить еще</button>
            </div>

        </div>

    </div>

</template>

<script>
    import MessageCard from "../components/MessageCard";

    export default {
        name: "home",
        data() {
            return {
                newMessageText: ''
            }
        },

        created() {
            if (this.messages && this.messages.length === 0) {
                this.$store.dispatch("getMessages");
            }

            window.Echo.channel("laravel_messages_channel").listen("NewMessageEvent", ({ message }) => {
                this.$store.commit("unshiftMessage", message);
            });
        },

        computed: {
            messages() {
                return this.$store.getters.messages;
            },

            user() {
                return this.$store.getters.user;
            },

            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            }
        },

        methods: {
            sendMessage() {
                this.$store.dispatch("sendMessage", this.newMessageText);
                this.newMessageText = "";
            },

            getMessages() {
                this.$store.dispatch("getMessages", this.messages.length);
            },

            logout() {
                this.$store.dispatch("logout");
            }
        },

        components: {
            MessageCard
        }
    }

</script>
