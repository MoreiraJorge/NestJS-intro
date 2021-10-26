import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import {CreateProductDto} from "src/dto/createProduct.dto";
import { Role } from "src/schemas/enums/role.enum";
import { Product } from "src/schemas/product.schema";
import { Roles } from "../auth/auth.decorator";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.Guest, Role.Admin)
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
