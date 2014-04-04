/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var <%= _.classify(name) %>View = Backbone.View.extend({
        template: Wiser.Templates['<%= jst_path %>'],

        events: {
            'showpage':'showpage',
            'hidepage':'hidepage'
        },

        initialize: function () {
            
        },

        render: function () {
            this.$el.html(this.template());
        },
        
        showpage: function() {
            
        },
        
        hidepage: function() {
            this.remove();
            this.unbind();
        }
    });

    return <%= _.classify(name) %>View;
});
