# Stage 1: Base dependencies
FROM node:20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Development with hot-reload
FROM node:20 AS dev
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
