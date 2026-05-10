namespace DomainHealthToolkit.Api.Models;

public class SpfResults
{
    public bool HasSpf { get; set; }

    public string? SpfRecord { get; set; }

    public bool HasMultipleSpf { get; set; }

    public string Status { get; set; } = "Unknown";

    public string Severity { get; set; } = "Unknown";

    public List<string> Warnings { get; set; } = new();
}