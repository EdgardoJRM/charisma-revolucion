# 🔗 Conectar con Proyecto Amplify Existente

## Paso 1: Obtener el App ID

Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify) y:
1. Selecciona tu app `charisma-revolucion`
2. Ve a **App settings** → **General**
3. Copia el **App ID** (algo como `d1234567890abc`)

## Paso 2: Conectar con Amplify CLI

```bash
cd "/Users/gardo/Charisma Revolucion"
amplify pull --appId TU_APP_ID --envName main
```

Esto descargará la configuración de tu proyecto existente.

## Paso 3: Agregar las Funciones Lambda

Una vez conectado, puedes agregar las funciones:

```bash
# Las funciones ya están creadas en amplify/backend/function/
# Solo necesitas sincronizarlas:

amplify push
```

## Alternativa: Agregar en Console

Si prefieres, puedes agregar las funciones directamente en Amplify Console:
1. Ve a **Backend environments** → **Functions**
2. Click en **Add function**
3. Usa el código de `amplify/backend/function/*/src/`

