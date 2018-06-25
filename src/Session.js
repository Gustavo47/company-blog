const Session = {

    setSession(user, persist) {
        if(persist) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    },

    getSession() {
        const session = sessionStorage.getItem('user'); 
        if(session) {
            return JSON.parse(session);
        }

        const local = localStorage.getItem('user');
        if(local) {
            return JSON.parse(local);
        }

        return false;
    },

    deleteSession() {
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
    },

}

export default Session;