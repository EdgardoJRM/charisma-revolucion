# 🔧 SOLUCIÓN URGENTE: Error de API en Amplify

## Problema Actual
La petición a `/api/evaluar` está devolviendo HTML en lugar de JSON porque Amplify está interceptando la ruta.

## ✅ SOLUCIÓN PASO A PASO

### Opción 1: Configurar Rewrites Correctamente (RECOMENDADO)

1. Ve a **AWS Amplify Console** → Tu app
2. Click en **"Rewrites and redirects"** en el menú lateral izquierdo
3. **ELIMINA TODAS las reglas existentes**
4. Agrega **SOLO ESTA regla** (copia exactamente):

```json
[
  {
    "source": "</^(?!api/)[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
    "status": "200",
    "target": "/index.html"
  }
]
```

Esta regla:
- ✅ Excluye rutas que empiezan con `api/` (usando `^(?!api/)`)
- ✅ Sirve archivos estáticos (.css, .js, etc.)
- ✅ Redirige todo lo demás a index.html

5. Click en **"Save"**
6. Espera a que Amplify termine el deploy

### Opción 2: Si la Opción 1 no funciona

Si Amplify no acepta esa regex, usa estas **DOS reglas** en este orden:

**Regla 1 (PRIMERO):**
```json
{
  "source": "/api/<*>",
  "target": "/api/<*>",
  "status": "200",
  "type": "REWRITE"
}
```

**Regla 2 (SEGUNDO):**
```json
{
  "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
  "status": "200",
  "target": "/index.html"
}
```

## 🔍 Verificar que Funciona

Después de aplicar las reglas:

1. Prueba el health check: `https://tu-dominio.amplifyapp.com/api/health`
   - Debe devolver JSON: `{"status":"ok",...}`
   - Si devuelve HTML, las reglas no están funcionando

2. Si el health check funciona, prueba el formulario completo

## ⚠️ Si Nada Funciona

Si después de todo esto sigue sin funcionar, podemos:
- Usar Lambda Functions en lugar de Express backend
- Usar API Gateway directamente
- Cambiar la arquitectura

Pero primero intenta las opciones de arriba.

