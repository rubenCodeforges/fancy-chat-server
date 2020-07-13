import {Module} from "@nestjs/common";
import {TelemetryGateway} from "./gateway/TelemetryGateway";

const providers = [
    TelemetryGateway
];

@Module({
    providers: [...providers],
    exports: [...providers]
})
export class AssistantModule {

}
