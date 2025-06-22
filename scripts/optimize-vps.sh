#!/bin/bash

# Script de Optimización para VPS
# Si Tu Supieras El Poder de la IA
# Especificaciones: 1 core, 1GB RAM

set -e

echo "🚀 Optimizando VPS para Next.js con recursos limitados..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Debes ejecutar este script desde el directorio raíz del proyecto"
    exit 1
fi

# 1. Optimizar configuración de Node.js
echo "📦 Configurando Node.js para 1GB RAM..."

# Crear archivo .env con optimizaciones
cat > .env.production << 'EOF'
# Optimizaciones para VPS con 1GB RAM
NODE_OPTIONS="--max-old-space-size=512 --optimize-for-size"
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production

# Configuración de memoria
NEXT_MEMORY_LIMIT=512
NEXT_CPU_LIMIT=1

# Optimizaciones de rendimiento
NEXT_COMPRESSION=true
NEXT_MINIFY=true
NEXT_SOURCEMAP=false
EOF

echo "✅ Configuración de Node.js optimizada"

# 2. Optimizar next.config.js
echo "⚙️ Optimizando next.config.js..."

cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones para VPS con recursos limitados
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@next/font', 'react-icons'],
  },
  
  // Reducir uso de memoria
  swcMinify: true,
  compress: true,
  
  // Optimizaciones de imágenes
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de webpack para memoria limitada
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimizar para producción
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }
    
    // Reducir uso de memoria en desarrollo
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    
    return config
  },
  
  // Configuración de headers para optimización
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
  
  // Configuración de redirecciones
  async redirects() {
    return [
      {
        source: '/status',
        destination: '/confianza',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
EOF

echo "✅ next.config.js optimizado"

# 3. Optimizar package.json scripts
echo "📝 Optimizando scripts de package.json..."

# Crear script de build optimizado
cat > scripts/build-optimized.sh << 'EOF'
#!/bin/bash
echo "🏗️ Construyendo aplicación optimizada para VPS..."

# Limpiar cache
rm -rf .next
rm -rf node_modules/.cache

# Instalar dependencias optimizadas
npm ci --only=production

# Build optimizado
NODE_OPTIONS="--max-old-space-size=512" npm run build

echo "✅ Build completado exitosamente"
EOF

chmod +x scripts/build-optimized.sh

# 4. Crear script de monitoreo de recursos
echo "📊 Creando script de monitoreo de recursos..."

cat > scripts/monitor-resources.sh << 'EOF'
#!/bin/bash
echo "📊 Monitoreo de recursos del VPS"
echo "================================"

# Uso de memoria
echo "💾 Memoria:"
free -h

# Uso de CPU
echo ""
echo "🖥️ CPU:"
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1

# Uso de disco
echo ""
echo "💿 Disco:"
df -h /

# Procesos de Node.js
echo ""
echo "🟢 Procesos de Node.js:"
ps aux | grep node | grep -v grep

# Puerto 3000
echo ""
echo "🌐 Puerto 3000:"
netstat -tlnp | grep :3000 || echo "Puerto 3000 no está en uso"

# Logs de la aplicación
echo ""
echo "📋 Últimos logs:"
tail -n 10 data/cron.log 2>/dev/null || echo "No hay logs disponibles"
EOF

chmod +x scripts/monitor-resources.sh

# 5. Crear script de limpieza
echo "🧹 Creando script de limpieza..."

cat > scripts/cleanup.sh << 'EOF'
#!/bin/bash
echo "🧹 Limpiando archivos temporales..."

# Limpiar cache de Next.js
rm -rf .next

# Limpiar cache de npm
npm cache clean --force

# Limpiar logs antiguos (mantener solo últimos 7 días)
find data -name "*.log" -mtime +7 -delete 2>/dev/null || true

# Limpiar archivos de métricas antiguos (mantener solo últimos 30 días)
find data -name "*.json" -mtime +30 -delete 2>/dev/null || true

# Limpiar archivos temporales del sistema
rm -rf /tmp/* 2>/dev/null || true

echo "✅ Limpieza completada"
EOF

chmod +x scripts/cleanup.sh

# 6. Crear configuración de PM2 optimizada
echo "⚡ Configurando PM2 optimizado..."

cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sts-ai-website',
    script: 'npm',
    args: 'start',
    cwd: './',
    instances: 1, // Solo 1 instancia para 1 core
    exec_mode: 'fork',
    max_memory_restart: '512M', // Reiniciar si usa más de 512MB
    node_args: '--max-old-space-size=512',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Configuración de logs
    log_file: './data/combined.log',
    out_file: './data/out.log',
    error_file: './data/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Configuración de reinicio
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s',
    // Configuración de monitoreo
    pmx: false, // Deshabilitar PMX para ahorrar memoria
  }]
}
EOF

echo "✅ Configuración de PM2 optimizada"

# 7. Crear script de deploy optimizado
echo "🚀 Creando script de deploy optimizado..."

cat > scripts/deploy-vps.sh << 'EOF'
#!/bin/bash
echo "🚀 Deploy optimizado para VPS..."

# Parar aplicación actual
pm2 stop sts-ai-website 2>/dev/null || true

# Limpiar cache
rm -rf .next
rm -rf node_modules/.cache

# Instalar dependencias
npm ci --only=production

# Build optimizado
./scripts/build-optimized.sh

# Iniciar con PM2
pm2 start ecosystem.config.js --env production

# Guardar configuración de PM2
pm2 save

# Configurar auto-start
pm2 startup

echo "✅ Deploy completado"
echo "📊 Para monitorear: pm2 monit"
echo "📋 Para ver logs: pm2 logs sts-ai-website"
EOF

chmod +x scripts/deploy-vps.sh

# 8. Crear configuración de Nginx optimizada
echo "🌐 Creando configuración de Nginx optimizada..."

cat > nginx-vps.conf << 'EOF'
server {
    listen 80;
    server_name stselpoderdelaia.online;
    
    # Configuración de buffer optimizada para 1GB RAM
    client_max_body_size 10M;
    client_body_buffer_size 128k;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    
    # Configuración de proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts optimizados
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Configuración de cache para archivos estáticos
    location /_next/static/ {
        alias /path/to/your/project/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Configuración de gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

echo "✅ Configuración de Nginx optimizada"

# 9. Crear script de mantenimiento
echo "🔧 Creando script de mantenimiento..."

cat > scripts/maintenance.sh << 'EOF'
#!/bin/bash
echo "🔧 Ejecutando mantenimiento del VPS..."

# Actualizar sistema
apt update && apt upgrade -y

# Limpiar paquetes no utilizados
apt autoremove -y
apt autoclean

# Limpiar logs del sistema
journalctl --vacuum-time=7d

# Reiniciar servicios críticos
systemctl restart nginx
pm2 restart all

# Verificar estado
echo "📊 Estado después del mantenimiento:"
./scripts/monitor-resources.sh

echo "✅ Mantenimiento completado"
EOF

chmod +x scripts/maintenance.sh

echo ""
echo "🎯 OPTIMIZACIÓN COMPLETADA"
echo "=========================="
echo ""
echo "📋 Scripts creados:"
echo "  • scripts/build-optimized.sh - Build optimizado"
echo "  • scripts/monitor-resources.sh - Monitoreo de recursos"
echo "  • scripts/cleanup.sh - Limpieza automática"
echo "  • scripts/deploy-vps.sh - Deploy optimizado"
echo "  • scripts/maintenance.sh - Mantenimiento del sistema"
echo ""
echo "⚙️ Configuraciones optimizadas:"
echo "  • .env.production - Variables de entorno optimizadas"
echo "  • next.config.js - Configuración de Next.js optimizada"
echo "  • ecosystem.config.js - PM2 optimizado para 1GB RAM"
echo "  • nginx-vps.conf - Nginx optimizado"
echo ""
echo "🚀 Para aplicar las optimizaciones:"
echo "  1. ./scripts/deploy-vps.sh"
echo "  2. sudo cp nginx-vps.conf /etc/nginx/sites-available/sts-ai"
echo "  3. sudo ln -s /etc/nginx/sites-available/sts-ai /etc/nginx/sites-enabled/"
echo "  4. sudo systemctl restart nginx"
echo ""
echo "📊 Para monitorear recursos:"
echo "  ./scripts/monitor-resources.sh"
echo ""
echo "✅ Optimización completada exitosamente!"
EOF

chmod +x scripts/optimize-vps.sh

echo ""
echo "🎯 OPTIMIZACIÓN COMPLETADA"
echo "=========================="
echo ""
echo "📋 Scripts creados:"
echo "  • scripts/build-optimized.sh - Build optimizado"
echo "  • scripts/monitor-resources.sh - Monitoreo de recursos"
echo "  • scripts/cleanup.sh - Limpieza automática"
echo "  • scripts/deploy-vps.sh - Deploy optimizado"
echo "  • scripts/maintenance.sh - Mantenimiento del sistema"
echo ""
echo "⚙️ Configuraciones optimizadas:"
echo "  • .env.production - Variables de entorno optimizadas"
echo "  • next.config.js - Configuración de Next.js optimizada"
echo "  • ecosystem.config.js - PM2 optimizado para 1GB RAM"
echo "  • nginx-vps.conf - Nginx optimizado"
echo ""
echo "🚀 Para aplicar las optimizaciones:"
echo "  1. ./scripts/deploy-vps.sh"
echo "  2. sudo cp nginx-vps.conf /etc/nginx/sites-available/sts-ai"
echo "  3. sudo ln -s /etc/nginx/sites-available/sts-ai /etc/nginx/sites-enabled/"
echo "  4. sudo systemctl restart nginx"
echo ""
echo "📊 Para monitorear recursos:"
echo "  ./scripts/monitor-resources.sh"
echo ""
echo "✅ Optimización completada exitosamente!" 