using DomainHealthToolkit.Api.Models;

namespace DomainHealthToolkit.Api.Services;

public class SpfService
{
    public SpfResults ExtractSpf(IEnumerable<string> txtRecords)
    {
        var spfRecords = txtRecords
        .Where(r => r.StartsWith("v=spf1", StringComparison.OrdinalIgnoreCase))
        .ToList();
    
    var result = new SpfResults();

    if (spfRecords.Count == 0)
        {
            result.Severity = "Critical";
            result.Warnings.Add("No SPF record found which can lead to email spoofing and phishing attacks");
            result.HasSpf = false;
            result.Status = "Missing";
            return result;
        }

        result.HasSpf = true;
        result.SpfRecord = spfRecords.First();

        var spfRecord = result.SpfRecord;

        if (spfRecord.Contains("all")){
            result.Severity = "Critical";
            result.Warnings.Add("SPF record contains +all which is highly insecure");
        }
        else if (spfRecord.Contains("?all")){
            result.Severity = "Warning";
            result.Warnings.Add("SPF record uses ?all (neutral) which is not recommended");
        }
        else if (spfRecord.Contains("~all"))
        {
            result.Severity = "Warning";
            result.Warnings.Add("SPF record uses ~all (soft fail) which is less secure");
        }
        else if (spfRecord.Contains("-all")) {
            result.Severity = "Good";
            result.Warnings.Add("SPF record uses -all (hard fail) which is the most secure");
        }
        else
        {
            result.Severity = "Unknown";
            result.Warnings.Add("Unable to determine SPF policy strength");
        }

        result.HasMultipleSpf = spfRecords.Count > 1;

        if (result.HasMultipleSpf)
        {
            result.Warnings.Add("Multiple SPFs have been detected which can cause email delivery issues. Only one SPF record should be published per domain.");
        }

        result.Status = result.HasMultipleSpf ? "Warning" : "OK";

        return result;
    }
}