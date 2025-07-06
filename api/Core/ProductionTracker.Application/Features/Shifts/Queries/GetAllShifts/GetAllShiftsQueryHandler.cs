using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts
{
    public class GetAllShiftsQueryHandler : BaseHandler, IRequestHandler<GetAllShiftQueryRequest, IList<GetAllShiftsQueryResponse>>
    {
        private readonly IMapper mapper;
        public GetAllShiftsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork)
        {
            this.mapper = mapper;
        }

        public async Task<IList<GetAllShiftsQueryResponse>> Handle(GetAllShiftQueryRequest request, CancellationToken cancellationToken)
        {
            var shiftRepository = unitOfWork.GetReadRepository<Shift>();
            var shifts = await shiftRepository.GetAllAsync();



            return mapper.Map<GetAllShiftsQueryResponse, Shift>(shifts);
        }
    }
}
