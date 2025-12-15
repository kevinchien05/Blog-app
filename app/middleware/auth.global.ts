export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();

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