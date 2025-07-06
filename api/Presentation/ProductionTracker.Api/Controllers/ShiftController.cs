using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductionTracker.Application.Features.Shifts.Command.CreateShift;
using ProductionTracker.Application.Features.Shifts.Command.DeleteShift;
using ProductionTracker.Application.Features.Shifts.Command.UpdateShift;
using ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts;
using ProductionTracker.Application.Features.Shifts.Queries.GetShiftById;

namespace ProductionTracker.Api.Controllers
{
    public class ShiftController : BaseApiController
    {
        private readonly IMediator mediator;

        public ShiftController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateShift(CreateShiftCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> ShiftList()
        {
            var values = await mediator.Send(new GetAllShiftQueryRequest());
            return Ok(values);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShift(Guid id)
        {
            var deleteCommand = new DeleteShiftCommandRequest { Id = id };
            await mediator.Send(deleteCommand);
            return Ok("Atölye başarıyla silindi.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateShift(UpdateShiftCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetShiftById(Guid id)
        {
            var query = new GetShiftByIdQueryRequest { Id = id };
            var result = await mediator.Send(query);
            return Ok(result);
        }
    }
}
