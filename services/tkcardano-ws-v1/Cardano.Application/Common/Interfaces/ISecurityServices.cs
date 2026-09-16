namespace Cardano.Application.Common.Interfaces;

public interface IJwtService
{
    string GenerateToken(int userId, string username, string email, string role);
    string GenerateRefreshToken();
    bool ValidateToken(string token);
    (int userId, string username, string role) GetTokenClaims(string token);
}

public interface IPasswordService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hash);
}

public interface ICurrentUserService
{
    int? UserId { get; }
    string? Username { get; }
    string? Role { get; }
    bool IsAuthenticated { get; }
}