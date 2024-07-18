import { createShipment } from "../../pages/createShipment";
import loginData from "../../fixtures/loginData.json";
import shipmentData from "../../fixtures/shipmentData.json"

const shipmentObj = new createShipment();


describe('Shipment Tests', () => {

    before(() => {
        cy.login(loginData.email, loginData.password);
    });

    it('should create a new shipment', () => {
        //No need to navigate to shipment page as default page is shipment page after login

        //Click on the create shipment button
        shipmentObj.clickCreateShipment();

        //Click on shipment type
        shipmentObj.clickShipmentType();
        shipmentObj.selectShipmentStatus(shipmentData.shipmentStatus);
        shipmentObj.enterForwarder(shipmentData.forwarder);
        shipmentObj.enterForwarderReferenceNumber(shipmentData.forwarderReferenceNumber);
        shipmentObj.enterForwarderPRONumber(shipmentData.forwarderPRONumber);
        shipmentObj.enterForwarderMawb(shipmentData.forwardermawb);
        shipmentObj.handleContactOption(shipmentData.contactOption);

        shipmentObj.enterRecoveryInformation(
            shipmentData.shipperInformation.locationName, 
            shipmentData.shipperInformation.addressLine1, 
            shipmentData.shipperInformation.city, 
            shipmentData.shipperInformation.state, 
            shipmentData.shipperInformation.zip);

    // Add assertions to verify the shipment was created successfully
        // Example:
        // cy.contains('Shipment created successfully').should('be.visible');
    });
});
