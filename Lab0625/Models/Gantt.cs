using System;
using System.Collections.Generic;

#nullable disable

namespace Lab0625.Models
{
    public partial class Gantt
    {
        public int id { get; set; }
        public DateTime? startTime { get; set; }
        public DateTime? endTime { get; set; }
        public int? status { get; set; }
        public int? device { get; set; }
        public string color { get; set; }
        public string label { get; set; }
    }
}
