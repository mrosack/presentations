'use strict';
/**
 * Write the unit tests for your transction processor functions here
 */

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const IdCard = require('composer-common').IdCard;
const MemoryCardStore = require('composer-common').MemoryCardStore;

const path = require('path');
const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));

const namespace = 'com.rss.smoreschain';

describe('#' + namespace, () => {
    // In-memory card store for testing so cards are not persisted to the file system
    const cardStore = new MemoryCardStore();
    let adminConnection;
    let businessNetworkConnection;

    // Embedded connection used for local testing
    const connectionProfile = {
        name: 'embedded',
        type: 'embedded'
    };

    before(async () => {
        // Embedded connection does not need real credentials
        const credentials = {
            certificate: 'FAKE CERTIFICATE',
            privateKey: 'FAKE PRIVATE KEY'
        };

        // PeerAdmin identity used with the admin connection to deploy business networks
        const deployerMetadata = {
            version: 1,
            userName: 'PeerAdmin',
            roles: [ 'PeerAdmin', 'ChannelAdmin' ]
        };
        const deployerCard = new IdCard(deployerMetadata, connectionProfile);
        deployerCard.setCredentials(credentials);

        const deployerCardName = 'PeerAdmin';
        adminConnection = new AdminConnection({ cardStore: cardStore });

        await adminConnection.importCard(deployerCardName, deployerCard);
        await adminConnection.connect(deployerCardName);
    });

    beforeEach(async () => {
        businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });

        const adminUserName = 'admin';
        let adminCardName;

        const businessNetworkDefinition = await BusinessNetworkDefinition.fromDirectory(path.resolve(__dirname, '..'));

        // Install the Composer runtime for the new business network
        await adminConnection.install(businessNetworkDefinition.getName());

        // Start the business network and configure an network admin identity
        const startOptions = {
            networkAdmins: [
                {
                    userName: adminUserName,
                    enrollmentSecret: 'adminpw'
                }
            ]
        };

        const adminCards = await adminConnection.start(businessNetworkDefinition, startOptions);

        // Import the network admin identity for us to use
        adminCardName = `${adminUserName}@${businessNetworkDefinition.getName()}`;
        await adminConnection.importCard(adminCardName, adminCards.get(adminUserName));

        // Connect to the business network using the network admin identity
        await businessNetworkConnection.connect(adminCardName);

        const factory = businessNetworkConnection.getBusinessNetwork().getFactory();
        const ingredientRegistry = await businessNetworkConnection.getAssetRegistry(`${namespace}.SmoreIngredient`);

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
                    const ingredient = factory.newResource(namespace, 'SmoreIngredient', `${ingredientType}_${idCount++}`);
                    ingredient.type = ingredientType;
                    ingredient.brand = brand;

                    ingredientPromises.push(ingredientRegistry.add(ingredient));
                }
            }
        }

        await Promise.all(ingredientPromises);

        // Create test campers
        const camperRegistry = await businessNetworkConnection.getParticipantRegistry(`${namespace}.Camper`);
        const campers = ['Alice', 'Bob'];
        let idCount = 1;

        for (const camperName of campers) {
            const camper = factory.newResource(namespace, 'Camper', `CAMPER_${idCount++}`);
            camper.name = camperName;
            camper.smoresInHand = [];
            camper.smoresInBelly = [];

            await camperRegistry.add(camper);

            const identity = await businessNetworkConnection.issueIdentity('com.rss.smoreschain.Camper#' + camper.camperId, camper.camperId);

            const metadata = {
                userName: identity.userID,
                version: 1,
                enrollmentSecret: identity.userSecret,
                businessNetwork: businessNetworkDefinition.getName()
            };
            const card = new IdCard(metadata, connectionProfile);
            await adminConnection.importCard(camper.camperId, card);
        }

        const makeSmoreTx = factory.newTransaction(namespace, 'MakeSmore');
        makeSmoreTx.smoreId = 'SMORE_1';
        makeSmoreTx.ingredients = [
            factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_1'),
            factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_2'),
            factory.newRelationship(namespace, 'SmoreIngredient', 'MARSHMALLOW_1'),
            factory.newRelationship(namespace, 'SmoreIngredient', 'CHOCOLATE_1')
        ];

        await businessNetworkConnection.disconnect();
        await businessNetworkConnection.connect('CAMPER_1');

        await businessNetworkConnection.submitTransaction(makeSmoreTx);
    });

    describe('MakeSmore', () => {
        it('should be able to make a smore from valid ingredients', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const makeSmoreTx = factory.newTransaction(namespace, 'MakeSmore');
            makeSmoreTx.smoreId = 'SMORE_2';
            makeSmoreTx.ingredients = [
                factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_3'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_4'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'MARSHMALLOW_2'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'CHOCOLATE_2')
            ];

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(makeSmoreTx);

            const smoreRegistry = await businessNetworkConnection.getAssetRegistry(`${namespace}.Smore`);
            const smore = await smoreRegistry.get('SMORE_1');

            smore.smoreId.should.equal('SMORE_1');
        });

        it('should reject a smore made with invalid ingredients', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const makeSmoreTx = factory.newTransaction(namespace, 'MakeSmore');
            makeSmoreTx.smoreId = 'SMORE_2';
            makeSmoreTx.ingredients = [
                factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_3'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'MARSHMALLOW_2'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'CHOCOLATE_2')
            ];

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(makeSmoreTx).should.be.rejectedWith('Not enough GRAHAM_CRACKERs provided!');
        });

        it('should reject a smore made with ingredients that are already in a smore', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const makeSmoreTx = factory.newTransaction(namespace, 'MakeSmore');
            makeSmoreTx.smoreId = 'SMORE_2';
            makeSmoreTx.ingredients = [
                factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_1'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'GRAHAM_CRACKER_2'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'MARSHMALLOW_1'),
                factory.newRelationship(namespace, 'SmoreIngredient', 'CHOCOLATE_1')
            ];

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(makeSmoreTx).should.be.rejectedWith('Ingredient GRAHAM_CRACKER_1 already belongs to a S\'More!');
        });
    });

    describe('EatSmore', () => {
        it('should be able to eat a smore in hand', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const eatSmoreTx = factory.newTransaction(namespace, 'EatSmore');
            eatSmoreTx.smoreId = 'SMORE_1';

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(eatSmoreTx);

            const camperRegistry = await businessNetworkConnection.getParticipantRegistry(`${namespace}.Camper`);
            const alice = await camperRegistry.get('CAMPER_1');
            alice.smoresInHand.should.have.length(0);
            alice.smoresInBelly.should.have.length(1);
        });

        it('should not be able to eat a smore twice', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const eatSmoreTx = factory.newTransaction(namespace, 'EatSmore');
            eatSmoreTx.smoreId = 'SMORE_1';

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(eatSmoreTx);
            await businessNetworkConnection.submitTransaction(eatSmoreTx).should.be.rejectedWith('S\'More SMORE_1 not in camper CAMPER_1\'s hand!');
        });

        it('should not be able to eat someone else\'s smore', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const eatSmoreTx = factory.newTransaction(namespace, 'EatSmore');
            eatSmoreTx.smoreId = 'SMORE_1';

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_2');

            await businessNetworkConnection.submitTransaction(eatSmoreTx).should.be.rejectedWith('S\'More SMORE_1 not in camper CAMPER_2\'s hand!');
        });
    });

    describe('GiveSmore', () => {
        it('should be able to give a smore in hand to another camper', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const giveSmoreTx = factory.newTransaction(namespace, 'GiveSmore');
            giveSmoreTx.smoreId = 'SMORE_1';
            giveSmoreTx.recipientCamperId = 'CAMPER_2';

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(giveSmoreTx);

            const camperRegistry = await businessNetworkConnection.getParticipantRegistry(`${namespace}.Camper`);
            const alice = await camperRegistry.get('CAMPER_1');
            alice.smoresInHand.should.have.length(0);
            alice.smoresInBelly.should.have.length(0);

            const bob = await camperRegistry.get('CAMPER_2');
            bob.smoresInHand.should.have.length(1);
            bob.smoresInBelly.should.have.length(0);
        });

        it('should not be able to give a smore twice', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const giveSmoreTx = factory.newTransaction(namespace, 'GiveSmore');
            giveSmoreTx.smoreId = 'SMORE_1';
            giveSmoreTx.recipientCamperId = 'CAMPER_2';

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_1');

            await businessNetworkConnection.submitTransaction(giveSmoreTx);
            await businessNetworkConnection.submitTransaction(giveSmoreTx).should.be.rejectedWith('S\'More SMORE_1 not in camper CAMPER_1\'s hand!');
        });

        it('should not be able to give someone else\'s smore', async () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            const giveSmoreTx = factory.newTransaction(namespace, 'GiveSmore');
            giveSmoreTx.smoreId = 'SMORE_1';
            giveSmoreTx.recipientCamperId = 'CAMPER_2';

            await businessNetworkConnection.disconnect();
            await businessNetworkConnection.connect('CAMPER_2');

            await businessNetworkConnection.submitTransaction(giveSmoreTx).should.be.rejectedWith('S\'More SMORE_1 not in camper CAMPER_2\'s hand!');
        });
    });
});
