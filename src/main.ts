import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const server = app.getHttpServer();
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
      credentials: true,
      },
      });

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
 app.useWebSocketAdapter(new IoAdapter(io));
  await app.listen(port, ip);
}
bootstrap();
