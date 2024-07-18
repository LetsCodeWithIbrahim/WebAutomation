export class createShipment {

    weblocators = {
        newShipmentButton: 'a.button.button--primary',
        shipmentType: 'label.toggle-label[for="pickup"]',
        shipmentStatusDropdown: 'select.select[name="shipmentStatus"]',
        shipmentForwarderInput: 'input#shipmentForwarder',
        forwarderReferenceNumberInput: 'input[name="shipmentReferenceNumber"][placeholder="Reference Number"]',
        forwarderPRONumberInput: 'input[name="shipmentProNumber"][placeholder="PRO Number"]',
        forwarderMawbInput: 'input[name="shipmentMawb"][placeholder="MAWB"]',
        shipperInformationFieldset: 'fieldset.input-group.input-group--horizontal.fieldset',
        contactRadioFieldset: '.shipment-contact-edit fieldset.input-group.input-group--horizontal.fieldset input[type="radio"][name="drop-information-new-or-existing-contact"]',
        shipperInformationLocationNameInput: 'input[name="shipper-information-location-name"]',
        shipperInformationAddressLine1Input: 'input[name="shipper-information-address-line-1"]',
        shipperInformationCityInput: 'input[name="shipper-information-city"]',
        shipperInformationStateInput: 'input[name="shipper-information-state"]',
        shipperInformationZipInput: 'input[name="shipper-information-zip-code"]',

    }

    //No need to navigate to shipments as default dashboard screen after login is shipments

    clickCreateShipment() {
        cy.get(this.weblocators.newShipmentButton).should('be.visible').click({ force: true }); // Use {force: true} cautiously, only if necessary
    }

    clickShipmentType() {
        cy.get(this.weblocators.shipmentType).click();
    }

    selectShipmentStatus(status) {
        cy.get(this.weblocators.shipmentStatusDropdown).select(status);
    }

    enterForwarder(forwarder) {

        // Use {force: true} to type into a disabled input otherwise we explicitly need to click that field to make it enabled
        cy.get(this.weblocators.shipmentForwarderInput).type(forwarder, { force: true });
    }

    enterForwarderReferenceNumber(forwarderRefNo) {

        // Use {force: true} to type into a disabled input otherwise we explicitly need to click that field to make it enabled
        cy.get(this.weblocators.forwarderReferenceNumberInput).type(forwarderRefNo, { force: true });
    }

    enterForwarderPRONumber(forwarderPRONumber) {

        // Use {force: true} to type into a disabled input otherwise we explicitly need to click that field to make it enabled
        cy.get(this.weblocators.forwarderPRONumberInput).type(forwarderPRONumber, { force: true });
    }

    enterForwarderMawb(forwarderMawb) {

        // Use {force: true} to type into a disabled input otherwise we explicitly need to click that field to make it enabled
        cy.get(this.weblocators.forwarderMawbInput).type(forwarderMawb, { force: true });
    }

    clickCreateNewContact() {
        cy.get(this.weblocators.shipperInformationFieldset)
        .first()
        .within(() => {
            cy.contains('Create New Contact').click();
        });
    }

    clickUseExistingContact() {
        cy.get(this.weblocators.shipperInformationFieldset)
            .first()
            .within(() => {
                cy.contains('Use Existing Contact ').click();
            });
    }

    handleContactOption(contactOption) {
        switch (contactOption) {
            case 'createNew':
                this.clickCreateNewContact();
                break;
            case 'useExisting':
                this.clickUseExistingContact();
                break;
            default:
                throw new Error(`Invalid contact option specified in shipmentData.json: ${contactOption}`);
        }
    }

    enterRecoveryInformation(locName, addressLine1, city, state, zip) {
        cy.get(this.weblocators.shipperInformationLocationNameInput).type(locName, { force: true });
        cy.get(this.weblocators.shipperInformationAddressLine1Input).type(addressLine1, { force: true });
        cy.get(this.weblocators.shipperInformationCityInput).type(city, { force: true });
        cy.get(this.weblocators.shipperInformationStateInput).type(state, { force: true });
        cy.get(this.weblocators.shipperInformationZipInput).type(zip, { force: true });



    }
}
