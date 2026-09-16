using Cardano.Application.Common.Enums;
using System.Text.Json.Serialization;

namespace Cardano.Application.DTOs.Requests
{

    public class PerformaceReportRequest
    {
        public PerformanceRequest? PerfRequest { get; set; }
        public AccessoriesSelectedRequest? AccessPriceRequest { get; set; }


        [JsonIgnore]
        public SupportedLanguage Language { get; set; } = SupportedLanguage.English;

        [JsonPropertyName("Language")]
        public string LanguageCode
        {
            get => Language switch
            {
                SupportedLanguage.English => "en-US",
                SupportedLanguage.Italian => "it-IT",
                _ => "en-US"
            };
            set
            {
                Language = value?.ToUpper() switch
                {
                    "EN-US" or "ENGLISH" => SupportedLanguage.English,
                    "IT-IT" or "ITALIAN" => SupportedLanguage.Italian,
                    _ => SupportedLanguage.English
                };
            }
        }
    }
}
