import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/guard/jwt-guard/jwt-guard.guard';

@Global()
@Module({
  imports: [JwtModule.register({
    secret: 'mysecret',
    signOptions: {
      expiresIn: '1m'
    }
  })],
  providers: [
    {
      provide:APP_GUARD,
      useClass:JwtGuard
    },
    JwtAuthService],
  exports: [JwtAuthService]
})
export class JwtAuthModule {}
