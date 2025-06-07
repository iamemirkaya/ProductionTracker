using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Beheviors;
using ProductionTracker.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application
{
    public static class Registration
    {

        public static void AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();



            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));

            services.AddTransient<ExceptionMiddleware>();

            services.AddRulesFromAssemblyContaining(assembly, typeof(BaseRules));

            services.AddScoped<ExceptionMiddleware>();

            services.AddValidatorsFromAssembly(assembly);
            ValidatorOptions.Global.LanguageManager.Culture = new CultureInfo("tr");

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(FluentValidationBehevior<,>));

        }

        private static IServiceCollection AddRulesFromAssemblyContaining(
            this IServiceCollection services,
            Assembly assembly,
            Type baseRuleType)
        {
            var types = assembly.GetTypes()
                .Where(t => t.IsSubclassOf(baseRuleType) && t != baseRuleType)
                .ToList();

            foreach (var type in types)
            {
                services.AddScoped(type);
            }

            return services;
        }

    }
}
