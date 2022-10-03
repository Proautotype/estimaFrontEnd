export default {
    SHOWCARD_SESSION: {
        initialState: {
            serverDetails: {
                server: "",
                serverLink: ""
            },
            sessionDetails: {
                name: "",
                state: "",
                index:""
            },
            isAdmin: false,
            chatID:"",
            members: [],
            process:"pending",
            errorMsg:""
        },
        name: {
        },       
    }
}