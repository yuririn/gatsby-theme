exports.handler = async (event, context) => {
    if (process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy') {
        const headers = {
            'Basic-Auth': `${process.env.BASIC_AUTH_ID}:${process.env.BASIC_AUTH_PASS}`,
        };

        return {
            statusCode: 200,
            headers: {
                ...event.headers,
                ...headers,
            },
            body: 'Headers added',
        };
    }

    return {
        statusCode: 200,
        headers: event.headers,
        body: 'No headers added',
    };
};
