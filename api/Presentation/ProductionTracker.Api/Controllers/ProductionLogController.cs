using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductionTracker.Application.Features.ProductionLogs.Command.CreateProductionLogs;
using ProductionTracker.Application.Features.ProductionLogs.Queries.GetAllProductionLogs;
using ProductionTracker.Application.Features.Products.Queries.GetAllProducts;
using ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts;

namespace ProductionTracker.Api.Controllers
{
    public class ProductionLogController : BaseApiController
    {
        private readonly IMediator mediator;

        public ProductionLogController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductionLog(CreateProductionLogCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> ProductionLogList([FromQuery] GetAllProductionLogsQueryRequest request)
        {
            var values = await mediator.Send(request);
            return Ok(values);
        }
    }
}
