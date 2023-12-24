export const createRequest = (setup?: { [key: string]: string }) => {
    if (!setup) {
        return {
            params: {},
            request: {}
        };
    }
    return ({
        params: {},
        request: {
            formData: () => ({
                get: (key: string): any => {
                    const hashing: { [key: string]: string } = {
                        ...setup
                    };
                    return hashing[key];
                }
            })
        }
    })
};