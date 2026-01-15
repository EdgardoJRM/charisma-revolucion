# 🚀 Solución Rápida - Amplify Lambda

## ⚠️ Problema

`amplify init` requiere interacción manual que no se puede automatizar completamente.

## ✅ Solución: Configuración Manual en Amplify Console

Como ya tienes todo el código listo, la forma más rápida es configurar las funciones directamente en Amplify Console:

### Paso 1: Ve a Amplify Console
1. Abre [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Selecciona tu app `charisma-revolucion`

### Paso 2: Agregar Funciones Lambda

Ve a **Backend environments** → **Functions** → **Add function**

#### Función 1: evaluarCharisma
- **Function name**: `evaluarCharisma`
- **Runtime**: `Node.js 18.x`
- **Handler**: `index.handler`
- **Code**: Copia el contenido de `amplify/backend/function/evaluarCharisma/src/index.js`
- **Dependencies**: Copia el contenido de `amplify/backend/function/evaluarCharisma/src/package.json`
- **Environment variables**:
  - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
  - `AWS_SES_FROM_EMAIL` = `no-reply@hernandezmediaevents.com`
  - `AWS_REGION` = `us-east-1`
- **Permissions**: DynamoDB (`PutItem`, `Scan`) y SES (`SendEmail`)
- **API Gateway**: Path `/api/evaluar`, Methods `POST`, `OPTIONS`

#### Función 2: obtenerClientes
- **Function name**: `obtenerClientes`
- **Runtime**: `Node.js 18.x`
- **Handler**: `index.handler`
- **Code**: Copia de `amplify/backend/function/obtenerClientes/src/index.js`
- **Dependencies**: Copia de `amplify/backend/function/obtenerClientes/src/package.json`
- **Environment variables**:
  - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
  - `AWS_REGION` = `us-east-1`
- **Permissions**: DynamoDB (`Scan`)
- **API Gateway**: Path `/api/clientes`, Methods `GET`, `OPTIONS`

#### Función 3: obtenerEstadisticas
- **Function name**: `obtenerEstadisticas`
- **Runtime**: `Node.js 18.x`
- **Handler**: `index.handler`
- **Code**: Copia de `amplify/backend/function/obtenerEstadisticas/src/index.js`
- **Dependencies**: Copia de `amplify/backend/function/obtenerEstadisticas/src/package.json`
- **Environment variables**:
  - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
  - `AWS_REGION` = `us-east-1`
- **Permissions**: DynamoDB (`Scan`)
- **API Gateway**: Path `/api/estadisticas`, Methods `GET`, `OPTIONS`

### Paso 3: Configurar Rewrites

En **Rewrites and redirects**, usa:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

## ✅ Ventaja de este Método

- ✅ Más rápido que CLI
- ✅ Visual y fácil de seguir
- ✅ No requiere comandos interactivos
- ✅ Todo el código ya está listo

---

**El código está 100% listo. Solo copia y pega en la consola! 🚀**

