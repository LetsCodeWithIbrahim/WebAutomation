import { timeout } from "async";

export class editShipmentCost {

    weblocators = {
        //Shipment Costing Button
        shipmentCostingButton: 'a[title="Shipment Costing"]',
        addChargeButton: 'button.button.button--primary',
        chargeCodeSelectionButton: 'select#charge-code',
        chargeDetailsInput: 'input#new-charge-details',
        totalChargeAmount: '.shipment-costing__charge-total--amount',
        amountInput: 'input[id^="ui-currency-"][type="number"]'
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
}






