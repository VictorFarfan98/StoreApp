using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoreApi.DTOs;
using StoreApi.Models;
using StoreApi.Repositories;

namespace StoreApi.Controllers
{
    /// <summary>
    /// All Operations to be performed on Products
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        /// <summary>
        /// Retrieve a single product from a given productId. 
        /// </summary>
        /// <param name="productId"> The Id of the product to retrieve. </param>
        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProduct(int productId)
        {
            var product = await _productRepository.GetProduct(productId);
            if (product == null) 
                return Ok();
            
            return Ok(product);
        }

        /// <summary>
        /// Retrieve a list of all products. 
        /// </summary>
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return Ok(products);
        }

        /// <summary>
        /// Creates a new product.
        /// </summary>
        /// <param name="createProductDTO"> The Product object to be created. </param>
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

        /// <summary>
        /// Deletes a product from a given id.
        /// </summary>
        /// <param name="productId"> The Id of the product to delete. </param>
        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteProduct(int productId)
        {
            await _productRepository.DeleteProduct(productId);
            return Ok();
        }

        /// <summary>
        /// Edit a product from a given id.
        /// </summary>
        /// <param name="productId"> The Id of the product to edit. </param>
        /// <param name="editProductDTO"> The new Product object. </param>
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

        /// <summary>
        /// Triggers the buy action of a product.
        /// </summary>
        /// <param name="productId"> The Id of the product to buy. </param>
        [HttpPatch("{productId}")]
        public async Task<ActionResult> BuyProduct(int productId)
        {
            await _productRepository.BuyProduct(productId);
            return Ok();
        }
    }
}