class FixedRateComponent {
    
    get contractName () {
        return $('input[name="name"]')
    }

    get taxResidence () {
        return $('#react-select-3-input');
    }

    get taxProvince () {
        return $('#react-select-5-input');
    }

    get jobTitle () {
        return $('input[name="jobTitle"]');

    }

    get seniorityLevel () {
        return $('#react-select-4-input');
    }

    get scopeOfWork () {
        return $('textarea[name="scope"]');
    }

    get calendarInput () {
        return $('.deel-ui__calendar-input-container__input');
    }

    get contractDetails () {
        return $('[data-qa="contract-details"]');
    }
    get contractType () {
        return $('[data-qa="contract-type"]');
    }

    get contractStartDate () {
        return $('[data-qa="contractors-start-date"]');
    }

    get rateDetails () {
        return $('[data-qa="rate"]').$('h4');
    }

    get countryDetails () {
        return $('[data-qa="contractors-country"]').$('h4');
    }

    get SpecialClause () {
        return $('[data-qa="dpa-row-special-clause-value"]').$('.pre-wrap');
    }
    
    async fillDescForm (cName, jbtitle = "QA") {
        const jobSuggestion = await $(`.suggestions-option*=${jbtitle}`);

        await this.contractName.click();
        await this.contractName.setValue(cName);

        await this.jobTitle.click();
        await this.jobTitle.setValue(jbtitle);
        await jobSuggestion.click();
    }

    async setTaxResidence (country = 'United States', state_province = null) {
        await this.taxResidence.click();
        await this.taxResidence.setValue(country);
        await browser.keys('Enter');

        if (state_province !== null) {
            await this.taxProvince.click();
            await this.taxProvince.setValue(state_province);
            await browser.keys('Enter');
        }
    }

    async setSeniorityLevel (level='Not applicable') {
            await this.seniorityLevel.click();

            await this.seniorityLevel.setValue(level);
            await browser.keys('Enter');
    }

    async setScope (scope='This is my test scope') {
        await this.scopeOfWork.click()
        await this.scopeOfWork.setValue(scope);
    }

    async setContractDay () {
        await browser.execute(() => {
            const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const current_date = new Date();
            const fixedDate = months[current_date.getMonth()] + ' ' + (current_date.getDate() -1 ) + ", " + current_date.getFullYear(); 
            document.querySelector(`[aria-label="${fixedDate}"]`).click();
        });
    }

    async clickNextBtn () {
        const nextBtn = await $('[data-qa="next"]')
        await nextBtn.waitForEnabled();
        await nextBtn.click();
    }    

    async setCurrency(currency='GBP') {
        const currencyDropdwon = await $('#react-select-6-input');

        await currencyDropdwon.click();
        await currencyDropdwon.setValue(currency);
        await browser.keys('Enter');
        await browser.pause(1000);

        return currency;
    }

    async setPaymentRate(rate = 1000) {
        const paymentRate = await $('input[name="rate"]');
        const rateSuffix = await $('.deel-ui__input-component__suffix');

        await paymentRate.click();
        await paymentRate.setValue(rate);
        await rateSuffix.click();
    }

    async setPaymentFrequency(frequency='Weekly') {
        const paymentFreqSelect = await $('[data-qa="cycle-select"]');
        const paymentFrequency = await $('#react-select-7-input');

        await paymentFreqSelect.click();
        await paymentFrequency.addValue(frequency);
        await browser.keys('Enter');
    }

    async addSpecialClause (clause) {
        const clauseBtn = await $('[data-qa="add-a-special-clause"]')
        const textArea = await $('.textarea');
        await clauseBtn.click();
        await textArea.setValue(clause);
    }

    async createContract () {
        const createBtn = await $('[data-qa="create-contract"]')
        await createBtn.waitForDisplayed();
        await createBtn.click();
    }

    async getExpectedDate () {
        const monthsArray = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const current_date = new Date();
        let fixedDate = '';
        const contractDay = current_date.getDate() -1;
        const contractMonth = monthsArray[current_date.getMonth()];
        const contractYear = current_date.getFullYear();
        if (contractDay == 1 || contractDay == 21 || contractDay == 31) {
            fixedDate = contractMonth + ' ' + contractDay + "st" + ", " + contractYear;
        }else {
            fixedDate = contractMonth + ' ' + contractDay + "th" + ", " + contractYear;
        }

        return fixedDate;
    }

    expectedPaymentDetails (expCurrency='GBP', expRate='1,000', expFrequency='Weekly') {
        const currencySymbol = {
            'GBP' : '£',
            'USD' : '$',
            'CAD' : 'C$'
        }
        const expectedCurrency = currencySymbol[expCurrency];
        const expectedRate = expRate;
        const expectedFrequency = expFrequency;
        const expectedDetails = `${expectedCurrency}${expectedRate}\n${expectedFrequency}`;

        return expectedDetails;
    }
}

export default new FixedRateComponent;