# Stage 1: Build the frontend
FROM node:18-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
COPY tsconfig*.json ./
COPY postcss.config.cjs ./
COPY tailwind.config.ts ./
COPY eslint.config.js ./
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve production build
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

ENV PORT 3000
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
