const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1' 
}));

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'charisma-revolucion-clientes';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    };
  }
  
  try {
    const result = await dynamoClient.send(new ScanCommand({
      TableName: TABLE_NAME
    }));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        total: result.Items ? result.Items.length : 0,
        clientes: result.Items || []
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al obtener los clientes',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

