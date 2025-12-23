const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.createOrder = async (event) => {
    const order = JSON.parse(event.body);
    
    const params = {
        TableName: process.env.ORDERS_TABLE,
        Item: {
            id: AWS.util.uuid.v4(),
            ...order,
            createdAt: new Date().toISOString(),
            status: 'pending'
        }
    };
    
    try {
        await dynamoDB.put(params).promise();
        
        console.log('Order created successfully', {
            orderId: params.Item.id,
            total: order.total,
            itemCount: order.items.length,
            timestamp: params.Item.createdAt
        });
        
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ 
                message: 'Order created successfully',
                orderId: params.Item.id
            }),
        };
    } catch (error) {
        console.error('Create order error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Failed to create order' }),
        };
    }
};

exports.getOrders = async (event) => {
    const params = {
        TableName: process.env.ORDERS_TABLE,
        Limit: 100,
        ScanIndexForward: false
    };
    
    try {
        const data = await dynamoDB.scan(params).promise();
        
        console.log('Orders retrieved successfully', {
            orderCount: data.Items.length,
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
        console.error('Get orders error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Failed to retrieve orders' }),
        };
    }
};

