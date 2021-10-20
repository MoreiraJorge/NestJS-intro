import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CreateProductDTO from "src/dto/CreateProductDTO";
import { Product, ProductDocument } from "src/entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async insertProduct(createProduct: CreateProductDTO) : Promise<Product> {
    return await this.productModel.create(createProduct);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  // getSingleProduct(productId: string) {
  //   const product = this.findProduct(productId)[0];
  //   return { ...product };
  // }

  // updateProduct(
  //   productId: string,
  //   title?: string,
  //   desc?: string,
  //   price?: number
  // ) {
  //   const [, index] = this.findProduct(productId);
  //   const updateObject = { title, desc, price };
  //   for (const [key, value] of Object.entries(updateObject)) {
  //     if (value) {
  //       this.products[index][key] = value;
  //     }
  //   }
  //   return this.products[index];
  // }

  // deleteProduct(prodId: string) {
  //   const [, index] = this.findProduct(prodId);
  //   return [...this.products.splice(index, 1)];
  // }

  // private findProduct(productId: string): [Product, number] {
  //   const productIndex = this.products.findIndex(
  //     (prod) => prod.id == productId
  //   );
  //   const product = this.products[productIndex];
  //   if (!product) {
  //     throw new NotFoundException("Could not find product");
  //   }
  //   return [product, productIndex];
  // }
}
