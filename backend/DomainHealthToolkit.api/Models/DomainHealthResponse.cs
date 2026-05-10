namespace DomainHealthToolkit.Api.Models;

public class DomainHealthResponse
{
    public string Domain { get; set; } = string.Empty;

    public HealthSection Health { get; set; } = new();

    public DnsSection Dns { get; set; } = new();

    public SpfSection Spf { get; set; } = new();
}

public class DnsSection
{
    public IEnumerable<string> A { get; set; }
    public IEnumerable<string> MX { get; set;}
    public IEnumerable<string> TXT { get; set;}
}

public class SpfSection
{
    public bool HasSpf { get; set; }
    public string? SpfRecord { get; set; }
    public string Severity { get; set; } = "Unknown";
    public List<string> Warnings { get; set; } = new();
}

public class HealthSection
{
    public int Score { get; set; }
    public string Status { get; set; } = "Unknown";
    public List<string> Warnings { get; set; } = new();
}