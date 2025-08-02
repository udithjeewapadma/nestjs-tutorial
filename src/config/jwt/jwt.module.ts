import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({
    secret: 'mysecret',
    signOptions: {
      expiresIn: '1m'
    }
  })],
  providers: [JwtAuthService],
  exports: [JwtAuthService]
})
export class JwtAuthModule {}
