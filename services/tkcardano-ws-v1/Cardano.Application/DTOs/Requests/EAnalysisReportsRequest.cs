using Cardano.Application.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Requests
{
    public class EAnalysisReportsRequest
    {
        public EAnalysisRequest? EAnalysisRequest { get; set; }

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
