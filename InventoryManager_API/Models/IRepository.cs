namespace Assignment3_Backend.Models
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();
        
        void Add<T>(T entity) where T : class;

        Task<Authentication[]> GetAllAuthenticationsAsync();
        Task<Product[]> GetAllProductsAsync();
        Task<Brand[]> GetAllBrandsAsync();
        //Task<Brand[]> GetBrandsAsync();
        Task<ProductType[]> GetAllProductTypesAsync();
        Task<ProductType[]> GetProductTypesAsync();
        Task<Product> AddProductAsync(Product product);
        Task<ProductType> GetProductTypeAsync(int ProductTypeId);

        Task<Product> DeleteProductAsync(int id);
        Task<Product> AddProduct(Product objProduct);
    }
}
