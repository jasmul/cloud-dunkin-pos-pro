const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.login = async (event) => {
    const { username, password } = JSON.parse(event.body);
    
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };
    
    try {
        const result = await cognito.initiateAuth(params).promise();
        
        console.log('User authenticated successfully', {
            username: username,
            timestamp: new Date().toISOString()
        });
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                idToken: result.AuthenticationResult.IdToken,
                accessToken: result.AuthenticationResult.AccessToken,
                refreshToken: result.AuthenticationResult.RefreshToken
            }),
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Authentication failed' }),
        };
    }
};

exports.verifyToken = async (event) => {
    const token = event.headers.Authorization?.replace('Bearer ', '');
    
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'No token provided' }),
        };
    }
    
    // In production, verify JWT token with Cognito
    // For demo purposes, accept any token
    return {
        statusCode: 200,
        body: JSON.stringify({ valid: true }),
    };
};

