using Dapper;
using Lab0625.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab0625.WebApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class GanttController : ControllerBase
    {
        private readonly string _connectString = @"Server=.;Database=Lab;Trusted_Connection=True;";

        [HttpGet]
        public IEnumerable<ProcessedExample> GetList()
        {
            using (var conn = new SqlConnection(_connectString))
            {
                var result = conn.Query<Gantt>("SELECT * FROM Gantt").ToList();
                var processedResult = result.Select(item => new ProcessedExample
                {
                    Id = item.id,
                    TimeRange = new List<string>
                    {
                        item.startTime?.ToString("yyyy-mm-dd HH:mm:ss"), 
                        item.endTime?.ToString("yyyy-mm-dd HH:mm:ss")
                    },
                    Status = (int)item.status,
                    Device = item.device.ToString(),
                    Color = item.color,
                    Label = item.label
                }).ToList();

                return processedResult;

            }
        }
    }

    public class ProcessedExample
    {
        public int Id { get; set; }
        public List<string> TimeRange { get; set; }
        public int Status { get; set; }
        public string Device { get; set; }
        public string Color { get; set; }
        public string Label { get; set; }
    }
}
