import { Module } from '@nestjs/common';
import {ChatModule} from "./@codeforges/chat/ChatModule";

const modules = [
    ChatModule
];

@Module({
  imports: [...modules]
})
export class AppModule {}
