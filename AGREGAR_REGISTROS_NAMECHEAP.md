# ✅ Agregar Registros en Namecheap

Amplify necesita 2 registros CNAME. Agrégalos en Namecheap:

## Registro 1: Verificación del Dominio

1. Ve a **Namecheap** → Domain List → `edgardohernandez.net` → **Manage**
2. **Advanced DNS** → **Add New Record**
3. Configura:
   - **Type:** `CNAME Record`
   - **Host:** `_df85cfbf909ecb49eddaa92cfb7fcd23`
   - **Value:** `_836f4a8b818928a04e03abed4f8cdf58.jkddzztszm.acm-validations.aws.`
   - **TTL:** `Automatic`
4. **Save**

## Registro 2: Subdominio charisma

1. En la misma página, **Add New Record** nuevamente
2. Configura:
   - **Type:** `CNAME Record`
   - **Host:** `charisma`
   - **Value:** `d33rkdgg2vrlno.cloudfront.net`
   - **TTL:** `Automatic`
3. **Save**

## Después de Agregar

1. Vuelve a **Amplify Console**
2. Click en **"I've added the records"** o **"Verify"**
3. Amplify verificará automáticamente (1-5 minutos)
4. Una vez verificado, el SSL se generará automáticamente (hasta 1 hora)

## ✅ Resultado

Una vez verificado:
- `https://charisma.edgardohernandez.net` → Tu app de Amplify funcionando

