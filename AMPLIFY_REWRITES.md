# Configuración de Rewrites en Amplify

Para que los archivos estáticos se sirvan desde el CDN y solo las rutas de API vayan al backend, configura estos rewrites en Amplify Console:

## En Amplify Console:

1. Ve a tu app en Amplify
2. Click en "Rewrites and redirects" en el menú lateral
3. Elimina todas las reglas existentes
4. Agrega estas reglas en este orden:

### Regla 1: API routes al backend
```json
{
  "source": "/api/<*>",
  "target": "/api/<*>",
  "status": "200",
  "type": "REWRITE"
}
```

### Regla 2: SPA fallback
```json
{
  "source": "/<*>",
  "target": "/index.html",
  "status": "200",
  "type": "REWRITE"
}
```

**⚠️ IMPORTANTE:** El orden importa. La regla de `/api/*` debe ir ANTES de la regla general.

## Alternativa: Si Amplify no permite múltiples rewrites

Si Amplify solo permite una regla, usa esta:

```json
{
  "source": "/<*>",
  "target": "/index.html",
  "status": "200",
  "type": "REWRITE"
}
```

Y asegúrate de que el backend solo maneje rutas `/api/*` (ya está configurado así).

