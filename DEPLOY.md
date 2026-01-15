# 🚀 Guía de Despliegue - Charisma Revolución

## 📦 Push a GitHub

### Opción 1: Usando GitHub CLI (si está instalado)
```bash
gh repo create charisma-revolucion --public --source=. --remote=origin --push
```

### Opción 2: Manual
1. Ve a [GitHub](https://github.com/new) y crea un nuevo repositorio
2. Nombre sugerido: `charisma-revolucion`
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Ejecuta estos comandos:

```bash
git remote add origin https://github.com/TU_USUARIO/charisma-revolucion.git
git branch -M main
git push -u origin main
```

## ☁️ Despliegue en AWS Amplify

### Paso 1: Conectar repositorio
1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click en "New app" → "Host web app"
3. Selecciona "GitHub" y autoriza la conexión
4. Selecciona tu repositorio `charisma-revolucion`
5. Selecciona la rama `main`

### Paso 2: Configurar Build Settings
Amplify debería detectar automáticamente el `amplify.yml`, pero verifica:

**Build settings:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - echo "Frontend files are already in public/"
  artifacts:
    baseDirectory: public
    files:
      - '**/*'
backend:
  phases:
    build:
      commands:
        - npm install
  artifacts:
    baseDirectory: .
    files:
      - '**/*'
appRoot: .
```

### Paso 3: Configurar Variables de Entorno
En la configuración de Amplify, agrega estas variables de entorno:

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_SECRET_ACCESS_KEY=tu-secret-access-key
AWS_SES_FROM_EMAIL=no-reply@hernandezmediaevents.com
PORT=8080
```

**⚠️ IMPORTANTE:** 
- Amplify usa el puerto 8080 por defecto para el backend
- Las credenciales de AWS deben tener permisos para SES
- El email debe estar verificado en SES

### Paso 4: Configurar Rewrites (Importante para Express)
En la configuración de la app, agrega estas reglas de rewrite:

**Rewrites:**
```
/api/* -> http://localhost:8080/api/*
/* -> /index.html
```

Esto permite que las rutas de la API funcionen correctamente.

### Paso 5: Desplegar
1. Click en "Save and deploy"
2. Espera a que termine el build (5-10 minutos)
3. Tu app estará disponible en: `https://main.xxxxx.amplifyapp.com`

## 🔧 Configuración Adicional

### Backend API en Amplify
Amplify puede manejar el backend Express automáticamente. Si necesitas configuración adicional:

1. Ve a "Backend environments" en Amplify
2. Configura las variables de entorno del backend
3. Asegúrate de que el puerto sea 8080

### Dominio Personalizado (Opcional)
1. Ve a "Domain management" en Amplify
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

## ✅ Verificación Post-Despliegue

1. Verifica que el frontend carga correctamente
2. Prueba completar el examen
3. Verifica que el email se envía correctamente
4. Revisa los logs en CloudWatch si hay errores

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Amplify

### Error: "Email not sent"
- Verifica las credenciales de AWS en las variables de entorno
- Asegúrate de que el email esté verificado en SES
- Revisa los logs del backend en CloudWatch

### Error: "Port already in use"
- Amplify usa el puerto 8080 automáticamente
- No necesitas especificar PORT en el código, solo en variables de entorno

## 📝 Notas

- Amplify maneja automáticamente HTTPS
- Los logs están disponibles en CloudWatch
- Puedes configurar notificaciones de build en la configuración
- Para actualizar, solo haz push a la rama `main`

