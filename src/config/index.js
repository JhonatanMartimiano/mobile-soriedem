let localhost = false
let url = null
if (localhost) {
    url = 'http://192.168.100.41/storage/'
} else {
    url = 'https://www.soriedem.com.br/appsoriedem/storage/'
}

export const urlImage = url