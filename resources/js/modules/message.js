export const message = {
    state: {
        messages: []
    },

    actions: {
        sendMessage(context, messageText) {
            axios.post("/api/messages", { text: messageText });
        },

        getMessages(context, offset = 0) {
            axios.get(`/api/messages?offset=${offset}`)
                .then((response) => {
                    if (response.data.status !== true) {
                        return;
                    }

                    context.commit("mergeMessages", response.data.messages);
                });
        }
    },

    mutations: {
        mergeMessages(store, messages) {
            store.messages = store.messages.concat(messages);
        },

        unshiftMessage(store, message) {
            store.messages.unshift(message);
        }
    },

    getters: {
        messages(store) {
            return store.messages;
        }
    }
}