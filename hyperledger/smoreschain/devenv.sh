#!/bin/bash
arg1=${1:-'n/a'}

function install-global-packages() {
  npm install -g composer-cli composer-rest-server composer-playground
}

function install-fabric-tools() {
  if [ ! -d ./fabric-tools ]; then
    mkdir fabric-tools && cd fabric-tools

    curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.zip
    
    unzip fabric-dev-servers.zip

    ./downloadFabric.sh

    cd ..
  fi
}

function teardown-fabric() {
  ./fabric-tools/teardownFabric.sh

  # Keys/cards are stored locally in the home directory
  rm -rf ~/.composer
}

function create-fabric-and-deploy() {
  teardown-fabric

  ./fabric-tools/startFabric.sh
  ./fabric-tools/createPeerAdminCard.sh

  # https://hyperledger.github.io/composer/tutorials/developer-tutorial
  cd composer
  npm run build
  
  composer runtime install -c PeerAdmin@hlfv1 -n smoreschain
  composer network start -c PeerAdmin@hlfv1 -a dist/smoreschain.bna -A admin -S adminpw --file dist/networkadmin.card
  composer card import -f dist/networkadmin.card
  composer network ping -c admin@smoreschain

  # Add some campers...
  composer participant add -c admin@smoreschain -d '{"$class":"com.rss.smoreschain.Camper","camperId":"CAMPER_1","name": "Mike", "smoresInHand": [], "smoresInBelly": []}'
  composer identity issue -c admin@smoreschain -u mike -a 'resource:com.rss.smoreschain.Camper#CAMPER_1' --file dist/mike.card
  composer card import -f dist/mike.card
  
  composer participant add -c admin@smoreschain -d '{"$class":"com.rss.smoreschain.Camper","camperId":"CAMPER_2","name": "Calvin", "smoresInHand": [], "smoresInBelly": []}'
  composer identity issue -c admin@smoreschain -u calvin -a 'resource:com.rss.smoreschain.Camper#CAMPER_2' --file dist/calvin.card
  composer card import -f dist/calvin.card

  node seed/seed.js
}

case $arg1 in
'install-global-packages')
  install-global-packages
  ;;

'install-fabric-tools')
  install-fabric-tools
  ;;

'teardown-fabric')
  teardown-fabric
  ;;

'create-fabric-and-deploy')
  create-fabric-and-deploy
  ;;

*)
  echo "devenv.sh will require some arguments"
  echo ""
  echo "install-global-packages  - Installs all necessary global npm packages"
  echo "install-fabric-tools     - Installs the fabric tools"
  echo "teardown-fabric          - Destroys the current fabric instance"
  echo "create-fabric-and-deploy - Creates a new fabric instance and deploys"
  echo "                           smoreschain to it"
esac
