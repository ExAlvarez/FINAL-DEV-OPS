

#  1) Etapa de BUILD

FROM node:18-alpine AS builder

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala todas las dependencias
RUN npm ci --only=production

# Copia el resto del código de la aplicación
COPY . .



#  2) Etapa RUNTIME

FROM node:18-alpine AS runner

WORKDIR /app

# Copia node_modules desde la etapa anterior
COPY --from=builder /app/node_modules ./node_modules

# Copia solo el código necesario
COPY --from=builder /app . /

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
