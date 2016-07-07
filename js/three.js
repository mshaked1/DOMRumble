import THREELib from "three-js";
var THREE = THREELib();

var docHeight = document.body.clientHeight;
var docWidth = document.body.clientWidth;

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

var nodesPos = [];
var nodesObj = [];

// grab all DOM elements (grouped and given className by type) and put into array:nodes with unique ID based on index
  var nodes = Array.prototype.slice.call(document.querySelectorAll('img'));
  nodes.forEach(function(item){
    item.className = "image";
  });
  var divNodes = Array.prototype.slice.call(document.querySelectorAll('main, div, section, header, footer'));
  divNodes.forEach(function(item){
    item.className = "div";
  });
  var spanNodes = Array.prototype.slice.call(document.querySelectorAll('span'));
  spanNodes.forEach(function(item){
    item.className = "span";
  });
  var aNodes = Array.prototype.slice.call(document.querySelectorAll('a, nav'));
  aNodes.forEach(function(item){
    item.className = "a";
  });
  var headerNodes = Array.prototype.slice.call(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  headerNodes.forEach(function(item){
    item.className = "header"
  });
  var textNodes = Array.prototype.slice.call(document.querySelectorAll('pre, article, p, blockquote, ol, ul, li'));
  textNodes.forEach(function(item){
    item.className = "text"
  });
  var formNodes = Array.prototype.slice.call(document.querySelectorAll('form, input, select, button'));
  formNodes.forEach(function(item){
    item.className = "form"
  });
  var mediaNodes = Array.prototype.slice.call(document.querySelectorAll('svg, video, iframe, canvas, object, embed'));
  mediaNodes.forEach(function(item){
    item.className = "media"
  });
  nodes = nodes.concat(divNodes).concat(spanNodes).concat(aNodes).concat(headerNodes).concat(textNodes).concat(formNodes).concat(mediaNodes);var camera, scene, renderer, geometry, material, mesh, rendererCSS;
  var tryPos = getPosition(nodes[0]);
  var tryPos2 = getPosition(nodes[1]);

  nodes.forEach(function(item, index){
    item.id = index;
    var position = getPosition(item);
    var xCoord = position.x - document.body.clientWidth/2 + item.clientWidth;
    var yCoord = position.y + document.body.clientHeight/2 - item.clientHeight;
    console.log("x"+document.body.clientWidth,"y" +document.body.clientHeight);
    nodesPos.push([index, xCoord, yCoord]);
    console.log(nodesPos[index][1],nodesPos[index][2]);
  })
init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);

  // create CSS3D objects of all DOM elements in array:nodes and add each object into another array:nodesObj
  nodes.forEach(function(item, index){
    object = new THREE.CSS3DObject(item);
    nodes.forEach(function(i){
      nodesObj.push(object);
    });
    object.position.x = nodesPos[index][1] + (index*50);
    object.position.y = nodesPos[index][2];
    object.position.z = 0;
    scene.add(object);
  });
  
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log("innerWidth: "+window.innerWidth);
  document.body.appendChild(renderer.domElement);
}

// simple x-axis rotation
function animate() {
  requestAnimationFrame(animate);
  nodesObj.forEach(function(item, index){
    if(Math.floor(Math.random() * 2 ) + 1 === 1) item.rotateY(Math.random()/20); 
    else item.rotateX(Math.random()/20);   
  });
  render();
}

function render() {
  renderer.render(scene, camera);
}
  console.log(document.body);
