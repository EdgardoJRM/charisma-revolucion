# 🗄️ Configuración de DynamoDB

## Crear la tabla en DynamoDB

1. Ve a [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click en "Create table"
3. Configuración:
   - **Table name**: `charisma-revolucion-clientes`
   - **Partition key**: `id` (String)
   - **Table settings**: Usar configuración por defecto
4. Click en "Create table"

## Configurar permisos IAM

Tu usuario/rol de AWS necesita estos permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/charisma-revolucion-clientes"
    }
  ]
}
```

## Variables de entorno

Agrega en Amplify Console → Environment variables:

```
DYNAMODB_TABLE=charisma-revolucion-clientes
```

## Acceso a los datos

### Dashboard Web
Visita: `https://tu-dominio.amplifyapp.com/dashboard.html`

### API Endpoints
- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/estadisticas` - Obtener estadísticas

### Descargar datos
- Desde el dashboard: Click en "Descargar JSON"
- Directo: `https://tu-dominio.amplifyapp.com/api/clientes`

## Estructura de datos

Cada cliente se guarda con:
- `id`: ID único
- `fecha`: Fecha ISO
- `nombre`: Nombre completo
- `email`: Email
- `respuestas`: Array de 36 respuestas
- `resultados`: Objeto con resultados por nivel
- `formulaFinal`: Fórmula completa

