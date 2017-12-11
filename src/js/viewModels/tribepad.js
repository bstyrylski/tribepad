/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * tribepad module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojselectcombobox', 'ojs/ojinputtext', 
    'ojs/ojaccordion', 'ojs/ojprogress', 'ojs/ojdialog'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function tribepadContentViewModel() {
        var self = this;
        
//        self.baseUrl = "http://localhost:1337/fuscdrmovm167-hcm-ext.us.oracle.com:443";
        self.baseUrl = "http://localhost:1337/fuscdrmsmc209-fa-ext.us.oracle.com:443";
        
//        self.empsModule = "/hcmCoreApi/resources/latest";
        self.empsModule = "/hcmRestApi/resources/latest";
//        self.workStructuresModule = "/hcmRestSetupApi/resources/latest";
        self.workStructuresModule = self.empsModule;
        
//        self.authorization = "Basic VEVTQ09fREVNT19ISVJJTkdfTUdSX1dPX1BPUzpXZWxjb21lMQ==";
        self.hiringManager = "Basic VEVTQ09fREVNT19ISVJJTkdfTUdSIDpXZWxjb21lMQ==";
        self.systemUser = "Basic VEVTQ09fREVNT19VU0VSOldlbGNvbWUx";
        self.systemUserWithPII = "Basic VEVTQ09fREVNT19VU0VSX1BJSTpXZWxjb21lMQ==";
        
        self.position = ko.observable();
        self.positions = ko.observableArray([]);
        
        self.manager = ko.observable();
        self.managers = ko.observableArray([]);
        
        self.getPositionsUrl = self.workStructuresModule + "/positions?q=PositionCode like 'TESCO%'&onlyData=true&fields=PositionId,Name,BusinessUnitId,DepartmentId,JobId,LocationId,EntryGradeId,EntryStepId,GradeLadderId,FullPartTime,RegularTemporary";
        self.getPositionsRequest = "GET " + self.getPositionsUrl;
        self.getPositionsResponse = ko.observable();
        self.getPositionsProgress = ko.observable(false);
        
        self.empsUrl = self.empsModule + "/emps";
        self.getManagersUrl = self.empsUrl + "?fields=PersonId,DisplayName;assignments:AssignmentId&onlyData=true&limit=10&q=PersonId < 20";
        self.getManagersRequest = "GET " + self.getManagersUrl;
        self.getManagersResponse = ko.observable();
        self.getManagersProgress = ko.observable(false);
        
        self.getGradeLadderRequest = ko.observable();
        self.getGradeLadderResponse = ko.observable();
        self.getGradeLadderProgress = ko.observable(false);
        
        self.createEmployeeRequest = ko.observable();
        self.createEmployeeResponse = ko.observable();
        self.createEmployeeProgress = ko.observable(false);
        
        self.getEmployeeRequest = ko.observable();
        self.getEmployeeResponse = ko.observable();
        self.getEmployeeProgress = ko.observable(false);
        
        self.getPositions = function () {
            self.getPositionsProgress(true);
            $.ajax({
                url: self.baseUrl + self.getPositionsUrl,
                type: 'GET',
                headers: {
                        'Authorization': self.hiringManager,
                        'REST-Framework-Version': 2
                    },
                success: function(positions) {
                        self.getPositionsResponse(JSON.stringify(positions, null, 2));
                    
                        $.each(positions.items, function () {
                            self.positions.push({
                                value: this.PositionId,
                                label: this.Name,
                                businessUnitId: this.BusinessUnitId,
                                departmentId: this.DepartmentId,
                                jobId: this.JobId,
                                locationId: this.LocationId,
                                entryGradeId: this.EntryGradeId,
                                entryStepId: this.EntryStepId,
                                gradeLadderId: this.GradeLadderId,
                                fullPartTime: this.FullPartTime,
                                regularTemporary: this.RegularTemporary
                            });
                        });
                        self.getPositionsProgress(false);
                    }
            });
        }
        
        self.getManagers = function () {
            self.getManagersProgress(true);
            $.ajax({
                url: self.baseUrl + self.getManagersUrl,
                type: 'GET',
                headers: {
                        'Authorization': self.hiringManager,
                        'REST-Framework-Version': 2
                    },
                success: function(managers) {
                        self.getManagersResponse(JSON.stringify(managers, null, 2));
                    
                        $.each(managers.items, function () {
                            self.managers.push({
                                value: this.PersonId,
                                label: this.DisplayName,
                                assignmentId: (this.assignments.length > 0) ? this.assignments[0].AssignmentId : null
                            });
                        });
                        
                        self.getManagersProgress(false);
                    }
            });
        }

        self.getPositions();
        self.getManagers();
        
        self.firstName = ko.observable();
        self.lastName = ko.observable();
        self.nationalId = ko.observable();
        
        self.positionId = ko.observable();
        self.businessUnitId = ko.observable();
        self.departmentId = ko.observable();
        self.jobId = ko.observable();
        self.locationId = ko.observable();
        self.gradeId = ko.observable();
        self.gradeStepId = ko.observable();
        self.gradeLadderId = ko.observable();
        self.fullPartTime = ko.observable();
        self.regularTemporary = ko.observable();
        
        self.managerId = ko.observable();
        self.managerAssignmentId = ko.observable();
        
        self.salaryAmount = ko.observable();
        
        self.personId = ko.observable();
        
        self.submitVacancy = function () {
            for (var i = 0; i < self.positions().length; i++) {
                if (self.positions()[i].value == self.position()) {
                    var position = self.positions()[i];
                    self.positionId(position.value);
                    self.businessUnitId(position.businessUnitId);
                    self.departmentId(position.departmentId);
                    self.jobId(position.jobId);
                    self.locationId(position.locationId);
                    self.gradeId(position.entryGradeId);
                    self.gradeStepId(position.entryStepId);
                    self.gradeLadderId(position.gradeLadderId);
                    self.fullPartTime(position.fullPartTime);
                    self.regularTemporary(position.regularTemporary);
                    break;
                }
            }
            
            for (var i = 0; i < self.managers().length; i++) {
                if (self.managers()[i].value == self.manager()) {
                    var manager = self.managers()[i];
                    self.managerId(manager.value);
                    self.managerAssignmentId(manager.assignmentId)
                    break;
                }
            }
            
            var getGradeLadderUrl = self.workStructuresModule + "/gradeLadders?onlyData=true&expand=stepRates,stepRates.stepRateValues&q=GradeLadderId=" + self.gradeLadderId();
            self.getGradeLadderRequest("GET " + getGradeLadderUrl);
            
            self.getGradeLadderProgress(true);
            $.ajax({
                url: self.baseUrl + getGradeLadderUrl,
                type: 'GET',
                headers: {
                        'Authorization': self.hiringManager,
                        'REST-Framework-Version': 2
                    },
                success: function(gradeLadders) {
                        self.getGradeLadderResponse(JSON.stringify(gradeLadders, null, 2));
                    
                        for (var i = 0; i < gradeLadders.items[0].stepRates.length; i++) {
                            if (gradeLadders.items[0].stepRates[i].RateType == "SALARY") {
                                for (var j = 0; j < gradeLadders.items[0].stepRates[i].stepRateValues.length; j++) {
                                    if (gradeLadders.items[0].stepRates[i].stepRateValues[j].GradeStepId == self.gradeStepId()) {
                                        self.salaryAmount(gradeLadders.items[0].stepRates[i].stepRateValues[j].StepRateValueAmount);
                                        break;
                                    }
                                }
                                
                                break;
                            }
                        }
                        
                        self.getGradeLadderProgress(false);
                    }
            });
        }
        
        self.submitEmployee = function () {
            var employee = {
                Salutation: "MR.",
                LegalEntityId : 300100033641611,
                FirstName: self.firstName(),
                MiddleName: null,
                LastName: self.lastName(),
                NameSuffix: null,
                Honors: null,
                DisplayName: self.firstName() + " " + self.lastName(),
                WorkPhoneCountryCode: "1",
                WorkPhoneAreaCode: "510",
                WorkPhoneNumber: "234-5678",
                HomePhoneCountryCode: "44",
                HomePhoneAreaCode: "123",
                HomePhoneNumber: "12345",
                AddressLine1: "The Innovation Centre",
                AddressLine2: "217 Portobello",
                AddressLine3: null,
                City: "Sheffield",
                Region: null,
                Region2: null,
                Country: "GB",
                PostalCode: "S1 4DP",
                Religion: null,
                DateOfBirth: "1999-10-05",
                Ethnicity: null,
                Gender: "M",
                NationalIdType: "NINO",
                NationalId: self.nationalId(),                
                NationalIdCountry: null,
                NationalIdExpirationDate: null,
                CitizenshipStatus: "A",
                CitizenshipLegislationCode: "GB",
                CitizenshipToDate: null,
                PassportIssueDate: null,
                PassportNumber: "P121456",
                PassportIssuingCountry: "GB",
                PassportExpirationDate: null,
                LicenseNumber: "11145678",
                DriversLicenseExpirationDate: null,
                DriversLicenseIssuingCountry: "GB",
                assignments: [
                    {
                        PositionId: self.positionId(),
                        BusinessUnitId: self.businessUnitId(),
                        DepartmentId: self.departmentId(),
                        JobId: self.jobId(),
                        LocationId: self.locationId(),
                        GradeId: self.gradeId(),
                        WorkerCategory: null,
                        AssignmentCategory: "FR",
                        WorkingAtHome: "N",
                        WorkingAsManager: "N",
                        SalaryCode: null,
                        Frequency: "W",
                        WorkingHours: 30,
                        SalaryAmount: self.salaryAmount(),
                        SalaryBasisId: 100010025000007,
                        ActionCode: "HIRE", 
                        ActionReasonCode: "NEWHIRE",
                        AssignmentStatus: "ACTIVE",
                        ManagerId: self.managerId(),
                        ManagerAssignmentId: self.managerAssignmentId(),
                        ManagerType: "LINE_MANAGER",
                        WorkTaxAddressId : null,
                        GradeLadderId: self.gradeLadderId(),
                        FullPartTime: self.fullPartTime(),
                        RegularTemporary: self.regularTemporary(),
                    }
                ]
            }
            
            self.createEmployeeRequest("POST " + self.empsUrl + "\n\n" + JSON.stringify(employee, null, 2));
            
            self.createEmployeeProgress(true);
            $.ajax({
                url: self.baseUrl + self.empsUrl,
                type: 'POST',
                contentType: 'application/vnd.oracle.adf.resourceitem+json',
                headers: {
                        'Authorization': self.systemUser,
                    },
                data: JSON.stringify(employee),
                success: function(employee) {
                    self.createEmployeeResponse("OK\n\n" + JSON.stringify(employee, null, 2));
                    self.createEmployeeProgress(false);
                    
                    self.personId(employee.PersonId);
                    document.querySelector('#employeeDialog').open();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self.createEmployeeResponse("ERROR\n\n" + JSON.stringify(jqXHR, null, 2) + "\n\n" + textStatus + "\n\n" + errorThrown);
                    self.createEmployeeProgress(false);
                }
            });
        }
        
        self.getEmployee = function () {
            var getEmployeeUrl = self.empsUrl + "?onlyData=true&q=PersonId=" + self.personId();
            self.getEmployeeRequest("GET " + getEmployeeUrl);
            
            self.getEmployeeProgress(true);
            $.ajax({
                url: self.baseUrl + getEmployeeUrl,
                type: 'GET',
                headers: {
                        'Authorization': self.systemUserWithPII,
                        'REST-Framework-Version': 2
                    },
                success: function(employees) {
                        self.getEmployeeResponse(JSON.stringify(employees, null, 2));                      
                        self.getEmployeeProgress(false);
                    }
            });
        }
    }        
    
    return tribepadContentViewModel;
});
