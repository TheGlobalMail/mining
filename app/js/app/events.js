define([
  'lodash',
  'fatcontroller',
  'config'
], function(_, fc, config) {
  "use strict";

  if (config.debugEvents) {
    // Wrap `on` and `trigger` in log calls

    // Try to prevent regressions or typos by registering event names
    var eventRegister = [
      'init:end',
      'layout:end',
      'audio:on',
      'audio:off'
    ];

    // Register scroll events
    _.each(['intro', 'chapter-container'], function(fragment) {
      eventRegister.push('scroll:enter:' + fragment);
      eventRegister.push('scroll:exit:' + fragment);
    });

    var trigger = fc.trigger;

    fc.trigger = function() {
      var args = Array.prototype.slice.apply(arguments);

      var knownEvent = _.contains(eventRegister, args[0]);
      if (console.groupCollapsed && console.groupEnd && console.trace) {
        // Log a stack trace
        var groupName = knownEvent ? 'Event triggered: ' : 'Unknown event triggered: ';
        console.groupCollapsed(groupName + args[0]);
        if (args.length > 1) {
          console.log(args);
        }
        console.trace();
        console.groupEnd();

        // TODO: move event log code into FC and log each subscriber as they're called
      } else {
        console.log('Event triggered', args, Error().stack);
      }

      return trigger.apply(null, args);
    };

    var on = fc.on;

    fc.on = function() {
      var args = Array.prototype.slice.apply(arguments);

      var knownEvent = _.contains(eventRegister, args[0]);
      if (console.groupCollapsed && console.groupEnd && console.trace) {
        // Log a stack trace
        var groupName = knownEvent ? 'Event bound: ' : 'Unknown event bound: ';
        console.groupCollapsed(groupName + args[0]);
        console.trace();
        console.groupEnd();
      }

      return on.apply(null, args);
    };

  }

  return fc;
});