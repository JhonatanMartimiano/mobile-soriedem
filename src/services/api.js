import axios from "axios"

let localhost = false;

let url = null

if (localhost) {
    url = 'http://192.168.100.41:80/'
} else {
    url = 'https://www.soriedem.com.br/appsoriedem/'
}

const api = axios.create({
    baseURL: url
})

export default api