FROM node:16

WORKDIR /app

COPY package*.json ./

# Skip strict peer dependency resolution
RUN npm install --legacy-peer-deps

COPY . .

# Build Create React App
RUN npm run build

# Serve production build
RUN npm install -g serve
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
