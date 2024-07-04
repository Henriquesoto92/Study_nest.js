import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    //metodos permitidos
    methods: ['get'],
    //origens autorizadas
    origin: ['http://localhost:3000'],
    //mais infos, verificar dentro do express/cors
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(3000);
}
bootstrap();
