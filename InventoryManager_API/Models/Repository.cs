using Microsoft.EntityFrameworkCore;

namespace Assignment3_Backend.Models
{
    public class Repository:IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<Authentication[]> GetAllAuthenticationsAsync()
        {
            IQueryable<Authentication> query = _appDbContext.Authentications;
            return await query.ToArrayAsync();
        }
        public async Task<Product[]> GetAllProductsAsync()
        {
            IQueryable<Product> query = _appDbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductType);
            return await query.ToArrayAsync();
        }


        public async Task<Brand[]> GetAllBrandsAsync()
        {
            IQueryable<Brand> query = _appDbContext.Brands;
            return await query.ToArrayAsync();
        }

        //public async Task<Brand> GetBrandsAsync(int brandId)
        //{
        //    return await _appDbContext.Brands.FindAsync(brandId);

        //}
        public async Task<ProductType[]> GetAllProductTypesAsync()
        {
            IQueryable<ProductType> query = _appDbContext.ProductTypes;
            return await query.ToArrayAsync();
        }
      
        public async Task<ProductType[]> GetProductTypesAsync()
        {
            IQueryable<ProductType> query = _appDbContext.ProductTypes;
            return await query.ToArrayAsync();

        }

        public async Task<ProductType> GetProductTypeAsync(int ProductTypeId)
        {
            return await _appDbContext.ProductTypes.FindAsync(ProductTypeId);
        }

        public async Task<Product> AddProduct(Product objProduct)
        {
            _appDbContext.Products.Add(objProduct);
            await _appDbContext.SaveChangesAsync();
            return objProduct;
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            _appDbContext.Products.Add(product);
            await _appDbContext.SaveChangesAsync();
            return product;
        }

        public async Task<Product> DeleteProductAsync(int id)
        {
            var product = await _appDbContext.Products.FindAsync(id);
            if (product == null)
                return null;

            _appDbContext.Products.Remove(product);
            await _appDbContext.SaveChangesAsync();
            return product;
        }
    }

    // Suggestions
    public class Authentication
    {
    }
}
