import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsModule } from "./modules/products/products.module";
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWD}@cluster0.91k9g.mongodb.net/productsDb`),
  ProductsModule, AuthModule, UsersModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
