import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';
import { AppModule } from './app.module';

let server: Handler;

function setupSwagger(app) {
  const config = new DocumentBuilder()
      .setTitle('Nestjs with Postgres')
      .setVersion('1.0')
      .addTag('nest-postgres')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.init();
  app.use(helmet());
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};