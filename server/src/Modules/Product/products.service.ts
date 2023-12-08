import { CategoryService } from './../Category/category.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './DTO/updateProduct.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly CategoryService: CategoryService,
  ) {}
  // get all
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new Error('Unable to fetch products');
    }
  }

  // filter by category
  async filterByCategory(
    category: string,
    pageNumber: number,
    pageSize: number,
  ) {
    const skip = pageNumber ? (pageNumber - 1) * pageSize : 0;

    const query = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.product_id',
        'product.name',
        'product.number',
        'product.title',
        'product.price',
        'product.sale',
        'product.img',
        'category.name',
        'category.description',
      ])
      .innerJoin('product.category', 'category')
      .where('category.name = :category', { category });

    if (pageNumber && pageSize) {
      query.take(pageSize).skip(skip);
    }

    const [data, count] = await Promise.all([
      query.getMany(),
      this.productRepository.count({
        where: { category: { name: category } },
      }),
    ]);

    return { data, length: count };
  }

  // Phân trang
  async getPaginatedProducts(
    pageIndex: number,
    pageNumber: number,
  ): Promise<{ data: Product[]; length: number }> {
    try {
      const query = this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.product_id',
          'product.name',
          'product.number',
          'product.title',
          'product.price',
          'product.sale',
          'product.img',
        ])
        .leftJoinAndSelect('product.category', 'category');

      const data = await query
        .take(pageNumber)
        .skip((pageIndex - 1) * pageNumber)
        .getMany();

      const length = await this.productRepository.count();

      return { data, length };
    } catch (error) {
      throw new Error('Unable to fetch paginated products');
    }
  }

  // Get product by id
  async getProductById(id: number) {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      queryBuilder
        .leftJoinAndSelect('product.category', 'category')
        .where('product.product_id = :id', { id });

      const product = await queryBuilder.getOne();
      return product;
    } catch (error) {
      throw new Error('Unable to fetch product');
    }
  }

  // Create product
  async createProduct(productData: any, categoryId: number): Promise<any> {
    try {
      const { name, title, price, sale, number, img } = productData;
      // Tìm thông tin về category từ categoryId
      const category = await this.CategoryService.findOne(categoryId);
      // Kiểm tra nếu category tồn tại trước khi gán vào newProduct
      if (category) {
        const newProduct = this.productRepository.create({
          name,
          title,
          price,
          sale,
          number,
          img,
          category, // Gán thông tin category vào newProduct
        });

        await this.productRepository.save(newProduct);

        return { message: 'Create product success' };
      } else {
        return { message: 'Category not found' };
      }
    } catch (error) {
      return { error, message: 'Create product error' };
    }
  }

  async updateProduct(
    productId: number,
    categoryId: number,
    updateProductData: UpdateProductDto,
  ): Promise<any> {
    try {
      const productToUpdate = await this.productRepository.findOne({
        where: { product_id: productId },
        relations: ['category'], // Tùy thuộc vào tên quan hệ trong ProductEntity
      });

      if (!productToUpdate) {
        return { message: 'Product not found' };
      }

      const { name, title, price, sale, number, img } = updateProductData;

      productToUpdate.name = name ?? productToUpdate.name;
      productToUpdate.title = title ?? productToUpdate.title;
      productToUpdate.price = price ?? productToUpdate.price;
      productToUpdate.sale = sale ?? productToUpdate.sale;
      productToUpdate.number = number ?? productToUpdate.number;
      productToUpdate.img = img ?? productToUpdate.img;

      // Lấy thông tin về category từ categoryId
      const categoryIdNumber = Number(categoryId); // Chuyển đổi từ chuỗi sang số

      // Lấy thông tin về category từ categoryId
      const category = await this.CategoryService.findOne(categoryIdNumber);
      console.log(category);

      if (!category) {
        return { message: 'Category not found' };
      }

      productToUpdate.category.category_id = category.category_id;
      console.log(productToUpdate);
      const newUpdateProduct =
        await this.productRepository.create(productToUpdate);
      await this.productRepository.save(newUpdateProduct);

      return { message: 'Product updated successfully' };
    } catch (error) {
      return { error, message: 'Update product error' };
    }
  }



  // Delete product
  async deleteProduct(id: number): Promise<string> {
    try {
      await this.productRepository.delete(id);
      return 'Delete successful';
    } catch (error) {
      throw new Error('Delete not successful');
    }
  }
}
