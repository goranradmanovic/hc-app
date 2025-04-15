// Diagnostic List Table
function createDiagnosticTable(diagnosticData) {
	const tableBody = document.querySelector('#data-table tbody');

	diagnosticData.forEach(item => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${item.name}</td>
			<td>${item.description}</td>
			<td>${item.status}</td>
		`;
		tableBody.appendChild(row);
	});
}

function removeDiagnosticInfo() {
	const tbody = document.querySelector('#data-table tbody');
	tbody.innerHTML = '';
}