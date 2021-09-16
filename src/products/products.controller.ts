import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body("title") prodTitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice
    );

    return { id: generatedId };
  }

  @Get()
  getAllproducts() {
    return this.productsService.getProducts();
  }

  @Get(":id")
  getProduct(@Param("id") prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(":id")
  updateProduct(
    @Param("id") prodId: string,
    @Body("title") prodTitle: string,
    @Body("description") prodDescription: string,
    @Body("price") prodPrice: number
  ) {
    return this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice
    );
  }

  @Delete(":id")
  deleteProduct(@Param("id") prodId: string) {
    return this.productsService.deleteProduct(prodId);
  }
}
