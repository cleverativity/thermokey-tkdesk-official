using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Claims;

namespace Cardano.Application.Services
{
    /// <summary>
    /// Uses AdminInitiateAuth so no app-client auth flow (USER_PASSWORD_AUTH) is required.
    /// Requires IAM credentials (env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) with
    /// permission cognito-idp:AdminInitiateAuth on this User Pool.
    /// </summary>
    public class CognitoAuthService : ICognitoAuthService
    {
        private readonly IAmazonCognitoIdentityProvider _client;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CognitoAuthService(
            IAmazonCognitoIdentityProvider client,
            IConfiguration config,
            IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            _config = config;
            _httpContextAccessor = httpContextAccessor;
        }

        //public async Task<AuthenticationResultType> LoginAsync(string username, string password)
        //{
        //    var userPoolId = _config["AWS:CognitoUserPoolId"]
        //        ?? throw new InvalidOperationException("AWS:CognitoUserPoolId is not configured.");
        //    var clientId = _config["AWS:CognitoClientId"]
        //        ?? throw new InvalidOperationException("AWS:CognitoClientId is not configured.");

        //    var request = new AdminInitiateAuthRequest
        //    {
        //        UserPoolId = userPoolId,
        //        ClientId = clientId,
        //        AuthFlow = AuthFlowType.ADMIN_NO_SRP_AUTH,
        //        AuthParameters = new Dictionary<string, string>
        //        {
        //            { "USERNAME", username },
        //            { "PASSWORD", password }
        //        }
        //    };

        //    var response = await _client.AdminInitiateAuthAsync(request);

        //    if (response.AuthenticationResult != null)
        //        return response.AuthenticationResult;

        //    throw new InvalidOperationException(
        //        $"Cognito returned challenge: {response.ChallengeName}. Complete the challenge or contact your AWS admin.");
        //}

        public Task<CaradanoBearerResponse> GetBearerDetails()
        {
            var user = _httpContextAccessor.HttpContext?.User
                ?? throw new InvalidOperationException("No authenticated user in the current request.");

            string GetClaim(string type)
                => user.FindFirst(type)?.Value ?? string.Empty;

            var sub = GetClaim(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(sub))
                sub = GetClaim("sub");

            var response = new CaradanoBearerResponse
            {
                Sub = sub,
                Email = GetClaim(ClaimTypes.Email) ?? GetClaim("email"),
                Username = user.Identity?.Name ?? string.Empty,
                Iss = GetClaim("iss"),
                ExpClaim = GetClaim("exp"),
                ExpiresAt = ParseExpiry(GetClaim("exp"))
            };

            return Task.FromResult(response);
        }

        private static string ParseExpiry(string expValue)
        {
            if (long.TryParse(expValue, out var seconds))
            {
                // epoch seconds -> ISO format
                return DateTimeOffset.FromUnixTimeSeconds(seconds).ToString("o");
            }

            return expValue;
        }
    }
}