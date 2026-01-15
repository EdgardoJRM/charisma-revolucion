# Configuración de Rewrites en Amplify

## ✅ SOLUCIÓN RECOMENDADA: Single Page App (SPA)

Esta configuración sirve archivos estáticos (CSS, JS, etc.) desde el CDN y solo redirige rutas no-estáticas a index.html.

### En Amplify Console:

1. Ve a tu app en Amplify
2. Click en "Rewrites and redirects" en el menú lateral
3. Elimina todas las reglas existentes
4. Agrega esta regla:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

**¿Qué hace esto?**
- ✅ Los archivos `.css`, `.js`, `.png`, etc. se sirven directamente desde el CDN
- ✅ Las rutas como `/`, `/about`, etc. se redirigen a `/index.html` (SPA)
- ✅ Las rutas `/api/*` pasan al backend Express automáticamente

**Nota:** El backend ya está configurado para solo manejar rutas `/api/*`, así que esto funcionará perfectamente.

