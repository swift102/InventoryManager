using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment3_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StoreController : ControllerBase
    {
        private readonly IRepository _repository;

        public StoreController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Route("addProducts")]
        public async Task<IActionResult> AddProducts([FromForm] AddProductVM productVM)
        {
            string base64Image = null;
            if (productVM.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productVM.Image.CopyToAsync(memoryStream);
                    var imageBytes = memoryStream.ToArray();
                    base64Image = Convert.ToBase64String(imageBytes);
                }
            }

            var products = new Product
            {
                Name = productVM.Name,
                Description = productVM.Description,
                Price = productVM.Price,
                Image = base64Image,
                BrandId = productVM.Brand,
                ProductTypeId = productVM.ProductType
            };

            var addedProduct = await _repository.AddProductAsync(products);
            return Ok(addedProduct);
        }

        [HttpGet("ProductListing")]
        public async Task<IActionResult> ProductListing()
        {
            var products = await _repository.GetAllProductsAsync();
            var productViewModels = products.Select(p => new ProductViewModel
            {
                price = p.Price,
                ProductTypeId = p.ProductTypeId,
                brandId = p.BrandId,
                description = p.Description,
                name = p.Name,
                image = p.Image,
                ProductTypeName = p.ProductType.Name,
                BrandName = p.Brand.Name
            }).ToArray();

            return Ok(productViewModels);
        }
           

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deletedProduct = await _repository.DeleteProductAsync(id);
            if (deletedProduct == null)
            {
                return NotFound();
            }

            return Ok(deletedProduct);
        }

        [HttpGet("GetBrands")]
        public async Task<IActionResult> GetBrands()
        {
            var brands = await _repository.GetAllBrandsAsync();
            return Ok(brands);
        }

       


        [HttpGet("GetProductTypes")]
        public async Task<IActionResult> GetProductTypes()
        {
            var productTypes = await _repository.GetAllProductTypesAsync();
            return Ok(productTypes);
        }
    }
}
