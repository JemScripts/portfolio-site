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

    public async Task<object> CheckDomain(string domain)
    {
        if (string.IsNullOrWhiteSpace(domain))
        {
            return new
            {
                Status = "Invalid",
                Message = "Domain name is required"
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



        return new
        {
            Domain = domain,

            DNS = new
            {
                A = aRecords,
                MX = mxRecords,
                TXT = txtRecords
            },
            SPF = spf,

            Health = health
        };

    }
}