module.exports = {
  apps: [
    {
      name: 'sts-ai-website',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/stselpoderdelaia.online',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/sts-ai-website/err.log',
      out_file: '/var/log/sts-ai-website/out.log',
      log_file: '/var/log/sts-ai-website/combined.log',
      time: true
    }
  ]
}; 