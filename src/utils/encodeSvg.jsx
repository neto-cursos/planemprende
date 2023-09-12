var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;

export function addNameSpace(data) {
  if (data.indexOf('http://www.w3.org/2000/svg') < 0) {
    data = data.replace(/<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'");
  }

  return data;
}

export function encodeSVG(data) {
  // Use single quotes instead of double to avoid encoding.
  if (data.indexOf('"') >= 0) {
    data = data.replace(/"/g, "'");
  }

  data = data.replace(/>\s{1,}</g, '><');
  data = data.replace(/\s{2,}/g, ' ');

  return data.replace(symbols, encodeURIComponent);
}

export var encode = function(svg, fill) {
  if (fill) {
    svg = svg.replace(/<svg/g, `<svg fill="${fill}"`);
  }
  var namespaced = addNameSpace(svg);
  var dimensionsRemoved = namespaced
    .replace(/height="\w*" /g, '')
    .replace(/width="\w*" /g, '')
    .replace(/height='\w*' /g, '')
    .replace(/width='\w*' /g, '');
  var encoded = encodeSVG(dimensionsRemoved);

  var header = 'data:image/svg+xml,';
  var dataUrl = header + encoded;  

  return `url("${dataUrl}")`;
};