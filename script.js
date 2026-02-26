// Additional functionality if needed

document.addEventListener('DOMContentLoaded', function() {
    // Format numbers with commas
    formatNumbers();
    
    // Add tooltips for better UX
    addTooltips();
});

function formatNumbers() {
    // Add commas to large numbers
    const amounts = document.querySelectorAll('.amount, .balance, .fee');
    amounts.forEach(element => {
        if (element.textContent !== 'N/A' && !isNaN(element.textContent)) {
            const num = parseInt(element.textContent);
            if (!isNaN(num)) {
                element.textContent = num.toLocaleString('en-US');
            }
        }
    });
}

function addTooltips() {
    // Add tooltips to transaction types
    const typeBadges = document.querySelectorAll('.type-badge');
    typeBadges.forEach(badge => {
        badge.setAttribute('title', 'Transaction Type');
    });
}

// Search functionality
function searchTransactions() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('.transaction-row');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Export as CSV
function exportToCSV() {
    const transactions = [];
    const rows = document.querySelectorAll('.transaction-row');
    
    rows.forEach(row => {
        const tds = row.querySelectorAll('td');
        transactions.push({
            id: tds[0].textContent,
            status: tds[1].textContent,
            type: tds[2].textContent,
            date: tds[3].textContent,
            from: tds[4].textContent,
            to: tds[5].textContent,
            amount: tds[6].textContent,
            fee: tds[7].textContent,
            balance: tds[8].textContent
        });
    });
    
    const csv = [
        ['Transaction ID', 'Status', 'Type', 'Date', 'From', 'To', 'Amount', 'Fee', 'Balance'],
        ...transactions.map(t => Object.values(t))
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'momo-statement.csv';
    a.click();
}
