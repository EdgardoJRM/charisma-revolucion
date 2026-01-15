# 🚀 Agregar Lambda Functions en Amplify Console (Proyecto Existente)

## ✅ Tu proyecto ya está en Amplify - Solo falta agregar las funciones Lambda

## Paso 1: Ve a Amplify Console

1. Abre [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Selecciona tu app `charisma-revolucion`

## Paso 2: Agregar Función 1 - evaluarCharisma

1. Ve a **Backend environments** → **Functions** → **Add function**
2. **Function name**: `evaluarCharisma`
3. **Runtime**: `Node.js 18.x`
4. **Handler**: `index.handler`
5. **Code**: Copia TODO el contenido de:
   ```
   amplify/backend/function/evaluarCharisma/src/index.js
   ```
6. **Dependencies** (en package.json): Copia de:
   ```
   amplify/backend/function/evaluarCharisma/src/package.json
   ```
7. **Environment variables**:
   - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
   - `AWS_SES_FROM_EMAIL` = `no-reply@hernandezmediaevents.com`
   - `AWS_REGION` = `us-east-1`
8. **Permissions**:
   - DynamoDB: `PutItem`, `Scan`
   - SES: `SendEmail`, `SendRawEmail`
9. **API Gateway**:
   - Path: `/api/evaluar`
   - Methods: `POST`, `OPTIONS`
   - Connect to: `evaluarCharisma`

## Paso 3: Agregar Función 2 - obtenerClientes

1. **Add function** nuevamente
2. **Function name**: `obtenerClientes`
3. **Runtime**: `Node.js 18.x`
4. **Handler**: `index.handler`
5. **Code**: Copia de `amplify/backend/function/obtenerClientes/src/index.js`
6. **Dependencies**: Copia de `amplify/backend/function/obtenerClientes/src/package.json`
7. **Environment variables**:
   - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
   - `AWS_REGION` = `us-east-1`
8. **Permissions**: DynamoDB `Scan`
9. **API Gateway**:
   - Path: `/api/clientes`
   - Methods: `GET`, `OPTIONS`

## Paso 4: Agregar Función 3 - obtenerEstadisticas

1. **Add function** nuevamente
2. **Function name**: `obtenerEstadisticas`
3. **Runtime**: `Node.js 18.x`
4. **Handler**: `index.handler`
5. **Code**: Copia de `amplify/backend/function/obtenerEstadisticas/src/index.js`
6. **Dependencies**: Copia de `amplify/backend/function/obtenerEstadisticas/src/package.json`
7. **Environment variables**:
   - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
   - `AWS_REGION` = `us-east-1`
8. **Permissions**: DynamoDB `Scan`
9. **API Gateway**:
   - Path: `/api/estadisticas`
   - Methods: `GET`, `OPTIONS`

## ✅ Listo!

Una vez agregadas las 3 funciones, tu app estará completamente funcional:
- ✅ Formulario envía a `/api/evaluar` → Lambda procesa y envía email
- ✅ Dashboard carga desde `/api/clientes` → Lambda obtiene datos
- ✅ Estadísticas desde `/api/estadisticas` → Lambda calcula stats

---

**Todo el código está listo en `amplify/backend/function/*/src/` - Solo copia y pega! 🚀**

