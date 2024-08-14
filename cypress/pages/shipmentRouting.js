export class shipmentRouting {

    weblocators = {
        providerReadyDateInput: 'input#ui-date-time-input-ready-date.input.ui-date-time-input',
        providerReadyTimeInput: 'input#ui-date-time-input-ready-time.input.ui-date-time-input',
        providerRadioFieldSet: 'div.range-radio input[type="radio"][name="shipmentExpectedDeliveryRange"][value="{buttonName}"]',
        deliveryDateInput: 'input#ui-date-time-input-delivery-date',
        deliveryTimeInput: 'input#ui-date-time-input-delivery-time',

        //naked button
        nakedButton: 'button.button--naked .fa-angle-left',

        //search by shipment reference number
        searchInputByReferenceNumber: 'input[placeholder="Search by ReferenceNumber"]',

        //route to routing page
        routingLinkLocator: 'a[href="/admin/routing"]'
    }


    enterProviderInformation() {
        cy.getCurrentDateTimeInMST().then(({ formattedDate }) => {
            cy.getCurrentDateTimeInMST(1).then(({ formattedTime: futureTime }) => {
                cy.get(this.weblocators.providerReadyDateInput).type(formattedDate, { force: true });
                cy.get(this.weblocators.providerReadyTimeInput).type(futureTime, { force: true });
            });

            cy.getCurrentDateTimeInMST(4).then(({ formattedTime: futureTime }) => {
                cy.get(this.weblocators.deliveryDateInput).type(formattedDate, { force: true });
                cy.get(this.weblocators.deliveryTimeInput).type(futureTime, { force: true });
            });

        });
    }


    searchRecordByRefNo() {
        cy.get('@forwarderReferenceNumber').then(fwdRefNo => {
            cy.get(this.weblocators.routingLinkLocator).click().wait(10000);
            cy.get(this.weblocators.nakedButton).click();
            cy.get(this.weblocators.searchInputByReferenceNumber).scrollIntoView().should('be.visible').type(fwdRefNo);
            cy.wait(4000);
            cy.get('tr.shipment-list-item').should('exist').within(() => {
                cy.get('td').eq(1).find('span').contains(fwdRefNo).should('exist');
            });
        });
    }

}