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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 400;
          line-height: 1.6;
          color: #00100b;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .container {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 16, 11, 0.1);
          border: 2px solid #ebebeb;
        }
        h1 {
          font-family: 'Lora', serif;
          font-weight: 700;
          text-align: center;
          background: linear-gradient(135deg, #8b5cf6 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 36px;
          letter-spacing: 0.5px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 3px solid #ebebeb;
        }
        h2 {
          font-family: 'Lora', serif;
          font-weight: 700;
          color: #8b5cf6;
          font-size: 22px;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .formula {
          background: linear-gradient(135deg, #8b5cf6 0%, #ff6b6b 100%);
          color: #ffffff;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          margin: 25px 0;
          letter-spacing: 1px;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }
        .componente {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%);
          padding: 20px;
          margin: 20px 0;
          border-left: 5px solid #8b5cf6;
          border-radius: 12px;
        }
        .componente h3 {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          color: #8b5cf6;
          margin-top: 0;
          font-size: 18px;
        }
        .componente p {
          font-family: 'Manrope', sans-serif;
          color: #00100b;
          margin: 10px 0 0 0;
          line-height: 1.6;
        }
        .footer {
          text-align: center;
          margin-top: 35px;
          padding-top: 25px;
          border-top: 2px solid #ebebeb;
          color: #8e8e93;
        }
        p {
          font-family: 'Manrope', sans-serif;
          color: #00100b;
          margin: 15px 0;
          line-height: 1.6;
        }
        strong {
          font-weight: 700;
          color: #8b5cf6;
        }
        .highlight-box {
          background: linear-gradient(135deg, #14b8a6 0%, #8b5cf6 100%);
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
          border: 2px solid #8b5cf6;
        }
        .highlight-box p {
          margin: 0;
          font-style: italic;
          color: #ffffff;
          font-family: 'Manrope', sans-serif;
          line-height: 1.8;
        }
        .highlight-box strong {
          color: #ffffff;
          font-weight: 700;
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
          <h3>💝 Nivel 2 - Carisma de Confianza/Empatía: ${formula.componentes.nivel2}</h3>
          <p>${descripciones[formula.componentes.nivel2]}</p>
        </div>
        
        <div class="componente">
          <h3>👑 Nivel 3 - Carisma de Autoridad: ${formula.componentes.nivel3}</h3>
          <p>${descripciones[formula.componentes.nivel3]}</p>
        </div>
        
        <div class="highlight-box">
          <p>
            <strong>💡 Recuerda:</strong><br>
            • No hay combinación "mejor" o "peor" - cada una tiene sus fortalezas<br>
            • Tu autenticidad es tu poder - no trates de copiar a otros<br>
            • Amplifica lo natural - no fuerces estilos que no son tuyos<br>
            • Contexto importa - aprende cuándo usar cada aspecto de tu carisma<br><br>
            <strong>¡Tu carisma único es tu superpoder!</strong>
          </p>
        </div>
        
        <div class="footer">
          <p style="font-family: 'Manrope', sans-serif; font-weight: 600; color: #00100b;">Con carisma,<br><strong style="color: #8b5cf6;">El equipo de Charisma Revolución</strong></p>
          <p style="font-size: 12px; color: #8e8e93; margin-top: 15px;">
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

