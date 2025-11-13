FROM node:20-alpine
WORKDIR /app

# Install build deps for any native builds
RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY tsconfig.json ./

# Install deps
RUN npm ci --production=false

# Copy source and build
COPY src ./src
RUN npm run build

# Remove dev deps for smaller runtime image
RUN npm prune --production

EXPOSE 3001
CMD ["node", "dist/main.js"]
