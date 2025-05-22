namespace Assignment3_Backend.ViewModels
{
    public class AddProductVM
    {
       
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public decimal Price { get; set; }
      
            public IFormFile Image { get; set; }
        public int Brand { get; set; }
            public int ProductType { get; set; }

    }
}
/*  public string Image { get; set; } */ // Store image as base64 string