using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProductionTracker.Application.Interfaces.ImageService;
using ProductionTracker.Infrastructure.Configuration;
using ProductionTracker.Infrastructure.ImageService;

namespace ProductionTracker.Infrastructure
{
    public static class Registration
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {

            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

            services.AddScoped<IImageService, CloudinaryImageService>();

            return services;
        }
    }
}