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
            'pageshow':'pageshow',
            'pagehide':'pagehide'
        },

        initialize: function () {
            
        },

        render: function () {
            this.$el.html(this.template());
        },
        
        pageshow: function() {
            
        },
        
        pagehide: function() {
            this.remove();
            this.unbind();
        }
    });

    return <%= _.classify(name) %>View;
});
