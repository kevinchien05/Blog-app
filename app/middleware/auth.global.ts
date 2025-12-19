export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();
    if(!userStore.authenticated){
        await userStore.fetchUser();
    }
    const publicRoute = ['/login', '/register','/verify-email','/forget','/change/password']

    if(!userStore.authenticated){
        if(!publicRoute.includes(to.path)){
            return navigateTo('/login');
        }
    }
    
    if(userStore.authenticated){
        if(publicRoute.includes(to.path)){
            return navigateTo('/');
        }
    }

    
})