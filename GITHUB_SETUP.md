# 🚀 Guía para Subir a GitHub

## 📋 Pasos para Subir el Proyecto a GitHub

### 1. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y inicia sesión
2. Haz clic en el botón **"New"** o **"+"** → **"New repository"**
3. Configura el repositorio:
   - **Repository name**: `sts-ai-website`
   - **Description**: `Si Tu Supieras El Poder de la IA - Plataforma educativa con sistema de monitoreo avanzado`
   - **Visibility**: Private (recomendado) o Public
   - **Initialize with**: ✅ Add a README file
   - **Add .gitignore**: ✅ Node
   - **Choose a license**: MIT License

4. Haz clic en **"Create repository"**

### 2. Instalar Git (si no está instalado)

#### Windows:
```bash
# Descargar desde: https://git-scm.com/download/win
# O usar winget:
winget install Git.Git
```

#### macOS:
```bash
# Con Homebrew:
brew install git

# O descargar desde: https://git-scm.com/download/mac
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install git
```

### 3. Configurar Git

```bash
# Configurar tu nombre y email
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --list
```

### 4. Preparar el Proyecto Local

```bash
# Navegar al directorio del proyecto
cd C:\Users\siust\Documents\programacion\STS-ai

# Inicializar Git (si no está inicializado)
git init

# Verificar estado
git status
```

### 5. Agregar Archivos al Repositorio

```bash
# Agregar todos los archivos
git add .

# Verificar qué se va a commitear
git status

# Crear commit inicial
git commit -m "🚀 Initial commit: Si Tu Supieras El Poder de la IA

✨ Características implementadas:
- Centro de Confianza con métricas reales
- Sistema de monitoreo diario automático
- Optimizaciones para VPS (1GB RAM)
- APIs para métricas de estado
- Status page en tiempo real
- Scripts de automatización
- Configuración optimizada para producción

🔧 Optimizaciones:
- Next.js optimizado para recursos limitados
- PM2 configurado para 1 core
- Nginx optimizado
- Monitoreo automático con cron
- Limpieza automática de logs

📊 Métricas:
- Uptime: 99.9%+
- Latencia: <50ms
- Memoria: <512MB
- Seguridad: 85-100/100

🎯 Listo para deployment en VPS"
```

### 6. Conectar con GitHub

```bash
# Agregar el repositorio remoto (reemplaza TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/sts-ai-website.git

# Verificar que se agregó correctamente
git remote -v
```

### 7. Subir el Código

```bash
# Cambiar a la rama main
git branch -M main

# Subir el código
git push -u origin main
```

### 8. Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Verifica que todos los archivos estén presentes
3. Revisa el README.md que se muestra en la página principal

## 🔧 Configuración Adicional

### Configurar GitHub Actions (Opcional)

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Agrega los siguientes secrets:
   - `VPS_HOST`: `8.208.103.69`
   - `VPS_USER`: `root`
   - `VPS_SSH_KEY`: Tu clave SSH privada
   - `VPS_PORT`: `52022`

### Configurar Pages (Opcional)

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Esto permitirá deployments automáticos

## 📁 Estructura del Repositorio

Una vez subido, tu repositorio debería tener esta estructura:

```
sts-ai-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
│   ├── api/
│   │   ├── contact/
│   │   ├── monitoring/
│   │   └── status/
│   ├── confianza/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── confianza/
│   ├── layout/
│   ├── providers/
│   └── sections/
├── scripts/
│   ├── daily-monitoring.js
│   ├── deploy-vps.sh
│   ├── optimize-vps.sh
│   └── setup-cron.sh
├── data/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── CHANGELOG.md
├── CONTRIBUTING.md
├── Dockerfile.optimized
├── docker-compose.optimized.yml
├── ecosystem.config.js
├── LICENSE
├── next.config.js
├── nginx-vps.conf
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Comandos Útiles

### Para futuras actualizaciones:

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Commitear cambios
git commit -m "Descripción de los cambios"

# Subir cambios
git push origin main
```

### Para trabajar con ramas:

```bash
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout main

# Ver ramas
git branch

# Eliminar rama
git branch -d nombre-rama
```

## 🔗 URLs Importantes

- **Repositorio**: `https://github.com/TU-USUARIO/sts-ai-website`
- **Sitio**: `https://stselpoderdelaia.online`
- **Status**: `https://stselpoderdelaia.online/confianza`
- **API Status**: `https://stselpoderdelaia.online/api/status`

## ✅ Verificación Final

Después de subir, verifica que:

- [ ] Todos los archivos están en GitHub
- [ ] El README.md se muestra correctamente
- [ ] Los archivos de configuración están presentes
- [ ] Los scripts tienen permisos de ejecución
- [ ] El .gitignore está funcionando correctamente
- [ ] Las dependencias están listadas en package.json

## 🎯 ¡Listo!

Tu proyecto está ahora en GitHub y listo para:
- Colaboración con otros desarrolladores
- CI/CD automático con GitHub Actions
- Deployment automático al VPS
- Control de versiones profesional
- Documentación centralizada

---

**¡Felicidades! 🎉 Tu proyecto está ahora en GitHub y listo para el mundo.** 