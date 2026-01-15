# 🚀 Migración a Lambda Functions - Guía Completa

## ✅ Lo que se ha hecho

He migrado el backend de Express a **Lambda Functions**. Esto resuelve todos los problemas de rewrites y es más escalable.

### Funciones Lambda Creadas:

1. **evaluarCharisma** - `/api/evaluar` (POST)
   - Procesa las evaluaciones
   - Guarda en DynamoDB
   - Envía emails con SES

2. **obtenerClientes** - `/api/clientes` (GET)
   - Obtiene todos los clientes del CRM

3. **obtenerEstadisticas** - `/api/estadisticas` (GET)
   - Calcula estadísticas agregadas

## 📋 Pasos en Amplify Console

### 1. Conectar el Backend

Cuando Amplify detecte el push, automáticamente:
- Detectará las funciones Lambda en `amplify/backend/function/`
- Las desplegará automáticamente
- Creará las rutas API automáticamente

### 2. Configurar Variables de Entorno

En Amplify Console → Backend environments → Environment variables, agrega:

```
AWS_REGION=us-east-1
AWS_SES_FROM_EMAIL=no-reply@hernandezmediaevents.com
DYNAMODB_TABLE=charisma-revolucion-clientes
```

**NOTA:** Las credenciales de AWS (ACCESS_KEY_ID y SECRET_ACCESS_KEY) se configuran automáticamente usando el rol IAM de Amplify.

### 3. Configurar Permisos IAM

Amplify necesita permisos para:
- DynamoDB: `PutItem`, `Scan`, `GetItem`
- SES: `SendEmail`

Esto se configura automáticamente cuando Amplify crea las funciones Lambda.

### 4. Rewrites en Amplify

Ahora **SOLO necesitas esta regla** (sin preocuparte por `/api/*`):

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

Las rutas `/api/*` ahora son manejadas automáticamente por Lambda Functions.

## 🎯 Ventajas de Lambda

✅ **Sin problemas de rewrites** - Amplify maneja las rutas automáticamente
✅ **Más escalable** - Lambda escala automáticamente
✅ **Mejor rendimiento** - Solo se ejecuta cuando se necesita
✅ **Costo eficiente** - Solo pagas por uso
✅ **Mantenimiento más simple** - Sin servidor que mantener

## 🔍 Verificar que Funciona

Después del deploy en Amplify:

1. Prueba: `https://tu-dominio.amplifyapp.com/api/health` (si existe)
2. Prueba el formulario completo
3. Verifica el dashboard: `https://tu-dominio.amplifyapp.com/dashboard.html`

## 📝 Notas

- El servidor Express (`server.js`) sigue existiendo para desarrollo local
- En producción, Amplify usará las Lambda Functions automáticamente
- Los datos se guardan en DynamoDB (ya creada)
- Los emails se envían con SES (ya configurado)

