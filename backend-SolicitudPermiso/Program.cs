using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace backend_SolicitudPermiso
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((builderContext, config) =>
            {
                config.SetBasePath(builderContext.HostingEnvironment.ContentRootPath)
                    .AddJsonFile($"appsettings.json", optional: false, reloadOnChange: false)
                    .AddEnvironmentVariables();
            })
            .ConfigureLogging((builderContext, loggingBuilder) =>
            {
                loggingBuilder.ClearProviders(); 

                //Enable Microsoft Console Logging
                loggingBuilder.AddConfiguration(builderContext.Configuration.GetSection("Logging"));

                loggingBuilder.AddConsole((options) =>
                {
                    options.IncludeScopes = Convert.ToBoolean(builderContext.Configuration["Logging:IncludeScopes"]);
                });
            })
            .UseStartup<Startup>();
    }
}
