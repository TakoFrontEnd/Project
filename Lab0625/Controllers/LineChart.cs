using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Lab0625.Controllers
{
    public class LineChartController : Controller 
    {
        private readonly ILogger<LineChartController> _logger;

        public LineChartController(ILogger<LineChartController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
