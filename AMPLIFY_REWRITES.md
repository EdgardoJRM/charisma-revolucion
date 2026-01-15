# Configuración de Rewrites en Amplify

## ✅ SOLUCIÓN: Excluir rutas /api/* del rewrite

El problema es que la regla de SPA está capturando también las rutas `/api/*`. Necesitamos excluirlas.

### En Amplify Console:

1. Ve a tu app en Amplify
2. Click en "Rewrites and redirects" en el menú lateral
3. Elimina todas las reglas existentes
4. Agrega estas reglas en este orden:

**Regla 1: Excluir /api/* del rewrite (IMPORTANTE - debe ir primero)**
```json
[
  {
    "source": "/api/<*>",
    "target": "/api/<*>",
    "status": "200",
    "type": "REWRITE"
  },
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

**Si Amplify solo permite una regla, usa esta (excluye /api/*):**
```json
[
  {
    "source": "</^(?!api/)[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

**¿Qué hace esto?**
- ✅ Las rutas `/api/*` NO son capturadas por el rewrite y pasan al backend
- ✅ Los archivos `.css`, `.js`, `.png`, etc. se sirven directamente desde el CDN
- ✅ Las rutas como `/`, `/about`, etc. se redirigen a `/index.html` (SPA)

**Nota:** El orden importa. La regla de `/api/*` debe ir ANTES de la regla general.

