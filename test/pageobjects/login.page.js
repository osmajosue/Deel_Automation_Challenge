import Page from "./page";

class LoginPage extends Page {

    get emailInput () {
        return $('#mui-1')
    }

    get passwordInput () {
        return $('#mui-2')
    }

    get logInBtn () {
        return $('[type=submit]');
    }

    async navigateTo () {
        await super.navigateTo('login');
        return this;
    }

    async login (emailAddress, password) {

        await this.emailInput.waitForClickable();
        await this.emailInput.setValue(emailAddress);

        await this.passwordInput.waitForClickable();
        await this.passwordInput.setValue(password);

        await this.logInBtn.waitForClickable();
        await this.logInBtn.click();
    }
}

export default new LoginPage();