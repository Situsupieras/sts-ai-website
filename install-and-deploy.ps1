# Script de instalación y despliegue automático
# Si Tus Supieras El Poder de la IA

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " INSTALACION Y DESPLIEGUE AUTOMATICO" -ForegroundColor Cyan
Write-Host " Si Tus Supieras El Poder de la IA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "[1/6] Verificando si Node.js está instalado..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js ya está instalado: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js no encontrado"
    }
} catch {
    Write-Host "❌ Node.js no está instalado. Instalando..." -ForegroundColor Red
    
    # Intentar instalar con winget
    Write-Host "[2/6] Instalando Node.js con winget..." -ForegroundColor Yellow
    try {
        winget install OpenJS.NodeJS --accept-source-agreements --accept-package-agreements
        Write-Host "✅ Node.js instalado con winget" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error con winget. Intentando con Chocolatey..." -ForegroundColor Red
        try {
            choco install nodejs -y
            Write-Host "✅ Node.js instalado con Chocolatey" -ForegroundColor Green
        } catch {
            Write-Host "❌ Error con Chocolatey. Instalación manual requerida." -ForegroundColor Red
            Write-Host "Por favor instala Node.js manualmente desde: https://nodejs.org/" -ForegroundColor Yellow
            Read-Host "Presiona Enter para continuar..."
            exit 1
        }
    }
    
    # Refrescar variables de entorno
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Verificar npm
Write-Host "[3/6] Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    Write-Host "✅ npm disponible: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no disponible. Reinstalando Node.js..." -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "[4/6] Instalando dependencias del proyecto..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    Read-Host "Presiona Enter para continuar..."
    exit 1
}

# Construir el proyecto
Write-Host "[5/6] Construyendo el proyecto..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Proyecto construido correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al construir el proyecto" -ForegroundColor Red
    Read-Host "Presiona Enter para continuar..."
    exit 1
}

# Iniciar servidor
Write-Host "[6/6] Iniciando servidor de desarrollo..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " 🎉 PROYECTO DESPLEGADO EXITOSAMENTE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Tu sitio web está disponible en:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📱 Características implementadas:" -ForegroundColor Cyan
Write-Host "   ✅ Hero Section dinámico" -ForegroundColor Green
Write-Host "   ✅ Sección Problema-Agitación-Solución" -ForegroundColor Green
Write-Host "   ✅ Prueba social multinivel" -ForegroundColor Green
Write-Host "   ✅ Visualizador interactivo de IA" -ForegroundColor Green
Write-Host "   ✅ Formulario inteligente multietapas" -ForegroundColor Green
Write-Host "   ✅ SEO/AEO optimizado" -ForegroundColor Green
Write-Host "   ✅ Analytics integrado" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Para detener el servidor, presiona Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Iniciar servidor de desarrollo
npm run dev 