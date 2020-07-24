let options = {
  colors: {
    label: '#656565',
    default: '#2f84d7',
    blue: '#2f84d7',
    red: '#c83e30',
    green: '#3ac811',
    yellowgreen: '#a2d027',
    yellow: '#d7df15',
    gray: '#888',
    white: '#f0f0f0',
    pink: '#f409be'
  },
  temps: {
    default: document.createElement('div')
  }
};

options.temps.default.style['text-align'] = 'center';
options.temps.default.style['color'] = '#fff';
options.temps.default.innerHTML = '<div style="border-bottom-left-radius: 3px;border-top-left-radius: 3px;padding:0.2%;float:left;background:::labelColor:;;">::label:;</div><div style="border-bottom-right-radius: 3px;border-top-right-radius: 3px;padding:0.2%;float:left;background:::color:;;">::value:;</div>';

function sleep(miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function sign() {
  while (true) {
    let signs = document.getElementsByTagName('sign');
    for (let sign of signs) {
      let color = sign.getAttribute('color');
      if (color.startsWith('hex:')) {color = color.replace('hex:', '');} else {color = options.colors[color];}
      let label = sign.getAttribute('label');
      let value = sign.innerHTML;
      let labelColor = sign.getAttribute('label-color')||options.colors.label;
      let type = sign.getAttribute('type')||'default';
      let rendered = options.temps[type];

      if (value.startsWith('i:')) {
        if (sign.getAttribute('request') == 'json') {

          let query = sign.getAttribute('query').split('.');
          var url = value.replace('i:', '');

          if (query.length == 1) {
            fetch(url)
              .then(response => response.json())
              .then(data => sign.outerHTML = rendered.outerHTML.replace(/::labelColor:;/g, labelColor).replace(/::color:;/g, color).replace(/::label:;/g, label).replace(/::value:;/g, data[query[0]]));
          } else if (query.length == 2) {
            fetch(url)
              .then(response => response.json())
              .then(data => sign.outerHTML = rendered.outerHTML.replace(/::labelColor:;/g, labelColor).replace(/::color:;/g, color).replace(/::label:;/g, label).replace(/::value:;/g, data[query[0]][query[1]]));
          } else if (query.lenght == 3) {
            fetch(url)
              .then(response => response.json())
              .then(data => sign.outerHTML = rendered.outerHTML.replace(/::labelColor:;/g, labelColor).replace(/::color:;/g, color).replace(/::label:;/g, label).replace(/::value:;/g, data[query[0]][query[1]][query[2]]));
          }

        } else {
          var url = value.replace('i:', '');
          fetch(url)
            .then(response => response.text())
            .then(data => sign.outerHTML = rendered.outerHTML.replace(/::labelColor:;/g, labelColor).replace(/::color:;/g, color).replace(/::label:;/g, label).replace(/::value:;/g, data));
        }
      } else {
        sign.outerHTML = rendered.outerHTML.replace(/::labelColor:;/g, labelColor).replace(/::color:;/g, color).replace(/::label:;/g, label).replace(/::value:;/g, value);
      }
    }
    await sleep(20);
  }
}

sign();
