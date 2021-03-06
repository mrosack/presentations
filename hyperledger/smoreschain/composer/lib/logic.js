'use strict';

/**
 * Makes a S'more!
 * @param {com.rss.smoreschain.MakeSmore} makeSmore
 * @transaction
 */
function makeSmore(tx) {
    var camperRegistry, smoreRegistry, ingredientRegistry;

    return getParticipantRegistry('com.rss.smoreschain.Camper').then(function(r) {
        camperRegistry = r;
        return getAssetRegistry('com.rss.smoreschain.Smore');
    }).then(function(r) {
        smoreRegistry = r;
        return getAssetRegistry('com.rss.smoreschain.SmoreIngredient');
    }).then (function(r) {
        ingredientRegistry = r;

        var factory = getFactory();
        var camper = getCurrentParticipant();

        // Create a new S'More asset
        var newSmore = factory.newResource('com.rss.smoreschain', 'Smore', tx.smoreId);
        newSmore.ingredients = [];

        // S'Mores need 2 crackers, a marshmallow, and chocolate!
        var ingredientsNeeded = {
            'GRAHAM_CRACKER': 2,
            'MARSHMALLOW': 1,
            'CHOCOLATE': 1
        };

        // Loop through all ingredients provided in the transaction and make sure they match the requirements
        // for making a S'More!
        for (var i = 0; i < tx.ingredients.length; i++) {
            var ingredient = tx.ingredients[i];

            if (ingredient.smore) {
                throw new Error('Ingredient ' + ingredient.ingredientId + ' already belongs to a S\'More!');
            }

            // Set the ingredient to belong to the new S'more
            ingredient.smore = newSmore;

            ingredientsNeeded[ingredient.type]--;

            if (ingredientsNeeded[ingredient.type] < 0) {
                throw new Error ('Too many ' + ingredient.type + 's provided!');
            }

            newSmore.ingredients.push(ingredient);
        }

        for (var ingredientType in ingredientsNeeded) {
            if (ingredientsNeeded[ingredientType] > 0) {
                throw new Error('Not enough ' + ingredientType + 's provided!');
            }
        }

        // Give the new S'More to the camper that's making it
        camper.smoresInHand.push(newSmore);

        // Save the new S'More, modified ingredients, and update the camper!
        return Promise.all([
            smoreRegistry.add(newSmore),
            camperRegistry.update(camper),
            Promise.all(tx.ingredients.map(function(i) {
                return ingredientRegistry.update(i);
            }))
        ]);
    });
}

/**
 * Eat a S'more!
 * @param {com.rss.smoreschain.EatSmore} eatSmore
 * @transaction
 */
function eatSmore(tx) {
    return getParticipantRegistry('com.rss.smoreschain.Camper').then(function(camperRegistry) {
        var camper = getCurrentParticipant();
        var smoreToEat;

        for (var i = 0; i < camper.smoresInHand.length; i++) {
            if (camper.smoresInHand[i].getIdentifier() === tx.smoreId) {
                smoreToEat = camper.smoresInHand[i];
                camper.smoresInHand.splice(i, 1);
                break;
            }
        }

        if (!smoreToEat) {
            throw new Error('S\'More ' + tx.smoreId + ' not in camper ' + camper.camperId + '\'s hand!');
        }

        camper.smoresInBelly.push(smoreToEat);
        return camperRegistry.update(camper);
    });
}

/**
 * Give a S'more to another camper!
 * @param {com.rss.smoreschain.GiveSmore} giveSmore
 * @transaction
 */
function giveSmore(tx) {
    var camperRegistry;

    return getParticipantRegistry('com.rss.smoreschain.Camper').then(function(r) {
        camperRegistry = r;
        return camperRegistry.get(tx.recipientCamperId);
    }).then(function(recipient) {
        if (!recipient) {
            throw new Error('Camper ' + tx.recipientCamperId + ' doesn\'t exist!');
        }

        var camper = getCurrentParticipant();
        var smoreToEat;

        for (var i = 0; i < camper.smoresInHand.length; i++) {
            if (camper.smoresInHand[i].getIdentifier() === tx.smoreId) {
                smoreToEat = camper.smoresInHand[i];
                camper.smoresInHand.splice(i, 1);
                break;
            }
        }

        if (!smoreToEat) {
            throw new Error('S\'More ' + tx.smoreId + ' not in camper ' + camper.camperId + '\'s hand!');
        }

        recipient.smoresInHand.push(smoreToEat);

        return Promise.all([
            camperRegistry.update(recipient),
            camperRegistry.update(camper)
        ]);
    });
}