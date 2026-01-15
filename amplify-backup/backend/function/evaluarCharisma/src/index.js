const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

// Configuración de AWS
const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1' 
}));

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'charisma-revolucion-clientes';
const FROM_EMAIL = process.env.AWS_SES_FROM_EMAIL || 'no-reply@hernandezmediaevents.com';

// Mapeo de resultados
const nivel1Map = {
  'A': 'IMPRESIONAR',
  'B': 'ENTUSIASMAR',
  'C': 'ASOMBRAR',
  'D': 'RUGIR',
  'E': 'ACTUAR',
  'F': 'ENCANTAR'
};

const nivel2Map = {
  'A': 'ESTABILIZAR',
  'B': 'CORREGIR',
  'C': 'REFLEJAR'
};

const nivel3Map = {
  'A': 'ILUMINAR',
  'B': 'LIDERAR',
  'C': 'ELEVAR'
};

const descripciones = {
  'IMPRESIONAR': 'Tu carisma se basa en crear una impresión memorable y poderosa que perdura en la mente de los demás.',
  'ENTUSIASMAR': 'Tu energía contagiosa genera entusiasmo y motivación en quienes te rodean.',
  'ASOMBRAR': 'Tienes la capacidad de sorprender y maravillar con tu presencia y acciones.',
  'RUGIR': 'Tu voz y presencia tienen un impacto fuerte y resonante que capta la atención inmediata.',
  'ACTUAR': 'Tu carisma se manifiesta a través de la acción directa y el movimiento decidido.',
  'ENCANTAR': 'Tu encanto natural atrae y seduce de manera sutil pero efectiva.',
  'ESTABILIZAR': 'Proporcionas estabilidad y confianza, creando un ambiente seguro y predecible.',
  'CORREGIR': 'Tienes la habilidad de identificar y corregir problemas, guiando hacia soluciones.',
  'REFLEJAR': 'Reflejas las emociones y necesidades de los demás, creando conexión empática.',
  'ILUMINAR': 'Iluminas el camino con claridad y visión, inspirando a otros a ver nuevas posibilidades.',
  'LIDERAR': 'Tu autoridad natural guía y dirige a otros hacia objetivos comunes.',
  'ELEVAR': 'Elevas a quienes te rodean, ayudándolos a alcanzar su máximo potencial.'
};

function calcularDominante(respuestas) {
  const conteo = {};
  respuestas.forEach(respuesta => {
    if (respuesta && respuesta.trim()) {
      conteo[respuesta] = (conteo[respuesta] || 0) + 1;
    }
  });
  
  let maxCount = 0;
  let dominante = null;
  for (const [letra, count] of Object.entries(conteo)) {
    if (count > maxCount) {
      maxCount = count;
      dominante = letra;
    }
  }
  return dominante;
}

function construirFormula(nivel1, nivel2, nivel3) {
  return {
    formula: `${nivel1Map[nivel1] || 'ENCANTAR'} + ${nivel2Map[nivel2] || 'REFLEJAR'} + ${nivel3Map[nivel3] || 'ELEVAR'}`,
    componentes: {
      nivel1: nivel1Map[nivel1] || 'ENCANTAR',
      nivel2: nivel2Map[nivel2] || 'REFLEJAR',
      nivel3: nivel3Map[nivel3] || 'ELEVAR'
    }
  };
}

function generarEmailHTML(nombre, formula) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          line-height: 1.6;
          color: #222022;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f2f2f2;
        }
        .container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(34, 32, 34, 0.1);
        }
        h1 {
          color: #4C5C68;
          text-align: center;
          border-bottom: 3px solid #3F5E78;
          padding-bottom: 10px;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        h2 {
          color: #4C5C68;
          font-size: 20px;
          margin-top: 25px;
          margin-bottom: 15px;
        }
        .formula {
          background: linear-gradient(135deg, #4C5C68 0%, #3F5E78 100%);
          color: #FFC907;
          padding: 25px;
          border-radius: 8px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          letter-spacing: 3px;
          border: 2px solid #222022;
        }
        .componente {
          background-color: #f2f2f2;
          padding: 15px;
          margin: 15px 0;
          border-left: 4px solid #3F5E78;
          border-radius: 4px;
        }
        .componente h3 {
          color: #4C5C68;
          margin-top: 0;
          font-size: 16px;
          font-weight: bold;
        }
        .componente p {
          color: #222022;
          margin: 10px 0 0 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #A5A5A5;
          color: #A5A5A5;
        }
        p {
          color: #222022;
          margin: 15px 0;
        }
        strong {
          color: #4C5C68;
        }
        .highlight-box {
          background-color: #FFC907;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border: 2px solid #4C5C68;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✨ Tu Fórmula de Carisma ✨</h1>
        
        <p>Hola <strong>${nombre}</strong>,</p>
        
        <p>Gracias por completar el Examen de Charisma Revolución. Después de analizar tus respuestas, hemos creado tu fórmula personalizada de carisma.</p>
        
        <div class="formula">
          ${formula.formula}
        </div>
        
        <h2>📊 Desglose de tu Fórmula:</h2>
        
        <div class="componente">
          <h3>🎭 Nivel 1 - Carisma Energético: ${formula.componentes.nivel1}</h3>
          <p>${descripciones[formula.componentes.nivel1]}</p>
        </div>
        
        <div class="componente">
          <h3>💝 Nivel 2 - Carisma de Compasión: ${formula.componentes.nivel2}</h3>
          <p>${descripciones[formula.componentes.nivel2]}</p>
        </div>
        
        <div class="componente">
          <h3>👑 Nivel 3 - Carisma de Autoridad: ${formula.componentes.nivel3}</h3>
          <p>${descripciones[formula.componentes.nivel3]}</p>
        </div>
        
        <div class="highlight-box">
          <p style="margin: 0; font-style: italic; color: #222022;">
            <strong>💡 Recuerda:</strong> Esta fórmula es única para ti. Úsala como guía para desarrollar tu carisma y crear conexiones más profundas y auténticas con los demás.
          </p>
        </div>
        
        <div class="footer">
          <p>Con carisma,<br><strong>El equipo de Charisma Revolución</strong></p>
          <p style="font-size: 12px;">
            Este es un email automático. Por favor, no respondas a este mensaje.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    };
  }
  
  try {
    // Parse body
    let body;
    if (event.body) {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } else {
      throw new Error('No body provided');
    }
    
    const { nombre, email, respuestas } = body;
    
    // Validaciones
    if (!nombre || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nombre y email son requeridos' })
      };
    }
    
    if (!respuestas || respuestas.length !== 36) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: `Debes responder las 36 preguntas. Respondiste ${respuestas ? respuestas.length : 0}` 
        })
      };
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email inválido' })
      };
    }
    
    // Separar respuestas por nivel
    const nivel1Respuestas = respuestas.slice(0, 12);
    const nivel2Respuestas = respuestas.slice(12, 24);
    const nivel3Respuestas = respuestas.slice(24, 36);
    
    // Calcular resultados
    const nivel1Dominante = calcularDominante(nivel1Respuestas);
    const nivel2Dominante = calcularDominante(nivel2Respuestas);
    const nivel3Dominante = calcularDominante(nivel3Respuestas);
    
    // Construir fórmula
    const formula = construirFormula(nivel1Dominante, nivel2Dominante, nivel3Dominante);
    
    // Guardar en DynamoDB
    const fecha = new Date().toISOString();
    const idCliente = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const datosCliente = {
      id: idCliente,
      fecha: fecha,
      nombre,
      email,
      respuestas: respuestas,
      resultados: {
        nivel1: {
          dominante: nivel1Dominante,
          resultado: formula.componentes.nivel1
        },
        nivel2: {
          dominante: nivel2Dominante,
          resultado: formula.componentes.nivel2
        },
        nivel3: {
          dominante: nivel3Dominante,
          resultado: formula.componentes.nivel3
        }
      },
      formulaFinal: formula.formula
    };
    
    try {
      await dynamoClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: datosCliente
      }));
      console.log('✅ Cliente guardado en DynamoDB:', nombre);
    } catch (error) {
      console.error('Error guardando en DynamoDB:', error);
    }
    
    // Enviar email
    const emailHTML = generarEmailHTML(nombre, formula);
    const asunto = `✨ Tu Fórmula de Carisma - ${nombre}`;
    
    try {
      await sesClient.send(new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: asunto, Charset: 'UTF-8' },
          Body: {
            Html: { Data: emailHTML, Charset: 'UTF-8' }
          }
        }
      }));
      console.log('✅ Email enviado a:', email);
    } catch (error) {
      console.error('Error enviando email:', error);
      throw error;
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Tu evaluación ha sido procesada. Revisa tu email para ver tu fórmula de carisma.'
      })
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al procesar tu evaluación. Por favor, intenta nuevamente.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

