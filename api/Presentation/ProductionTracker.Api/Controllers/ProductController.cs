﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductionTracker.Application.Features.Products.Command.CreateProduct;
using ProductionTracker.Application.Features.Products.Command.DeleteProduct;
using ProductionTracker.Application.Features.Products.Command.UpdateProduct;
using ProductionTracker.Application.Features.Products.Queries.GetAllProducts;

namespace ProductionTracker.Api.Controllers
{
    public class ProductController : BaseApiController
    {

        private readonly IMediator mediator;

        public ProductController(IMediator mediator)
        {
            this.mediator = mediator;
        }


        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> ProductList()
        {
            var values = await mediator.Send(new GetAllProductsQueryRequest());
            return Ok(values);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromForm] UpdateProductCommandRequest request)
        {
            request.Id = id;
            await mediator.Send(request);
            return Ok("Ürün başarıyla güncellendi.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var deleteCommand = new DeleteProductCommandRequest { Id = id };
            await mediator.Send(deleteCommand);
            return Ok("Ürün başarıyla silindi.");
        }
    }
}
