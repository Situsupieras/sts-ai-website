#!/bin/bash

# Script de mantenimiento para STS AI VPS
# Autor: Sistema de Seguridad
# Fecha: $(date)

echo "=== MANTENIMIENTO DEL SERVIDOR STS AI ==="
echo "Fecha: $(date)"
echo ""

# 1. Actualizar sistema
echo "1. Actualizando sistema..."
apt-get update && apt-get upgrade -y

# 2. Verificar estado de servicios
echo ""
echo "2. Verificando estado de servicios..."
echo "Docker: $(systemctl is-active docker)"
echo "Nginx: $(systemctl is-active nginx)"
echo "Fail2ban: $(systemctl is-active fail2ban)"
echo "Unattended-upgrades: $(systemctl is-active unattended-upgrades)"

# 3. Verificar contenedores Docker
echo ""
echo "3. Verificando contenedores Docker..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 4. Verificar certificado SSL
echo ""
echo "4. Verificando certificado SSL..."
certbot certificates

# 5. Verificar logs de seguridad
echo ""
echo "5. Verificando logs de seguridad..."
echo "Últimos 10 intentos de login SSH:"
grep "Failed password" /var/log/auth.log | tail -10

echo "Últimos 10 bloqueos de Fail2ban:"
fail2ban-client status sshd

# 6. Verificar espacio en disco
echo ""
echo "6. Verificando espacio en disco..."
df -h

# 7. Verificar memoria
echo ""
echo "7. Verificando uso de memoria..."
free -h

# 8. Verificar firewall
echo ""
echo "8. Verificando firewall..."
ufw status

echo ""
echo "=== MANTENIMIENTO COMPLETADO ===" 