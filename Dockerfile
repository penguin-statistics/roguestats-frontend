FROM node:lts-alpine AS builder
WORKDIR /app

ARG VITE_BUILD_GIT_COMMIT
ENV VITE_BUILD_GIT_COMMIT $VITE_BUILD_GIT_COMMIT

ENV PENGUIN_BUILDFROM=docker

COPY package.json .
COPY yarn.lock .

# Setup yarn
RUN yarn install

COPY . .

RUN yarn build

# runner
FROM nginx:stable AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

# let nginx return index.html for any request
COPY build/nginx-default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
