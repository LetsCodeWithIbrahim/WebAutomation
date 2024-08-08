import { timeout } from "async";

export class editShipmentCost {

    weblocators = {
        //Shipment Costing Button
        shipmentCostingButton: 'a[title="Shipment Costing"]',
        primaryButton: 'button.button.button--primary',
        chargeCodeSelectionButton: 'select#charge-code',
        chargeDetailsInput: 'input#new-charge-details',
        updatechargeDetailsInput: 'span.charge-list-item__input input.input',
        totalChargeAmount: '.shipment-costing__charge-total--amount',
        amountInput: 'input[id^="ui-currency-"][type="number"]',
        customerChargeListItems: '.charge-list-item',
        comboboxToggleButton: '.combobox--toggle',
        comboboxOptions: '.combobox--options',
        comboboxInput: '.combobox--input',
        deleteChargeButton: 'button[title="Delete Charge"]',
        chargeList: 'table.shipment-costing__list tbody',
        editChargeButton: 'button[title="Edit Cost"]',
        saveButton: 'button[title="Save"]',
        addAttachmentLabel: 'label[for="attachment"]',
        fileInput: 'input[type="file"]',
        defaultButton: 'button.button.button--default',
        podNameInput: 'input#pod-name.input',
        approveChargesButton: 'button.button--select.button.button--primary',
        pillButtons: 'button.pill--button',
        searchRecordByCudaIDInput: 'input[type="text"][placeholder*="CUDA ID"]'
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

            cy.get(this.weblocators.primaryButton, { timeout: 100000 }).should('not.be.disabled').contains('Add Charge').click({ force: true });
            cy.get(this.weblocators.chargeCodeSelectionButton).select(chargeCode);
            cy.get(this.weblocators.chargeDetailsInput).type(description);
            cy.get(this.weblocators.amountInput).clear().type(cost.toString());
            cy.get(this.weblocators.primaryButton).contains(' Save ').click();
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
        cy.get(this.weblocators.chargeList)
            .find('tr.charge-list-item') 
            .eq(index)
            .find(this.weblocators.editChargeButton) 
            .click();

        cy.get(this.weblocators.updatechargeDetailsInput, { timeout: 10000 }).clear().type(newDescription);
        cy.get(this.weblocators.saveButton).click();

        cy.wait(20000);

        cy.get(this.weblocators.chargeList)
            .find('tr') 
            .eq(index) 
            .within(() => {
                cy.get('td') 
                    .contains(newDescription)
                    .should('exist');
            });
    }

    deleteSpecificCharge(index) {
        cy.wait(20000);
        cy.get(this.weblocators.chargeList)
            .find('tr.charge-list-item') 
            .eq(index) 
            .find(this.weblocators.deleteChargeButton) 
            .click(); 

        
        cy.wait(20000); 

        cy.get(this.weblocators.chargeList)
            .find('tr.charge-list-item') 
            .should('have.length.lessThan', 8); 
    }

    uploadFile(filePath) {
        cy.get(this.weblocators.addAttachmentLabel).click();

        cy.get(this.weblocators.fileInput).then(subject => {
            cy.wrap(subject).selectFile(filePath, { force: true });
            cy.get('[data-testid="Toastify__toast-container--bottom-left"]', { timeout: 100000 }) 
                .should('be.visible') 
                .find('[data-testid="toast-content"]')
                .should('contain.text', 'Attachment was added.');
        });
    }

    editInfoAndApprove(podName, refineSearchOption) {
        cy.wait(4000);
        cy.get(this.weblocators.defaultButton).contains(' Edit Info ').click({ force: true });
        cy.get(this.weblocators.podNameInput).should('be.visible').type(podName);
        cy.get(this.weblocators.primaryButton).contains(' Save Info ').click();
        cy.wait(12000);
        cy.get(this.weblocators.defaultButton).contains(' Approve Shipment Charges ').click({ force: true });
        cy.get(this.weblocators.approveChargesButton).contains(' Approve Charges ').click({ force: true });
        cy.wait(25000);
        cy.get(this.weblocators.pillButtons).contains(refineSearchOption).click();
        cy.wait(7000);

        cy.get('@cudaId').then(cudaId => {
            cy.get(this.weblocators.searchRecordByCudaIDInput).should('be.visible').type(cudaId, { force: true });
            cy.wait(5000);

            cy.get('tr.shipment-list-item').should('exist').within(() => {
                cy.get('td').eq(1).find('span').contains(cudaId).should('exist');
            });
        });
    }
}



