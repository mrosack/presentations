'use strict';

module.exports = {
    seedAssets: async function(businessNetworkConnection) {
        const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
        const ingredientRegistry = await businessNetworkConnection.getAssetRegistry('com.rss.smoreschain.SmoreIngredient');

        // Create test ingredients
        const ingredientBrands = {
            'GRAHAM_CRACKER': ['Honey Maid', 'Nabisco', 'Annie\'s', 'Generic'],
            'MARSHMALLOW': ['Stay Puft', 'Jet Puffed', 'Peeps', 'Generic'],
            'CHOCOLATE': ['Hershey\'s', 'Ghiradelli', 'Generic']
        };

        const ingredientPromises = [];

        for (const ingredientType in ingredientBrands) {
            let idCount = 1;
            for (const brand of ingredientBrands[ingredientType]) {
                const numToCreate = ingredientType === 'GRAHAM_CRACKER' ? 2 : 1;

                for (let i = 0; i < numToCreate; i++) {
                    const ingredient = factory.newResource('com.rss.smoreschain', 'SmoreIngredient', `${ingredientType}_${idCount++}`);
                    ingredient.type = ingredientType;
                    ingredient.brand = brand;

                    ingredientPromises.push(ingredientRegistry.add(ingredient));
                }
            }
        }

        await Promise.all(ingredientPromises);
    }
};