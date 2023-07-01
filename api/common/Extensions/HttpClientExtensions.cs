using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Common.Extensions;

public static class HttpClientExtensions
{
    public static async Task<T> GetAsAsync<T>(this HttpClient client, string url)
    {
        var jsonOptions = new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true,
            Converters = {
                new JsonStringEnumConverter()
            }
        };

        var response = await client.GetAsync(url);
        var json = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<T>(json, jsonOptions);
    }

    public static async Task<HttpResponseMessage> PutAsAsync<T>(this HttpClient client, string url, T payload)
    {
        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        return await client.PutAsync(url, content);
    }

    public static async Task<TResponse> PostAsAsync<T, TResponse>(this HttpClient client, string url, T payload)
    {
        var jsonOptions = new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true,
            Converters = {
                new JsonStringEnumConverter()
            }
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(url, content);
        var jsonResponse = await response.Content.ReadAsStringAsync();
        
        return JsonSerializer.Deserialize<TResponse>(jsonResponse, jsonOptions);
    }

    public static async Task DeleteAsync<T>(this HttpClient client, string url)
    {
        _ = await client.DeleteAsync(url);
    }
}