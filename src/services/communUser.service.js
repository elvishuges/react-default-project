import { api } from './config'

export default {

    login(email, password) {
        console.log('*** em serviço server***', email, password);
        var obj = {
            email: email,
            password: password,
        }
        return api.post('/auth/login', obj)
    },

}