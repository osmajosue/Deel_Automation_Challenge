import LoginPage from "../pageobjects/login.page";
import HomePage from "../pageobjects/home.page";
import ContractPage from "../pageobjects/contractPage";
import testData  from '../test-data/fixed-contract-data/fixed-contract-data.json'

describe('Create a fixed rate contract', () => {
    before( async () =>{
        const {homeUrl, testUser, testPassword, cookieAction} = testData;
        // Go to the login page and login using the test user created as a prerequisite.
        await LoginPage.navigateTo();
        await browser.maximizeWindow();
        await LoginPage.login(testUser, testPassword);

        // When logged in, sometimes a modal will be displayed. This part of the code is to wait until its clickable and then close it.
        await HomePage.closeModalButton.waitForClickable();
        await HomePage.closeModalButton.click();

        // Wait until the cookies dialog is displayed
        await HomePage.cookiesDialog.waitForDisplayed();

        // cookiesAction is a HomePage method that accepts 'accept' or 'decline' as parameters in order to take any action on the cookie dialog.
        await HomePage.cookiesAction(cookieAction);

        await expect(browser).toHaveUrl(homeUrl);

    })

    it('It should create a fixed rate contract and validate it', async () => {
        const {testPaymentDetails, testContractName, testJobTitle, testLevel, 
        testCountry, testState, testScope, testClause, testContractType} = testData;

        const fixedContract = ContractPage.ContractComponent.FixedRateComponent;
        const calendarInput = fixedContract.calendarInput;
        const expRateDetails = fixedContract.expectedPaymentDetails(testPaymentDetails["currency"], 
        testPaymentDetails["rate"], testPaymentDetails["frequency"]);


        await HomePage.SidebarComponent.createContractLink.click();
        
        await ContractPage.ContractComponent.fixedRate.click();

        await fixedContract.fillDescForm(testContractName, testJobTitle);

        await fixedContract.setTaxResidence(testCountry, testState);

        await fixedContract.setSeniorityLevel(testLevel);

        await fixedContract.setScope(testScope);

        await calendarInput.click();

        await fixedContract.setContractDay();

        await fixedContract.clickNextBtn();

        await fixedContract.setCurrency(testPaymentDetails["currency"]);

        await fixedContract.setPaymentRate(testPaymentDetails["rate"]);

        await fixedContract.setPaymentFrequency(testPaymentDetails["frequency"]);

        await fixedContract.clickNextBtn();

        await fixedContract.clickNextBtn();

        await fixedContract.addSpecialClause(testClause);
        
        await fixedContract.clickNextBtn();

        await fixedContract.createContract();


        // Asserts contract creation
        await fixedContract.contractDetails.waitForDisplayed();
        await expect(fixedContract.contractStartDate).toHaveText((await ContractPage.ContractComponent.FixedRateComponent.getExpectedDate()));

        await expect(fixedContract.contractType).toHaveText(testContractType);

        await expect(fixedContract.rateDetails).toHaveText(expRateDetails);

        await expect(fixedContract.countryDetails).toHaveText(`${testState} (${testCountry})`);

        await expect(fixedContract.SpecialClause).toHaveText(testClause);

        console.log('This was the data used to assert all the steps:' + testData);

    });

});