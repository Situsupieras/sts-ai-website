# Script de diagnóstico para verificar el estado del servidor
# Ejecutar desde PowerShell en Windows

param(
    [string]$Domain = "stselpoderdelaia.online",
    [string]$ServerIP = "stselpoderdelaia.online"
)

Write-Host "🔍 Diagnóstico del servidor $Domain" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

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

# 1. Verificar conectividad básica
Write-Host "1. 🔌 Verificando conectividad básica..." -ForegroundColor White
try {
    $ping = Test-Connection -ComputerName $ServerIP -Count 1 -Quiet
    if ($ping) {
        Write-Info "✅ Servidor responde al ping"
    } else {
        Write-Error "❌ Servidor no responde al ping"
        exit 1
    }
} catch {
    Write-Error "❌ Error al hacer ping: $($_.Exception.Message)"
    exit 1
}

# 2. Verificar conectividad SSH
Write-Host "2. 🔑 Verificando conectividad SSH..." -ForegroundColor White
try {
    $sshTest = ssh -o ConnectTimeout=10 -o BatchMode=yes "root@$ServerIP" "echo 'SSH OK'" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Info "✅ Conexión SSH exitosa"
    } else {
        Write-Error "❌ No se puede conectar via SSH"
        Write-Error "Verifica las claves SSH y la configuración"
        exit 1
    }
} catch {
    Write-Error "❌ Error en conexión SSH: $($_.Exception.Message)"
    exit 1
}

# 3. Verificar servicios en el servidor
Write-Host "3. 🖥️  Verificando servicios en el servidor..." -ForegroundColor White
try {
    $serverStatus = ssh "root@$ServerIP" @"
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
netstat -tlnp | grep -E ':(80|443|3000|22)' || echo "No se encontraron puertos abiertos"
echo ""
echo "=== Logs de Docker ==="
if command -v docker-compose &> /dev/null; then
    cd /var/www/$Domain 2>/dev/null && docker-compose logs --tail=20 || echo "No se encontró docker-compose.yml"
else
    echo "❌ Docker Compose no está instalado"
fi
"@
    Write-Host $serverStatus
} catch {
    Write-Error "❌ Error al verificar servicios: $($_.Exception.Message)"
}

# 4. Verificar conectividad web
Write-Host "4. 🌐 Verificando conectividad web..." -ForegroundColor White
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
        Write-Warn "⚠️  Sitio web no accesible via HTTPS (Status: $($httpsResponse.StatusCode))"
    }
} catch {
    Write-Warn "⚠️  Sitio web no accesible via HTTPS: $($_.Exception.Message)"
}

# 5. Verificar DNS
Write-Host "5. 📡 Verificando resolución DNS..." -ForegroundColor White
try {
    $dnsResult = Resolve-DnsName -Name $Domain -ErrorAction SilentlyContinue
    if ($dnsResult) {
        Write-Info "✅ DNS resuelto correctamente"
        $dnsResult | Format-Table -AutoSize
    } else {
        Write-Error "❌ No se pudo resolver el DNS"
    }
} catch {
    Write-Error "❌ Error al resolver DNS: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "🎯 Resumen del diagnóstico:" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host "Si ves errores arriba, aquí están las soluciones comunes:" -ForegroundColor White
Write-Host ""
Write-Host "❌ Si SSH falla:" -ForegroundColor Red
Write-Host "   - Verifica que las claves SSH estén configuradas" -ForegroundColor White
Write-Host "   - Verifica que el servidor esté encendido" -ForegroundColor White
Write-Host "   - Verifica la IP/dominio del servidor" -ForegroundColor White
Write-Host ""
Write-Host "❌ Si Docker no está instalado:" -ForegroundColor Red
Write-Host "   - Ejecuta: .\deploy-remote.ps1" -ForegroundColor White
Write-Host ""
Write-Host "❌ Si Nginx no está funcionando:" -ForegroundColor Red
Write-Host "   - Ejecuta: ssh root@$ServerIP 'systemctl restart nginx'" -ForegroundColor White
Write-Host ""
Write-Host "❌ Si los contenedores no están corriendo:" -ForegroundColor Red
Write-Host "   - Ejecuta: ssh root@$ServerIP 'cd /var/www/$Domain && docker-compose up -d'" -ForegroundColor White
Write-Host ""
Write-Host "❌ Si el sitio no es accesible:" -ForegroundColor Red
Write-Host "   - Verifica la configuración de DNS" -ForegroundColor White
Write-Host "   - Verifica que el firewall permita puertos 80 y 443" -ForegroundColor White
Write-Host "   - Verifica los logs: ssh root@$ServerIP 'docker-compose logs -f'" -ForegroundColor White 