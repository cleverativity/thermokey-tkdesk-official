namespace Cardano.Application.Common.Exceptions
{
    public class CondenserModelNotFoundException : Exception
    {
        public string ModelName { get; }

        public CondenserModelNotFoundException(string modelName)
            : base($"Condenser model '{modelName}' was not found.")
        {
            ModelName = modelName;
        }
    }
}
