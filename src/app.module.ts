import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./modules/products/products.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "./modules/auth/guards/roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb://localhost/test`),
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
