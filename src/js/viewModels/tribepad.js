/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * tribepad module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojselectcombobox'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function tribepadContentViewModel() {
        var self = this;
        
        self.position = ko.observable();
        self.positions = ko.observableArray([
            {value: '300100156412118', label: 'Tesco Store Manager'},
            {value: '300100156412066', label: 'Tesco Store Worker'},
            {value: '300100156412096', label: 'Tesco Store Expert'},
            {value: '300100156412140', label: 'Tesco Region Manager'}
        ]);
        
        self.manager = ko.observable();
        self.managers = ko.observableArray([
            {value: '2', label: 'Susan Smith'},
            {value: '3', label: 'Kenneth Walker'},
            {value: '4', label: 'Sandra Pierson'},
            {value: '5', label: 'MaryBeth Richards'}
        ]);
    }
    
    return tribepadContentViewModel;
});
