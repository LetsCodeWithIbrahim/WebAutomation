export class createShipment {

    weblocators = {
        newShipmentButton: 'a.button.button--primary',
        shipmentType: 'label.toggle-label[for="pickup"]',
        shipmentStatusDropdown: 'select.select[name="shipmentStatus"]',

        //Shipment Forwarder Information
        shipmentForwarderInput: 'input#shipmentForwarder',
        forwarderReferenceNumberInput: 'input[name="shipmentReferenceNumber"][placeholder="Reference Number"]',
        forwarderPRONumberInput: 'input[name="shipmentProNumber"][placeholder="PRO Number"]',
        forwarderMawbInput: 'input[name="shipmentMawb"][placeholder="MAWB"]',

        //Shipper & Drop Information Radio Buttons Web Locators
        shipperInformationFieldset: 'fieldset.input-group.input-group--horizontal.fieldset input[type="radio"][name="shipper-information-new-or-existing-contact"]',
        dropRadioFieldset: 'fieldset.input-group.input-group--horizontal.fieldset input[type="radio"][name="drop-information-new-or-existing-contact"]',

        //Shipper Information Web Locators
        shipperInformationLocationNameInput: 'input[name="shipper-information-location-name"]',
        shipperInformationAddressLine1Input: 'input[name="shipper-information-address-line-1"]',
        shipperInformationCityInput: 'input[name="shipper-information-city"]',
        shipperInformationStateInput: 'input[name="shipper-information-state"]',
        shipperInformationZipInput: 'input[name="shipper-information-zip-code"]',

        //Drop Information Web Locators
        dropInformationLocationNameInput: 'input#drop-information-location-name.input',
        dropInformationAddressLine1Input: 'input#drop-information-address-line-1',
        dropInformationAddressLine2Input: 'input#drop-information-address-line-2',
        dropInformationCityInput: 'input#drop-information-city',
        dropInformationStateInput: 'input#drop-information-state',
        dropInformationZipInput: 'input#drop-information-zip-code',
        readyDateInput: 'input#ui-date-time-input-ready-date.input.ui-date-time-input',

        //Provider Information Web Locators
        providerReadyDateInput: 'input#ui-date-time-input-ready-date.input.ui-date-time-input',
        providerReadyTimeInput: 'input#ui-date-time-input-ready-time.input.ui-date-time-input',
        providerRadioFieldSet: 'div.range-radio input[type="radio"][name="shipmentExpectedDeliveryRange"]',
        providerPickupDateInput: 'input#ui-date-time-input-pickup-date',
        providerPickUpTimeInput: 'input#ui-date-time-input-pickup-time',
        providerDropDateInput: 'input#ui-date-time-input-drop-date',
        providerDropTimeInput: 'input#ui-date-time-input-drop-time',

        //Freight Items Web Locators
        freightPiecesInput1: 'input.input[name="shipmentFreightPieces"]',
        freightTypeDropDown: 'select.select[name="shipmentFreightType"]',
        addFreightItemButton: 'button.button--default.shipment-edit-view__add-frieght-line-button',
        deleteFreightItemButton: 'button.button--default.delete-freight-button',
        createShipmentButton: 'button.button--primary[type="submit"]',

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

    enterForwarderDetails(forwarder) {

        const randomNumber1 = Math.floor(Math.random() * 1000); // Adjust range as needed
        const randomNumber2 = Math.floor(Math.random() * 1000);
        const randomNumber3 = Math.floor(Math.random() * 1000);

        cy.wait(10000); 
        cy.get(this.weblocators.shipmentForwarderInput).type(forwarder);
        cy.get(this.weblocators.forwarderReferenceNumberInput).type(randomNumber1.toString());
        cy.get(this.weblocators.forwarderPRONumberInput).type(randomNumber2.toString());
        cy.get(this.weblocators.forwarderMawbInput).should('be.visible').clear({ force: true }).type(randomNumber3.toString());
    }

    clickCreateNewContact() {
        cy.get('input[name="shipper-information-new-or-existing-contact"][value="false"]')
            .click();
        cy.get('input[name="drop-information-new-or-existing-contact"][value="false"]')
            .click();
    }

    clickUseExistingContact() {
        cy.get('input[name="shipper-information-new-or-existing-contact"][value="true"]')
            .click();
        cy.get('input[name="drop-information-new-or-existing-contact"][value="true"]')
            .click();
    }

    verifyShipmentPopup() {
        cy.wait(20000); 
        // Assert that the shipment notification popup exists
        cy.get('.shipment-notification').should('exist');    
        // Assert that the title of the shipment notification is correct
        cy.get('.shipment-notification h1').should('contain.text', "Here's your new shipment!");
      }

    handleContactOption(contactOption, dropOption) {
        switch (contactOption, dropOption) {
            case 'createNew':
                this.clickCreateNewContact();
                break;
            case 'useExisting':
                this.clickUseExistingContact();
                break;
            default:
                throw new Error(`Invalid contact option specified in shipmentData.json: ${contactOption, dropOption}`);
        }
    }


    enterShipperInformation(locName, addressLine1, city, state, zip) {
        cy.get(this.weblocators.shipperInformationLocationNameInput).type(locName);
        cy.get(this.weblocators.shipperInformationAddressLine1Input).type(addressLine1);
        cy.get(this.weblocators.shipperInformationCityInput).type(city);
        cy.get(this.weblocators.shipperInformationStateInput).type(state);
        cy.get(this.weblocators.shipperInformationZipInput).type(zip);

    }

    enterDropInformation(dropLocName, dropAddressLine1, dropAddressLine2, city, state, zip) {
        cy.get(this.weblocators.dropInformationLocationNameInput).type(dropLocName);
        cy.get(this.weblocators.dropInformationAddressLine1Input).type(dropAddressLine1);
        cy.get(this.weblocators.dropInformationAddressLine2Input).type(dropAddressLine2);
        cy.get(this.weblocators.dropInformationCityInput).type(city);
        cy.get(this.weblocators.dropInformationStateInput).type(state);
        cy.get(this.weblocators.dropInformationZipInput).type(zip);

    }

    enterProviderInformation(readyDate, readyTime, pickUpDate, pickUpTime, dropDate, dropTime) {
        cy.get(this.weblocators.providerReadyDateInput).type(readyDate);
        cy.get(this.weblocators.providerReadyTimeInput).type(readyTime);
        cy.get(this.weblocators.providerPickupDateInput).type(pickUpDate);
        cy.get(this.weblocators.providerPickUpTimeInput).type(pickUpTime);
        cy.get(this.weblocators.providerDropDateInput).type(dropDate);
        cy.get(this.weblocators.providerDropTimeInput).type(dropTime);

    }

    clickProviderBy() {
        cy.get('input[name="shipmentExpectedDeliveryRange"][value="BY"]')
            .click();
    }

    clickProviderAt() {
        cy.get('input[name="shipmentExpectedDeliveryRange"][value="AT"]')
            .click();
    }

    clickProviderBetween() {
        cy.get('input[name="shipmentExpectedDeliveryRange"][value="BETWEEN"]')
            .click();
    }

    handleProviderOption(providerOption) {
        switch (providerOption) {
            case 'By':
                this.clickProviderBy();
                break;
            case 'At':
                this.clickProviderAt();
                break;
            case 'Between':
                this.clickProviderBetween();
                break;
            default:
                throw new Error(`Invalid contact option specified in shipmentData.json: ${providerOption}`);
        }
    }

    enterFreightInformation(freightPieces, freightType){

        cy.get(this.weblocators.freightPiecesInput1).type(freightPieces);
        cy.get(this.weblocators.freightTypeDropDown).select(freightType);
        cy.wait(1000);
        cy.get(this.weblocators.addFreightItemButton).click();
        cy.get(this.weblocators.deleteFreightItemButton).click();
        cy.wait(1000);
        cy.get(this.weblocators.createShipmentButton).click();
        cy.wait(10000);
        //cy.contains('Shipment created successfully', { timeout: 10000 }).should('exist');
    }
}






