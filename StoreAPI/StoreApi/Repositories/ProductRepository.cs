using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IDataContext _context;
        public ProductRepository(IDataContext context)
        {
            _context = context;
        }
        public async Task AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task BuyProduct(int productId)
        {
            var productToBuy = await _context.Products.FindAsync(productId);
            if (productToBuy == null) 
                throw new NullReferenceException();

            if (productToBuy.Stock <= 0) {
                throw new InvalidOperationException();    
            }
            
            productToBuy.Stock = productToBuy.Stock - 1;
            productToBuy.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(int productId)
        {
            var productToDelete = await _context.Products.FindAsync(productId);
            if (productToDelete == null)
                throw new NullReferenceException();
            
            _context.Products.Remove(productToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task EditProduct(Product product)
        {
            var productToEdit = await _context.Products.FindAsync(product.ProductId);
            if (productToEdit == null) 
                throw new NullReferenceException();
            
            productToEdit.Name = product.Name;
            productToEdit.Price = product.Price;
            productToEdit.Stock = product.Stock;
            productToEdit.UpdatedAt = product.UpdatedAt;

            await _context.SaveChangesAsync();
        }   

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProduct(int productId)
        {
            return await _context.Products.FindAsync(productId);
        }
    }
}