namespace DomainHealthToolkit.Api.Services;

public class DomainHealthService
{
    private readonly DnsService _dns;

    public DomainHealthService(DnsService dns)
    {
        _dns = dns;
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

        return new
        {
            Domain = domain,
            Status = "OK",
            ARecords = aRecords,
            MXRecords = mxRecords,
            TXTRecords = txtRecords
        };
    }
}