export default {
    SHOWCARD_SESSION: {
        initialState: {
            serverDetails: {
                server: "",
                serverLink: ""
            },
            sessionDetails: {
                name: "",
                state: ""
            },
            isAdmin: false,
            members: [],
            process:"pending",
            errorMsg:""
        },
        name: {
        },       
    }
}