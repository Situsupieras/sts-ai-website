# Guía de Contribución

¡Gracias por tu interés en contribuir a "Si Tu Supieras El Poder de la IA"! 🚀

## 🎯 Cómo Contribuir

### 1. Reportar Bugs
- Usa el template de issue para bugs
- Incluye pasos para reproducir el problema
- Adjunta capturas de pantalla si es relevante
- Especifica tu entorno (navegador, OS, etc.)

### 2. Solicitar Funcionalidades
- Usa el template de issue para features
- Describe la funcionalidad deseada
- Explica por qué sería útil
- Incluye ejemplos de uso si es posible

### 3. Contribuir Código
- Fork el repositorio
- Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
- Haz commit de tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
- Push a la rama (`git push origin feature/nueva-funcionalidad`)
- Crea un Pull Request

## 📋 Estándares de Código

### TypeScript
- Usa tipos estrictos
- Evita `any` cuando sea posible
- Documenta interfaces complejas
- Usa enums para valores constantes

### React/Next.js
- Usa componentes funcionales con hooks
- Implementa lazy loading cuando sea apropiado
- Optimiza re-renders
- Usa TypeScript para props

### Estilos
- Usa Tailwind CSS para estilos
- Mantén consistencia en el diseño
- Optimiza para móviles primero
- Usa variables CSS para temas

### Performance
- Optimiza imágenes
- Implementa code splitting
- Minimiza bundle size
- Usa memoización cuando sea apropiado

## 🧪 Testing

### Antes de Enviar un PR
- [ ] El código compila sin errores
- [ ] Los tests pasan (`npm run test`)
- [ ] El linting pasa (`npm run lint`)
- [ ] El type checking pasa (`npm run type-check`)
- [ ] La aplicación funciona en desarrollo
- [ ] La aplicación se build correctamente

### Testing Local
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar tests
npm run test

# Ejecutar linting
npm run lint

# Verificar tipos
npm run type-check

# Build de producción
npm run build
```

## 📝 Commits

Usa commits semánticos:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Cambios de estilo
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Tareas de mantenimiento

Ejemplo:
```
feat: agregar sistema de monitoreo diario

- Implementar script de monitoreo automático
- Agregar métricas de rendimiento
- Configurar cron jobs para VPS
```

## 🔧 Configuración del Entorno

### Requisitos
- Node.js 18+
- npm 9+
- Git

### Configuración
1. Fork el repositorio
2. Clona tu fork: `git clone https://github.com/tu-usuario/sts-ai-website.git`
3. Instala dependencias: `npm install`
4. Configura variables de entorno: `cp .env.example .env.local`
5. Ejecuta en desarrollo: `npm run dev`

## 📊 Monitoreo y Métricas

### APIs Disponibles
- `GET /api/status` - Estado general del sistema
- `GET /api/monitoring` - Métricas detalladas
- `POST /api/monitoring` - Forzar check manual

### Scripts de Automatización
- `npm run monitor` - Ejecutar monitoreo manual
- `npm run deploy:vps` - Deploy optimizado
- `npm run optimize` - Optimizar para VPS
- `npm run setup:cron` - Configurar monitoreo automático

## 🚀 Deployment

### VPS (1GB RAM)
```bash
# Optimizar para VPS
npm run optimize

# Deploy
npm run deploy:vps

# Configurar monitoreo
npm run setup:cron
```

### Docker
```bash
# Build optimizado
docker build -f Dockerfile.optimized -t sts-ai-website .

# Ejecutar con docker-compose
docker-compose -f docker-compose.optimized.yml up -d
```

## 📞 Contacto

- **Email**: contacto@stselpoderdelaia.online
- **Sitio**: https://stselpoderdelaia.online
- **Status**: https://stselpoderdelaia.online/confianza

## 📄 Licencia

Este proyecto es propiedad de "Si Tu Supieras El Poder de la IA". 
Todos los derechos reservados.

---

¡Gracias por contribuir! 🎉 