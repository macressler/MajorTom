/*
 * Copyright 2014 Spirit Of Christmas.
 */

function animateCountdown(node) {
  var group = new THREE.Object3D();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({"alpha": true});
  var geometry = new THREE.TorusGeometry(32, 2, 8, 60);
  var material = new THREE.MeshBasicMaterial({ "color": "red", "wireframe": true});
  var title_material = new THREE.MeshBasicMaterial({"color": "white", "wireframe": true});
  var ring = new THREE.Mesh(geometry, material);
  var title = new THREE.Mesh(new THREE.TorusGeometry(25, 6, 8, 60), title_material);
  var title_text_material = new THREE.MeshNormalMaterial({"color": "blue"});
  var count = 60;
  var title_text = createText();
  
  ring.position.x = 0;
  title.position.x = 0;
  group.position.x = 0;
      
  scene.add(group);
  group.add(ring);
  group.add(title);
  group.add(title_text);
      
  camera.position.z = 55;

  setInterval(function() {
    if (count > 0) {
      count--;
      group.remove(title_text);
      title_text = createText();
      group.add(title_text);    
    }
  }, 1000);

  function render() {
    requestAnimationFrame(render);
    ring.rotation.z -= 0.01;
    title.rotation.z += 0.01;
    renderer.render(scene, camera);
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  node.appendChild(renderer.domElement);
  render();

  function createText() {
    var title_text;
    var text_geometry;
    var text = count;

    if (count < 10) {
      text = "0" + count;
    }

    text_geometry = new THREE.TextGeometry(text, {
      "font": "helvetiker",
      "size": 20.0,
      "height": 1.0
    });
        
    text_geometry.computeBoundingBox();
    text_geometry.computeVertexNormals();
    title_text = new THREE.Mesh(text_geometry, title_text_material);
    title_text.position.y = -9;
    title_text.position.x = -15.5;

    return title_text;
  }
}
