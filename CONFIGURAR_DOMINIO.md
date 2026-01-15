# 🌐 Configurar Dominio Personalizado en Amplify

## Objetivo
Configurar `charisma.edgardohernandez.net` para tu app de Amplify.

## Paso 1: Configurar en Amplify Console

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Selecciona tu app `charisma-revolucion`
3. En el menú lateral, ve a **Domain management**
4. Click en **Add domain**
5. Ingresa: `edgardohernandez.net`
6. Amplify verificará que eres el propietario del dominio

## Paso 2: Agregar Subdominio

1. Una vez agregado el dominio principal, click en **Configure domain**
2. En **Subdomains**, agrega: `charisma`
3. Amplify generará los registros DNS necesarios

## Paso 3: Configurar DNS en Namecheap

Amplify te dará registros DNS como estos (ejemplo):

### Opción A: CNAME (Recomendado para subdominio)

**Tipo:** `CNAME Record`
**Host:** `charisma`
**Value:** `[algo].amplifyapp.com` (Amplify te dará este valor exacto)
**TTL:** `Automatic` o `5 min`

### Opción B: A Record (Si Amplify lo requiere)

**Tipo:** `A Record`
**Host:** `charisma`
**Value:** `[IP address]` (Amplify te dará la IP)
**TTL:** `Automatic` o `5 min`

## Paso 4: Agregar en Namecheap

1. Ve a [Namecheap](https://www.namecheap.com)
2. Inicia sesión
3. Ve a **Domain List** → Selecciona `edgardohernandez.net`
4. Click en **Manage**
5. Ve a la sección **Advanced DNS**
6. Click en **Add New Record**
7. Agrega el registro que Amplify te proporcionó:
   - **Type:** CNAME (o A según lo que Amplify indique)
   - **Host:** `charisma`
   - **Value:** El valor que Amplify te dio
   - **TTL:** Automatic
8. Guarda los cambios

## Paso 5: Verificar en Amplify

1. Vuelve a Amplify Console
2. En **Domain management**, verás el estado del dominio
3. Puede tardar **15-30 minutos** en propagarse
4. Una vez verificado, verás un check verde ✅

## Paso 6: SSL Certificate

Amplify automáticamente:
- ✅ Solicita un certificado SSL gratuito (Let's Encrypt)
- ✅ Configura HTTPS automáticamente
- ✅ Renueva el certificado automáticamente

Esto puede tardar **hasta 1 hora** en completarse.

## ✅ Verificación Final

Una vez configurado, podrás acceder a:
- `https://charisma.edgardohernandez.net` → Tu app principal
- `https://charisma.edgardohernandez.net/dashboard.html` → Dashboard protegido

## 🔧 Troubleshooting

### El dominio no se verifica
- Espera 15-30 minutos (propagación DNS)
- Verifica que el registro DNS esté correcto en Namecheap
- Usa [DNS Checker](https://dnschecker.org) para verificar propagación

### Error de SSL
- Espera hasta 1 hora para que se genere el certificado
- Verifica que el dominio esté correctamente configurado

### El subdominio no funciona
- Asegúrate de que el registro CNAME apunte al dominio correcto de Amplify
- Verifica que no haya conflictos con otros registros DNS

---

**Nota:** Una vez configurado, Amplify manejará automáticamente HTTPS y renovación de certificados.

