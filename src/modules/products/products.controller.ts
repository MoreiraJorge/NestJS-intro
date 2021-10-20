import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import CreateProductDTO from "src/dto/CreateProductDTO";
import { Product } from "src/entities/product.entity";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async addProduct(
    @Body() createProduct: CreateProductDTO
  ): Promise<Product> {
    return await this.productsService.insertProduct(createProduct);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllproducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  // @Get(":id")
  // getProduct(@Param("id") prodId: string) {
  //   return this.productsService.getSingleProduct(prodId);
  // }

  // @Patch(":id")
  // updateProduct(
  //   @Param("id") prodId: string,
  //   @Body("title") prodTitle: string,
  //   @Body("description") prodDescription: string,
  //   @Body("price") prodPrice: number
  // ) {
  //   return this.productsService.updateProduct(
  //     prodId,
  //     prodTitle,
  //     prodDescription,
  //     prodPrice
  //   );
  // }

  // @Delete(":id")
  // deleteProduct(@Param("id") prodId: string) {
  //   return this.productsService.deleteProduct(prodId);
  // }
}
