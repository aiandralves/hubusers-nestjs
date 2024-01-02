import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import envConfig from "./config/env/env.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix("tivic");
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    const logger = new Logger("Bootstrap");

    const port = envConfig().app.port || 3333;
    await app.listen(port).then(() => logger.debug(`API is running on port ${port} 🚀`));
}
bootstrap();
