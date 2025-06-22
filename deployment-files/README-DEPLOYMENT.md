# Despliegue de Si Tu Supieras El Poder de la IA

## Instrucciones de Despliegue

### 1. Subir archivos al servidor
Sube todos los archivos de esta carpeta al directorio /var/www/stselpoderdelaia.online en tu servidor.

### 2. Instalar dependencias del sistema
`ash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker
sudo systemctl enable docker

# Instalar Docker Compose
sudo curl -L 'https://github.com/docker/compose/releases/download/v2.20.0/docker-compose--' -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalar Nginx
sudo apt install -y nginx
`

### 3. Configurar el proyecto
`ash
# Ir al directorio del proyecto
cd /var/www/stselpoderdelaia.online

# Configurar variables de entorno
cp .env.example .env
nano .env  # Edita las variables necesarias

# Configurar Nginx
sudo cp nginx-site.conf /etc/nginx/sites-available/stselpoderdelaia.online
sudo ln -sf /etc/nginx/sites-available/stselpoderdelaia.online /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
`

### 4. Desplegar la aplicación
`ash
# Construir y ejecutar contenedores
docker-compose up -d --build

# Verificar estado
docker ps
sudo systemctl status nginx
`

### 5. Verificar el sitio
El sitio estará disponible en: https://stselpoderdelaia.online

## Comandos útiles
- Ver logs: docker-compose logs -f
- Reiniciar: docker-compose restart
- Detener: docker-compose down
- Estado: docker ps && systemctl status nginx

## Solución de problemas
- Si hay errores, verifica los logs: docker-compose logs -f
- Si Nginx no funciona: sudo nginx -t para verificar configuración
- Si el sitio no carga: verifica el firewall y puertos 80/443
