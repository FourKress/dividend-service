FROM registry.cn-zhangjiakou.aliyuncs.com/resico2021/node:14.18.1-buster-slim AS build-env
ADD . /app
WORKDIR /app
RUN yarn --registry=http://nexus3.ustax.tech/repository/npm-group/  && yarn build

FROM registry.cn-zhangjiakou.aliyuncs.com/resico2021/buildkite-puppeteer-pm2:latest
WORKDIR /opt/application
COPY --from=build-env /app/   /opt/application/
CMD pm2 start  --no-daemon  pm2.json --env ${START_ENV}
