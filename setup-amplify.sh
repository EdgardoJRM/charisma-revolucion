#!/bin/bash

# Script para configurar Amplify con Lambda Functions
# Ejecuta: bash setup-amplify.sh

echo "🚀 Configurando Amplify con Lambda Functions..."
echo ""
echo "Este script te guiará a través de la configuración."
echo "Necesitarás responder algunas preguntas interactivas."
echo ""
read -p "Presiona Enter para continuar..."

# Verificar si Amplify CLI está instalado
if ! command -v amplify &> /dev/null; then
    echo "❌ Amplify CLI no está instalado."
    echo "Instálalo con: npm install -g @aws-amplify/cli"
    exit 1
fi

echo ""
echo "📋 Paso 1: Inicializar Amplify"
echo "Cuando te pregunte, usa estos valores sugeridos:"
echo "  - Project name: CharismaRevolucion"
echo "  - Environment: main"
echo "  - Source directory: public"
echo "  - Distribution directory: public"
echo ""
read -p "Presiona Enter para ejecutar 'amplify init'..."

amplify init

echo ""
echo "✅ Amplify inicializado"
echo ""
echo "📋 Paso 2: Agregar función evaluarCharisma"
echo "Cuando te pregunte:"
echo "  - Function name: evaluarCharisma"
echo "  - Runtime: Node.js"
echo "  - Template: Hello World (lo modificaremos después)"
echo ""
read -p "Presiona Enter para ejecutar 'amplify add function'..."

amplify add function

echo ""
echo "📋 Paso 3: Agregar API Gateway para evaluarCharisma"
echo "Cuando te pregunte:"
echo "  - Service: REST API"
echo "  - Path: /api/evaluar"
echo "  - Method: POST"
echo "  - Function: evaluarCharisma"
echo ""
read -p "Presiona Enter para ejecutar 'amplify add api'..."

amplify add api

echo ""
echo "📋 Paso 4: Agregar función obtenerClientes"
read -p "Presiona Enter para ejecutar 'amplify add function'..."

amplify add function

echo ""
echo "📋 Paso 5: Agregar API Gateway para obtenerClientes"
read -p "Presiona Enter para ejecutar 'amplify add api'..."

amplify add api

echo ""
echo "📋 Paso 6: Agregar función obtenerEstadisticas"
read -p "Presiona Enter para ejecutar 'amplify add function'..."

amplify add function

echo ""
echo "📋 Paso 7: Agregar API Gateway para obtenerEstadisticas"
read -p "Presiona Enter para ejecutar 'amplify add api'..."

amplify add api

echo ""
echo "📋 Paso 8: Desplegar todo"
echo "Esto puede tardar varios minutos..."
read -p "Presiona Enter para ejecutar 'amplify push'..."

amplify push

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "Las funciones Lambda están desplegadas y las rutas API están configuradas."
echo "Puedes verificar en Amplify Console que todo esté funcionando."

