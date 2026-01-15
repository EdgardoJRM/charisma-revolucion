# 🌐 Configurar Solo el Subdominio (Sin cambiar nameservers)

## Situación
Tu dominio `edgardohernandez.net` ya está configurado con ClickFunnels, así que **NO cambies los nameservers**. Solo necesitas agregar el subdominio `charisma.edgardohernandez.net` para Amplify.

## Paso 1: Obtener la URL de Amplify

Tu app de Amplify tiene una URL como:
- `main.d2smcxyks342wr.amplifyapp.com`

Esta es la URL a la que apuntará tu subdominio.

## Paso 2: Agregar CNAME en Namecheap

1. Ve a [Namecheap](https://www.namecheap.com) → **Domain List**
2. Selecciona `edgardohernandez.net` → **Manage**
3. Ve a **Advanced DNS**
4. Click en **Add New Record**
5. Configura:
   - **Type:** `CNAME Record`
   - **Host:** `charisma`
   - **Value:** `main.d2smcxyks342wr.amplifyapp.com` (o la URL que Amplify te dé)
   - **TTL:** `Automatic` o `5 min`
6. Click en **Save** (✓)

## Paso 3: Configurar en Amplify

En Amplify Console, tienes dos opciones:

### Opción A: Si Amplify te permite agregar solo el subdominio
1. En **Domain management**, busca la opción para agregar subdominio sin cambiar nameservers
2. Ingresa: `charisma.edgardohernandez.net`
3. Amplify verificará el CNAME

### Opción B: Si Amplify requiere el dominio completo
1. En **Domain management** → **Add domain**
2. Ingresa: `edgardohernandez.net`
3. Cuando te pida nameservers, **NO los cambies en Namecheap**
4. En su lugar, agrega el CNAME como se indica arriba
5. Marca la opción de que ya configuraste DNS manualmente
6. Amplify verificará el CNAME del subdominio

## Paso 4: Verificar

1. Espera 15-30 minutos para que el CNAME se propague
2. Amplify verificará automáticamente el subdominio
3. Una vez verificado, Amplify generará el certificado SSL automáticamente

## ✅ Resultado

Una vez configurado:
- `https://charisma.edgardohernandez.net` → Tu app de Amplify
- `https://edgardohernandez.net` → Sigue funcionando con ClickFunnels (sin cambios)

## 🔧 Notas Importantes

- **NO cambies los nameservers** - ClickFunnels seguirá funcionando
- Solo el subdominio `charisma` apuntará a Amplify
- El dominio principal `edgardohernandez.net` seguirá con ClickFunnels
- Puedes tener ambos funcionando simultáneamente

