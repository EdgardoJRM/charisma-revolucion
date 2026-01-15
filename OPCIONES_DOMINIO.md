# 🌐 Opciones para Configurar el Subdominio

## Situación Actual
- Dominio registrado en: **Namecheap**
- Zona hospedada en: **Route 53** (creada por Amplify)
- Dominio principal: Con ClickFunnels
- Subdominio deseado: `charisma.edgardohernandez.net` → Amplify

## Opción 1: Mantener Route 53 (Recomendado si ClickFunnels lo usa)

**Ventajas:**
- Ya está configurado
- El CNAME ya existe
- No afecta ClickFunnels si ya lo usa

**Desventajas:**
- Tienes que pagar por la zona hospedada (~$0.50/mes)

## Opción 2: Borrar Route 53 y usar solo Namecheap

**Pasos:**
1. **Agregar CNAME en Namecheap directamente:**
   - Ve a Namecheap → Domain List → `edgardohernandez.net` → Manage
   - Advanced DNS → Add New Record
   - Type: `CNAME`
   - Host: `charisma`
   - Value: `main.d2smcxyks342wr.amplifyapp.com`
   - TTL: Automatic
   - Save

2. **Borrar Route 53 (opcional):**
   - Ve a Route 53 → Hosted zones
   - Selecciona `edgardohernandez.net`
   - Delete hosted zone
   - Confirma

3. **En Amplify:**
   - Elimina el dominio actual
   - Vuelve a agregarlo
   - Esta vez NO marques "I have added nameservers"
   - Solo agrega el subdominio `charisma`
   - Amplify detectará el CNAME en Namecheap

**Ventajas:**
- Más simple (todo en Namecheap)
- No pagas por Route 53
- ClickFunnels no se afecta

**Desventajas:**
- Tienes que configurar manualmente en Namecheap
- Puede tardar un poco más en propagarse

## ⚠️ IMPORTANTE: Verificar ClickFunnels

**ANTES de borrar Route 53, verifica:**
- ¿ClickFunnels está usando los nameservers de Route 53?
- Si SÍ → NO borres Route 53 (afectaría ClickFunnels)
- Si NO → Puedes borrar Route 53 sin problemas

## Recomendación

**Si ClickFunnels NO usa Route 53:**
1. Agrega el CNAME en Namecheap
2. Espera 15 minutos
3. Borra Route 53 (opcional)
4. Elimina y recrea en Amplify

**Si ClickFunnels SÍ usa Route 53:**
- Mantén Route 53
- Solo elimina y recrea la configuración en Amplify

