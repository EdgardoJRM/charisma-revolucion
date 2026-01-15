# ✅ Solución Simple: Usar Express (Ya Funciona)

## La Realidad

**Amplify Hosting NO detecta automáticamente funciones Lambda** sin usar el CLI de Amplify (`amplify init` + `amplify push`).

## Opción Más Simple: Mantener Express

Tu servidor Express (`server.js`) **ya funciona**. Solo necesitas:

### 1. Rewrites en Amplify Console

En **Rewrites and redirects**, usa esto:

```json
[
  {
    "source": "/api/<*>",
    "target": "/api/<*>",
    "status": "200"
  },
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

### 2. Asegurar que Express esté corriendo

En `amplify.yml`, el backend ya está configurado para servir Express.

### 3. Variables de Entorno

En Amplify Console → Environment variables:
- `AWS_REGION=us-east-1`
- `AWS_ACCESS_KEY_ID=tu-key`
- `AWS_SECRET_ACCESS_KEY=tu-secret`
- `AWS_SES_FROM_EMAIL=no-reply@hernandezmediaevents.com`
- `DYNAMODB_TABLE=charisma-revolucion-clientes`

## ✅ Ventajas

- ✅ **Ya funciona** - No necesitas cambiar nada
- ✅ **Sin configuración manual** - Solo rewrites
- ✅ **Simple** - Express maneja todo
- ✅ **Ya probado** - El código ya está funcionando

## 🚫 Por qué NO Lambda sin CLI

Para usar Lambda Functions en Amplify Hosting necesitas:
1. `amplify init` (requiere interacción)
2. `amplify push` (despliega funciones)
3. Configurar API Gateway manualmente

**O** crear todo manualmente en AWS Console (Lambda + API Gateway) y luego conectar.

## Conclusión

**Mantén Express** - Es la solución más simple y ya funciona. Solo arregla los rewrites.

