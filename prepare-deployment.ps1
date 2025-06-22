# Script para preparar archivos de despliegue
# Crea una carpeta con todos los archivos necesarios para el servidor

param(
    [string]$Domain = "stselpoderdelaia.online"
)

Write-Host "📦 Preparando archivos de despliegue..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Crear directorio de despliegue
$deployDir = "deployment-files"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

Write-Host "📁 Creando directorio: $deployDir" -ForegroundColor Green

# Lista de archivos y carpetas a copiar
$filesToCopy = @(
    "app",
    "components", 
    "public",
    "package.json",
    "package-lock.json",
    "next.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "tsconfig.json",
    "Dockerfile",
    "docker-compose.yml",
    "nginx-site.conf",
    "env.local.example"
)

# Copiar archivos
foreach ($item in $filesToCopy) {
    if (Test-Path $item) {
        if (Test-Path $item -PathType Container) {
            # Es un directorio
            Copy-Item $item -Destination $deployDir -Recurse -Force
            Write-Host "✅ Copiado directorio: $item" -ForegroundColor Green
        } else {
            # Es un archivo
            Copy-Item $item -Destination $deployDir -Force
            Write-Host "✅ Copiado archivo: $item" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  No encontrado: $item" -ForegroundColor Yellow
    }
}

# Crear archivo .env de ejemplo para producción
$envContent = @"
# ===========================================
# CONFIGURACIÓN DE PRODUCCIÓN
# ===========================================

# URL base de la aplicación
NEXT_PUBLIC_APP_URL=https://$Domain

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
CORS_ORIGINS=https://$Domain,https://www.$Domain

# ===========================================
# CONFIGURACIÓN DE PRODUCCIÓN
# ===========================================

# Debug mode (desactivado en producción)
DEBUG=false

# Log level
LOG_LEVEL=info
"@

$envContent | Out-File -FilePath "$deployDir\.env.example" -Encoding UTF8
Write-Host "✅ Creado archivo: .env.example" -ForegroundColor Green

# Crear archivo README con instrucciones
$readmeContent = @"
# Despliegue de Si Tu Supieras El Poder de la IA

## Instrucciones de Despliegue

### 1. Subir archivos al servidor
Sube todos los archivos de esta carpeta al directorio `/var/www/$Domain` en tu servidor.

### 2. Instalar dependencias del sistema
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker
sudo systemctl enable docker

# Instalar Docker Compose
sudo curl -L 'https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)' -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalar Nginx
sudo apt install -y nginx
```

### 3. Configurar el proyecto
```bash
# Ir al directorio del proyecto
cd /var/www/$Domain

# Configurar variables de entorno
cp .env.example .env
nano .env  # Edita las variables necesarias

# Configurar Nginx
sudo cp nginx-site.conf /etc/nginx/sites-available/$Domain
sudo ln -sf /etc/nginx/sites-available/$Domain /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Desplegar la aplicación
```bash
# Construir y ejecutar contenedores
docker-compose up -d --build

# Verificar estado
docker ps
sudo systemctl status nginx
```

### 5. Verificar el sitio
El sitio estará disponible en: https://$Domain

## Comandos útiles
- Ver logs: `docker-compose logs -f`
- Reiniciar: `docker-compose restart`
- Detener: `docker-compose down`
- Estado: `docker ps && systemctl status nginx`

## Solución de problemas
- Si hay errores, verifica los logs: `docker-compose logs -f`
- Si Nginx no funciona: `sudo nginx -t` para verificar configuración
- Si el sitio no carga: verifica el firewall y puertos 80/443
"@

$readmeContent | Out-File -FilePath "$deployDir\README-DEPLOYMENT.md" -Encoding UTF8
Write-Host "✅ Creado archivo: README-DEPLOYMENT.md" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Preparación completada!" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Archivos listos en: $deployDir" -ForegroundColor White
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Comprime la carpeta '$deployDir' en un archivo ZIP" -ForegroundColor White
Write-Host "2. Sube el ZIP al servidor via panel web o FTP" -ForegroundColor White
Write-Host "3. Sigue las instrucciones en README-DEPLOYMENT.md" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URL del sitio: https://$Domain" -ForegroundColor Green 