import Page from "./page";
import SidebarComponent from "../components/sidebar-comp"

class HomePage extends Page {
    
    get closeModalButton () {
        return $('[data-qa="close"]');
    }

    get cookiesDialog () {
        return $('#CybotCookiebotDialog')
    }

    get declineCookiesBtn () {
        return $('#CybotCookiebotDialogBodyButtonDecline')
    }

    get acceptCookiesBtn () {
        return $('#CybotCookiebotDialogBodyButtonAccept')
    }

    get SidebarComponent () {
        return SidebarComponent;
    }

    async navigateTo () {
        await super.navigateTo('/');
        return this;
    }
    
    async cookiesAction(action) {
        const declineBtn = this.declineCookiesBtn;
        const acceptBtn = this.acceptCookiesBtn;

        if (action === 'decline'){
            declineBtn.click();
        } else if (action === 'accept'){
            acceptBtn.click();
        }

        return this;
    }
}

export default new HomePage();