using System.Net;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info($"C# HTTP trigger function processed a request. RequestUri={req.RequestUri}");

    // Get request body
    dynamic data = await req.Content.ReadAsAsync<object>();

    var response = req.CreateResponse(HttpStatusCode.OK, "Hello from Azure Functions!");
    response.Headers.Add("Access-Control-Allow-Origin", "*");

    return response;
}