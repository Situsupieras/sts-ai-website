# Script para arreglar el VPS y hacer que funcione
# Ejecutar desde PowerShell en Windows

param(
    [string]$Domain = "stselpoderdelaia.online",
    [string]$ServerIP = "stselpoderdelaia.online"
)

Write-Host "🔧 ARREGLANDO EL VPS - Si Tu Supieras El Poder de la IA" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# Función para logging
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Step {
    param([string]$Message)
    Write-Host "➡️  $Message" -ForegroundColor Magenta
}

# 1. Verificar conectividad
Write-Step "Verificando conectividad con el servidor..."
try {
    $ping = Test-Connection -ComputerName $ServerIP -Count 1 -Quiet
    if ($ping) {
        Write-Info "✅ Servidor responde al ping"
    } else {
        Write-Error "❌ Servidor no responde al ping"
        Write-Error "Verifica que el VPS esté encendido en Alibaba Cloud"
        exit 1
    }
} catch {
    Write-Error "❌ Error de conectividad: $($_.Exception.Message)"
    exit 1
}

# 2. Verificar DNS
Write-Step "Verificando resolución DNS..."
try {
    $dnsResult = Resolve-DnsName -Name $Domain -ErrorAction SilentlyContinue
    if ($dnsResult) {
        Write-Info "✅ DNS resuelto correctamente: $($dnsResult.IPAddress)"
    } else {
        Write-Warn "⚠️  Problema con DNS - verifica la configuración del dominio"
    }
} catch {
    Write-Warn "⚠️  Error al resolver DNS: $($_.Exception.Message)"
}

# 3. Verificar acceso web
Write-Step "Verificando acceso web..."
try {
    $httpResponse = Invoke-WebRequest -Uri "http://$Domain" -UseBasicParsing -TimeoutSec 10 -ErrorAction SilentlyContinue
    if ($httpResponse.StatusCode -eq 200) {
        Write-Info "✅ Sitio web accesible via HTTP"
    } else {
        Write-Warn "⚠️  Sitio web no accesible via HTTP (Status: $($httpResponse.StatusCode))"
    }
} catch {
    Write-Warn "⚠️  Sitio web no accesible via HTTP: $($_.Exception.Message)"
}

try {
    $httpsResponse = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -TimeoutSec 10 -ErrorAction SilentlyContinue
    if ($httpsResponse.StatusCode -eq 200) {
        Write-Info "✅ Sitio web accesible via HTTPS"
    } else {
        Write-Warn "⚠️  Sitio web no accesible via HTTPS: $($httpsResponse.StatusCode)"
    }
} catch {
    Write-Warn "⚠️  Sitio web no accesible via HTTPS: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "🎯 DIAGNÓSTICO COMPLETADO" -ForegroundColor Yellow
Write-Host "========================" -ForegroundColor Yellow
Write-Host ""

Write-Host "📋 OPCIONES PARA ARREGLAR EL VPS:" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔑 OPCIÓN 1: ACCESO SSH (Recomendado)" -ForegroundColor Green
Write-Host "   - Ve al panel de Alibaba Cloud" -ForegroundColor White
Write-Host "   - Busca 'SSH Keys' o 'Claves SSH'" -ForegroundColor White
Write-Host "   - Agrega tu clave pública SSH" -ForegroundColor White
Write-Host "   - Ejecuta: ssh root@$ServerIP" -ForegroundColor White
Write-Host ""

Write-Host "🖥️  OPCIÓN 2: CONSOLA WEB" -ForegroundColor Green
Write-Host "   - Ve al panel de Alibaba Cloud" -ForegroundColor White
Write-Host "   - Busca 'Console' o 'Consola web'" -ForegroundColor White
Write-Host "   - Accede directamente al servidor" -ForegroundColor White
Write-Host ""

Write-Host "📁 OPCIÓN 3: GESTOR DE ARCHIVOS" -ForegroundColor Green
Write-Host "   - Usa el gestor de archivos del panel web" -ForegroundColor White
Write-Host "   - Sube los archivos manualmente" -ForegroundColor White
Write-Host ""

Write-Host "🚀 COMANDOS PARA EJECUTAR EN EL SERVIDOR:" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. Verificar estado actual:" -ForegroundColor White
Write-Host "   docker ps -a" -ForegroundColor Gray
Write-Host "   systemctl status nginx" -ForegroundColor Gray
Write-Host "   netstat -tlnp | grep -E ':(80|443|3000)'" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Si Docker no está instalado:" -ForegroundColor White
Write-Host "   curl -fsSL https://get.docker.com -o get-docker.sh" -ForegroundColor Gray
Write-Host "   sudo sh get-docker.sh" -ForegroundColor Gray
Write-Host "   sudo systemctl start docker" -ForegroundColor Gray
Write-Host "   sudo systemctl enable docker" -ForegroundColor Gray
Write-Host ""

Write-Host "3. Si Docker Compose no está instalado:" -ForegroundColor White
Write-Host "   sudo curl -L 'https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)' -o /usr/local/bin/docker-compose" -ForegroundColor Gray
Write-Host "   sudo chmod +x /usr/local/bin/docker-compose" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Si Nginx no está instalado:" -ForegroundColor White
Write-Host "   sudo apt update && sudo apt install -y nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "5. Desplegar la aplicación:" -ForegroundColor White
Write-Host "   cd /var/www/$Domain" -ForegroundColor Gray
Write-Host "   docker-compose down" -ForegroundColor Gray
Write-Host "   docker-compose up -d --build" -ForegroundColor Gray
Write-Host ""

Write-Host "6. Configurar Nginx:" -ForegroundColor White
Write-Host "   sudo cp nginx-site.conf /etc/nginx/sites-available/$Domain" -ForegroundColor Gray
Write-Host "   sudo ln -sf /etc/nginx/sites-available/$Domain /etc/nginx/sites-enabled/" -ForegroundColor Gray
Write-Host "   sudo rm -f /etc/nginx/sites-enabled/default" -ForegroundColor Gray
Write-Host "   sudo nginx -t" -ForegroundColor Gray
Write-Host "   sudo systemctl restart nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "7. Verificar funcionamiento:" -ForegroundColor White
Write-Host "   docker ps" -ForegroundColor Gray
Write-Host "   curl http://localhost:3000" -ForegroundColor Gray
Write-Host "   curl http://$Domain" -ForegroundColor Gray
Write-Host ""

Write-Host "🔧 SOLUCIÓN RÁPIDA (si ya tienes archivos en el servidor):" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. Accede al servidor (SSH o consola web)" -ForegroundColor White
Write-Host "2. Ejecuta estos comandos:" -ForegroundColor White
Write-Host "   cd /var/www/$Domain" -ForegroundColor Gray
Write-Host "   docker-compose down" -ForegroundColor Gray
Write-Host "   docker system prune -f" -ForegroundColor Gray
Write-Host "   docker-compose up -d --build" -ForegroundColor Gray
Write-Host "   sudo systemctl restart nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "📞 COMANDOS DE DIAGNÓSTICO:" -ForegroundColor Yellow
Write-Host "==========================" -ForegroundColor Yellow
Write-Host ""

Write-Host "Ver logs de Docker:" -ForegroundColor White
Write-Host "   docker-compose logs -f" -ForegroundColor Gray
Write-Host ""

Write-Host "Ver logs de Nginx:" -ForegroundColor White
Write-Host "   sudo tail -f /var/log/nginx/error.log" -ForegroundColor Gray
Write-Host ""

Write-Host "Verificar puertos:" -ForegroundColor White
Write-Host "   sudo netstat -tlnp | grep -E ':(80|443|3000)'" -ForegroundColor Gray
Write-Host ""

Write-Host "Verificar firewall:" -ForegroundColor White
Write-Host "   sudo ufw status" -ForegroundColor Gray
Write-Host ""

Write-Host "🌐 URL FINAL: https://$Domain" -ForegroundColor Green
Write-Host ""
Write-Host "💡 CONSEJO: Si no tienes acceso SSH, usa la consola web del panel de Alibaba Cloud" -ForegroundColor Yellow
Write-Host "" 