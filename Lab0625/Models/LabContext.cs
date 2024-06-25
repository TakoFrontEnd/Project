using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Lab0625.Models
{
    public partial class LabContext : DbContext
    {
        public LabContext()
        {
        }

        public LabContext(DbContextOptions<LabContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Example> Example { get; set; }
        public virtual DbSet<Gantt> Gantt { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Example>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.date).HasColumnType("datetime");

                entity.Property(e => e.id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Gantt>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.color).HasMaxLength(50);

                entity.Property(e => e.endTime).HasColumnType("datetime");

                entity.Property(e => e.id).ValueGeneratedOnAdd();

                entity.Property(e => e.label).HasMaxLength(50);

                entity.Property(e => e.startTime).HasColumnType("datetime");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
