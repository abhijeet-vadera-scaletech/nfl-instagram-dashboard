FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# CRA build output lives in /app/build
# Expose port for local testing (not used by Vercel)
EXPOSE 3000

# Serve static build with a lightweight server
# react-scripts cannot serve production build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
