using Assignment3_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Assignment3_Backend.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Assignment3_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {

        private readonly AppDbContext _context; 

        public ReportController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("products-by-brands")]
        public async Task<IActionResult> GetProductsByBrands()
        {
            var result = await _context.Products
                .Where(p => p.IsActive)
                .Select(p => new { BrandName = p.Brand.Name })
                .GroupBy(p => p.BrandName)
                .Select(g => new { Brand = g.Key, Count = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("products-by-types")]
        public async Task<IActionResult> GetProductsByTypes()
        {
            var result = await _context.Products
                .Where(p => p.IsActive)
                .Select(p => new { ProductTypeName = p.ProductType.Name })
                .GroupBy(p => p.ProductTypeName)
                .Select(g => new { ProductType = g.Key, Count = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("top-10-expensive")]
        public async Task<IActionResult> GetTop10ExpensiveProducts()
        {
            var products = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductType)
                .OrderByDescending(p => p.Price)
                .Take(10)
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.Price,
                    p.Description,
                    BrandName = p.Brand.Name,
                    ProductTypeName = p.ProductType.Name
                })
                .ToListAsync();

            return Ok(products);
        }
    }
}
