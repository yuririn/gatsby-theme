exports.handler = async (event, context) => {
    const branch = process.env.BRANCH || 'unknown';
    let nodeEnv = 'production';

    if (branch === 'develop') {
        nodeEnv = 'development';
    }

    process.env.NODE_ENV = nodeEnv;

    return {
        statusCode: 200,
        body: `NODE_ENV set to ${nodeEnv}`
    };
};
