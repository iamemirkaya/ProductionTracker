using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Shifts.BusinessRules;
using ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Features.Workshops.Queries.GetWorkshopById;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Queries.GetShiftById
{
    public class GetShiftByIdQueryHandler : BaseHandler, IRequestHandler<GetShiftByIdQueryRequest, GetAllShiftsQueryResponse>
    {
        private readonly IMapper mapper;
        private readonly ShiftBusinessRules shiftBusinessRules;
        public GetShiftByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper, ShiftBusinessRules shiftBusinessRules) : base(unitOfWork)
        {
            this.mapper = mapper;
            this.shiftBusinessRules = shiftBusinessRules;
        }

        public async Task<GetAllShiftsQueryResponse> Handle(GetShiftByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var workshopRepository = unitOfWork.GetReadRepository<Shift>();

            var workshop = await shiftBusinessRules.EnsureShiftExists(request.Id);

            var response = mapper.Map<GetAllShiftsQueryResponse, Shift>(workshop);

            return response;
        }
    }
}
