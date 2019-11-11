import router from "../routes";

export const app = {
    state: {
        isLoggedIn: false,
        user: null
    },

    actions: {
        login(context, credentials) {
            axios.post('/api/auth/login', credentials)
                .then((response) => {
                    let user = Object.assign({}, response.data.user, {access_token: response.data.access_token});
                    context.commit("setUser", user);
                    router.push("/");
                });
                
        },

        register(context, credentials) {
            axios.post("/api/auth/register", credentials)
                .then((response) => {
                    router.push("/login");
                });
        },

        logout(context) {
            context.commit("logout");
        }
    },

    mutations: {
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
        },

        setUser(state, user) {
            state.user = state.user = user;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${user.access_token}`;
        }
    },

    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },

        user(state) {
            return state.user;
        }
    }
}