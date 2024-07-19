import { createShipment } from "../../pages/createShipment";
import loginData from "../../fixtures/loginData.json";
import shipmentData from "../../fixtures/shipmentData.json";
import dropInformationData from "../../fixtures/dropInformationData.json";
import providerDetailsData from "../../fixtures/providerDetailsData.json";
import freightDetailsData from "../../fixtures/freightItemData.json";


const shipmentObj = new createShipment();

describe('Shipment Tests', () => {

    before(() => {
        cy.login(loginData.email, loginData.password);
    });

    // beforeEach(() => {
    //     // Ensure the user is logged in by visiting the main page
    //     cy.visit(Cypress.env('shipment_baseURL'));
    // });

    it('should create a new shipment', () => {
        //No need to navigate to shipment page as default page is shipment page after login

        //Click on the create shipment button
        shipmentObj.clickCreateShipment();

        //Click on shipment type
        shipmentObj.clickShipmentType();
        shipmentObj.selectShipmentStatus(shipmentData.shipmentStatus);
        shipmentObj.enterForwarderDetails(
            shipmentData.forwarder);

        shipmentObj.handleContactOption(
            shipmentData.contactOption, 
            dropInformationData.dropOption);

        shipmentObj.enterShipperInformation(
            shipmentData.shipperInformation.locationName,
            shipmentData.shipperInformation.addressLine1,
            shipmentData.shipperInformation.city,
            shipmentData.shipperInformation.state,
            shipmentData.shipperInformation.zip);

        shipmentObj.enterDropInformation(
            dropInformationData.dropInformation.locationName,
            dropInformationData.dropInformation.addressLine1,
            dropInformationData.dropInformation.addressLine2,
            dropInformationData.dropInformation.city,
            dropInformationData.dropInformation.state,
            dropInformationData.dropInformation.zip);

        shipmentObj.enterProviderInformation(
            providerDetailsData.readyDate,
            providerDetailsData.readyTime,
            providerDetailsData.pickUpDate,
            providerDetailsData.pickUpTime,
            providerDetailsData.dropDate,
            providerDetailsData.dropTime);

        shipmentObj.handleProviderOption(providerDetailsData.providerOption);

        shipmentObj.enterFreightInformation(freightDetailsData.freightPieces, freightDetailsData.freightType)

        shipmentObj.verifyShipmentPopup()

        //shipmentObj.handleDropOption(shipmentData.dropOption);

        // Add assertions to verify the shipment was created successfully
        // Example:
        // cy.contains('Shipment created successfully').should('be.visible');
    });
});
