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
    
    const clientes = result.Items || [];
    
    const estadisticas = {
      totalClientes: clientes.length,
      formulas: {},
      resultadosNivel1: {},
      resultadosNivel2: {},
      resultadosNivel3: {},
      porFecha: {}
    };
    
    clientes.forEach(cliente => {
      const formula = cliente.formulaFinal;
      if (formula) {
        estadisticas.formulas[formula] = (estadisticas.formulas[formula] || 0) + 1;
      }
      
      if (cliente.resultados) {
        const r1 = cliente.resultados.nivel1?.resultado;
        const r2 = cliente.resultados.nivel2?.resultado;
        const r3 = cliente.resultados.nivel3?.resultado;
        
        if (r1) estadisticas.resultadosNivel1[r1] = (estadisticas.resultadosNivel1[r1] || 0) + 1;
        if (r2) estadisticas.resultadosNivel2[r2] = (estadisticas.resultadosNivel2[r2] || 0) + 1;
        if (r3) estadisticas.resultadosNivel3[r3] = (estadisticas.resultadosNivel3[r3] || 0) + 1;
      }
      
      const fecha = cliente.fecha ? cliente.fecha.split('T')[0] : 'sin-fecha';
      estadisticas.porFecha[fecha] = (estadisticas.porFecha[fecha] || 0) + 1;
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        estadisticas
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al obtener estadísticas',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

