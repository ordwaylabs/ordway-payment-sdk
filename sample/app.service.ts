import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  OK(): string {
    return 'OK!';
  }
}
