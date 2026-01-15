#!/bin/bash
echo "🚀 Configurando Amplify..."
cd "/Users/gardo/Charisma Revolucion"

# Verificar si Amplify está inicializado
if [ ! -f "amplify/.config/project-config.json" ]; then
    echo "❌ Amplify no está inicializado. Ejecuta: amplify init"
    exit 1
fi

echo "✅ Archivos de configuración listos"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ejecuta: amplify push"
echo "2. Esto desplegará todas las funciones Lambda"
echo ""
echo "¿Quieres ejecutar 'amplify push' ahora? (s/n)"
read -r respuesta

if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
    echo "🚀 Desplegando..."
    amplify push
else
    echo "✅ Listo. Ejecuta 'amplify push' cuando estés listo."
fi
