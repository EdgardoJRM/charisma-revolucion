# 🚀 Configurar Lambda Functions en Amplify - Guía Paso a Paso

## ✅ Estado Actual

He creado todas las funciones Lambda y están listas en:
- `amplify/backend/function/evaluarCharisma/src/`
- `amplify/backend/function/obtenerClientes/src/`
- `amplify/backend/function/obtenerEstadisticas/src/`

## 📋 Opción 1: Usar Amplify CLI (Interactivo)

### Paso 1: Inicializar Amplify

```bash
cd "/Users/gardo/Charisma Revolucion"
amplify init
```

**Respuestas sugeridas:**
- Project name: `CharismaRevolucion`
- Environment: `main`
- Default editor: `code` (o tu editor)
- App type: `javascript`
- Framework: `none`
- Source directory: `public`
- Distribution directory: `public`
- Build command: `npm run-script build` (o deja vacío)
- Start command: `npm run-script start` (o deja vacío)
- AWS Profile: Selecciona tu perfil o configura credenciales

### Paso 2: Agregar Función 1 - evaluarCharisma

```bash
amplify add function
```

**Selecciona:**
- Function name: `evaluarCharisma`
- Runtime: `Node.js`
- Template: `Hello World` (lo modificaremos después)
- Advanced settings: `No` (por ahora)

Luego, reemplaza el código en `amplify/backend/function/evaluarCharisma/src/index.js` con el que ya creamos.

### Paso 3: Agregar API Gateway para evaluarCharisma

```bash
amplify add api
```

**Selecciona:**
- Service: `REST API`
- Path: `/api/evaluar`
- Method: `POST`
- Function: `evaluarCharisma`
- Restrict access: `No` (o configura según necesites)

Repite para `OPTIONS` en el mismo path.

### Paso 4: Agregar Funciones 2 y 3

Repite los pasos 2 y 3 para:
- `obtenerClientes` → `/api/clientes` (GET, OPTIONS)
- `obtenerEstadisticas` → `/api/estadisticas` (GET, OPTIONS)

### Paso 5: Configurar Variables de Entorno

Para cada función, en `amplify/backend/function/[nombre]/function-parameters.json`, asegúrate de tener:

```json
{
  "environmentMap": {
    "DYNAMODB_TABLE": "charisma-revolucion-clientes",
    "AWS_SES_FROM_EMAIL": "no-reply@hernandezmediaevents.com",
    "AWS_REGION": {
      "Ref": "AWS::Region"
    }
  }
}
```

### Paso 6: Configurar Permisos IAM

Amplify creará los roles automáticamente, pero verifica que tengan permisos para:
- DynamoDB: `PutItem`, `Scan`, `GetItem`
- SES: `SendEmail`, `SendRawEmail`

### Paso 7: Desplegar

```bash
amplify push
```

Esto desplegará todas las funciones y configurará las rutas API automáticamente.

---

## 📋 Opción 2: Configuración Manual en Amplify Console

Si prefieres no usar el CLI, puedes configurar manualmente:

### Paso 1: Ve a Amplify Console

1. Abre [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Selecciona tu app `charisma-revolucion`

### Paso 2: Agregar Backend Functions

1. Ve a **Backend environments** → **Functions**
2. Click en **Add function**

### Paso 3: Para cada función:

#### evaluarCharisma

1. **Function name**: `evaluarCharisma`
2. **Runtime**: `Node.js 18.x`
3. **Handler**: `index.handler`
4. **Code**: Sube el contenido de `amplify/backend/function/evaluarCharisma/src/`
5. **Environment variables**:
   - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
   - `AWS_SES_FROM_EMAIL` = `no-reply@hernandezmediaevents.com`
   - `AWS_REGION` = `us-east-1`
6. **Permissions**: 
   - DynamoDB: `PutItem`, `Scan`
   - SES: `SendEmail`, `SendRawEmail`
7. **API Gateway**: 
   - Path: `/api/evaluar`
   - Methods: `POST`, `OPTIONS`

#### obtenerClientes

1. **Function name**: `obtenerClientes`
2. **Runtime**: `Node.js 18.x`
3. **Handler**: `index.handler`
4. **Code**: Sube el contenido de `amplify/backend/function/obtenerClientes/src/`
5. **Environment variables**:
   - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
   - `AWS_REGION` = `us-east-1`
6. **Permissions**: DynamoDB: `Scan`
7. **API Gateway**: 
   - Path: `/api/clientes`
   - Methods: `GET`, `OPTIONS`

#### obtenerEstadisticas

1. **Function name**: `obtenerEstadisticas`
2. **Runtime**: `Node.js 18.x`
3. **Handler**: `index.handler`
4. **Code**: Sube el contenido de `amplify/backend/function/obtenerEstadisticas/src/`
5. **Environment variables**:
   - `DYNAMODB_TABLE` = `charisma-revolucion-clientes`
   - `AWS_REGION` = `us-east-1`
6. **Permissions**: DynamoDB: `Scan`
7. **API Gateway**: 
   - Path: `/api/estadisticas`
   - Methods: `GET`, `OPTIONS`

### Paso 4: Configurar Rewrites

En **Rewrites and redirects**, solo necesitas:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

Las rutas `/api/*` serán manejadas automáticamente por API Gateway.

---

## ✅ Verificación

Después de configurar, prueba:

1. **Formulario**: Completa el examen y verifica que se envíe el email
2. **Dashboard**: Ve a `/dashboard.html` y verifica que cargue los clientes
3. **API directa**: Prueba `https://tu-dominio.amplifyapp.com/api/clientes`

---

## 🔧 Troubleshooting

### Las funciones no se detectan automáticamente

Amplify Hosting no detecta automáticamente las funciones Lambda solo con la estructura de carpetas. Debes usar el CLI o configurarlas manualmente.

### Error de permisos

Verifica que los roles IAM tengan permisos para DynamoDB y SES.

### Las rutas `/api/*` no funcionan

Asegúrate de que API Gateway esté configurado y que las funciones estén conectadas a las rutas correctas.

---

## 📝 Notas Finales

- El código de las funciones ya está listo en `amplify/backend/function/*/src/`
- Cada función tiene su `package.json` con las dependencias
- El `amplify.yml` está configurado para construir las funciones durante el build
- Una vez configuradas, las funciones se desplegarán automáticamente en cada push a GitHub

