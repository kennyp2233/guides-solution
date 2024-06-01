import { Instant, Duration, ChronoUnit } from '@js-joda/core';  // Necesitas instalar js-joda para manejo de fechas

class GenerarXML {
    generateXML: string[];
    datosAgencia: Map<string, string>;
    datosDocumento: Map<string, string>;
    fileName: string;
    datos: string[];

    constructor(datos: string[], fileName: string) {
        this.generateXML = [];
        this.datosAgencia = new Map<string, string>();
        this.datosDocumento = new Map<string, string>();

        this.fileName = fileName;
        this.datos = datos;
        this.setearDatosAgencia();
        this.setearDatosDocumento();
        this.llenarLista();
    }

    private setearDatosDocumento(): void {
        const now = Instant.now()
            .truncatedTo(ChronoUnit.SECONDS)
            .minus(Duration.ofMinutes(4));

        this.datosDocumento = this.datosDocumento.set("TypeCode", "034")
            .set("ID", this.fileName)
            .set("IssueDateTime", now.toString())
            .set("DeclarationOfficeID", "055")
            .set("AcceptanceDateTime", now.toString())
            .set("VersionID", "1.0")!
            .set("CargaCorrectionTypeCode", "D")
            .set("DegreeNumberNumeric", "1")
            .set("DocumentTypeCode", "AE")
            .set("TraderAssignedReferenceID", this.datos[0])
            .set("MasterLandingBillSequenceNumeric", this.datos[1])
            .set("HouseLandingBillSequenceNumeric", this.datos[2])
            .set("ID2", this.datos[3])
            .set("ChangeReasonCode", "A")
            .set("ChangeReason", "ENVIO DESPUES DE 48 HORAS")
            .set("AssociatedGovernmentProcedureCode", "I")
            .set("BoardedQuantity", this.datos[4])
            .set("TotalGrossMassMeasure", this.datos[5])
            .set("LoadingDateTime", this.datos[6])
            .set("ID3", this.datos[7])
            .set("ID4", this.datos[8])
            .set("ID5", "03905645")
            .set("ID6", this.datos[9])
            .set("TypeCode1", "HWB")
            .set("ID7", "23902040")
            .set("Name", this.datos[10])
            .set("Line", this.datos[11])
            .set("Name1", this.datos[12])
            .set("Line1", this.datos[13])
            .set("Name2", this.datos[14])
            .set("PartyDocumentIdentificationType", "001")
            .set("PartyDocumentID", this.datos[15])
            .set("CountryCode", "EC")
            .set("Line2", this.datos[16])
            .set("ID8", this.datos[17])
            .set("Instructions", "Ninguna")
            .set("ID9", this.datos[18])
            .set("SequenceNumeric", this.datos[19])
            .set("NetNetWeightMeasure", this.datos[5])
            .set("QuantityQuantity", this.datos[4])
            .set("TypeCode2", "035")
            .set("CargoDescription", "FRESH FLOWERS");
    }

    private setearDatosAgencia(): void {
        this.datosAgencia = this.datosAgencia.set("DclrCd", "23902040")
            .set("DclrRuc", "1792169704001")
            .set("DclrSeCd", "23")
            .set("DclrSeId", "23902040")
            .set("DocPrcsType", "O")
            .set("RcsdEdocAfrCd", "004")
            .set("RcsdEdocAfrId", "002")
            .set("RcsdEdocTypeCd", "034")
            .set("SmtNo", this.fileName)
            .set("UserId", "MPINCHAO");
    }

    private llenarLista(): void {
        // INFO AGENCIA
        //1
        this.generateXML.push("<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n"
            + "<SOAP-ENV:Header>\n"
            + "<ns0:Header xmlns:ns0=\"http://soapinterop.org/xsd\">\n"
            + "<ns0:DclrCd>")!;
        this.generateXML.push(this.datosAgencia.get("DclrCd")!);

        //2
        this.generateXML.push("</ns0:DclrCd>\n"
            + "<ns0:DclrRuc>")!;
        this.generateXML.push(this.datosAgencia.get("DclrRuc")!);

        //3
        this.generateXML.push("</ns0:DclrRuc>\n"
            + "<ns0:DclrSeCd>")!;
        this.generateXML.push(this.datosAgencia.get("DclrSeCd")!);

        //4
        this.generateXML.push("</ns0:DclrSeCd>\n"
            + "<ns0:DclrSeId>")!;
        this.generateXML.push(this.datosAgencia.get("DclrSeId")!);

        //5
        this.generateXML.push("</ns0:DclrSeId>\n"
            + "<ns0:DocPrcsType>")!;
        this.generateXML.push(this.datosAgencia.get("DocPrcsType")!);

        //6
        this.generateXML.push("</ns0:DocPrcsType>\n"
            + "<ns0:RcsdEdocAfrCd>")!;
        this.generateXML.push(this.datosAgencia.get("RcsdEdocAfrCd")!);

        //7
        this.generateXML.push("</ns0:RcsdEdocAfrCd>\n"
            + "<ns0:RcsdEdocAfrId>")!;
        this.generateXML.push(this.datosAgencia.get("RcsdEdocAfrId")!);

        //8
        this.generateXML.push("</ns0:RcsdEdocAfrId>\n"
            + "<ns0:RcsdEdocTypeCd>")!;
        this.generateXML.push(this.datosAgencia.get("RcsdEdocTypeCd")!);

        //9
        this.generateXML.push("</ns0:RcsdEdocTypeCd>\n"
            + "<ns0:SmtNo>")!;
        this.generateXML.push(this.datosAgencia.get("SmtNo")!);

        //10
        this.generateXML.push("</ns0:SmtNo>\n"
            + "<ns0:UserId>")!;
        this.generateXML.push(this.datosAgencia.get("UserId")!);
        this.generateXML.push("</ns0:UserId>\n"
            + "        </ns0:Header>\n"
            + "    </SOAP-ENV:Header>\n"
            + "    <SOAP-ENV:Body>\n"
            + "        <tns:sendExportCargaCME xmlns:tns=\"http://webservice.ecg.ecuapass.aduana.gob.ec/\">\n"
            + "            <arg0>&lt;DocumentMetadata xsi:schemaLocation=\"urn:wco:datamodel:EC:CME:1:0:0 EC_CME_0p1.02.xsd\" xmlns=\"urn:wco:datamodel:EC:CME:1:0:0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"&gt;\n"
            + "&lt;WCODataModelVersion/&gt;\n"
            + "&lt;WCODocumentName/&gt;\n"
            + "&lt;CountryCode/&gt;\n"
            + "&lt;AgencyName/&gt;\n"
            + "&lt;AgencyAssignedCountrySubEntityID/&gt;\n"
            + "&lt;AgencyAssignedCustomizedDocumentName/&gt;\n"
            + "&lt;AgencyAssignedCustomizedDocumentVersion/&gt;\n"
            + "&lt;Declaration&gt;\n"
            + "&lt;TypeCode&gt;")!;

        //resto hasta llegar a TypeCode
        //1
        this.generateXML.push(this.datosDocumento.get("TypeCode")!);

        //2
        this.generateXML.push("&lt;/TypeCode&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID")!);
        //3
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;IssueDateTime&gt;")!;
        this.generateXML.push(this.datosDocumento.get("IssueDateTime")!);
        //4
        this.generateXML.push("&lt;/IssueDateTime&gt;\n"
            + "&lt;DeclarationOfficeID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("DeclarationOfficeID")!);
        //5
        this.generateXML.push("&lt;/DeclarationOfficeID&gt;\n"
            + "&lt;AcceptanceDateTime&gt;")!;
        this.generateXML.push(this.datosDocumento.get("AcceptanceDateTime")!);
        //6
        this.generateXML.push("&lt;/AcceptanceDateTime&gt;\n"
            + "&lt;VersionID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("VersionID")!);
        //7
        this.generateXML.push("&lt;/VersionID&gt;\n"
            + "&lt;CargaCorrectionTypeCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("CargaCorrectionTypeCode")!);
        //8
        this.generateXML.push("&lt;/CargaCorrectionTypeCode&gt;\n"
            + "&lt;DegreeNumberNumeric&gt;")!;
        this.generateXML.push(this.datosDocumento.get("DegreeNumberNumeric")!);
        //9
        this.generateXML.push("&lt;/DegreeNumberNumeric&gt;\n"
            + "&lt;DocumentTypeCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("DocumentTypeCode")!);
        //10
        this.generateXML.push("&lt;/DocumentTypeCode&gt;\n"
            + "&lt;UCR&gt;\n"
            + "&lt;TraderAssignedReferenceID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("TraderAssignedReferenceID")!);
        //11
        this.generateXML.push("&lt;/TraderAssignedReferenceID&gt;\n"
            + "&lt;MasterLandingBillSequenceNumeric&gt;")!;
        this.generateXML.push(this.datosDocumento.get("MasterLandingBillSequenceNumeric")!);
        //12
        this.generateXML.push("&lt;/MasterLandingBillSequenceNumeric&gt;\n"
            + "&lt;HouseLandingBillSequenceNumeric&gt;")!;
        this.generateXML.push(this.datosDocumento.get("HouseLandingBillSequenceNumeric")!);
        //12
        this.generateXML.push("&lt;/HouseLandingBillSequenceNumeric&gt;\n"
            + "&lt;/UCR&gt;\n"
            + "&lt;Agent&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID2")!);
        //13
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;/Agent&gt;\n"
            + "&lt;Amendment&gt;\n"
            + "&lt;ChangeReasonCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ChangeReasonCode")!);
        //14
        this.generateXML.push("&lt;/ChangeReasonCode&gt;\n"
            + "&lt;ChangeReason&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ChangeReason")!);
        //15
        this.generateXML.push("&lt;/ChangeReason&gt;\n"
            + "&lt;/Amendment&gt;\n"
            + "&lt;BorderTransportMeans&gt;\n"
            + "&lt;TransportMeansOwner/&gt;\n"
            + "&lt;TransportMeansOperator/&gt;\n"
            + "&lt;/BorderTransportMeans&gt;\n"
            + "&lt;UnloadingLocation/&gt;\n"
            + "&lt;GovernmentProcedure/&gt;\n"
            + "&lt;Consignment&gt;\n"
            + "&lt;AssociatedGovernmentProcedureCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("AssociatedGovernmentProcedureCode")!);
        //16
        this.generateXML.push("&lt;/AssociatedGovernmentProcedureCode&gt;\n"
            + "&lt;BoardedQuantity&gt;")!;
        this.generateXML.push(this.datosDocumento.get("BoardedQuantity")!);
        //17
        this.generateXML.push("&lt;/BoardedQuantity&gt;\n"
            + "&lt;TotalGrossMassMeasure&gt;")!;
        this.generateXML.push(this.datosDocumento.get("TotalGrossMassMeasure")!);
        //18
        this.generateXML.push("&lt;/TotalGrossMassMeasure&gt;\n"
            + "&lt;BorderTransportMeans/&gt;\n"
            + "&lt;LoadingLocation&gt;\n"
            + "&lt;LoadingDateTime&gt;")!;
        this.generateXML.push(this.datosDocumento.get("LoadingDateTime")!);
        //19
        this.generateXML.push("&lt;/LoadingDateTime&gt;\n"
            + "&lt;/LoadingLocation&gt;\n"
            + "&lt;AssociatedTransportDocument&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID3")!);
        //20
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;/AssociatedTransportDocument&gt;\n"
            + "&lt;UnloadingLocation&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID4")!);
        //21
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;/UnloadingLocation&gt;\n"
            + "&lt;Carrier&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID5")!);
        //22
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;/Carrier&gt;\n"
            + "&lt;IntermediateCarrier/&gt;\n"
            + "&lt;TransportContractDocument&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID6")!);

        //23
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;TypeCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("TypeCode1")!);
        //23
        this.generateXML.push("&lt;/TypeCode&gt;\n"
            + "&lt;Consolidator&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID7")!);
        //24
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;/Consolidator&gt;\n"
            + "&lt;/TransportContractDocument&gt;\n"
            + "&lt;Consignee&gt;\n"
            + "&lt;Name&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Name")!);
        //25
        this.generateXML.push("&lt;/Name&gt;\n"
            + "&lt;pushress&gt;\n"
            + "&lt;Line&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Line")!);

        //26
        this.generateXML.push("&lt;/Line&gt;\n"
            + "&lt;/pushress&gt;\n"
            + "&lt;/Consignee&gt;\n"
            + "&lt;NotifyParty&gt;\n"
            + "&lt;Name&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Name1")!);

        //27
        this.generateXML.push("&lt;/Name&gt;\n"
            + "&lt;pushress&gt;\n"
            + "&lt;Line&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Line1")!);
        //28
        this.generateXML.push("&lt;/Line&gt;\n"
            + "&lt;/pushress&gt;\n"
            + "&lt;/NotifyParty&gt;\n"
            + "&lt;Consignor&gt;\n"
            + "&lt;Name&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Name2")!);
        //29
        this.generateXML.push("&lt;/Name&gt;\n"
            + "&lt;PartyDocumentIdentificationType&gt;")!;
        this.generateXML.push(this.datosDocumento.get("PartyDocumentIdentificationType")!);
        //30
        this.generateXML.push("&lt;/PartyDocumentIdentificationType&gt;\n"
            + "&lt;PartyDocumentID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("PartyDocumentID")!);
        //31
        this.generateXML.push("&lt;/PartyDocumentID&gt;\n"
            + "&lt;pushress&gt;\n"
            + "&lt;CountryCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("CountryCode")!);
        //32
        this.generateXML.push("&lt;/CountryCode&gt;\n"
            + "&lt;Line&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Line2")!);
        //33
        this.generateXML.push("&lt;/Line&gt;\n"
            + "&lt;/pushress&gt;\n"
            + "&lt;/Consignor&gt;\n"
            + "&lt;GoodsReceiptPlace&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID8")!);
        //34
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;/GoodsReceiptPlace&gt;\n"
            + "&lt;Handling&gt;\n"
            + "&lt;Instructions&gt;")!;
        this.generateXML.push(this.datosDocumento.get("Instructions")!);
        //35
        this.generateXML.push("&lt;/Instructions&gt;\n"
            + "&lt;/Handling&gt;\n"
            + "&lt;PreviousDocument&gt;\n"
            + "&lt;ID&gt;")!;
        this.generateXML.push(this.datosDocumento.get("ID9")!);
        //36
        this.generateXML.push("&lt;/ID&gt;\n"
            + "&lt;TotalPackageQuantity&gt;0&lt;/TotalPackageQuantity&gt;\n"
            + "&lt;TotalGrossMassMeasure&gt;0&lt;/TotalGrossMassMeasure&gt;\n"
            + "&lt;TransportSplitIndicator&gt;false&lt;/TransportSplitIndicator&gt;\n"
            + "&lt;SplitNumberNumeric&gt;0&lt;/SplitNumberNumeric&gt;\n"
            + "&lt;/PreviousDocument&gt;\n"
            + "&lt;ConsignmentItem&gt;\n"
            + "&lt;SequenceNumeric&gt;")!;
        this.generateXML.push(this.datosDocumento.get("SequenceNumeric")!);
        //37
        this.generateXML.push("&lt;/SequenceNumeric&gt;\n"
            + "&lt;GoodsStatusCode&gt;CG&lt;/GoodsStatusCode&gt;\n"
            + "&lt;GoodsMeasure&gt;\n"
            + "&lt;NetNetWeightMeasure&gt;")!;
        this.generateXML.push(this.datosDocumento.get("NetNetWeightMeasure")!);
        //38
        this.generateXML.push("&lt;/NetNetWeightMeasure&gt;\n"
            + "&lt;/GoodsMeasure&gt;\n"
            + "&lt;Packaging&gt;\n"
            + "&lt;QuantityQuantity&gt;")!;
        this.generateXML.push(this.datosDocumento.get("QuantityQuantity")!);
        //39
        this.generateXML.push("&lt;/QuantityQuantity&gt;\n"
            + "&lt;TypeCode&gt;")!;
        this.generateXML.push(this.datosDocumento.get("TypeCode2")!);

        //40
        this.generateXML.push("&lt;/TypeCode&gt;\n"
            + "&lt;/Packaging&gt;\n"
            + "&lt;Commodity&gt;\n"
            + "&lt;CargoDescription&gt;")!;
        this.generateXML.push(this.datosDocumento.get("CargoDescription")!);
        //ebnd
        this.generateXML.push("&lt;/CargoDescription&gt;\n"
            + "&lt;CommodityRelatedPackaging/&gt;\n"
            + "&lt;/Commodity&gt;\n"
            + "&lt;/ConsignmentItem&gt;\n"
            + "&lt;/Consignment&gt;\n"
            + "&lt;/Declaration&gt;\n"
            + "&lt;/DocumentMetadata&gt;</arg0>\n"
            + "        </tns:sendExportCargaCME>\n"
            + "    </SOAP-ENV:Body>\n"
            + "</SOAP-ENV:Envelope>")!;
    }

    public retornarArchivoString(): string {
        return this.generateXML.join("");
    }
}

export default GenerarXML;