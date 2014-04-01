/*global <%= _.camelize(appname) %>, Backbone, JST*/

<%= _.camelize(appname) %>.Views = <%= _.camelize(appname) %>.Views || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Views.<%= _.classify(name) %> = Backbone.View.extend({

        template: JST['<%= jst_path %>'],

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

})();
