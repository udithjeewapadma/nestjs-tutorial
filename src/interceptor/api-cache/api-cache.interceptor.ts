import { CacheInterceptor } from '@nestjs/cache-manager';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { No_Cache_Key } from 'src/decorator/no-cache/no-cache.decorator';

@Injectable()
export class ApiCacheInterceptor extends CacheInterceptor {

  constructor(protected readonly cacheManager: any,protected readonly reflector:Reflector){
    super(cacheManager,reflector);
  }
  protected isRequestCacheable(context: ExecutionContext): boolean {
    const noCache = this.reflector.getAllAndOverride<boolean>(No_Cache_Key,[
      context.getHandler(),
      context.getClass()
    ])
    if(noCache) return false;
    return super.isRequestCacheable(context)
  }
}

