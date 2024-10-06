document.addEventListener('DOMContentLoaded', function() {
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
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            openTab(tabName);
        });
    });

    tabs[0].click();


    const convertButton = document.querySelector('.convert-button');
    const resoultText = document.querySelector('.result');
    const resoultForm = document.querySelector('.result-form');

    convertButton.addEventListener('click', function() {
        resoultText.style.display = 'block';
        resoultText.style.display = 'block';
        resoultForm.style.justifyContent = 'space-between';
    });
});
