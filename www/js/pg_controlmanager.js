//
// javascript page handler for controlmanager.html
//
(function(global) {
  'use strict';

  var typingTimer;
  var doneTypingAfter = 1600; // in milleseconds

  var controlManager = {
    pageLoaded: function(targetElem, html) {
      targetElem.innerHTML = html;
    },

    onNetTabChange: function(key, value, isNew) {
      var keySuffix = "/SmartDashboard/ControlManager/";
      if (key.substring(0, keySuffix.length) == keySuffix) {
        var expressionName = key.substring(keySuffix.length,key.length);
        var expressionID = expressionName.replace(/[^a-zA-Z0-9\-]/g, "λ"); // To deal with non alphanumeric characters in ids
        if (isNew) {
          $("#expressionlist").append(
            `<li class="col-sm-12 expression"><p class="col-sm-5">` + expressionName + `:&nbsp;</p>
            <input id="` + expressionID + `" value="` + value + `" placeholder="Mathematical expression with variables" type="text" class="col-sm-7"/>
            </li>`);
          $("#"+expressionID).on("input", function(event) {
            window.clearTimeout(typingTimer);
            var val = $(this).val();
            typingTimer = window.setTimeout(function() {
              NetworkTables.putValue(key, val);
            }, doneTypingAfter);
          });
        } else {
          $("#"+expressionID).val(value);
        }
      }
    },
  };

  global.app.setPageHandler("controlmanager", controlManager);
})(window);
