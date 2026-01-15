# 🔧 Solución de Problemas - Error de Conexión

## Problema: "Error de conexión" al enviar el formulario

### Paso 1: Verificar que el backend esté corriendo

1. Ve a Amplify Console → Tu app → Backend environments
2. Verifica que el backend esté activo y corriendo
3. Revisa los logs en CloudWatch para ver si hay errores

### Paso 2: Probar el endpoint de health check

Abre en tu navegador:
```
https://tu-dominio.amplifyapp.com/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "amplify"
}
```

Si no funciona, el backend no está configurado correctamente.

### Paso 3: Verificar Rewrites en Amplify

En Amplify Console → Rewrites and redirects, asegúrate de tener:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

**IMPORTANTE:** Las rutas `/api/*` deben pasar automáticamente al backend. Si no, necesitas agregar una regla específica.

### Paso 4: Verificar Variables de Entorno

En Amplify Console → Environment variables, verifica que tengas:

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_SECRET_ACCESS_KEY=tu-secret-access-key
AWS_SES_FROM_EMAIL=no-reply@hernandezmediaevents.com
PORT=8080
```

### Paso 5: Revisar Logs

1. Ve a CloudWatch Logs
2. Busca el log group de tu app de Amplify
3. Revisa los logs del backend para ver errores

### Paso 6: Verificar CORS

El backend ya tiene CORS configurado con `origin: '*'`, pero si hay problemas, verifica los logs.

## Solución Alternativa: Si el backend no funciona en Amplify

Si después de todo esto el backend sigue sin funcionar, puedes:

1. **Usar Lambda Functions** en lugar de Express backend
2. **Usar API Gateway** directamente
3. **Desplegar el backend en otro servicio** (ECS, EC2, etc.)

## Debug en el Navegador

Abre la consola del navegador (F12) y revisa:
- Errores en la pestaña Console
- Peticiones en la pestaña Network
- Verifica que la petición a `/api/evaluar` se esté haciendo correctamente

