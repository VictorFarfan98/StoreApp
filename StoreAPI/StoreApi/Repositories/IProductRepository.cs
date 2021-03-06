using System.Collections.Generic;
using System.Threading.Tasks;
using StoreApi.Filters;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public interface IProductRepository
    {
        Task<Product> GetProduct(int productId);
        Task<IEnumerable<Product>> GetAllProducts(PaginationFilter validFilter);
        Task AddProduct(Product product);
        Task DeleteProduct(int productId);
        Task EditProduct(Product product);
        Task BuyProduct(int productId);
        Task<int> GetProductsCount();
    }
}