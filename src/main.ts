import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const main =  async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')
  await app.listen(process.env.PORT ?? 4000);
}
main();
