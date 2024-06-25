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
    public class ExampleController : ControllerBase
    {
        private readonly string _connectString = @"Server=.;Database=Lab;Trusted_Connection=True;";

        [HttpGet]
        public IEnumerable<Example> GetList()
        {
            using (var conn = new SqlConnection(_connectString))
            {
                var result = conn.Query<Example>("SELECT * FROM Example");
                return result;
            }
        }
    }
}
