using DomainHealthToolkit.Api.Models;

namespace DomainHealthToolkit.Api.Services;

public class DomainHealthService
{
    private readonly DnsService _dns;
    private readonly SpfService _spf;
    private readonly HealthScoreService _healthScore;

    public DomainHealthService(DnsService dns, SpfService spf, HealthScoreService healthScore)
    {
        _dns = dns;
        _spf = spf;
        _healthScore = healthScore;
    }

    public async Task<DomainHealthResponse> CheckDomain(string domain)
    {
        var response = new DomainHealthResponse
        {
            Domain = domain
        };
        
        if (Uri.TryCreate(domain, UriKind.Absolute, out Uri? uri))
        {
            domain = uri.Host;
        }

        if (string.IsNullOrWhiteSpace(domain))
        {
            return new DomainHealthResponse
            {
                Domain = domain,
                Health = new HealthSection
                {
                    Status = "Invalid",
                    Score = 0,
                    Warnings = new List<string>
                    {
                        "Domain name is required"
                    }
                }
            };
        }

        var aRecords = await _dns.GetARecords(domain);
        var mxRecords = await _dns.GetMxRecords(domain);
        var txtRecords = await _dns.GetTxtRecords(domain);

        var spf = _spf.ExtractSpf(txtRecords);

        var health = _healthScore.CalculateScore(
            aRecords, 
            mxRecords, 
            spf);


        //Data Transfer Object mapping, explicitly controlling the logic that I want to hide from the client
        response.Dns = new DnsSection
        {
            A = aRecords,
            MX = mxRecords,
            TXT = txtRecords
        };

        response.Spf = new SpfSection
        {
            HasSpf = spf.HasSpf,
            SpfRecord = spf.SpfRecord,
            Severity = spf.Severity,
            Warnings = spf.Warnings
        };
        
        response.Health = new HealthSection
        {
            Score = health.Score,
            Status = health.Status,
            Warnings = health.Warnings
        };

        return response;

    }
}