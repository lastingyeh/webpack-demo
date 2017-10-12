if (module.hot) {
	module.hot.accept();
}

import { groupBy } from 'lodash/collection';
import people from './people';

// import scss
import './style.scss';

// import image
import imageURL from './code.png';

// group by manager
const managerGroups = groupBy(people, 'manager');
const root = document.querySelector('#root');

// create image tag
const img = document.createElement('img');
img.src = imageURL;
img.style = 'background: #2B3A4F; padding: 15px;';
img.width = 32;
// add img to body
document.body.appendChild(img);

// test hmr
const input = document.createElement('input');
input.type = 'text';
document.body.appendChild(input);

root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`;

// 模擬延遲載入模組
function gotoDashboard() {
	System.import('./dashboard')
		.then(function(dashboard) {
			dashboard.draw();
		})
		.catch(function(err) {
			console.log('Chunk loading failed');
		});
}

setTimeout(gotoDashboard, 5000);
