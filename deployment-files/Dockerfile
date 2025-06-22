# Dockerfile optimizado para Next.js
FROM node:22-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild, la mejor práctica para usar dependencias de npm
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar el build de producción
RUN npm run build

# Imagen de producción, copiar todo el código y pasar a nextjs user
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar el build generado
COPY --from=builder /app/public ./public

# Establecer la propiedad correcta para archivos precacheados
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar el build de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 