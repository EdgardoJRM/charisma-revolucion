# Amplify Backend Configuration

Este directorio contiene la configuración del backend de Amplify con funciones Lambda.

## Estructura

```
amplify/backend/
├── function/
│   ├── evaluarCharisma/      # Procesa evaluaciones y envía emails
│   ├── obtenerClientes/      # Obtiene todos los clientes
│   └── obtenerEstadisticas/  # Calcula estadísticas
└── api/
    └── charismaApi/          # Configuración de API Gateway
```

## Configuración en Amplify Console

### Opción 1: Usar Amplify CLI (Recomendado)

Si tienes acceso al CLI interactivo:

```bash
amplify init
amplify add function
# Selecciona cada función y configura las rutas
amplify push
```

### Opción 2: Configuración Manual en Console

1. Ve a **Amplify Console** → Tu App → **Backend environments**
2. Agrega cada función Lambda manualmente:
   - `evaluarCharisma` → Ruta: `/api/evaluar` (POST, OPTIONS)
   - `obtenerClientes` → Ruta: `/api/clientes` (GET, OPTIONS)
   - `obtenerEstadisticas` → Ruta: `/api/estadisticas` (GET, OPTIONS)

3. Configura las variables de entorno:
   - `DYNAMODB_TABLE=charisma-revolucion-clientes`
   - `AWS_SES_FROM_EMAIL=no-reply@hernandezmediaevents.com`
   - `AWS_REGION=us-east-1`

4. Asegúrate de que las funciones tengan permisos para:
   - DynamoDB: `PutItem`, `Scan`, `GetItem`
   - SES: `SendEmail`, `SendRawEmail`

## Notas

- Las funciones están listas en `amplify/backend/function/*/src/`
- Cada función tiene su `package.json` con las dependencias necesarias
- El `amplify.yml` está configurado para construir las funciones automáticamente

