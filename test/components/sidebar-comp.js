class SidebarComponent {
    get createContractLink () {
        return $('a[href="/create"]');
    }
}

export default new SidebarComponent;