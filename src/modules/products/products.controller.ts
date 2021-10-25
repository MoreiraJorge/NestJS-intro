import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {CreateProductDto} from "src/dto/createProduct.dto";
import { Product } from "src/schemas/product.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return await this.productsService.insertProduct(createProductDto);
  }

  @Get()
  async getAllproducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getProduct(@Param("id") prodId: string) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") prodId: string,
    @Body("title") prodTitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ) {
    return await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice
    );
  }

  @Delete(":id")
  async deleteProduct(@Param("id") prodId: string) {
    return await this.productsService.deleteProduct(prodId);
  }
}
