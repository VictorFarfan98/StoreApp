using System;

namespace StoreApi.Models
{
    /// <summary>
    /// The Product model.
    /// </summary>
    public class Product
    {
        /// <summary>
        /// The Id of the Product.
        /// </summary>
        public int ProductId { get; set; }
        /// <summary>
        /// The Name of the Product.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The Price of the Product.
        /// </summary>
        public decimal Price { get; set; }
        /// <summary>
        /// The amount of current stock for the Product.
        /// </summary>
        public int Stock { get; set; }
        /// <summary>
        /// The Date of the creation of the Product.
        /// </summary>
        public DateTime CreatedAt { get; set; }
        /// <summary>
        /// The Date of the last modification made to the Product.
        /// </summary>
        public DateTime UpdatedAt { get; set; }
        
    }
}