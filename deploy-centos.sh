#!/bin/bash

# Script de despliegue para stselpoderdelaia.online (CentOS/RHEL)
# Ejecutar como root en el servidor

set -e

echo "🚀 Iniciando despliegue de Si Tus Supieras El Poder de la IA"
echo "=================================================="

# Variables
DOMAIN="stselpoderdelaia.online"
APP_DIR="/var/www/$DOMAIN"
LOG_DIR="/var/log/sts-ai-website"
USER="nginx"

# Detectar el gestor de paquetes
if command -v dnf &> /dev/null; then
    PKG_MANAGER="dnf"
elif command -v yum &> /dev/null; then
    PKG_MANAGER="yum"
else
    echo "❌ No se pudo detectar el gestor de paquetes (dnf/yum)"
    exit 1
fi

echo "📦 Usando gestor de paquetes: $PKG_MANAGER"

# 1. Actualizar sistema
echo "📦 Actualizando sistema..."
$PKG_MANAGER update -y

# 2. Instalar dependencias
echo "🔧 Instalando dependencias..."
$PKG_MANAGER install -y curl wget git nginx

# 3. Instalar Node.js 18+
echo "📥 Instalando Node.js 18..."
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]]; then
    # Instalar Node.js desde NodeSource
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    $PKG_MANAGER install -y nodejs
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
cp nginx.conf /etc/nginx/conf.d/$DOMAIN.conf

# Crear configuración principal de Nginx si no existe
if [ ! -f /etc/nginx/nginx.conf ]; then
    cat > /etc/nginx/nginx.conf << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    include /etc/nginx/conf.d/*.conf;
}
EOF
fi

# 7. Verificar configuración de Nginx
nginx -t

# 8. Habilitar y reiniciar Nginx
systemctl enable nginx
systemctl restart nginx

# 9. Configurar firewall (firewalld)
echo "🔥 Configurando firewall..."
if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-service=ssh
    firewall-cmd --permanent --add-service=http
    firewall-cmd --permanent --add-service=https
    firewall-cmd --reload
else
    echo "⚠️  Firewalld no encontrado, configurando iptables..."
    # Configuración básica de iptables
    iptables -A INPUT -p tcp --dport 22 -j ACCEPT
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    service iptables save
fi

# 10. Instalar certificado SSL (opcional)
echo "🔒 Configurando SSL..."
if command -v certbot &> /dev/null; then
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
else
    echo "📥 Instalando Certbot..."
    $PKG_MANAGER install -y epel-release
    $PKG_MANAGER install -y certbot python3-certbot-nginx
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
fi

echo "✅ Despliegue completado!"
echo "🌐 Tu sitio estará disponible en: https://$DOMAIN"
echo "🌐 También en: http://8.208.103.69"
echo ""
echo "📋 Próximos pasos:"
echo "1. Subir el código a $APP_DIR"
echo "2. Ejecutar: cd $APP_DIR && npm install"
echo "3. Ejecutar: npm run build"
echo "4. Ejecutar: pm2 start ecosystem.config.js"
echo "5. Ejecutar: pm2 save && pm2 startup" 