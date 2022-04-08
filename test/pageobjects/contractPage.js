import Page from "./page";
import ContractComponent from "../components/contract-comp"

class ContractPage extends Page {
    get contractTypeH1 () {
        return $('.deel-ui__typography__heading_1');
    }

    get ContractComponent () {
        return ContractComponent;
    }

    async navigateTo () {
        await super.navigateTo('create');
        return this;
    }
}

export default new ContractPage;
