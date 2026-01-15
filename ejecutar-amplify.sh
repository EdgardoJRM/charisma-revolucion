#!/bin/bash
set -e

echo "🚀 Iniciando configuración de Amplify Lambda Functions..."
cd "/Users/gardo/Charisma Revolucion"

# Verificar si amplify está instalado
if ! command -v amplify &> /dev/null; then
    echo "❌ Amplify CLI no está instalado"
    echo "Instálalo con: npm install -g @aws-amplify/cli"
    exit 1
fi

echo "✅ Amplify CLI encontrado"

# Verificar si ya está inicializado
if amplify status &> /dev/null; then
    echo "✅ Amplify ya está inicializado"
    echo "🚀 Desplegando funciones Lambda..."
    amplify push --yes
else
    echo "⚠️  Amplify no está inicializado"
    echo ""
    echo "Necesitas ejecutar manualmente:"
    echo "  1. amplify init"
    echo "  2. amplify push"
    echo ""
    echo "O sigue las instrucciones en INSTRUCCIONES_FINALES.md"
    exit 1
fi

echo ""
echo "✅ ¡Despliegue completado!"
