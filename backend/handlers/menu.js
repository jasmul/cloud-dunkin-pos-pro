const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.getMenu = async (event) => {
    const params = {
        TableName: process.env.MENU_TABLE,
    };
    
    try {
        const data = await dynamoDB.scan(params).promise();
        
        // Log to CloudWatch
        console.log('Menu retrieved successfully', {
            itemCount: data.Items.length,
            timestamp: new Date().toISOString()
        });
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error('DynamoDB error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve menu' }),
        };
    }
};

exports.createMenuItem = async (event) => {
    try {
        const item = JSON.parse(event.body);
        const params = {
            TableName: process.env.MENU_TABLE,
            Item: {
                ...item,
                id: AWS.util.uuid.v4(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        };
        
        await dynamoDB.put(params).promise();
        
        console.log('Menu item created successfully', {
            itemId: params.Item.id,
            name: params.Item.name,
            timestamp: params.Item.createdAt
        });
        
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ 
                message: 'Item created successfully',
                item: params.Item
            }),
        };
    } catch (error) {
        console.error('Create item error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Failed to create item' }),
        };
    }
};
