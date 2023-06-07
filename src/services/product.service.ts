import Product from "../models/Product";
import { IProduct, IProductDBRecord } from "../types/product.type";
import User from "../models/User";

export class ProductService {
  static async create(
    userId: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    const { amount, ...productData } = data;
    const user = await User.findByPk(userId);
    const product = await Product.create({ ...productData });
    return await product.addUser(user, { through: { amount } });
  }

  static async update(
    userId: string,
    id: string,
    data: IProduct
  ): Promise<IProductDBRecord | null> {
    await Product.update(data, { where: { id, userId } });
    return await ProductService.getById(userId, id);
  }

  static async delete(userId: string, id: string) {
    await Product.destroy({ where: { id, userId } });
  }

  static async getAll(userId: string, categoryId: string): Promise<any[]> {
    return await User.getProducts(userId, { categoryId });
  }

  static async getById(
    userId: string,
    id: string
  ): Promise<IProductDBRecord | null> {
    return await User.getProducts(userId, { id });
  }
}
