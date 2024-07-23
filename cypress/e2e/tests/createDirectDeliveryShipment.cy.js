import { createDirectDeliveryShipment } from "../../pages/createDirectDelivery";
import loginData from "../../fixtures/loginData.json";
import shipmentData from "../../fixtures/shipmentData.json";
import consigneeData from "../../fixtures/consigneeData.json";
import providerDetailsData from "../../fixtures/providerDetailsData.json";
import freightDetailsData from "../../fixtures/freightItemData.json";
import accessorialData from "../../fixtures/accessorialData.json";


const shipmentObj = new createDirectDeliveryShipment();

describe('Shipment Tests', () => {

    before(() => {
        cy.login(loginData.email, loginData.password);
    });
    
    it('Should create a new shipment with type delivery', () => {
        //No need to navigate to shipment page as default page is shipment page after login

        //Click on the create shipment button
        shipmentObj.clickCreateShipment();

        //Click on shipment type
        shipmentObj.clickShipmentType();

        shipmentObj.selectShipmentStatus(
            shipmentData.directDeliveryShipmentStatus);

        shipmentObj.enterForwarderDetails(
            shipmentData.forwarder,
            shipmentData.forwarderPRONumber);

        shipmentObj.handleShipperContactOption(
            shipmentData.contactOption);

        shipmentObj.handleconsigneeContactOption(
            consigneeData.consigneeOption);

        shipmentObj.enterShipperInformation(
            shipmentData.shipperInformation.locationName,
            shipmentData.shipperInformation.addressLine1,
            shipmentData.shipperInformation.city,
            shipmentData.shipperInformation.state,
            shipmentData.shipperInformation.zip);

        shipmentObj.enterConsigneeformation(
            consigneeData.consigneeInformation.locationName,
            consigneeData.consigneeInformation.addressLine1,
            consigneeData.consigneeInformation.addressLine2,
            consigneeData.consigneeInformation.city,
            consigneeData.consigneeInformation.state,
            consigneeData.consigneeInformation.zip);

        shipmentObj.enterProviderInformation(
            providerDetailsData.readyDate,
            providerDetailsData.readyTime,
            providerDetailsData.pickUpDate,
            providerDetailsData.pickUpTime,
            providerDetailsData.deliveryDate,
            providerDetailsData.deliveryTime);

        shipmentObj.handleProviderOption(
            providerDetailsData.providerOption.toUpperCase());

        shipmentObj.enterFreightInformation(
            freightDetailsData.freightPieces,
            freightDetailsData.freightType);

        shipmentObj.handleToggleButtons(
            accessorialData.toggleButtonsSet);

        shipmentObj.untoggleCheckbox(
            accessorialData.untoggleButtonsSet);

        shipmentObj.uploadShipmentAttachment(
            shipmentData.filePath1,
            shipmentData.filePath2);

        shipmentObj.verifyShipmentPopup

        shipmentObj.fetchAndStoreCudaID();
        shipmentObj.searchRecordByCudaID();
        shipmentObj.clickOnEllipsisButtonAtIndex(0);
        shipmentObj.clickOnDeleteShipment();
    });
});
