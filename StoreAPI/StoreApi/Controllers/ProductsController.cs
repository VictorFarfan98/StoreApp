using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoreApi.DTOs;
using StoreApi.Filters;
using StoreApi.Helpers;
using StoreApi.Models;
using StoreApi.Repositories;
using StoreApi.Services;

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
        private readonly IUriService _uriService;
        public ProductsController(IProductRepository productRepository, IUriService uriService)
        {
            _productRepository = productRepository;
            _uriService = uriService;
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
                return Ok(new Response<Product>());
            
            return Ok(new Response<Product>(product));
        }

        /// <summary>
        /// Retrieve a list of all products. 
        /// </summary>
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var products = await _productRepository.GetAllProducts(validFilter);
            var totalRecords = await _productRepository.GetProductsCount();

            var pagedReponse = PaginationHelper.CreatePagedReponse<Product>(products, validFilter, totalRecords, _uriService, route);
            return Ok(pagedReponse);
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
            return Ok(new Response<Product>());
        }

        /// <summary>
        /// Deletes a product from a given id.
        /// </summary>
        /// <param name="productId"> The Id of the product to delete. </param>
        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteProduct(int productId)
        {
            await _productRepository.DeleteProduct(productId);
            return Ok(new Response<Product>());
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
            return Ok(new Response<Product>());
        }

        /// <summary>
        /// Triggers the buy action of a product.
        /// </summary>
        /// <param name="productId"> The Id of the product to buy. </param>
        [HttpPatch("{productId}")]
        public async Task<ActionResult> BuyProduct(int productId)
        {
            await _productRepository.BuyProduct(productId);
            return Ok(new Response<Product>());
        }
    }
}