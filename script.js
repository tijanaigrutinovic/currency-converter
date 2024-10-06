document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tablinks');
    const contents = document.querySelectorAll('.tab-content');

    function openTab(tabName) {
        contents.forEach(content => {
            content.style.display = 'none';
        });

        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        document.querySelector(`.tab-content[data-tab="${tabName}"]`).style.display = 'block';
        document.querySelector(`.tablinks[data-tab="${tabName}"]`).classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            openTab(tabName);
        });
    });

    tabs[0].click();

    async function loadCurrencies() {
        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD'); 
            const data = await response.json();
            const currencies = Object.keys(data.rates);
            const fromSelect = document.getElementById('from');
            const toSelect = document.getElementById('to');

            currencies.forEach(currency => {
                const fromOption = document.createElement('option');
                fromOption.value = currency;
                fromOption.textContent = currency;
                if (currency === 'EUR') {
                    fromOption.setAttribute('selected', 'selected');
                }
                fromSelect.appendChild(fromOption);

                const toOption = document.createElement('option');
                toOption.value = currency;
                toOption.textContent = currency;
                if (currency === 'USD') {
                    toOption.setAttribute('selected', 'selected');
                }
                toSelect.appendChild(toOption);
            });
        } catch (error) {
            console.error('Greška prilikom učitavanja valuta: ', error);
        }
    }

    loadCurrencies(); 

    const convertButton = document.querySelector('.convert-button');
    const resultDiv = document.querySelector('.result');
    const conversionText = resultDiv.querySelector('p');
    const conversionResult = resultDiv.querySelector('h3');
    const rateInfo = resultDiv.querySelector('span');
    const resoultText = document.querySelector('.result');
    const resoultForm = document.querySelector('.result-form');

    convertButton.addEventListener('click', function() {
        resoultText.style.display = 'block';
        resoultText.style.display = 'block';
        resoultForm.style.justifyContent = 'space-between';
    });
    
    convertButton.addEventListener('click', async function () {
        const amountInput = document.querySelector('input[type="number"]'); 
        const amount = parseFloat(amountInput.value); 
        const fromCurrency = document.getElementById('from').value.toUpperCase();
        const toCurrency = document.getElementById('to').value.toUpperCase();

        console.log(`Uneti iznos: ${amount}, iz: ${fromCurrency}, u: ${toCurrency}`); 

        if (!isNaN(amount) && fromCurrency && toCurrency) { 
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                console.log(`API odgovor: ${response.status}`); 

                if (!response.ok) throw new Error('Problem with API');

                const data = await response.json();

                if (data.rates[toCurrency]) {
                    const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
                    conversionText.innerText = `${amount} ${fromCurrency} =`;
                    conversionResult.innerText = `${convertedAmount} ${toCurrency}`;
                    rateInfo.innerText = `1 ${toCurrency} = ${(1 / data.rates[toCurrency]).toFixed(6)} ${fromCurrency}`;
                    resultDiv.style.display = 'block';
                } else {
                    alert('Unknown currency!');
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        } else {
            alert('Please enter the amount and select the currency!');
        }
    });

});
