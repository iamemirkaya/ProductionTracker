using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductionTracker.Application.Features.Workshops.Command.CreateWorkshop;
using ProductionTracker.Application.Features.Workshops.Command.DeleteWorkshop;
using ProductionTracker.Application.Features.Workshops.Command.UpdateWorkshop;
using ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops;
using ProductionTracker.Application.Features.Workshops.Queries.GetWorkshopById;

namespace ProductionTracker.Api.Controllers
{
    public class WorkshopController : BaseApiController
    {

        private readonly IMediator mediator;

        public WorkshopController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkshop(CreateWorkshopCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> WorkshopList()
        {
            var values = await mediator.Send(new GetAllWorkshopQueryRequest());
            return Ok(values);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkshop(Guid id)
        {
            var deleteCommand = new DeleteWorkshopCommandRequest { Id = id };
            await mediator.Send(deleteCommand);
            return Ok("Atölye başarıyla silindi.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateWorkshop([FromForm] UpdateWorkshopCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkshopById(Guid id)
        {
            var query = new GetWorkshopByIdQueryRequest { Id = id };
            var result = await mediator.Send(query);
            return Ok(result);
        }
    }
}
