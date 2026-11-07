FROM node:22-alpine

WORKDIR /app

# Install the committed lockfile before copying the application source.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
