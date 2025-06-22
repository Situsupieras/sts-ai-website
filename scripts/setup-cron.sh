#!/bin/bash

# Script de configuración de Cron para Monitoreo Diario
# Si Tu Supieras El Poder de la IA
# VPS: 1 core, 1GB RAM

set -e

echo "🚀 Configurando monitoreo diario automático..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Debes ejecutar este script desde el directorio raíz del proyecto"
    exit 1
fi

# Crear directorio de datos si no existe
mkdir -p data

# Hacer el script de monitoreo ejecutable
chmod +x scripts/daily-monitoring.js

# Crear el cron job (ejecutar a las 6:00 AM todos los días)
CRON_JOB="0 6 * * * cd $(pwd) && node scripts/daily-monitoring.js >> data/cron.log 2>&1"

# Verificar si el cron job ya existe
if crontab -l 2>/dev/null | grep -q "daily-monitoring.js"; then
    echo "⚠️ El cron job ya existe. Actualizando..."
    # Remover el cron job existente
    crontab -l 2>/dev/null | grep -v "daily-monitoring.js" | crontab -
fi

# Agregar el nuevo cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job configurado exitosamente"
echo "📅 El monitoreo se ejecutará diariamente a las 6:00 AM"
echo "📁 Los logs se guardarán en: data/cron.log"
echo "📊 Los datos se guardarán en: data/daily-metrics.json"

# Mostrar el cron job actual
echo ""
echo "📋 Cron jobs actuales:"
crontab -l

# Crear script de prueba manual
cat > scripts/test-monitoring.sh << 'EOF'
#!/bin/bash
echo "🧪 Ejecutando prueba de monitoreo..."
cd "$(dirname "$0")/.."
node scripts/daily-monitoring.js
echo "✅ Prueba completada"
EOF

chmod +x scripts/test-monitoring.sh

echo ""
echo "🧪 Para probar el monitoreo manualmente, ejecuta:"
echo "   ./scripts/test-monitoring.sh"
echo ""
echo "📊 Para ver los logs:"
echo "   tail -f data/cron.log"
echo ""
echo "🎯 Configuración completada exitosamente!" 