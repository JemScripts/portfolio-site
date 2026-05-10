namespace DomainHealthToolkit.Api.Models;

public class HealthScoreResult
{
    public int Score { get; set; }
    
    public string Status { get; set; } = "Unknown";

    public List<string> Warnings { get; set; } = new();
}