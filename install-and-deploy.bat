@echo off
echo ========================================
echo  INSTALACION Y DESPLIEGUE AUTOMATICO
echo  Si Tus Supieras El Poder de la IA
echo ========================================
echo.

echo [1/6] Verificando si Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js ya esta instalado
    goto :install_deps
) else (
    echo ❌ Node.js no esta instalado. Instalando...
)

echo [2/6] Descargando Node.js...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile 'nodejs-installer.msi'}"
if %errorlevel% neq 0 (
    echo ❌ Error al descargar Node.js
    echo Por favor instala Node.js manualmente desde: https://nodejs.org/
    pause
    exit /b 1
)

echo [3/6] Instalando Node.js...
start /wait msiexec /i nodejs-installer.msi /quiet /norestart
if %errorlevel% neq 0 (
    echo ❌ Error al instalar Node.js
    pause
    exit /b 1
)

echo ✅ Node.js instalado correctamente
del nodejs-installer.msi

:install_deps
echo [4/6] Instalando dependencias del proyecto...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo [5/6] Construyendo el proyecto...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Error al construir el proyecto
    pause
    exit /b 1
)

echo [6/6] Iniciando servidor de desarrollo...
echo.
echo ========================================
echo  🎉 PROYECTO DESPLEGADO EXITOSAMENTE!
echo ========================================
echo.
echo 🌐 Tu sitio web esta disponible en:
echo    http://localhost:3000
echo.
echo 📱 Caracteristicas implementadas:
echo    ✅ Hero Section dinamico
echo    ✅ Seccion Problema-Agitacion-Solucion
echo    ✅ Prueba social multinivel
echo    ✅ Visualizador interactivo de IA
echo    ✅ Formulario inteligente multietapas
echo    ✅ SEO/AEO optimizado
echo    ✅ Analytics integrado
echo.
echo 💡 Para detener el servidor, presiona Ctrl+C
echo.
call npm run dev 