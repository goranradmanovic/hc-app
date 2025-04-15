// Create Aside Lab Results List
function createLabResultsList(labData) {
	const list = document.getElementById('list');

	labData.forEach((item, index) => {
		const listItem = document.createElement('div');
		
		listItem.classList.add('lab-list-item');
		listItem.innerHTML = `
			<span>${item}</span>
			<a href="#">
				<img src="./assets/images/download.svg" alt="Download icon" />
			</a> 
		`;

		list.appendChild(listItem);
	});
}

function removeOldResults() {
	const list = document.querySelector('#list');
	list.innerHTML = '';
}