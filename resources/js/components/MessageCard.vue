<template>
    <div class="card flex-row flex-wrap mb-3">
        <div class="card-header border-0">
            <img src="/images/user.png" width="125" alt="user avatar" class="rounded message__user_avatar">
        </div>
        <div class="card-block p-3">
            <h4 class="card-title">{{ message.user.login }}</h4>
            <p class="card-text">{{ message.text }}</p>
        </div>
        <div class="w-100"></div>
        <div class="card-footer w-100 text-muted text-right">
            {{ message.created_at | moment("from", "now") }}
        </div>
    </div>
</template>

<script>
export default {
    name: "message-card",
    props: ["message", "current_user"],

    mounted() {
        console.log(this.message, this.current_user);
    }
}
</script>