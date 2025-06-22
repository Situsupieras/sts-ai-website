#!/bin/bash

# Script de despliegue remoto para stselpoderdelaia.online
# Ejecutar desde la máquina local

set -e

echo "🚀 Iniciando despliegue remoto de Si Tu Supieras El Poder de la IA"
echo "================================================================"

# Variables
DOMAIN="stselpoderdelaia.online"
SERVER_IP="stselpoderdelaia.online"
REMOTE_DIR="/var/www/$DOMAIN"
LOCAL_PROJECT_DIR="."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# 1. Verificar conectividad SSH
log_info "Verificando conectividad SSH..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes root@$SERVER_IP "echo 'SSH connection successful'" 2>/dev/null; then
    log_error "No se puede conectar al servidor via SSH"
    log_error "Verifica:"
    log_error "1. Que el servidor esté encendido"
    log_error "2. Que la IP/dominio sea correcto"
    log_error "3. Que las claves SSH estén configuradas"
    exit 1
fi

# 2. Crear archivo de variables de entorno para producción
log_info "Creando archivo de variables de entorno para producción..."
cat > .env.production << EOF
# ===========================================
# CONFIGURACIÓN DE PRODUCCIÓN
# ===========================================

# URL base de la aplicación
NEXT_PUBLIC_APP_URL=https://$DOMAIN

# Entorno de producción
NODE_ENV=production

# Puerto del servidor
PORT=3000

# ===========================================
# CONFIGURACIÓN DE ANALYTICS
# ===========================================

# Google Analytics 4 (configurar con ID real)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel (configurar con ID real)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXX

# ===========================================
# CONFIGURACIÓN DE WEBHOOK
# ===========================================

# URL del webhook para el formulario de contacto
WEBHOOK_URL=https://situsupieras.org/n8n/webhook/nuevo-lead-sts-ai

# ===========================================
# CONFIGURACIÓN DE SEGURIDAD
# ===========================================

# CORS Origins
CORS_ORIGINS=https://$DOMAIN,https://www.$DOMAIN

# ===========================================
# CONFIGURACIÓN DE PRODUCCIÓN
# ===========================================

# Debug mode (desactivado en producción)
DEBUG=false

# Log level
LOG_LEVEL=info
EOF

# 3. Crear package para subir
log_info "Creando package para subir..."
tar -czf sts-ai-production.tar.gz \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=*.log \
    --exclude=*.zip \
    --exclude=*.tar.gz \
    --exclude=env.example \
    --exclude=env.local.example \
    .

# 4. Subir archivos al servidor
log_info "Subiendo archivos al servidor..."
scp sts-ai-production.tar.gz root@$SERVER_IP:/tmp/
scp docker-compose.yml root@$SERVER_IP:/tmp/
scp nginx-site.conf root@$SERVER_IP:/tmp/
scp .env.production root@$SERVER_IP:/tmp/

# 5. Ejecutar despliegue en el servidor
log_info "Ejecutando despliegue en el servidor..."
ssh root@$SERVER_IP << 'ENDSSH'
set -e

DOMAIN="stselpoderdelaia.online"
APP_DIR="/var/www/$DOMAIN"
LOG_DIR="/var/log/sts-ai-website"

echo "🚀 Iniciando despliegue en el servidor..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
apt update && apt upgrade -y

# Instalar Docker si no está instalado
if ! command -v docker &> /dev/null; then
    echo "🐳 Instalando Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
fi

# Instalar Docker Compose si no está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Instalando Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Instalar Nginx si no está instalado
if ! command -v nginx &> /dev/null; then
    echo "🌐 Instalando Nginx..."
    apt install -y nginx
fi

# Crear directorios
echo "📁 Creando directorios..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR

# Extraer archivos
echo "📦 Extrayendo archivos..."
cd $APP_DIR
tar -xzf /tmp/sts-ai-production.tar.gz
rm /tmp/sts-ai-production.tar.gz

# Copiar archivos de configuración
cp /tmp/docker-compose.yml .
cp /tmp/nginx-site.conf .
cp /tmp/.env.production .env

# Configurar Nginx
echo "🌐 Configurando Nginx..."
cp nginx-site.conf /etc/nginx/sites-available/$DOMAIN
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Verificar configuración de Nginx
nginx -t

# Detener contenedores existentes
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down || true

# Construir y ejecutar contenedores
echo "🐳 Construyendo y ejecutando contenedores..."
docker-compose up -d --build

# Reiniciar Nginx
echo "🔄 Reiniciando Nginx..."
systemctl restart nginx
systemctl enable nginx

# Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

# Verificar estado
echo "✅ Verificando estado..."
sleep 10
docker ps
systemctl status nginx --no-pager

echo "✅ Despliegue completado!"
echo "🌐 Tu sitio estará disponible en: https://$DOMAIN"
ENDSSH

# 6. Limpiar archivos temporales
log_info "Limpiando archivos temporales..."
rm -f sts-ai-production.tar.gz
rm -f .env.production

# 7. Verificar despliegue
log_info "Verificando despliegue..."
sleep 5
if curl -s -f "https://$DOMAIN" > /dev/null; then
    log_info "✅ Sitio web accesible en https://$DOMAIN"
else
    log_warn "⚠️  El sitio no responde inmediatamente. Puede tardar unos minutos en estar disponible."
fi

echo ""
echo "🎉 Despliegue completado!"
echo "🌐 URL: https://$DOMAIN"
echo ""
echo "📋 Comandos útiles:"
echo "  - Ver logs: ssh root@$SERVER_IP 'docker-compose logs -f'"
echo "  - Reiniciar: ssh root@$SERVER_IP 'docker-compose restart'"
echo "  - Estado: ssh root@$SERVER_IP 'docker ps && systemctl status nginx'" 