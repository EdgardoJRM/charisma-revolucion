# ✅ Pasos Después de Agregar Registros en Namecheap

## Paso 1: Verificar en Amplify Console

1. Ve a **Amplify Console** → **Domain management**
2. Busca `edgardohernandez.net`
3. Deberías ver el estado de verificación

## Paso 2: Esperar Verificación Automática

Amplify verificará automáticamente los registros:
- **Tiempo:** 1-5 minutos normalmente
- **Máximo:** 15-30 minutos

## Paso 3: Estados Posibles

### ✅ "Available" o "Active"
- ¡Listo! El dominio está funcionando
- SSL se generará automáticamente (hasta 1 hora)

### ⏳ "Pending verification" o "Verifying"
- Espera unos minutos más
- Amplify está verificando los registros

### ❌ "Failed" o "Verification failed"
- Verifica que los registros estén correctos en Namecheap
- Espera 5-10 minutos y vuelve a verificar

## Paso 4: Verificar Funcionamiento

Una vez que el estado sea "Available", prueba:
```
https://charisma.edgardohernandez.net
```

Debería cargar tu app de Amplify.

## ⏱️ Tiempos Totales

- **Verificación DNS:** 1-5 minutos (puede tardar hasta 30 min)
- **SSL Certificate:** Hasta 1 hora después de la verificación
- **Total:** Normalmente 15-30 minutos, máximo 2 horas

## 🔍 Si No Verifica

Si después de 30 minutos sigue en "Pending":
1. Verifica que los registros estén correctos en Namecheap
2. Espera 10 minutos más (propagación DNS)
3. Refresca la página de Amplify
4. Si sigue igual, elimina y recrea el dominio en Amplify

