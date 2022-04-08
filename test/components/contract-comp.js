import FixedRateComponent from "./fixed-contract-comp";

class ContractComponent {
    get fixedRate () {
        return $('.deel-ui__typography__heading_4=Fixed Rate');
    }

    get FixedRateComponent () {
        return FixedRateComponent;
    }
}

export default new ContractComponent;