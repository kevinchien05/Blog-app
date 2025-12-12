import axios from "axios";

const config = useRuntimeConfig();

const URL_BASE = `${config.public.springUrl}/auth`;

class AuthService {

    registerUser(dto: object) {
        return axios.post(`${URL_BASE}/register`, dto);
    }

    verifyEmail(token: string){
        return axios.get(`${URL_BASE}/verify-email?token=${token}`);
    }

}
export default new AuthService();