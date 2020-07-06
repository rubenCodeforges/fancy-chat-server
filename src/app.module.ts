import { Module } from '@nestjs/common';
import {ChatModule} from "./@codeforges/chat/ChatModule";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

const modules = [
    ChatModule,
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'client'),
    }),
];

@Module({
  imports: [...modules]
})
export class AppModule {}
