import { SetMetadata } from '@nestjs/common';

export const No_Cache_Key = 'no-cache'
export const NoCache = () => SetMetadata(No_Cache_Key, true);
