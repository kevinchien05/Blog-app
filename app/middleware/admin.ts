export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();

    if (userStore.data?.role != "ADMIN") {
        throw createError({
            statusCode: 403,
            statusMessage: 'Access Denied'
        })
    }
})