import type { AxiosInstance } from "axios"
import type { Blog } from "~/types/blog";

export const createBlogService = (api: AxiosInstance) => ({
    getBlogList(page: number, size: number) {
        return api.get(`/blog/list?page=${page}&size=${size}`, { withCredentials: true });
    },

    createBlog(blog: Blog) {
        return api.post(`/blog/create`, blog, { withCredentials: true });
    },

    editBlog(blog: Blog, id?: number) {
        return api.put(`/blog/edit/${id}`, blog, { withCredentials: true });
    },

    deleteBlog(id: number) {
        return api.delete(`/blog/delete/${id}`, { withCredentials: true });
    }

})