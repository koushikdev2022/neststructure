import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';

import { ValidationPipe, UnprocessableEntityException, ValidationError, HttpStatus, HttpException } from '@nestjs/common';

config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     exceptionFactory: (errors: ValidationError[]) => {
  //       const messages = errors.reduce((acc, err) => {
  //         if (err.constraints) {
  //           acc[err.property] = Object.values(err.constraints);
  //         }
  //         return acc;
  //       }, {} as Record<string, string[]>);

  //       return new HttpException(
  //         {
  //           status: false,
  //           status_code: 422,
  //           message: messages,
  //         },
  //         422,
  //       );
  //     },
  //   }),
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.flatMap(err =>
          Object.values(err.constraints ?? {}).map(message => ({
            message: message
          }))
        );

        return new HttpException(
          {
            success: false,
            message: 'Validation failed',
            data: messages,
            status_code: 422,
          },
          422,
        );
      },
    }),
  );
  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
