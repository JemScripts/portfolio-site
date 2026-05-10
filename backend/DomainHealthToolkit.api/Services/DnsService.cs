using DnsClient;

using Microsoft.Extensions.Logging;

namespace DomainHealthToolkit.Api.Services;

public class DnsService
{
    private readonly LookupClient _client;

    private readonly ILogger<DnsService> _logger;

    public DnsService(ILogger <DnsService> logger)
    {
        _client = new LookupClient();
        _logger = logger;
    }

    public async Task<IEnumerable<string>> GetARecords(string domain)
    {
        try 
        {
            var result = await _client.QueryAsync(domain, QueryType.A);

            return result.Answers.ARecords()
            .Where(a => a.Address != null)
            .Select(a => a.Address.ToString());
        }
        catch
        {
            _logger.LogError("Failed to retrieve A records for domain {Domain}", domain);

            return Enumerable.Empty<string>();
        }

    }

    public async Task<IEnumerable<string>> GetMxRecords(string domain)
    {
        try
        {
            var result = await _client.QueryAsync(domain, QueryType.MX);

            return result.Answers.MxRecords()
            .Where(mx => mx.Exchange != null)
            .Select(mx => mx.Exchange.Value);
        }
        catch
        {
            _logger.LogError("Failed to retrieve MX records for domain {Domain}", domain);

            return Enumerable.Empty<string>();
        }
    }

    public async Task<IEnumerable<string>> GetTxtRecords(string domain)
    {
        try
        {
            var result = await _client.QueryAsync(domain, QueryType.TXT);

            return result.Answers.TxtRecords()
            .Where(txt => txt?.Text != null)
            .Select(txt => string.Join("", txt.Text)); 
        } 
        catch
        {
            _logger.LogError("Failed to retrieve TXT records for domain {Domain}", domain);

            return Enumerable.Empty<string>();
        }
        
    }


}