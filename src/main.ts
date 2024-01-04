import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, RequestMethod } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AnyExceptionsFilter } from './common/filters/any-exception.filter';
import { HttpExceptionsFilter } from './common/filters/http-exception.filter';
import { BadRequestExceptionFilter } from './common/filters/badRequest-exception.filter';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

declare const module: any;

const logger = new Logger('APP');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(configService.get<string>('app.prefix'), {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalFilters(
    new AnyExceptionsFilter(),
    new HttpExceptionsFilter(),
    new BadRequestExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();
  app.enable('trust proxy');
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 300,
      message: '请求过快,请稍后',
    }),
  );

  if (process.env.RUN_TIME === 'dev') {
    const options = new DocumentBuilder()
      .setTitle('接口文档')
      .setDescription('简算系统接口文档')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger', app, document);
  }

  const port = configService.get<number>('app.port');
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap()
  .then(() => {
    logger.log('服务启动成功');
  })
  .catch(() => {
    logger.error('服务启动失败');
  });
