const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');
require('dotenv').config();

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'charisma-revolucion-clientes';

async function createTable() {
  try {
    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST' // Sin necesidad de especificar capacidad
    });

    const response = await dynamoClient.send(command);
    console.log('✅ Tabla creada exitosamente:', TABLE_NAME);
    console.log('Table ARN:', response.TableDescription?.TableArn);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log('ℹ️  La tabla ya existe:', TABLE_NAME);
    } else {
      console.error('❌ Error creando tabla:', error);
      process.exit(1);
    }
  }
}

createTable();

