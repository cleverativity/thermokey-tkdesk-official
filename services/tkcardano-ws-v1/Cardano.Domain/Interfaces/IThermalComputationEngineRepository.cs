using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Computation
{
    public interface IThermalComputationEngine
    {
        void CapacitySearch(
           IList<Condenser> condensers,
           CondenserSearch condenserSearch);

        IList<Performance> GeneratePerformance(
            IList<Accessories> accessories,
            int selectedModelId,
            int condenserId,
            string? remoteModel,
            string? fansConnection,
            string? unitsType,
            string? flowDirection,
            string? refrigerantType,
            double distance,
            double condensing,
            double thermalCapacity,
            double dryBulb,
            double altitude,
            double compressor,
            double subCooling,
            double atmPressureInMetric,
            double relHumidity,
            double capacityAdjustment,
            double newAirFlow);

        PaginatedCondenserResult Computation(
               IList<Condenser> condensers,
               IList<Accessories> accessories,
               CondenserSearch condenserSearch,
               int page,
               int pageSize,
               string query);

        IList<RatingMatch> SelectRatedUnits(
               IList<Condenser> condensers,
               RatingSearch search);

        RatingMatch? CalculateRatedUnit(
               IList<Condenser> condensers,
               RatingSearch search,
               int condenserId);

        IList<AccessoriesItems> AccessoriesItems(
           IList<Condenser> condenser,
           IList<AccessoriesItems> accessoriesItems,
           int conderserId,
           string? condenserModel);

        IList<AccessoriesDetails> GenerateAccessoriesPrice(
           IList<Accessories> accessories,
           IList<Condenser> condenser,
           IList<AccessoriesItems> accessoriesItems,
           int conderserId,
           string? remoteModel,
           string? refrigerantType,
           string? flowDirection,
           string? fansConnection,
           double accessoriesDiscount,
           double unitDiscount,
           params int[] ItemChoice);

        IList<AccessoriesWithPrice> GenerateAccessoriesWithPrice(
          IList<Accessories> accessories,
          IList<Condenser> condenser,
          IList<AccessoriesItems> accessoriesItems,
          int conderserId,
          string? remoteModel,
          string? refrigerantType,
          string? flowDirection,
          string? fansConnection,
          double accessoriesDiscount,
          double unitDiscount);
    }
}
