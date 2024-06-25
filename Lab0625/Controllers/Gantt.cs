using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab0625.Controllers
{
    public class GanttController : Controller
    {
        private readonly ILogger<GanttController> _logger;

        public GanttController(ILogger<GanttController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
