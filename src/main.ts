import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = '3000'
  const ip = '192.168.1.48'
  const config = new DocumentBuilder()
  .setTitle('Quiz API')
  .setDescription('Quiz API description')
  .setVersion('1.0')
  .addTag('quiz')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(port, ip);
}
bootstrap();
