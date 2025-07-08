using MediatR;


namespace ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops
{
    public class GetAllWorkshopQueryRequest :IRequest<IList<GetAllWorkshopsQueryResponse>>
    {
    }
}
