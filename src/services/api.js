import axios from "axios"

let localhost = true;

let url = null

if (localhost) {
    url = 'http://192.168.100.41:80/'
} else {
    url = 'https://www.ferafox.com.br/projetos/soriedem/'
}

const api = axios.create({
    baseURL: url
})

export default api