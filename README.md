# ✨ Charisma Revolución - Examen de Carisma

Sistema web completo para evaluar el carisma personal y generar fórmulas personalizadas que se envían automáticamente por email.

## 🚀 Características

- **Landing Page** moderna y responsive
- **36 preguntas** divididas en 3 niveles de evaluación
- **Cálculo automático** de resultados basado en respuestas dominantes
- **Envío automático de emails** con fórmula personalizada
- **Interfaz intuitiva** con diseño moderno

## 📋 Estructura del Examen

### Nivel 1: Carisma Energético (12 preguntas)
Opciones: A-F (Impress, Excite, Awe, Roar, Act, Charm)

### Nivel 2: Carisma de Compasión (12 preguntas)
Opciones: A-C (Steady, Fix, Mirror)

### Nivel 3: Carisma de Autoridad (12 preguntas)
Opciones: A-C (Light, Lead, Lift)

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp env.example .env
```

Edita el archivo `.env` con tus credenciales de AWS SES:
```
PORT=3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_SECRET_ACCESS_KEY=tu-secret-access-key
AWS_SES_FROM_EMAIL=noreply@tudominio.com
```

### 📧 Configuración de AWS SES

Para usar AWS SES, necesitas:

1. **Crear credenciales de AWS:**
   - Ve a la consola de AWS IAM
   - Crea un usuario con permisos para SES
   - Genera Access Key ID y Secret Access Key

2. **Verificar dominio/email en SES:**
   - Ve a la consola de AWS SES
   - Verifica el dominio o email que usarás como remitente
   - El email en `AWS_SES_FROM_EMAIL` debe estar verificado

3. **Notas importantes:**
   - Si estás en el sandbox de SES, solo puedes enviar a emails verificados
   - Para producción, solicita salir del sandbox en la consola de AWS
   - Asegúrate de que tu región de SES coincida con `AWS_REGION`

## 🚀 Uso

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
Charisma Revolucion/
├── server.js          # Servidor Express y lógica backend
├── package.json       # Dependencias del proyecto
├── .env.example       # Ejemplo de variables de entorno
├── .gitignore         # Archivos a ignorar en git
├── README.md          # Este archivo
└── public/
    ├── index.html     # Página principal
    ├── styles.css     # Estilos
    └── app.js         # Lógica del frontend
```

## 🧮 Lógica de Cálculo

El sistema calcula automáticamente:
1. **Resultado dominante** de cada nivel (la opción más seleccionada)
2. **Fórmula final** combinando los 3 resultados
3. **Email personalizado** con explicación de cada componente

## 📧 Formato del Email

El email incluye:
- Saludo personalizado
- Fórmula de carisma (ej: ENCANTAR + REFLEJAR + ELEVAR)
- Descripción de cada componente
- Mensaje inspirador de cierre

## 🔧 Personalización

### Modificar preguntas
Edita el array `preguntas` en `public/app.js`

### Modificar opciones
Edita los arrays `opcionesNivel1`, `opcionesNivel2`, `opcionesNivel3` en `public/app.js`

### Modificar descripciones
Edita el objeto `descripciones` en `server.js`

### Personalizar email
Modifica la función `generarEmailHTML()` en `server.js`

## 📝 Notas

- Los resultados **NO se muestran en pantalla**, solo por email
- El sistema valida que todas las preguntas estén respondidas
- Se valida formato de email antes de enviar
- El sistema es escalable para futuras automatizaciones

## 🐛 Solución de Problemas

**Error al enviar email:**
- Verifica las credenciales en `.env`
- Para Gmail, asegúrate de usar una contraseña de aplicación
- Revisa que el servicio de email esté correctamente configurado

**Puerto en uso:**
- Cambia el `PORT` en `.env` o detén el proceso que usa el puerto 3000

## 📄 Licencia

ISC

---

Desarrollado con ❤️ para Charisma Revolución

