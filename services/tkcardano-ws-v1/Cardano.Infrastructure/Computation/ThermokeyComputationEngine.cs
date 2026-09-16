using Cardano.Application.Interfaces.Computation;
using Cardano.Computation;
using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Infrastructure.Computation
{
    public class ThermokeyComputationEngine : IThermalComputationEngine
    {
        private readonly ThermokeyCondensers _thermokeyCondensers;

        public ThermokeyComputationEngine()
        {
            _thermokeyCondensers = new ThermokeyCondensers();
        }

        public void CapacitySearch(IList<Condenser> condensers, CondenserSearch condenserSearch)
        {
            _thermokeyCondensers.CapacitySearch(condensers.ToList(), condenserSearch,"si");
        }

        public PaginatedCondenserResult Computation(IList<Condenser> condensers, IList<Accessories> accessories, CondenserSearch condenserSearch, int page, int pageSize, string query)
        {
            return _thermokeyCondensers.Computation(
                condensers.ToList(),
                accessories.ToList(),
                condenserSearch,
                page,
                pageSize,
                query
            );
        }

        public IList<RatingMatch> SelectRatedUnits(IList<Condenser> condensers, RatingSearch search)
        {
            var ratingCondenser = new RatingCondenser();
            return ratingCondenser.SelectUnits(condensers.ToList(), search);
        }

        public RatingMatch? CalculateRatedUnit(IList<Condenser> condensers, RatingSearch search, int condenserId)
        {
            var ratingCondenser = new RatingCondenser();
            return ratingCondenser.CalculateUnit(condensers.ToList(), search, condenserId);
        }

        public IList<Performance> GeneratePerformance(IList<Accessories> accessories, int selectedModelId, int condenserId, string? remoteModel, string? fansConnection, string? unitsType, string? flowDirection, string? refrigerantType, double distance, double condensing, double thermalCapacity, double dryBulb, double altitude, double compressor, double subCooling, double atmPressureInMetric, double relHumidity, double capacityAdjustment, double newAirFlow)
        {
            return _thermokeyCondensers.GeneratePerformance(
                accessories.ToList(),
                selectedModelId,
                condenserId,
                remoteModel,
                fansConnection,
                unitsType,
                flowDirection,
                refrigerantType,
                distance,
                condensing,
                thermalCapacity,
                dryBulb,
                altitude,
                compressor,
                subCooling,
                atmPressureInMetric,
                relHumidity,
                capacityAdjustment,
                newAirFlow
            );
        }

        public IList<AccessoriesItems> AccessoriesItems(IList<Condenser> condenser, IList<AccessoriesItems> accessoriesItems, int conderserId, string? condenserModel)
        {
            return _thermokeyCondensers.AccessoriesItemList(condenser.ToList(), accessoriesItems.ToList(), conderserId, condenserModel);
        }

        public IList<AccessoriesDetails> GenerateAccessoriesPrice(IList<Accessories> accessories, IList<Condenser> condenser, IList<AccessoriesItems> accessoriesItems, int conderserId, string? condenserModel, string? refrigerantType, string? flowDirection, string? fansConnection, double accessoriesDiscount, double unitDiscount, params int[] ItemChoice)
        {
            return _thermokeyCondensers.GenerateAccessoriesPrice(accessories.ToList(), condenser.ToList(), accessoriesItems.ToList(), conderserId, condenserModel,refrigerantType,flowDirection,fansConnection,accessoriesDiscount,unitDiscount,ItemChoice);
        }

        public IList<AccessoriesWithPrice> GenerateAccessoriesWithPrice(IList<Accessories> accessories, IList<Condenser> condenser, IList<AccessoriesItems> accessoriesItems, int conderserId, string? remoteModel, string? refrigerantType, string? flowDirection, string? fansConnection, double accessoriesDiscount, double unitDiscount)
        {
            return _thermokeyCondensers.GenerateAccessoriesWithPrice(accessories.ToList(), condenser.ToList(), accessoriesItems.ToList(), conderserId, remoteModel, refrigerantType, flowDirection, fansConnection, accessoriesDiscount, unitDiscount);
        }

    }
}
