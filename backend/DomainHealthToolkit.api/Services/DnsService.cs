using DnsClient;

namespace DomainHealthToolkit.Api.Services;

public class DnsService
{
    private readonly LookupClient _client;

    public DnsService()
    {
        _client = new LookupClient();
    }

    public async Task<IEnumerable<string>> GetARecords(string domain)
    {
        var result = await _client.QueryAsync(domain, QueryType.A);
        return result.Answers.ARecords()?
            .Select(a => a.Address.ToString())
            ?? Enumerable.Empty<string>();
    }

    public async Task<IEnumerable<string>> GetMxRecords(string domain)
    {
        var result = await _client.QueryAsync(domain, QueryType.MX);
        return result.Answers.MxRecords()?
            .Select(mx => mx.Exchange.Value)
            ?? Enumerable.Empty<string>();
    }

    public async Task<IEnumerable<string>> GetTxtRecords(string domain)
    {
        var result = await _client.QueryAsync(domain, QueryType.TXT);
        return result.Answers.TxtRecords()?
            .Select(txt => string.Join("", txt.Text))
            ?? Enumerable.Empty<string>();
    }


}