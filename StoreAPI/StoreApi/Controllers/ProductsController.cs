using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoreApi.DTOs;
using StoreApi.Models;
using StoreApi.Repositories;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProduct(int productId)
        {
            var product = await _productRepository.GetProduct(productId);
            if (product == null) 
                return Ok();
            
            return Ok(product);
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return Ok(products);
        }

        [HttpPost("")]
        public async Task<ActionResult> CreateProduct(CreateProductDTO createProductDTO)
        {
            Product product = new()
            {
                Name = createProductDTO.Name,
                Price = createProductDTO.Price,
                Stock = createProductDTO.Stock,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            await _productRepository.AddProduct(product);
            return Ok();
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteProduct(int productId)
        {
            await _productRepository.DeleteProduct(productId);
            return Ok();
        }

        [HttpPut("{productId}")]
        public async Task<ActionResult> EditProduct(int productId, EditProductDTO editProductDTO)
        {
            Product product = new()
            {
                ProductId = productId,
                Name = editProductDTO.Name,
                Price = editProductDTO.Price,
                Stock = editProductDTO.Stock,
                UpdatedAt = DateTime.Now
            };

            await _productRepository.EditProduct(product);
            return Ok();
        }

        [HttpPatch("{productId}")]
        public async Task<ActionResult> BuyProduct(int productId)
        {
            await _productRepository.BuyProduct(productId);
            return Ok();
        }
    }
}