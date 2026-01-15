# ✅ Solución Simple: Solo el Subdominio

## Situación
- **Namecheap:** Registrador del dominio
- **ClickFunnels:** `edgardohernandez.net` y `www.edgardohernandez.net`
- **Amplify:** Solo necesitas `charisma.edgardohernandez.net`

## Solución: Agregar CNAME en Namecheap

### Paso 1: Agregar CNAME en Namecheap
1. Ve a **Namecheap** → Domain List → `edgardohernandez.net` → **Manage**
2. Ve a **Advanced DNS**
3. Click en **Add New Record**
4. Configura:
   - **Type:** `CNAME Record`
   - **Host:** `charisma`
   - **Value:** `main.d2smcxyks342wr.amplifyapp.com`
   - **TTL:** `Automatic`
5. Click en **Save** (✓)

### Paso 2: En Amplify Console
1. **Elimina** el dominio actual `edgardohernandez.net` (si está atascado)
2. Click en **Add domain**
3. Ingresa: `edgardohernandez.net`
4. **NO marques** "I have added nameservers" (no los necesitas)
5. En **Subdomains**, agrega: `charisma`
6. Selecciona: **Amplify managed certificate**
7. Click en **Save**

### Paso 3: Esperar
- Amplify detectará el CNAME en Namecheap
- Verificación: 15-30 minutos
- SSL: hasta 1 hora

## ✅ Resultado
- `https://charisma.edgardohernandez.net` → Tu app de Amplify
- `https://edgardohernandez.net` → ClickFunnels (sin cambios)
- `https://www.edgardohernandez.net` → ClickFunnels (sin cambios)

## ⚠️ Sobre Route 53
- Puedes **ignorarlo completamente**
- No necesitas borrarlo (no afecta nada)
- O puedes borrarlo si quieres (no se usa para nada)

