namespace DomainHealthToolkit.Api.Services;

using DomainHealthToolkit.Api.Models;

public class HealthScoreService
{
    public HealthScoreResult CalculateScore(
        IEnumerable<string> aRecords,
        IEnumerable<string> mxRecords,
        SpfResults spf)
    {
        var result = new HealthScoreResult
        {
            Score = 100
        };

        if (!aRecords.Any())
        {
            result.Score -= 20;
            result.Warnings.Add("No A records found which can lead to website downtime");
        }

        if (!mxRecords.Any())
        {
            result.Score -= 20;
            result.Warnings.Add("No MX records found which can lead to email delivery issues");
        }

        if (!spf.HasSpf)
        {
            result.Score -= 40;
        }

        if (spf.HasMultipleSpf)
        {
            result.Score = 20;
        }

        result.Warnings.AddRange(spf.Warnings);

        if (result.Score >= 80)
        {
            result.Status = "Healthy";
        }
        else if (result.Score >= 50)
        {
            result.Status = "Warning";
        }
        else
        {
            result.Status = "Critical";
        }

        return result;
    }
}