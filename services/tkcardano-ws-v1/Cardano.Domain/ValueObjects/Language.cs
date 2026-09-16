using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.ValueObjects
{
    public class Language
    {
        public SupportedLanguage Value { get; }

        public Language(SupportedLanguage value) => Value = value;

        public static Language FromCode(string? code)
        {
            //New c# 8 switch and matching pattern with var
            var parsed = code?.Trim().ToUpperInvariant() switch
            {
                "EN-US" or "ENGLISH" => SupportedLanguage.English,
                "IT-IT" or "ITALIAN" => SupportedLanguage.Italian,
                _ => SupportedLanguage.English
            };

            return new Language(parsed);
        }

        public static Language English => new(SupportedLanguage.English);
        public static Language Italian => new(SupportedLanguage.Italian);

        public override bool Equals(object? obj) => obj is Language other && Value == other.Value;

        public override int GetHashCode() => Value.GetHashCode();
    }

    public enum SupportedLanguage
    {
        English,
        Italian
    }
}