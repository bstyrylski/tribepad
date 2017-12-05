/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * tribepad module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojselectcombobox', 'ojs/ojinputtext'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function tribepadContentViewModel() {
        var self = this;
        
        self.position = ko.observable();
        self.positions = ko.observableArray([]);
        
        self.manager = ko.observable();
        self.managers = ko.observableArray([]);
        
        self.getPositions = function () {
            $.ajax({
                url: "http://localhost:1337/fuscdrmovm167-hcm-ext.us.oracle.com:443/hcmCoreSetupApi/resources/latest/positions?q=PositionCode like 'TESCO%'&onlyData=true&fields=PositionId,Name,BusinessUnitId,DepartmentId,JobId,LocationId,EntryGradeId,EntryStepId,GradeLadderId",
                type: 'GET',
                headers: {
                        'Authorization': 'Basic VEVTQ09fREVNT19ISVJJTkdfTUdSX1dPX1BPUzpXZWxjb21lMQ==',
                        'REST-Framework-Version': 2
                    },
                success: function(positions) {
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
                            });
                        });
                    }
            });
        }
        
        self.getManagers = function () {
            $.ajax({
                url: "http://localhost:1337/fuscdrmovm167-hcm-ext.us.oracle.com:443/hcmCoreApi/resources/latest/emps?fields=PersonId,DisplayName;assignments:AssignmentId&onlyData=true&limit=10&q=PersonId < 20",
                type: 'GET',
                headers: {
                        'Authorization': 'Basic VEVTQ09fREVNT19ISVJJTkdfTUdSX1dPX1BPUzpXZWxjb21lMQ==',
                        'REST-Framework-Version': 2
                    },
                success: function(managers) {
                        $.each(managers.items, function () {
                            self.managers.push({
                                value: this.PersonId,
                                label: this.DisplayName,
                                assignmentId: (this.assignments.length > 0) ? this.assignments[0].AssignmentId : null
                            });
                        });
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
        self.managerId = ko.observable();
        self.managerAssignmentId = ko.observable();
        self.salaryAmount = ko.observable();
        
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
        }
    }        
    
    return tribepadContentViewModel;
});
