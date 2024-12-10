FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]