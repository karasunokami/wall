export function initialize(store, router) {
    const userStr = localStorage.getItem("user");

    if (userStr) {
        store.commit("setUser", JSON.parse(userStr));
    }
    
    // axios.interceptors.response.use((response) => {
    //     return response;
    // }, (error) => {
    //     if (error.response.status == 401) {
    //         store.commit('logout');
    //         router.push('/login');
    //     }

    //     return Promise.reject(error);
    // });

    router.beforeEach((to, from, next) => {
        let user = store.getters.user;

        if (!!user && (to.path == "/login" || to.path == "/register")) {
            next("/");
        }

        next();
    });
}
