#!/bin/bash

# Script para restaurar configuración SSH
echo "Restaurando configuración SSH..."

# Restaurar configuración original
cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config

# Configurar puerto 22
sed -i 's/Port 52022/#Port 22/' /etc/ssh/sshd_config

# Reiniciar SSH
systemctl restart ssh

# Verificar estado
systemctl status ssh

echo "Configuración SSH restaurada al puerto 22" 