using AutoMapper;
using ProductionTracker.Application.Features.ProductionLogs.Queries.GetAllProductionLogs;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProductionTracker.Application.MappingProfiles
{
    public class ProductionLogProfile : Profile
    {
        public ProductionLogProfile()
        {
            CreateMap<ProductionLog, GetAllProductionLogsQueryResponse>()
                .ForMember(dest => dest.ShiftName, opt => opt.MapFrom(src => src.Shift.Name))
                .ForMember(dest => dest.WorkshopName, opt => opt.MapFrom(src => src.Workshop.Name))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));
        }
    }
}
