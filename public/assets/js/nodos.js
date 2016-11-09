// Create a network
var nodes = null;
var edges = null;
var network = null;
var options = null;
var data = null;
var container = document.getElementById('network');

var nombre = Array.prototype.slice.call(document.getElementsByClassName('nombre'));
var descripO = Array.prototype.slice.call(document.getElementsByClassName('descripO'));
var logo = Array.prototype.slice.call(document.getElementsByClassName('logo'));
var banner = Array.prototype.slice.call(document.getElementsByClassName('banner'));
var organizaciones = nombre.map(function(nombre) {
  return nombre.value;
});
var descripcionesO = descripO.map(function(descripO) {
  return descripO.value;
});
var logoO = logo.map(function(logo) {
  return logo.value;
});
var bannerO = banner.map(function(banner) {
  return banner.value;
});

var org1 = Array.prototype.slice.call(document.getElementsByClassName('org1'));
var org2 = Array.prototype.slice.call(document.getElementsByClassName('org2'));
var descripC = Array.prototype.slice.call(document.getElementsByClassName('descripC'));
var bannerC = Array.prototype.slice.call(document.getElementsByClassName('bannerC'));
var orgs1 = org1.map(function(org1) {
  return org1.value;
});
var orgs2 = org2.map(function(org2) {
  return org2.value;
});
var descripcionesC = descripC.map(function(descripC) {
  return descripC.value;
});
var bannersC = bannerC.map(function(bannerC) {
  return bannerC.value;
});

var nomC = Array.prototype.slice.call(document.getElementsByClassName('nomC'));
var tituloC = Array.prototype.slice.call(document.getElementsByClassName('tituloC'));
var urlC = Array.prototype.slice.call(document.getElementsByClassName('urlC'));
var uploadC = Array.prototype.slice.call(document.getElementsByClassName('uploadC'));
var nomsC = nomC.map(function(nomC) {
  return nomC.value;
});
var titulosC = tituloC.map(function(tituloC) {
  return tituloC.value;
});
var urlsC = urlC.map(function(urlC) {
  return urlC.value;
});
var uploadsC = uploadC.map(function(uploadC) {
  return uploadC.value;
});

var nomO = Array.prototype.slice.call(document.getElementsByClassName('nomO'));
var tituloO = Array.prototype.slice.call(document.getElementsByClassName('tituloO'));
var urlO = Array.prototype.slice.call(document.getElementsByClassName('urlO'));
var uploadO = Array.prototype.slice.call(document.getElementsByClassName('uploadO'));
var nomsO = nomO.map(function(nomO) {
  return nomO.value;
});
var titulosO = tituloO.map(function(tituloO) {
  return tituloO.value;
});
var urlsO = urlO.map(function(urlO) {
  return urlO.value;
});
var uploadsO = uploadO.map(function(uploadO) {
  return uploadO.value;
});

// InfoCard - Animación de entrada
var infoCard = $('.node-info');
var nodeNumber = $("#nodeNumber");
var orgDescripcion = $("#orgDescripcion");
var orgRecurso = $("#orgRecurso");
var descripcion = $("#descripcion");
var recursos = $("#recursos");

data = getScaleFreeNetwork(organizaciones.length);
network = new vis.Network(container, data, options);

network.on('selectNode', showInfoCard);
network.on('deselectNode', hideInfoCard);
network.on('selectEdge', showInfoCard);
network.on('deselectEdge', hideInfoCard);

function showInfoCard(params) {
  var pNodo = params.nodes[0];
  var pArco = params.edges[0];
  var pos;
  var newHTML = [];

  infoCard.removeClass('hidden fadeOutDown');
  infoCard.addClass('fadeInUp');

  if (pNodo === undefined) {
    orgDescripcion.html(orgs1[pArco] + " y " + orgs2[pArco]);
    descripcion.html(descripcionesC[pArco]);
    orgRecurso.html(orgs1[pArco] + " y " + orgs2[pArco]);
    document.getElementById("logos").src = bannersC[pArco];
    newHTML.push('<br/><br/><br/>');
    for (pos = 0; pos < (nomsC.length); pos++) {
      if ((orgs1[pArco] + " + " + orgs2[pArco]) == nomsC[pos]) {
        if (urlsC[pos] != "") {  
          newHTML.push('<a class="icon2 fa-picture-o" href=' + urlsC[pos] + ' target="_new">' + &nbsp; +titulosC[pos] + '</a>' + '<br>');
        }
        if (uploadC[pos].defaultValue != "missing.png") {
          newHTML.push('<a class="icon2 fa-external-link" href=' + uploadC[pos].defaultValue + ' target="_new">' + &nbsp; + titulosC[pos] + '</a>' + '<br>');
        }
      }
      recursos.html(newHTML.join(""));
    }

  }
  else {
    orgDescripcion.html(organizaciones[pNodo]);
    descripcion.html(descripcionesO[pNodo]);
    orgRecurso.html(organizaciones[pNodo]);
    document.getElementById("logos").src = bannerO[pNodo];
    newHTML.push('<br/><br/><br/>');
    for (pos = 0; pos < (nomsO.length); pos++) {
      if ((organizaciones[pNodo]) == nomsO[pos]) {
        if (urlsO[pos] != "") {
          newHTML.push('<a class="icon2 fa-picture-o" href=' + urlsO[pos] + ' target="_new">' + &nbsp; + titulosO[pos] + '</a>' + '<br>');
        }
        if (uploadO[pos].defaultValue != "missing.png") {
          newHTML.push('<a class="icon2 fa-external-link" href=' + uploadO[pos].defaultValue + &nbsp; + ' target="_new">' + titulosO[pos] + '</a>' + '<br>');
        }
      }
      recursos.html(newHTML.join(""));
    }
  }
}

function hideInfoCard() {
  infoCard.removeClass('hidden fadeInUp');
  infoCard.addClass('fadeOutDown');
  nodeNumber.html('');
}

function getScaleFreeNetwork(nodeCount) {
  var DIR = 'img/';
  var pos;
  options = {
    height: '100%',
    width: '100%',
    interaction: {
      tooltipDelay: 100,
      hover: false
    },
    nodes: {
      borderWidth: 4,
      size: 30,
      color: {
        border: '#222222',
        background: '#666666'
      },
      font: {
        color: '#eeeeee'
      },
    },
    edges: {
      color: 'lightgray'
    }
  };
  if (nodes == null)
    nodes = [];
  for (pos = 0; pos < (organizaciones.length); pos++) {
    nodes.push({
      id: pos,
      shape: 'circularImage',
      image: logoO[pos],
      label: organizaciones[pos]
    });
  }

  if (edges == null)
    edges = [];
  for (pos = 0; pos < (orgs1.length); pos++) {
    var o1 = nodes.map(function(x) {
      return x.label;
    }).indexOf(orgs1[pos]);
    var o2 = nodes.map(function(x) {
      return x.label;
    }).indexOf(orgs2[pos]);
    edges.push({
      id: pos,
      from: o1,
      to: o2
    });

  }

  return {
    nodes: nodes,
    edges: edges
  };
}