# 🌐 Agregar CNAME en Route 53 para charisma.edgardohernandez.net

## Paso 1: Crear el registro CNAME en Route 53

1. En Route 53, en la zona `edgardohernandez.net`
2. Click en **Create record**
3. Configura:
   - **Record name:** `charisma`
   - **Record type:** `CNAME - Routes traffic to another domain name and some AWS resources`
   - **Value:** `main.d2smcxyks342wr.amplifyapp.com`
   - **TTL:** `300` (5 minutos) o deja el default
4. Click en **Create records**

## Paso 2: Verificar en Amplify

1. Ve a Amplify Console → **Domain management**
2. Click en **Add domain**
3. Ingresa: `edgardohernandez.net`
4. Cuando te pida nameservers, marca: **"I have added the above name servers"** (ya los tienes en Route 53)
5. En **Subdomains**, agrega: `charisma`
6. Selecciona **Amplify managed certificate**
7. Click en **Save**

## Paso 3: Esperar verificación

- Route 53 propagará el CNAME inmediatamente (o en minutos)
- Amplify verificará el dominio (15-30 minutos)
- SSL se generará automáticamente (hasta 1 hora)

## ✅ Resultado

Una vez configurado:
- `https://charisma.edgardohernandez.net` → Tu app de Amplify
- El dominio principal sigue funcionando con ClickFunnels si está configurado allí

