# 🔧 Configuración de Rewrites en Amplify

## Problema
El dashboard.html está siendo redirigido a index.html debido a las reglas de rewrite de Amplify.

## Solución

En **Amplify Console** → **Rewrites and redirects**, configura:

```json
[
  {
    "source": "/dashboard.html",
    "target": "/dashboard.html",
    "status": "200"
  },
  {
    "source": "/confirmacion.html",
    "target": "/confirmacion.html",
    "status": "200"
  },
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json|html)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

**Importante:** Las rutas específicas (`dashboard.html`, `confirmacion.html`) deben ir **ANTES** de la regla general que redirige a `index.html`.

## Alternativa: Usar rutas sin extensión

Si prefieres, puedes configurar:
- `/dashboard` → `dashboard.html`
- `/confirmacion` → `confirmacion.html`

Pero la solución más simple es asegurar que los archivos `.html` específicos no sean redirigidos.

