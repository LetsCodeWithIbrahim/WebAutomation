import { timeout } from "async";

export class editShipmentCost {

    weblocators = {
        //Shipment Costing Button
        shipmentCostingButton: 'a[title="Shipment Costing"]',
        addChargeButton: 'button.button.button--primary',
        chargeCodeSelectionButton: 'select#charge-code',
        chargeDetailsInput: 'input#new-charge-details',
        updatechargeDetailsInput: 'span.charge-list-item__input input.input',
        totalChargeAmount: '.shipment-costing__charge-total--amount',
        amountInput: 'input[id^="ui-currency-"][type="number"]',
        deleteChargeButton: 'button[title="Delete Charge"]',
        chargeList: 'table.shipment-costing__list tbody',
        editChargeButton: 'button[title="Edit Cost"]',
        saveButton: 'button[title="Save"]',
        addAttachmentLabel: 'label[for="attachment"]',
        fileInput: 'input[type="file"]'
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
    
    editSpecificCharge(index, newDescription) {
        cy.wait(20000);
        // Click the edit button for the specific charge
        cy.get(this.weblocators.chargeList)
          .find('tr.charge-list-item') // Select all charge list items
          .eq(index) // Choose the item at the specified index
          .find(this.weblocators.editChargeButton) // Find the edit button within the selected item
          .click(); // Click the edit button

        // Update the charge details
        cy.get(this.weblocators.updatechargeDetailsInput, {timeout: 10000}).clear().type(newDescription);
        cy.get(this.weblocators.saveButton).click();

        // Verify the updated charge
        cy.wait(20000); // Wait for the UI to update

        cy.get(this.weblocators.chargeList)
        .find('tr') // Select all rows
        .eq(index) // Choose the row at the specified index
        .within(() => {
          cy.get('td') // Verify the cells in the row
            .contains(newDescription) // Check if the description cell contains the new description
            .should('exist'); // Assertion to confirm existence
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

        uploadFile(filePath) {
            // Click on the label to trigger the file input
            cy.get(this.weblocators.addAttachmentLabel).click();
    
            // Attach the file using the file input
            cy.get(this.weblocators.fileInput).then(subject => {
                cy.wrap(subject).selectFile(filePath, { force: true });
                cy.get('[data-testid="Toastify__toast-container--bottom-left"]', { timeout: 100000 }) // Adjust timeout as needed
                .should('be.visible') // Ensure the container is visible
    
                // Check if the toast notification contains the correct text
                .find('[data-testid="toast-content"]')
                .should('contain.text', 'Attachment was added.');
            });
        }
}





