import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cwdEnvPath = path.resolve(process.cwd(), '.env');
const workspaceEnvPath = path.resolve(process.cwd(), 'apps/api/.env');

config({ path: existsSync(cwdEnvPath) ? cwdEnvPath : workspaceEnvPath });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
    credentials: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(Number(process.env.PORT) || 4000);
}

void bootstrap();
