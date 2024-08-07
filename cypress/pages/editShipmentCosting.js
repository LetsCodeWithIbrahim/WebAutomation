import { timeout } from "async";

export class editShipmentCost {

    weblocators = {
        //Shipment Costing Button
        shipmentCostingButton: 'a[title="Shipment Costing"]',
        addChargeButton: 'button.button.button--primary',
        chargeCodeSelectionButton: 'select#charge-code',
        chargeDetailsInput: 'input#new-charge-details',
        totalChargeAmount: '.shipment-costing__charge-total--amount',
        amountInput: 'input[id^="ui-currency-"][type="number"]',
        deleteChargeButton: 'button[title="Delete Charge"]',
        chargeList: 'table.shipment-costing__list tbody'
    }

    clickOnshipmentCostingButton(index) {
        cy.get(this.weblocators.shipmentCostingButton).eq(index).click();
    }

    addChargesAndVerify(chargeCodes, descriptions, costs) {
        cy.wait(20000);
        cy.get(this.weblocators.totalChargeAmount).should('be.visible').invoke('text').then(totalChargeText => {
            const totalChargeAmount = totalChargeText.replace(/[^\d.-]/g, '').trim();
            const initialAmount = parseFloat(totalChargeAmount);
            cy.wrap(initialAmount).as('initialAmount');
        })

        cy.get('@initialAmount').then(Amount => {
            const amount = parseFloat(Amount);
            const totalCostSum = costs.reduce((acc, cost) => acc + cost, 0);
            const finalAmount = amount + totalCostSum;
            cy.log(finalAmount);
        })

        for (let i = 0; i < chargeCodes.length; i++) {
            const chargeCode = chargeCodes[i];
            const description = descriptions[i];
            const cost = costs[i];

            cy.get(this.weblocators.addChargeButton, {timeout: 100000}).should('not.be.disabled').contains('Add Charge').click();
            cy.get(this.weblocators.chargeCodeSelectionButton).select(chargeCode);
            cy.get(this.weblocators.chargeDetailsInput).type(description);
            cy.get(this.weblocators.amountInput).clear().type(cost.toString());
            cy.get(this.weblocators.addChargeButton).contains(' Save ').click();
            cy.wait(5000);
        };

        cy.get(this.weblocators.totalChargeAmount).should('be.visible').invoke('text').then(totalChargeText => {
            const totalChargeAmount = totalChargeText.replace(/[^\d.-]/g, '').trim();
            const finalChargeAmount = parseFloat(totalChargeAmount);
            cy.wrap(finalChargeAmount).as('finalChargeAmount');
        });

        cy.get('@initialAmount').then(initialAmount => {
            const totalCostSum = costs.reduce((acc, cost) => acc + cost, 0);
            const expectedFinalAmount = initialAmount + totalCostSum;

            cy.get('@finalChargeAmount').should('exist').then(finalChargeAmount => {
                // Ensure the finalChargeAmount is a number
                cy.log(expectedFinalAmount);
                const finalChargeAmountValue = parseFloat(finalChargeAmount);
                expect(finalChargeAmountValue).to.eq(expectedFinalAmount);
            });
        });
    }
    deleteSpecificCharge(index) {
        cy.wait(20000);
        cy.get(this.weblocators.chargeList)
          .find('tr.charge-list-item') // Select all charge list items
          .eq(index) // Choose the item at the specified index
          .find(this.weblocators.deleteChargeButton) // Find the delete button within the selected item
          .click(); // Click the delete button

        // Retry mechanism to verify the charge list length
        cy.wait(20000); // Wait for the UI to update after deletion

        cy.get(this.weblocators.chargeList)
        .find('tr.charge-list-item') // Verify the remaining charge items
        .should('have.length.lessThan', 8); // Ensure there are fewer items than the index + 1
        }
}






