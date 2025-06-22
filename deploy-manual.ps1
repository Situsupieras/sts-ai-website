# Script de despliegue manual para stselpoderdelaia.online
# Para usar cuando no hay acceso SSH configurado

param(
    [string]$Domain = "stselpoderdelaia.online"
)

Write-Host "🚀 Despliegue Manual de Si Tu Supieras El Poder de la IA" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 INSTRUCCIONES PASO A PASO:" -ForegroundColor Yellow
Write-Host "=============================" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. 🔑 CONFIGURAR ACCESO SSH:" -ForegroundColor Green
Write-Host "   - Ve al panel de control de tu VPS (Alibaba Cloud)" -ForegroundColor White
Write-Host "   - Busca la sección 'SSH Keys' o 'Claves SSH'" -ForegroundColor White
Write-Host "   - Agrega tu clave pública SSH" -ForegroundColor White
Write-Host "   - O usa la consola web del VPS" -ForegroundColor White
Write-Host ""

Write-Host "2. 📦 PREPARAR ARCHIVOS:" -ForegroundColor Green
Write-Host "   - Se creará un archivo ZIP con el proyecto" -ForegroundColor White
Write-Host "   - Sube este archivo al servidor via FTP o panel web" -ForegroundColor White
Write-Host ""

Write-Host "3. 🖥️  ACCEDER AL SERVIDOR:" -ForegroundColor Green
Write-Host "   - Usa la consola web del VPS" -ForegroundColor White
Write-Host "   - O configura SSH en tu máquina local" -ForegroundColor White
Write-Host ""

Write-Host "4. 🐳 INSTALAR DOCKER:" -ForegroundColor Green
Write-Host "   - Ejecuta los comandos de instalación" -ForegroundColor White
Write-Host ""

Write-Host "5. 🚀 DESPLEGAR LA APLICACIÓN:" -ForegroundColor Green
Write-Host "   - Extrae los archivos" -ForegroundColor White
Write-Host "   - Ejecuta docker-compose" -ForegroundColor White
Write-Host ""

# Crear archivo ZIP para subir
Write-Host "📦 Creando archivo ZIP para subir..." -ForegroundColor Yellow
$zipName = "sts-ai-deployment-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"

# Excluir archivos innecesarios
$excludeFiles = @(
    "node_modules",
    ".next",
    ".git",
    "*.log",
    "*.zip",
    "*.tar.gz",
    "env.example",
    "env.local.example",
    "check-server.ps1",
    "check-server.sh",
    "deploy-remote.sh",
    "deploy-manual.ps1"
)

# Crear archivo ZIP
try {
    Compress-Archive -Path ".\*" -DestinationPath $zipName -Force
    Write-Host "✅ Archivo ZIP creado: $zipName" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al crear ZIP: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 COMANDOS PARA EJECUTAR EN EL SERVIDOR:" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. Actualizar sistema:" -ForegroundColor White
Write-Host "   sudo apt update && sudo apt upgrade -y" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Instalar Docker:" -ForegroundColor White
Write-Host "   curl -fsSL https://get.docker.com -o get-docker.sh" -ForegroundColor Gray
Write-Host "   sudo sh get-docker.sh" -ForegroundColor Gray
Write-Host "   sudo systemctl start docker" -ForegroundColor Gray
Write-Host "   sudo systemctl enable docker" -ForegroundColor Gray
Write-Host ""

Write-Host "3. Instalar Docker Compose:" -ForegroundColor White
Write-Host "   sudo curl -L 'https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)' -o /usr/local/bin/docker-compose" -ForegroundColor Gray
Write-Host "   sudo chmod +x /usr/local/bin/docker-compose" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Instalar Nginx:" -ForegroundColor White
Write-Host "   sudo apt install -y nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "5. Crear directorio del proyecto:" -ForegroundColor White
Write-Host "   sudo mkdir -p /var/www/$Domain" -ForegroundColor Gray
Write-Host "   sudo chown -R `$USER:`$USER /var/www/$Domain" -ForegroundColor Gray
Write-Host ""

Write-Host "6. Subir y extraer archivos:" -ForegroundColor White
Write-Host "   # Sube el archivo $zipName al servidor" -ForegroundColor Gray
Write-Host "   cd /var/www/$Domain" -ForegroundColor Gray
Write-Host "   unzip $zipName" -ForegroundColor Gray
Write-Host ""

Write-Host "7. Configurar variables de entorno:" -ForegroundColor White
Write-Host "   cp env.local.example .env" -ForegroundColor Gray
Write-Host "   nano .env  # Edita las variables necesarias" -ForegroundColor Gray
Write-Host ""

Write-Host "8. Configurar Nginx:" -ForegroundColor White
Write-Host "   sudo cp nginx-site.conf /etc/nginx/sites-available/$Domain" -ForegroundColor Gray
Write-Host "   sudo ln -sf /etc/nginx/sites-available/$Domain /etc/nginx/sites-enabled/" -ForegroundColor Gray
Write-Host "   sudo rm -f /etc/nginx/sites-enabled/default" -ForegroundColor Gray
Write-Host "   sudo nginx -t" -ForegroundColor Gray
Write-Host "   sudo systemctl restart nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "9. Desplegar con Docker:" -ForegroundColor White
Write-Host "   docker-compose up -d --build" -ForegroundColor Gray
Write-Host ""

Write-Host "10. Verificar estado:" -ForegroundColor White
Write-Host "    docker ps" -ForegroundColor Gray
Write-Host "    sudo systemctl status nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "🌐 Tu sitio estará disponible en: https://$Domain" -ForegroundColor Green
Write-Host ""
Write-Host "📋 COMANDOS ÚTILES:" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow
Write-Host "Ver logs: docker-compose logs -f" -ForegroundColor Gray
Write-Host "Reiniciar: docker-compose restart" -ForegroundColor Gray
Write-Host "Detener: docker-compose down" -ForegroundColor Gray
Write-Host "Estado: docker ps && systemctl status nginx" -ForegroundColor Gray
Write-Host ""

Write-Host "📞 Si necesitas ayuda:" -ForegroundColor Yellow
Write-Host "- Verifica los logs: docker-compose logs -f" -ForegroundColor White
Write-Host "- Revisa la configuración de Nginx: sudo nginx -t" -ForegroundColor White
Write-Host "- Verifica el firewall: sudo ufw status" -ForegroundColor White
Write-Host "" 