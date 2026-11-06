FROM node:22-alpine

WORKDIR /app

# The approved frontend scaffold will provide package.json and package-lock.json.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
