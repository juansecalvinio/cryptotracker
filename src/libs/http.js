class Http {
    static instance = new Http();

    async get(url) {
        try {
            let request = await fetch(url);
            let json = await request.json();
            return json;
        } catch (error) {
            console.log('Http get method error', error);
            throw Error(error);
        }
    }

    async post(url, body) {
        try {
            let request = await fetch(url, {
                method: "POST",
                body
            });
            let json = await request.json();
            return json;
        } catch (error) {
            console.log('Http post method error', error);
            throw Error(error);
        }
    }
}

export default Http;