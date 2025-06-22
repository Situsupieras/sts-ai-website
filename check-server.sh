#!/bin/bash

# Script de diagnóstico para verificar el estado del servidor
# Ejecutar desde la máquina local

set -e

echo "🔍 Diagnóstico del servidor stselpoderdelaia.online"
echo "================================================"

# Variables
DOMAIN="stselpoderdelaia.online"
SERVER_IP="stselpoderdelaia.online"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_debug() {
    echo -e "${BLUE}[DEBUG]${NC} $1"
}

# 1. Verificar conectividad básica
echo "1. 🔌 Verificando conectividad básica..."
if ping -c 1 $SERVER_IP > /dev/null 2>&1; then
    log_info "✅ Servidor responde al ping"
else
    log_error "❌ Servidor no responde al ping"
    exit 1
fi

# 2. Verificar conectividad SSH
echo "2. 🔑 Verificando conectividad SSH..."
if ssh -o ConnectTimeout=10 -o BatchMode=yes root@$SERVER_IP "echo 'SSH OK'" 2>/dev/null; then
    log_info "✅ Conexión SSH exitosa"
else
    log_error "❌ No se puede conectar via SSH"
    log_error "Verifica las claves SSH y la configuración"
    exit 1
fi

# 3. Verificar servicios en el servidor
echo "3. 🖥️  Verificando servicios en el servidor..."
ssh root@$SERVER_IP << 'ENDSSH'
echo "=== Estado del sistema ==="
uptime
echo ""
echo "=== Memoria disponible ==="
free -h
echo ""
echo "=== Espacio en disco ==="
df -h
echo ""
echo "=== Estado de Docker ==="
if command -v docker &> /dev/null; then
    docker --version
    docker ps -a
else
    echo "❌ Docker no está instalado"
fi
echo ""
echo "=== Estado de Nginx ==="
if command -v nginx &> /dev/null; then
    systemctl status nginx --no-pager
else
    echo "❌ Nginx no está instalado"
fi
echo ""
echo "=== Puertos abiertos ==="
netstat -tlnp | grep -E ':(80|443|3000|22)'
echo ""
echo "=== Logs de Docker ==="
if command -v docker-compose &> /dev/null; then
    cd /var/www/stselpoderdelaia.online 2>/dev/null && docker-compose logs --tail=20 || echo "No se encontró docker-compose.yml"
else
    echo "❌ Docker Compose no está instalado"
fi
ENDSSH

# 4. Verificar conectividad web
echo "4. 🌐 Verificando conectividad web..."
if curl -s -f "http://$DOMAIN" > /dev/null; then
    log_info "✅ Sitio web accesible via HTTP"
else
    log_warn "⚠️  Sitio web no accesible via HTTP"
fi

if curl -s -f "https://$DOMAIN" > /dev/null; then
    log_info "✅ Sitio web accesible via HTTPS"
else
    log_warn "⚠️  Sitio web no accesible via HTTPS"
fi

# 5. Verificar DNS
echo "5. 📡 Verificando resolución DNS..."
nslookup $DOMAIN

# 6. Verificar certificado SSL
echo "6. 🔒 Verificando certificado SSL..."
if command -v openssl &> /dev/null; then
    echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates
else
    log_warn "⚠️  OpenSSL no está disponible para verificar certificado"
fi

echo ""
echo "🎯 Resumen del diagnóstico:"
echo "=========================="
echo "Si ves errores arriba, aquí están las soluciones comunes:"
echo ""
echo "❌ Si SSH falla:"
echo "   - Verifica que las claves SSH estén configuradas"
echo "   - Verifica que el servidor esté encendido"
echo "   - Verifica la IP/dominio del servidor"
echo ""
echo "❌ Si Docker no está instalado:"
echo "   - Ejecuta: ./deploy-remote.sh"
echo ""
echo "❌ Si Nginx no está funcionando:"
echo "   - Ejecuta: ssh root@$SERVER_IP 'systemctl restart nginx'"
echo ""
echo "❌ Si los contenedores no están corriendo:"
echo "   - Ejecuta: ssh root@$SERVER_IP 'cd /var/www/$DOMAIN && docker-compose up -d'"
echo ""
echo "❌ Si el sitio no es accesible:"
echo "   - Verifica la configuración de DNS"
echo "   - Verifica que el firewall permita puertos 80 y 443"
echo "   - Verifica los logs: ssh root@$SERVER_IP 'docker-compose logs -f'" 