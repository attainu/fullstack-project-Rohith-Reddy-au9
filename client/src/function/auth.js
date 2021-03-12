import axios from 'axios'
const url = "http://localhost:9000/api"

export const createOrUpdateUser = async (authtoken) =>{

    return await axios.post(
        (`${url}/create-or-update-user`),
        {},
        {
            headers: {
                authtoken,
            },
        }
    )
}