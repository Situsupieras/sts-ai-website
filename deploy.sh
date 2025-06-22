#!/bin/bash

# Script de despliegue para stselpoderdelaia.online
# Ejecutar como root en el servidor

set -e

echo "🚀 Iniciando despliegue de Si Tus Supieras El Poder de la IA"
echo "=================================================="

# Variables
DOMAIN="stselpoderdelaia.online"
APP_DIR="/var/www/$DOMAIN"
LOG_DIR="/var/log/sts-ai-website"
USER="www-data"

# 1. Actualizar sistema
echo "📦 Actualizando sistema..."
apt update && apt upgrade -y

# 2. Instalar dependencias
echo "🔧 Instalando dependencias..."
apt install -y curl wget git nginx nodejs npm certbot python3-certbot-nginx

# 3. Instalar Node.js 18+ si no está instalado
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]]; then
    echo "📥 Instalando Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi

# 4. Instalar PM2 globalmente
echo "⚡ Instalando PM2..."
npm install -g pm2

# 5. Crear directorios
echo "📁 Creando directorios..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR
chown -R $USER:$USER $APP_DIR
chown -R $USER:$USER $LOG_DIR

# 6. Configurar Nginx
echo "🌐 Configurando Nginx..."
cp nginx.conf /etc/nginx/sites-available/$DOMAIN
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 7. Verificar configuración de Nginx
nginx -t

# 8. Reiniciar Nginx
systemctl restart nginx
systemctl enable nginx

# 9. Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

# 10. Instalar certificado SSL (opcional)
echo "🔒 Configurando SSL..."
if command -v certbot &> /dev/null; then
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
fi

echo "✅ Despliegue completado!"
echo "🌐 Tu sitio estará disponible en: https://$DOMAIN"
echo ""
echo "📋 Próximos pasos:"
echo "1. Subir el código a $APP_DIR"
echo "2. Ejecutar: cd $APP_DIR && npm install"
echo "3. Ejecutar: npm run build"
echo "4. Ejecutar: pm2 start ecosystem.config.js"
echo "5. Ejecutar: pm2 save && pm2 startup" 