import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto } from "src/dto/createProduct.dto";
import { Product, ProductDocument } from "src/schemas/product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  async insertProduct(createProduct: CreateProductDto): Promise<Product> {
    return await this.productModel.create(createProduct);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getSingleProduct(productId: string) {
    return await this.productModel.findById(productId);
  }

  async updateProduct(
    productId: string,
    title?: string,
    desc?: string,
    price?: number
  ) {
    await this.productModel.findByIdAndUpdate(productId, {
      title: title,
      desc: desc,
      price: price,
    });

    return await this.productModel.findById(productId).exec();
  }

  async deleteProduct(prodId: string) {
    return await this.productModel.findByIdAndDelete(prodId);
  }
}
