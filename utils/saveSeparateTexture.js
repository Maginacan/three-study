const gltfPipeline = require("gltf-pipeline");
const fsExtra = require("fs-extra");
const processGltf = gltfPipeline.processGltf;
const gltf = fsExtra.readJsonSync("./models/Michelle.gltf");
const options = {
  separateTextures: true,
};
processGltf(gltf, options).then(function (results) {
  fsExtra.writeJsonSync("Michelle-separate.gltf", results.gltf);
  // Save separate resources
  const separateResources = results.separateResources;
  for (const relativePath in separateResources) {
    if (separateResources.hasOwnProperty(relativePath)) {
      const resource = separateResources[relativePath];
      fsExtra.writeFileSync(relativePath, resource);
    }
  }
});