//
// Demonstrate some of the basics.
//
const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const deploymentManifest = require('./nginx-deployment.json');

async function main() {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

    //
    // Get all the Namespaces.
    //
    const namespaces = await client.api.v1.namespaces.get();
    console.log('Namespaces: ', namespaces);

    //
    // Create a new Deployment.
    //
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest });
    console.log('Create: ', create);

    //
    // Fetch the Deployment we just created.
    //
    const deployment = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).get();
    console.log('Deployment: ', deployment);

    //
    // Remove the Deployment we created.
    //
    const removed = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete();
    console.log('Removed: ', removed);
  } catch (err) {
    console.error('Error: ', err);
  }
}

main();
