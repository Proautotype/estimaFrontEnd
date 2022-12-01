import AxiosWebConnector from "../AxiosWebConnector"

export default class AccountWebService {

    async createAccount(accountDetails){
        try {
            const {data, status, statusText} = await AxiosWebConnector({
                method:"POST",
                url:"/userAccount/create",
                data: accountDetails
            })
            return {data, status, statusText}
        } catch (error) {
            console.debug(error)
        }
    }
    async loginAccount(accountDetails){

    }
}