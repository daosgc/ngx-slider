(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('detect-passive-events'), require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@angular-slider/ngx-slider', ['exports', 'rxjs', 'rxjs/operators', 'detect-passive-events', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['angular-slider'] = global['angular-slider'] || {}, global['angular-slider']['ngx-slider'] = {}),global.rxjs,global.rxjs.operators,null,global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,rxjs,operators,detectPassiveEvents,core,forms,common) { 'use strict';

    detectPassiveEvents = detectPassiveEvents && detectPassiveEvents.hasOwnProperty('default') ? detectPassiveEvents['default'] : detectPassiveEvents;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var LabelType = {
        /** Label above low pointer */
        Low: 0,
        /** Label above high pointer */
        High: 1,
        /** Label for minimum slider value */
        Floor: 2,
        /** Label for maximum slider value */
        Ceil: 3,
        /** Label below legend tick */
        TickValue: 4,
    };
    LabelType[LabelType.Low] = 'Low';
    LabelType[LabelType.High] = 'High';
    LabelType[LabelType.Floor] = 'Floor';
    LabelType[LabelType.Ceil] = 'Ceil';
    LabelType[LabelType.TickValue] = 'TickValue';
    /**
     * Slider options
     */
    var /**
     * Slider options
     */ Options = /** @class */ (function () {
        function Options() {
            /**
             * Minimum value for a slider.
             * Not applicable when using stepsArray.
             */
            this.floor = 0;
            /**
             * Maximum value for a slider.
             * Not applicable when using stepsArray.
             */
            this.ceil = null;
            /**
             * Step between each value.
             * Not applicable when using stepsArray.
             */
            this.step = 1;
            /**
             * The minimum range authorized on the slider.
             * Applies to range slider only.
             * When using stepsArray, expressed as index into stepsArray.
             */
            this.minRange = null;
            /**
             * The maximum range authorized on the slider.
             * Applies to range slider only.
             * When using stepsArray, expressed as index into stepsArray.
             */
            this.maxRange = null;
            /**
             * Set to true to have a push behavior. When the min handle goes above the max,
             * the max is moved as well (and vice-versa). The range between min and max is
             * defined by the step option (defaults to 1) and can also be overriden by
             * the minRange option. Applies to range slider only.
             */
            this.pushRange = false;
            /**
             * The minimum value authorized on the slider.
             * When using stepsArray, expressed as index into stepsArray.
             */
            this.minLimit = null;
            /**
             * The maximum value authorized on the slider.
             * When using stepsArray, expressed as index into stepsArray.
             */
            this.maxLimit = null;
            /**
             * Custom translate function. Use this if you want to translate values displayed
             * on the slider.
             */
            this.translate = null;
            /**
             * Custom function for combining overlapping labels in range slider.
             * It takes the min and max values (already translated with translate fuction)
             * and should return how these two values should be combined.
             * If not provided, the default function will join the two values with
             * ' - ' as separator.
             */
            this.combineLabels = null;
            /**
             * Use to display legend under ticks (thus, it needs to be used along with
             * showTicks or showTicksValues). The function will be called with each tick
             * value and returned content will be displayed under the tick as a legend.
             * If the returned value is null, then no legend is displayed under
             * the corresponding tick.You can also directly provide the legend values
             * in the stepsArray option.
             */
            this.getLegend = null;
            /**
             * Use to display a custom legend of a stepItem from stepsArray.
             * It will be the same as getLegen but for stepsArray.
             */
            this.getStepLegend = null;
            /**
             * If you want to display a slider with non linear/number steps.
             * Just pass an array with each slider value and that's it; the floor, ceil and step settings
             * of the slider will be computed automatically.
             * By default, the value model and valueHigh model values will be the value of the selected item
             * in the stepsArray.
             * They can also be bound to the index of the selected item by setting the bindIndexForStepsArray
             * option to true.
             */
            this.stepsArray = null;
            /**
             * Set to true to bind the index of the selected item to value model and valueHigh model.
             */
            this.bindIndexForStepsArray = false;
            /**
             * When set to true and using a range slider, the range can be dragged by the selection bar.
             * Applies to range slider only.
             */
            this.draggableRange = false;
            /**
             * Same as draggableRange but the slider range can't be changed.
             * Applies to range slider only.
             */
            this.draggableRangeOnly = false;
            /**
             * Set to true to always show the selection bar before the slider handle.
             */
            this.showSelectionBar = false;
            /**
             * Set to true to always show the selection bar after the slider handle.
             */
            this.showSelectionBarEnd = false;
            /**
             * Set a number to draw the selection bar between this value and the slider handle.
             * When using stepsArray, expressed as index into stepsArray.
             */
            this.showSelectionBarFromValue = null;
            /**
             * Only for range slider. Set to true to visualize in different colour the areas
             * on the left/right (top/bottom for vertical range slider) of selection bar between the handles.
             */
            this.showOuterSelectionBars = false;
            /**
             * Set to true to hide pointer labels
             */
            this.hidePointerLabels = false;
            /**
             * Set to true to hide min / max labels
             */
            this.hideLimitLabels = false;
            /**
             * Set to false to disable the auto-hiding behavior of the limit labels.
             */
            this.autoHideLimitLabels = true;
            /**
             * Set to true to make the slider read-only.
             */
            this.readOnly = false;
            /**
             * Set to true to disable the slider.
             */
            this.disabled = false;
            /**
             * Throttle interval for mouse events in milliseconds.
             * This is provided to avoid a flood of events when moving the slider with mouse.
             */
            this.mouseEventsInterval = 50;
            /**
             * Throttle interval for touch events in milliseconds.
             * This is provided to avoid a flood of events when moving the slider with touch gesture.
             */
            this.touchEventsInterval = 50;
            /**
             * Throttle interval for input changes (changes to bindings or reactive form inputs)
             * This is provided to avoid a flood of events on frequent input binding changes affecting performance.
             */
            this.inputEventsInterval = 100;
            /**
             * Throttle interval for output changes (signalling changes to output bindings and user callbacks)
             * This is provided to avoid a flood of outgoing events affecting Angular app performance.
             */
            this.outputEventsInterval = 100;
            /**
             * Set to true to display a tick for each step of the slider.
             */
            this.showTicks = false;
            /**
             * Set to true to display a tick and the step value for each step of the slider..
             */
            this.showTicksValues = false;
            /* The step between each tick to display. If not set, the step value is used.
                Not used when ticksArray is specified. */
            this.tickStep = null;
            /* The step between displaying each tick step value.
                If not set, then tickStep or step is used, depending on which one is set. */
            this.tickValueStep = null;
            /**
             * Use to display ticks at specific positions.
             * The array contains the index of the ticks that should be displayed.
             * For example, [0, 1, 5] will display a tick for the first, second and sixth values.
             */
            this.ticksArray = null;
            /**
             * Used to display a tooltip when a tick is hovered.
             * Set to a function that returns the tooltip content for a given value.
             */
            this.ticksTooltip = null;
            /**
             * Same as ticksTooltip but for ticks values.
             */
            this.ticksValuesTooltip = null;
            /**
             * Set to true to display the slider vertically.
             * The slider will take the full height of its parent.
             * Changing this value at runtime is not currently supported.
             */
            this.vertical = false;
            /**
             * Function that returns the current color of the selection bar.
             * If your color won't change, don't use this option but set it through CSS.
             * If the returned color depends on a model value (either value or valueHigh),
             * you should use the argument passed to the function.
             * Indeed, when the function is called, there is no certainty that the model
             * has already been updated.
             */
            this.getSelectionBarColor = null;
            /**
             * Function that returns the color of a tick. showTicks must be enabled.
             */
            this.getTickColor = null;
            /**
             * Function that returns the current color of a pointer.
             * If your color won't change, don't use this option but set it through CSS.
             * If the returned color depends on a model value (either value or valueHigh),
             * you should use the argument passed to the function.
             * Indeed, when the function is called, there is no certainty that the model has already been updated.
             * To handle range slider pointers independently, you should evaluate pointerType within the given
             * function where "min" stands for value model and "max" for valueHigh model values.
             */
            this.getPointerColor = null;
            /**
             * Handles are focusable (on click or with tab) and can be modified using the following keyboard controls:
             * Left/bottom arrows: -1
             * Right/top arrows: +1
             * Page-down: -10%
             * Page-up: +10%
             * Home: minimum value
             * End: maximum value
             */
            this.keyboardSupport = true;
            /**
             * If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2
             * so that the slider is rendered properly and the events are handled correctly.
             */
            this.scale = 1;
            /**
             * Set to true to force the value(s) to be rounded to the step, even when modified from the outside.
             * When set to false, if the model values are modified from outside the slider, they are not rounded
             * and can be between two steps.
             */
            this.enforceStep = true;
            /**
             * Set to true to force the value(s) to be normalised to allowed range (floor to ceil), even when modified from the outside.
             * When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
             * the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation.
             */
            this.enforceRange = true;
            /**
             * Set to true to force the value(s) to be rounded to the nearest step value, even when modified from the outside.
             * When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
             * the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation.
             */
            this.enforceStepsArray = true;
            /**
             * Set to true to prevent to user from switching the min and max handles. Applies to range slider only.
             */
            this.noSwitching = false;
            /**
             * Set to true to only bind events on slider handles.
             */
            this.onlyBindHandles = false;
            /**
             * Set to true to show graphs right to left.
             * If vertical is true it will be from top to bottom and left / right arrow functions reversed.
             */
            this.rightToLeft = false;
            /**
             * Set to true to reverse keyboard navigation:
             * Right/top arrows: -1
             * Left/bottom arrows: +1
             * Page-up: -10%
             * Page-down: +10%
             * End: minimum value
             * Home: maximum value
             */
            this.reversedControls = false;
            /**
             * Set to true to keep the slider labels inside the slider bounds.
             */
            this.boundPointerLabels = true;
            /**
             * Set to true to use a logarithmic scale to display the slider.
             */
            this.logScale = false;
            /**
             * Function that returns the position on the slider for a given value.
             * The position must be a percentage between 0 and 1.
             * The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly.
             */
            this.customValueToPosition = null;
            /**
             * Function that returns the value for a given position on the slider.
             * The position is a percentage between 0 and 1.
             * The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly.
             */
            this.customPositionToValue = null;
            /**
             * Precision limit for calculated values.
             * Values used in calculations will be rounded to this number of significant digits
             * to prevent accumulating small floating-point errors.
             */
            this.precisionLimit = 12;
            /**
             * Use to display the selection bar as a gradient.
             * The given object must contain from and to properties which are colors.
             */
            this.selectionBarGradient = null;
            /**
             * Use to add a label directly to the slider for accessibility. Adds the aria-label attribute.
             */
            this.ariaLabel = null;
            /**
             * Use instead of ariaLabel to reference the id of an element which will be used to label the slider.
             * Adds the aria-labelledby attribute.
             */
            this.ariaLabelledBy = null;
            /**
             * Use to add a label directly to the slider range for accessibility. Adds the aria-label attribute.
             */
            this.ariaLabelHigh = null;
            /**
             * Use instead of ariaLabelHigh to reference the id of an element which will be used to label the slider range.
             * Adds the aria-labelledby attribute.
             */
            this.ariaLabelledByHigh = null;
            /**
             * Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the handle
             */
            this.handleDimension = null;
            /**
             * Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the bar
             */
            this.barDimension = null;
            /**
             * Enable/disable CSS animations
             */
            this.animate = true;
            /**
             * Enable/disable CSS animations while moving the slider
             */
            this.animateOnMove = false;
        }
        return Options;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var PointerType = {
        /** Low pointer */
        Min: 0,
        /** High pointer */
        Max: 1,
    };
    PointerType[PointerType.Min] = 'Min';
    PointerType[PointerType.Max] = 'Max';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ChangeContext = /** @class */ (function () {
        function ChangeContext() {
        }
        return ChangeContext;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     *  Collection of functions to handle conversions/lookups of values
     */
    var /**
     *  Collection of functions to handle conversions/lookups of values
     */ ValueHelper = /** @class */ (function () {
        function ValueHelper() {
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ValueHelper.isNullOrUndefined = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return value === undefined || value === null;
            };
        /**
         * @param {?} array1
         * @param {?} array2
         * @return {?}
         */
        ValueHelper.areArraysEqual = /**
         * @param {?} array1
         * @param {?} array2
         * @return {?}
         */
            function (array1, array2) {
                if (array1.length !== array2.length) {
                    return false;
                }
                for (var i = 0; i < array1.length; ++i) {
                    if (array1[i] !== array2[i]) {
                        return false;
                    }
                }
                return true;
            };
        /**
         * @param {?} val
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
        ValueHelper.linearValueToPosition = /**
         * @param {?} val
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
            function (val, minVal, maxVal) {
                /** @type {?} */
                var range = maxVal - minVal;
                return (val - minVal) / range;
            };
        /**
         * @param {?} val
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
        ValueHelper.logValueToPosition = /**
         * @param {?} val
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
            function (val, minVal, maxVal) {
                val = Math.log(val);
                minVal = Math.log(minVal);
                maxVal = Math.log(maxVal);
                /** @type {?} */
                var range = maxVal - minVal;
                return (val - minVal) / range;
            };
        /**
         * @param {?} percent
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
        ValueHelper.linearPositionToValue = /**
         * @param {?} percent
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
            function (percent, minVal, maxVal) {
                return percent * (maxVal - minVal) + minVal;
            };
        /**
         * @param {?} percent
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
        ValueHelper.logPositionToValue = /**
         * @param {?} percent
         * @param {?} minVal
         * @param {?} maxVal
         * @return {?}
         */
            function (percent, minVal, maxVal) {
                minVal = Math.log(minVal);
                maxVal = Math.log(maxVal);
                /** @type {?} */
                var value = percent * (maxVal - minVal) + minVal;
                return Math.exp(value);
            };
        /**
         * @param {?} modelValue
         * @param {?} stepsArray
         * @return {?}
         */
        ValueHelper.findStepIndex = /**
         * @param {?} modelValue
         * @param {?} stepsArray
         * @return {?}
         */
            function (modelValue, stepsArray) {
                /** @type {?} */
                var differences = stepsArray.map(function (step) { return Math.abs(modelValue - step.value); });
                /** @type {?} */
                var minDifferenceIndex = 0;
                for (var index = 0; index < stepsArray.length; index++) {
                    if (differences[index] !== differences[minDifferenceIndex] && differences[index] < differences[minDifferenceIndex]) {
                        minDifferenceIndex = index;
                    }
                }
                return minDifferenceIndex;
            };
        return ValueHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Helper with compatibility functions to support different browsers
     */
    var /**
     * Helper with compatibility functions to support different browsers
     */ CompatibilityHelper = /** @class */ (function () {
        function CompatibilityHelper() {
        }
        /**
         * Workaround for TouchEvent constructor sadly not being available on all browsers (e.g. Firefox, Safari)
         * @param {?} event
         * @return {?}
         */
        CompatibilityHelper.isTouchEvent = /**
         * Workaround for TouchEvent constructor sadly not being available on all browsers (e.g. Firefox, Safari)
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (( /** @type {?} */(window)).TouchEvent !== undefined) {
                    return event instanceof TouchEvent;
                }
                return event.touches !== undefined;
            };
        /**
         * Detect presence of ResizeObserver API
         * @return {?}
         */
        CompatibilityHelper.isResizeObserverAvailable = /**
         * Detect presence of ResizeObserver API
         * @return {?}
         */
            function () {
                return ( /** @type {?} */(window)).ResizeObserver !== undefined;
            };
        return CompatibilityHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Helper with mathematical functions
     */
    var /**
     * Helper with mathematical functions
     */ MathHelper = /** @class */ (function () {
        function MathHelper() {
        }
        /* Round numbers to a given number of significant digits */
        /**
         * @param {?} value
         * @param {?} precisionLimit
         * @return {?}
         */
        MathHelper.roundToPrecisionLimit = /**
         * @param {?} value
         * @param {?} precisionLimit
         * @return {?}
         */
            function (value, precisionLimit) {
                return +(value.toPrecision(precisionLimit));
            };
        /**
         * @param {?} value
         * @param {?} modulo
         * @param {?} precisionLimit
         * @return {?}
         */
        MathHelper.isModuloWithinPrecisionLimit = /**
         * @param {?} value
         * @param {?} modulo
         * @param {?} precisionLimit
         * @return {?}
         */
            function (value, modulo, precisionLimit) {
                /** @type {?} */
                var limit = Math.pow(10, -precisionLimit);
                return Math.abs(value % modulo) <= limit || Math.abs(Math.abs(value % modulo) - modulo) <= limit;
            };
        /**
         * @param {?} value
         * @param {?} floor
         * @param {?} ceil
         * @return {?}
         */
        MathHelper.clampToRange = /**
         * @param {?} value
         * @param {?} floor
         * @param {?} ceil
         * @return {?}
         */
            function (value, floor, ceil) {
                return Math.min(Math.max(value, floor), ceil);
            };
        return MathHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var EventListener = /** @class */ (function () {
        function EventListener() {
            this.eventName = null;
            this.events = null;
            this.eventsSubscription = null;
            this.teardownCallback = null;
        }
        return EventListener;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Helper class to attach event listeners to DOM elements with debounce support using rxjs
     */
    var /**
     * Helper class to attach event listeners to DOM elements with debounce support using rxjs
     */ EventListenerHelper = /** @class */ (function () {
        function EventListenerHelper(renderer) {
            this.renderer = renderer;
        }
        /**
         * @param {?} nativeElement
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} throttleInterval
         * @return {?}
         */
        EventListenerHelper.prototype.attachPassiveEventListener = /**
         * @param {?} nativeElement
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} throttleInterval
         * @return {?}
         */
            function (nativeElement, eventName, callback, throttleInterval) {
                // Only use passive event listeners if the browser supports it
                if (detectPassiveEvents.hasSupport !== true) {
                    return this.attachEventListener(nativeElement, eventName, callback, throttleInterval);
                }
                /** @type {?} */
                var listener = new EventListener();
                listener.eventName = eventName;
                listener.events = new rxjs.Subject();
                /** @type {?} */
                var observerCallback = function (event) {
                    listener.events.next(event);
                };
                nativeElement.addEventListener(eventName, observerCallback, { passive: true, capture: false });
                listener.teardownCallback = function () {
                    nativeElement.removeEventListener(eventName, observerCallback, { passive: true, capture: false });
                };
                listener.eventsSubscription = listener.events
                    .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
                    ? operators.throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
                    : operators.tap(function () { }) // no-op
                )
                    .subscribe(function (event) {
                    callback(event);
                });
                return listener;
            };
        /**
         * @param {?} eventListener
         * @return {?}
         */
        EventListenerHelper.prototype.detachEventListener = /**
         * @param {?} eventListener
         * @return {?}
         */
            function (eventListener) {
                if (!ValueHelper.isNullOrUndefined(eventListener.eventsSubscription)) {
                    eventListener.eventsSubscription.unsubscribe();
                    eventListener.eventsSubscription = null;
                }
                if (!ValueHelper.isNullOrUndefined(eventListener.events)) {
                    eventListener.events.complete();
                    eventListener.events = null;
                }
                if (!ValueHelper.isNullOrUndefined(eventListener.teardownCallback)) {
                    eventListener.teardownCallback();
                    eventListener.teardownCallback = null;
                }
            };
        /**
         * @param {?} nativeElement
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} throttleInterval
         * @return {?}
         */
        EventListenerHelper.prototype.attachEventListener = /**
         * @param {?} nativeElement
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} throttleInterval
         * @return {?}
         */
            function (nativeElement, eventName, callback, throttleInterval) {
                /** @type {?} */
                var listener = new EventListener();
                listener.eventName = eventName;
                listener.events = new rxjs.Subject();
                /** @type {?} */
                var observerCallback = function (event) {
                    listener.events.next(event);
                };
                listener.teardownCallback = this.renderer.listen(nativeElement, eventName, observerCallback);
                listener.eventsSubscription = listener.events
                    .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
                    ? operators.throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
                    : operators.tap(function () { }) // no-op
                )
                    .subscribe(function (event) { callback(event); });
                return listener;
            };
        return EventListenerHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SliderElementDirective = /** @class */ (function () {
        function SliderElementDirective(elemRef, renderer, changeDetectionRef) {
            this.elemRef = elemRef;
            this.renderer = renderer;
            this.changeDetectionRef = changeDetectionRef;
            this._position = 0;
            this._dimension = 0;
            this._alwaysHide = false;
            this._vertical = false;
            this._scale = 1;
            this.opacity = 1;
            this.visibility = 'visible';
            this.left = '';
            this.bottom = '';
            this.height = '';
            this.width = '';
            this.eventListeners = [];
            this.eventListenerHelper = new EventListenerHelper(this.renderer);
        }
        Object.defineProperty(SliderElementDirective.prototype, "position", {
            get: /**
             * @return {?}
             */ function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderElementDirective.prototype, "dimension", {
            get: /**
             * @return {?}
             */ function () {
                return this._dimension;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderElementDirective.prototype, "alwaysHide", {
            get: /**
             * @return {?}
             */ function () {
                return this._alwaysHide;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderElementDirective.prototype, "vertical", {
            get: /**
             * @return {?}
             */ function () {
                return this._vertical;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderElementDirective.prototype, "scale", {
            get: /**
             * @return {?}
             */ function () {
                return this._scale;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} hide
         * @return {?}
         */
        SliderElementDirective.prototype.setAlwaysHide = /**
         * @param {?} hide
         * @return {?}
         */
            function (hide) {
                this._alwaysHide = hide;
                if (hide) {
                    this.visibility = 'hidden';
                }
                else {
                    this.visibility = 'visible';
                }
            };
        /**
         * @return {?}
         */
        SliderElementDirective.prototype.hide = /**
         * @return {?}
         */
            function () {
                this.opacity = 0;
            };
        /**
         * @return {?}
         */
        SliderElementDirective.prototype.show = /**
         * @return {?}
         */
            function () {
                if (this.alwaysHide) {
                    return;
                }
                this.opacity = 1;
            };
        /**
         * @return {?}
         */
        SliderElementDirective.prototype.isVisible = /**
         * @return {?}
         */
            function () {
                if (this.alwaysHide) {
                    return false;
                }
                return this.opacity !== 0;
            };
        /**
         * @param {?} vertical
         * @return {?}
         */
        SliderElementDirective.prototype.setVertical = /**
         * @param {?} vertical
         * @return {?}
         */
            function (vertical) {
                this._vertical = vertical;
                if (this._vertical) {
                    this.left = '';
                    this.width = '';
                }
                else {
                    this.bottom = '';
                    this.height = '';
                }
            };
        /**
         * @param {?} scale
         * @return {?}
         */
        SliderElementDirective.prototype.setScale = /**
         * @param {?} scale
         * @return {?}
         */
            function (scale) {
                this._scale = scale;
            };
        // Set element left/top position depending on whether slider is horizontal or vertical
        /**
         * @param {?} pos
         * @return {?}
         */
        SliderElementDirective.prototype.setPosition = /**
         * @param {?} pos
         * @return {?}
         */
            function (pos) {
                if (this._position !== pos && !this.isRefDestroyed()) {
                    this.changeDetectionRef.markForCheck();
                }
                this._position = pos;
                if (this._vertical) {
                    this.bottom = Math.round(pos) + 'px';
                }
                else {
                    this.left = Math.round(pos) + 'px';
                }
            };
        // Calculate element's width/height depending on whether slider is horizontal or vertical
        /**
         * @return {?}
         */
        SliderElementDirective.prototype.calculateDimension = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var val = this.getBoundingClientRect();
                if (this.vertical) {
                    this._dimension = (val.bottom - val.top) * this.scale;
                }
                else {
                    this._dimension = (val.right - val.left) * this.scale;
                }
            };
        // Set element width/height depending on whether slider is horizontal or vertical
        /**
         * @param {?} dim
         * @return {?}
         */
        SliderElementDirective.prototype.setDimension = /**
         * @param {?} dim
         * @return {?}
         */
            function (dim) {
                if (this._dimension !== dim && !this.isRefDestroyed()) {
                    this.changeDetectionRef.markForCheck();
                }
                this._dimension = dim;
                if (this._vertical) {
                    this.height = Math.round(dim) + 'px';
                }
                else {
                    this.width = Math.round(dim) + 'px';
                }
            };
        /**
         * @return {?}
         */
        SliderElementDirective.prototype.getBoundingClientRect = /**
         * @return {?}
         */
            function () {
                return this.elemRef.nativeElement.getBoundingClientRect();
            };
        /**
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} debounceInterval
         * @return {?}
         */
        SliderElementDirective.prototype.on = /**
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} debounceInterval
         * @return {?}
         */
            function (eventName, callback, debounceInterval) {
                /** @type {?} */
                var listener = this.eventListenerHelper.attachEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
                this.eventListeners.push(listener);
            };
        /**
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} debounceInterval
         * @return {?}
         */
        SliderElementDirective.prototype.onPassive = /**
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} debounceInterval
         * @return {?}
         */
            function (eventName, callback, debounceInterval) {
                /** @type {?} */
                var listener = this.eventListenerHelper.attachPassiveEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
                this.eventListeners.push(listener);
            };
        /**
         * @param {?=} eventName
         * @return {?}
         */
        SliderElementDirective.prototype.off = /**
         * @param {?=} eventName
         * @return {?}
         */
            function (eventName) {
                /** @type {?} */
                var listenersToKeep;
                /** @type {?} */
                var listenersToRemove;
                if (!ValueHelper.isNullOrUndefined(eventName)) {
                    listenersToKeep = this.eventListeners.filter(function (event) { return event.eventName !== eventName; });
                    listenersToRemove = this.eventListeners.filter(function (event) { return event.eventName === eventName; });
                }
                else {
                    listenersToKeep = [];
                    listenersToRemove = this.eventListeners;
                }
                try {
                    for (var listenersToRemove_1 = __values(listenersToRemove), listenersToRemove_1_1 = listenersToRemove_1.next(); !listenersToRemove_1_1.done; listenersToRemove_1_1 = listenersToRemove_1.next()) {
                        var listener = listenersToRemove_1_1.value;
                        this.eventListenerHelper.detachEventListener(listener);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (listenersToRemove_1_1 && !listenersToRemove_1_1.done && (_a = listenersToRemove_1.return))
                            _a.call(listenersToRemove_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                this.eventListeners = listenersToKeep;
                var e_1, _a;
            };
        /**
         * @return {?}
         */
        SliderElementDirective.prototype.isRefDestroyed = /**
         * @return {?}
         */
            function () {
                return ValueHelper.isNullOrUndefined(this.changeDetectionRef) || this.changeDetectionRef['destroyed'];
            };
        SliderElementDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngxSliderElement]'
                    },] },
        ];
        /** @nocollapse */
        SliderElementDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ChangeDetectorRef }
            ];
        };
        SliderElementDirective.propDecorators = {
            opacity: [{ type: core.HostBinding, args: ['style.opacity',] }],
            visibility: [{ type: core.HostBinding, args: ['style.visibility',] }],
            left: [{ type: core.HostBinding, args: ['style.left',] }],
            bottom: [{ type: core.HostBinding, args: ['style.bottom',] }],
            height: [{ type: core.HostBinding, args: ['style.height',] }],
            width: [{ type: core.HostBinding, args: ['style.width',] }]
        };
        return SliderElementDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SliderHandleDirective = /** @class */ (function (_super) {
        __extends(SliderHandleDirective, _super);
        function SliderHandleDirective(elemRef, renderer, changeDetectionRef) {
            var _this = _super.call(this, elemRef, renderer, changeDetectionRef) || this;
            _this.active = false;
            _this.role = '';
            _this.tabindex = '';
            _this.ariaOrientation = '';
            _this.ariaLabel = '';
            _this.ariaLabelledBy = '';
            _this.ariaValueNow = '';
            _this.ariaValueText = '';
            _this.ariaValueMin = '';
            _this.ariaValueMax = '';
            return _this;
        }
        /**
         * @return {?}
         */
        SliderHandleDirective.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.elemRef.nativeElement.focus();
            };
        SliderHandleDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngxSliderHandle]'
                    },] },
        ];
        /** @nocollapse */
        SliderHandleDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ChangeDetectorRef }
            ];
        };
        SliderHandleDirective.propDecorators = {
            active: [{ type: core.HostBinding, args: ['class.ngx-slider-active',] }],
            role: [{ type: core.HostBinding, args: ['attr.role',] }],
            tabindex: [{ type: core.HostBinding, args: ['attr.tabindex',] }],
            ariaOrientation: [{ type: core.HostBinding, args: ['attr.aria-orientation',] }],
            ariaLabel: [{ type: core.HostBinding, args: ['attr.aria-label',] }],
            ariaLabelledBy: [{ type: core.HostBinding, args: ['attr.aria-labelledby',] }],
            ariaValueNow: [{ type: core.HostBinding, args: ['attr.aria-valuenow',] }],
            ariaValueText: [{ type: core.HostBinding, args: ['attr.aria-valuetext',] }],
            ariaValueMin: [{ type: core.HostBinding, args: ['attr.aria-valuemin',] }],
            ariaValueMax: [{ type: core.HostBinding, args: ['attr.aria-valuemax',] }]
        };
        return SliderHandleDirective;
    }(SliderElementDirective));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SliderLabelDirective = /** @class */ (function (_super) {
        __extends(SliderLabelDirective, _super);
        function SliderLabelDirective(elemRef, renderer, changeDetectionRef) {
            var _this = _super.call(this, elemRef, renderer, changeDetectionRef) || this;
            _this._value = null;
            return _this;
        }
        Object.defineProperty(SliderLabelDirective.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        SliderLabelDirective.prototype.setValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                /** @type {?} */
                var recalculateDimension = false;
                if (!this.alwaysHide &&
                    (ValueHelper.isNullOrUndefined(this.value) ||
                        this.value.length !== value.length ||
                        (this.value.length > 0 && this.dimension === 0))) {
                    recalculateDimension = true;
                }
                this._value = value;
                this.elemRef.nativeElement.innerHTML = value;
                // Update dimension only when length of the label have changed
                if (recalculateDimension) {
                    this.calculateDimension();
                }
            };
        SliderLabelDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngxSliderLabel]'
                    },] },
        ];
        /** @nocollapse */
        SliderLabelDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ChangeDetectorRef }
            ];
        };
        return SliderLabelDirective;
    }(SliderElementDirective));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Tick = /** @class */ (function () {
        function Tick() {
            this.selected = false;
            this.style = {};
            this.tooltip = null;
            this.tooltipPlacement = null;
            this.value = null;
            this.valueTooltip = null;
            this.valueTooltipPlacement = null;
            this.legend = null;
        }
        return Tick;
    }());
    var Dragging = /** @class */ (function () {
        function Dragging() {
            this.active = false;
            this.value = 0;
            this.difference = 0;
            this.position = 0;
            this.lowLimit = 0;
            this.highLimit = 0;
        }
        return Dragging;
    }());
    var ModelValues = /** @class */ (function () {
        function ModelValues() {
        }
        /**
         * @param {?=} x
         * @param {?=} y
         * @return {?}
         */
        ModelValues.compare = /**
         * @param {?=} x
         * @param {?=} y
         * @return {?}
         */
            function (x, y) {
                if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
                    return false;
                }
                if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
                    return false;
                }
                return x.value === y.value && x.highValue === y.highValue;
            };
        return ModelValues;
    }());
    var ModelChange = /** @class */ (function (_super) {
        __extends(ModelChange, _super);
        function ModelChange() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?=} x
         * @param {?=} y
         * @return {?}
         */
        ModelChange.compare = /**
         * @param {?=} x
         * @param {?=} y
         * @return {?}
         */
            function (x, y) {
                if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
                    return false;
                }
                if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
                    return false;
                }
                return x.value === y.value &&
                    x.highValue === y.highValue &&
                    x.forceChange === y.forceChange;
            };
        return ModelChange;
    }(ModelValues));
    var InputModelChange = /** @class */ (function (_super) {
        __extends(InputModelChange, _super);
        function InputModelChange() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InputModelChange;
    }(ModelChange));
    var OutputModelChange = /** @class */ (function (_super) {
        __extends(OutputModelChange, _super);
        function OutputModelChange() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OutputModelChange;
    }(ModelChange));
    /** @type {?} */
    var NGX_SLIDER_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        /* tslint:disable-next-line: no-use-before-declare */
        useExisting: core.forwardRef(function () { return SliderComponent; }),
        multi: true,
    };
    var SliderComponent = /** @class */ (function () {
        function SliderComponent(renderer, elementRef, changeDetectionRef, zone) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.changeDetectionRef = changeDetectionRef;
            this.zone = zone;
            // Model for low value of slider. For simple slider, this is the only input. For range slider, this is the low value.
            this.value = null;
            // Output for low value slider to support two-way bindings
            this.valueChange = new core.EventEmitter();
            // Model for high value of slider. Not used in simple slider. For range slider, this is the high value.
            this.highValue = null;
            // Output for high value slider to support two-way bindings
            this.highValueChange = new core.EventEmitter();
            // An object with all the other options of the slider.
            // Each option can be updated at runtime and the slider will automatically be re-rendered.
            this.options = new Options();
            // Event emitted when user starts interaction with the slider
            this.userChangeStart = new core.EventEmitter();
            // Event emitted on each change coming from user interaction
            this.userChange = new core.EventEmitter();
            // Event emitted when user finishes interaction with the slider
            this.userChangeEnd = new core.EventEmitter();
            this.initHasRun = false;
            this.inputModelChangeSubject = new rxjs.Subject();
            this.inputModelChangeSubscription = null;
            this.outputModelChangeSubject = new rxjs.Subject();
            this.outputModelChangeSubscription = null;
            this.viewLowValue = null;
            this.viewHighValue = null;
            this.viewOptions = new Options();
            this.handleHalfDimension = 0;
            this.maxHandlePosition = 0;
            this.currentTrackingPointer = null;
            this.currentFocusPointer = null;
            this.firstKeyDown = false;
            this.touchId = null;
            this.dragging = new Dragging();
            // Host element class bindings
            this.sliderElementVerticalClass = false;
            this.sliderElementAnimateClass = false;
            this.sliderElementWithLegendClass = false;
            this.sliderElementDisabledAttr = null;
            this.barStyle = {};
            this.minPointerStyle = {};
            this.maxPointerStyle = {};
            this.fullBarTransparentClass = false;
            this.selectionBarDraggableClass = false;
            this.ticksUnderValuesClass = false;
            this.intermediateTicks = false;
            this.ticks = [];
            this.eventListenerHelper = null;
            this.onMoveEventListener = null;
            this.onEndEventListener = null;
            this.moving = false;
            this.resizeObserver = null;
            this.onTouchedCallback = null;
            this.onChangeCallback = null;
            this.eventListenerHelper = new EventListenerHelper(this.renderer);
        }
        Object.defineProperty(SliderComponent.prototype, "manualRefresh", {
            // Input event that triggers slider refresh (re-positioning of slider elements)
            set: /**
             * @param {?} manualRefresh
             * @return {?}
             */ function (manualRefresh) {
                var _this = this;
                this.unsubscribeManualRefresh();
                this.manualRefreshSubscription = manualRefresh.subscribe(function () {
                    setTimeout(function () { return _this.calculateViewDimensionsAndDetectChanges(); });
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderComponent.prototype, "triggerFocus", {
            // Input event that triggers setting focus on given slider handle
            set: /**
             * @param {?} triggerFocus
             * @return {?}
             */ function (triggerFocus) {
                var _this = this;
                this.unsubscribeTriggerFocus();
                this.triggerFocusSubscription = triggerFocus.subscribe(function (pointerType) {
                    _this.focusPointer(pointerType);
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderComponent.prototype, "range", {
            get: /**
             * @return {?}
             */ function () {
                return !ValueHelper.isNullOrUndefined(this.value) && !ValueHelper.isNullOrUndefined(this.highValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderComponent.prototype, "showTicks", {
            get: /**
             * @return {?}
             */ function () {
                return this.viewOptions.showTicks;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SliderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.viewOptions = new Options();
                Object.assign(this.viewOptions, this.options);
                // We need to run these two things first, before the rest of the init in ngAfterViewInit(),
                // because these two settings are set through @HostBinding and Angular change detection
                // mechanism doesn't like them changing in ngAfterViewInit()
                this.updateDisabledState();
                this.updateVerticalState();
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.applyOptions();
                this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
                this.subscribeOutputModelChangeSubject(this.viewOptions.outputEventsInterval);
                // Once we apply options, we need to normalise model values for the first time
                this.renormaliseModelValues();
                this.viewLowValue = this.modelValueToViewValue(this.value);
                if (this.range) {
                    this.viewHighValue = this.modelValueToViewValue(this.highValue);
                }
                else {
                    this.viewHighValue = null;
                }
                this.updateVerticalState(); // need to run this again to cover changes to slider elements
                this.manageElementsStyle();
                this.updateDisabledState();
                this.calculateViewDimensions();
                this.addAccessibility();
                this.updateCeilLabel();
                this.updateFloorLabel();
                this.initHandles();
                this.manageEventsBindings();
                this.subscribeResizeObserver();
                this.initHasRun = true;
                // Run change detection manually to resolve some issues when init procedure changes values used in the view
                if (!this.isRefDestroyed()) {
                    this.changeDetectionRef.detectChanges();
                }
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        SliderComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                // Always apply options first
                if (!ValueHelper.isNullOrUndefined(changes["options"])) {
                    this.onChangeOptions();
                }
                // Then value changes
                if (!ValueHelper.isNullOrUndefined(changes["value"]) ||
                    !ValueHelper.isNullOrUndefined(changes["highValue"])) {
                    this.inputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        forceChange: false,
                        internalChange: false
                    });
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.unbindEvents();
                this.unsubscribeResizeObserver();
                this.unsubscribeInputModelChangeSubject();
                this.unsubscribeOutputModelChangeSubject();
                this.unsubscribeManualRefresh();
                this.unsubscribeTriggerFocus();
            };
        /**
         * @param {?} obj
         * @return {?}
         */
        SliderComponent.prototype.writeValue = /**
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                if (obj instanceof Array) {
                    this.value = obj[0];
                    this.highValue = obj[1];
                }
                else {
                    this.value = obj;
                }
                // ngOnChanges() is not called in this instance, so we need to communicate the change manually
                this.inputModelChangeSubject.next({
                    value: this.value,
                    highValue: this.highValue,
                    forceChange: false,
                    internalChange: false
                });
            };
        /**
         * @param {?} onChangeCallback
         * @return {?}
         */
        SliderComponent.prototype.registerOnChange = /**
         * @param {?} onChangeCallback
         * @return {?}
         */
            function (onChangeCallback) {
                this.onChangeCallback = onChangeCallback;
            };
        /**
         * @param {?} onTouchedCallback
         * @return {?}
         */
        SliderComponent.prototype.registerOnTouched = /**
         * @param {?} onTouchedCallback
         * @return {?}
         */
            function (onTouchedCallback) {
                this.onTouchedCallback = onTouchedCallback;
            };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        SliderComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
                this.viewOptions.disabled = isDisabled;
                this.updateDisabledState();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SliderComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.calculateViewDimensionsAndDetectChanges();
            };
        /**
         * @param {?=} interval
         * @return {?}
         */
        SliderComponent.prototype.subscribeInputModelChangeSubject = /**
         * @param {?=} interval
         * @return {?}
         */
            function (interval) {
                var _this = this;
                this.inputModelChangeSubscription = this.inputModelChangeSubject
                    .pipe(operators.distinctUntilChanged(ModelChange.compare), 
                // Hack to reset the status of the distinctUntilChanged() - if a "fake" event comes through with forceChange=true,
                // we forcefully by-pass distinctUntilChanged(), but otherwise drop the event
                operators.filter(function (modelChange) { return !modelChange.forceChange && !modelChange.internalChange; }), (!ValueHelper.isNullOrUndefined(interval))
                    ? operators.throttleTime(interval, undefined, { leading: true, trailing: true })
                    : operators.tap(function () { }) // no-op
                )
                    .subscribe(function (modelChange) { return _this.applyInputModelChange(modelChange); });
            };
        /**
         * @param {?=} interval
         * @return {?}
         */
        SliderComponent.prototype.subscribeOutputModelChangeSubject = /**
         * @param {?=} interval
         * @return {?}
         */
            function (interval) {
                var _this = this;
                this.outputModelChangeSubscription = this.outputModelChangeSubject
                    .pipe(operators.distinctUntilChanged(ModelChange.compare), (!ValueHelper.isNullOrUndefined(interval))
                    ? operators.throttleTime(interval, undefined, { leading: true, trailing: true })
                    : operators.tap(function () { }) // no-op
                )
                    .subscribe(function (modelChange) { return _this.publishOutputModelChange(modelChange); });
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.subscribeResizeObserver = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (CompatibilityHelper.isResizeObserverAvailable()) {
                    this.resizeObserver = new ResizeObserver(function () { return _this.calculateViewDimensionsAndDetectChanges(); });
                    this.resizeObserver.observe(this.elementRef.nativeElement);
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeResizeObserver = /**
         * @return {?}
         */
            function () {
                if (CompatibilityHelper.isResizeObserverAvailable() && this.resizeObserver !== null) {
                    this.resizeObserver.disconnect();
                    this.resizeObserver = null;
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeOnMove = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.onMoveEventListener)) {
                    this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
                    this.onMoveEventListener = null;
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeOnEnd = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.onEndEventListener)) {
                    this.eventListenerHelper.detachEventListener(this.onEndEventListener);
                    this.onEndEventListener = null;
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeInputModelChangeSubject = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.inputModelChangeSubscription)) {
                    this.inputModelChangeSubscription.unsubscribe();
                    this.inputModelChangeSubscription = null;
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeOutputModelChangeSubject = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.outputModelChangeSubscription)) {
                    this.outputModelChangeSubscription.unsubscribe();
                    this.outputModelChangeSubscription = null;
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeManualRefresh = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.manualRefreshSubscription)) {
                    this.manualRefreshSubscription.unsubscribe();
                    this.manualRefreshSubscription = null;
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unsubscribeTriggerFocus = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.triggerFocusSubscription)) {
                    this.triggerFocusSubscription.unsubscribe();
                    this.triggerFocusSubscription = null;
                }
            };
        /**
         * @param {?} pointerType
         * @return {?}
         */
        SliderComponent.prototype.getPointerElement = /**
         * @param {?} pointerType
         * @return {?}
         */
            function (pointerType) {
                if (pointerType === PointerType.Min) {
                    return this.minHandleElement;
                }
                else if (pointerType === PointerType.Max) {
                    return this.maxHandleElement;
                }
                return null;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.getCurrentTrackingValue = /**
         * @return {?}
         */
            function () {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return this.viewLowValue;
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return this.viewHighValue;
                }
                return null;
            };
        /**
         * @param {?} modelValue
         * @return {?}
         */
        SliderComponent.prototype.modelValueToViewValue = /**
         * @param {?} modelValue
         * @return {?}
         */
            function (modelValue) {
                if (ValueHelper.isNullOrUndefined(modelValue)) {
                    return NaN;
                }
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
                    return ValueHelper.findStepIndex(+modelValue, this.viewOptions.stepsArray);
                }
                return +modelValue;
            };
        /**
         * @param {?} viewValue
         * @return {?}
         */
        SliderComponent.prototype.viewValueToModelValue = /**
         * @param {?} viewValue
         * @return {?}
         */
            function (viewValue) {
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
                    return this.getStepValue(viewValue);
                }
                return viewValue;
            };
        /**
         * @param {?} sliderValue
         * @return {?}
         */
        SliderComponent.prototype.getStepValue = /**
         * @param {?} sliderValue
         * @return {?}
         */
            function (sliderValue) {
                /** @type {?} */
                var step = this.viewOptions.stepsArray[sliderValue];
                return (!ValueHelper.isNullOrUndefined(step)) ? step.value : NaN;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.applyViewChange = /**
         * @return {?}
         */
            function () {
                this.value = this.viewValueToModelValue(this.viewLowValue);
                if (this.range) {
                    this.highValue = this.viewValueToModelValue(this.viewHighValue);
                }
                this.outputModelChangeSubject.next({
                    value: this.value,
                    highValue: this.highValue,
                    userEventInitiated: true,
                    forceChange: false
                });
                // At this point all changes are applied and outputs are emitted, so we should be done.
                // However, input changes are communicated in different stream and we need to be ready to
                // act on the next input change even if it is exactly the same as last input change.
                // Therefore, we send a special event to reset the stream.
                this.inputModelChangeSubject.next({
                    value: this.value,
                    highValue: this.highValue,
                    forceChange: false,
                    internalChange: true
                });
            };
        /**
         * @param {?} modelChange
         * @return {?}
         */
        SliderComponent.prototype.applyInputModelChange = /**
         * @param {?} modelChange
         * @return {?}
         */
            function (modelChange) {
                /** @type {?} */
                var normalisedModelChange = this.normaliseModelValues(modelChange);
                /** @type {?} */
                var normalisationChange = !ModelValues.compare(modelChange, normalisedModelChange);
                if (normalisationChange) {
                    this.value = normalisedModelChange.value;
                    this.highValue = normalisedModelChange.highValue;
                }
                this.viewLowValue = this.modelValueToViewValue(normalisedModelChange.value);
                if (this.range) {
                    this.viewHighValue = this.modelValueToViewValue(normalisedModelChange.highValue);
                }
                else {
                    this.viewHighValue = null;
                }
                this.updateLowHandle(this.valueToPosition(this.viewLowValue));
                if (this.range) {
                    this.updateHighHandle(this.valueToPosition(this.viewHighValue));
                }
                this.updateSelectionBar();
                this.updateTicksScale();
                this.updateAriaAttributes();
                if (this.range) {
                    this.updateCombinedLabel();
                }
                // At the end, we need to communicate the model change to the outputs as well
                // Normalisation changes are also always forced out to ensure that subscribers always end up in correct state
                this.outputModelChangeSubject.next({
                    value: normalisedModelChange.value,
                    highValue: normalisedModelChange.highValue,
                    forceChange: normalisationChange,
                    userEventInitiated: false
                });
            };
        /**
         * @param {?} modelChange
         * @return {?}
         */
        SliderComponent.prototype.publishOutputModelChange = /**
         * @param {?} modelChange
         * @return {?}
         */
            function (modelChange) {
                var _this = this;
                /** @type {?} */
                var emitOutputs = function () {
                    _this.valueChange.emit(modelChange.value);
                    if (_this.range) {
                        _this.highValueChange.emit(modelChange.highValue);
                    }
                    if (!ValueHelper.isNullOrUndefined(_this.onChangeCallback)) {
                        if (_this.range) {
                            _this.onChangeCallback([modelChange.value, modelChange.highValue]);
                        }
                        else {
                            _this.onChangeCallback(modelChange.value);
                        }
                    }
                    if (!ValueHelper.isNullOrUndefined(_this.onTouchedCallback)) {
                        if (_this.range) {
                            _this.onTouchedCallback([modelChange.value, modelChange.highValue]);
                        }
                        else {
                            _this.onTouchedCallback(modelChange.value);
                        }
                    }
                };
                if (modelChange.userEventInitiated) {
                    // If this change was initiated by a user event, we can emit outputs in the same tick
                    emitOutputs();
                    this.userChange.emit(this.getChangeContext());
                }
                else {
                    // But, if the change was initated by something else like a change in input bindings,
                    // we need to wait until next tick to emit the outputs to keep Angular change detection happy
                    setTimeout(function () { emitOutputs(); });
                }
            };
        /**
         * @param {?} input
         * @return {?}
         */
        SliderComponent.prototype.normaliseModelValues = /**
         * @param {?} input
         * @return {?}
         */
            function (input) {
                /** @type {?} */
                var normalisedInput = new ModelValues();
                normalisedInput.value = input.value;
                normalisedInput.highValue = input.highValue;
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
                    // When using steps array, only round to nearest step in the array
                    // No other enforcement can be done, as the step array may be out of order, and that is perfectly fine
                    if (this.viewOptions.enforceStepsArray) {
                        /** @type {?} */
                        var valueIndex = ValueHelper.findStepIndex(normalisedInput.value, this.viewOptions.stepsArray);
                        normalisedInput.value = this.viewOptions.stepsArray[valueIndex].value;
                        if (this.range) {
                            /** @type {?} */
                            var highValueIndex = ValueHelper.findStepIndex(normalisedInput.highValue, this.viewOptions.stepsArray);
                            normalisedInput.highValue = this.viewOptions.stepsArray[highValueIndex].value;
                        }
                    }
                    return normalisedInput;
                }
                if (this.viewOptions.enforceStep) {
                    normalisedInput.value = this.roundStep(normalisedInput.value);
                    if (this.range) {
                        normalisedInput.highValue = this.roundStep(normalisedInput.highValue);
                    }
                }
                if (this.viewOptions.enforceRange) {
                    normalisedInput.value = MathHelper.clampToRange(normalisedInput.value, this.viewOptions.floor, this.viewOptions.ceil);
                    if (this.range) {
                        normalisedInput.highValue = MathHelper.clampToRange(normalisedInput.highValue, this.viewOptions.floor, this.viewOptions.ceil);
                    }
                    // Make sure that range slider invariant (value <= highValue) is always satisfied
                    if (this.range && input.value > input.highValue) {
                        // We know that both values are now clamped correctly, they may just be in the wrong order
                        // So the easy solution is to swap them... except swapping is sometimes disabled in options, so we make the two values the same
                        if (this.viewOptions.noSwitching) {
                            normalisedInput.value = normalisedInput.highValue;
                        }
                        else {
                            /** @type {?} */
                            var tempValue = input.value;
                            normalisedInput.value = input.highValue;
                            normalisedInput.highValue = tempValue;
                        }
                    }
                }
                return normalisedInput;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.renormaliseModelValues = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var previousModelValues = {
                    value: this.value,
                    highValue: this.highValue
                };
                /** @type {?} */
                var normalisedModelValues = this.normaliseModelValues(previousModelValues);
                if (!ModelValues.compare(normalisedModelValues, previousModelValues)) {
                    this.value = normalisedModelValues.value;
                    this.highValue = normalisedModelValues.highValue;
                    this.outputModelChangeSubject.next({
                        value: this.value,
                        highValue: this.highValue,
                        forceChange: true,
                        userEventInitiated: false
                    });
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.onChangeOptions = /**
         * @return {?}
         */
            function () {
                if (!this.initHasRun) {
                    return;
                }
                /** @type {?} */
                var previousInputEventsInterval = this.viewOptions.inputEventsInterval;
                /** @type {?} */
                var previousOutputEventsInterval = this.viewOptions.outputEventsInterval;
                /** @type {?} */
                var previousOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
                this.applyOptions();
                /** @type {?} */
                var newOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
                /** @type {?} */
                var rebindEvents = !ValueHelper.areArraysEqual(previousOptionsInfluencingEventBindings, newOptionsInfluencingEventBindings);
                if (previousInputEventsInterval !== this.viewOptions.inputEventsInterval) {
                    this.unsubscribeInputModelChangeSubject();
                    this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
                }
                if (previousOutputEventsInterval !== this.viewOptions.outputEventsInterval) {
                    this.unsubscribeInputModelChangeSubject();
                    this.subscribeInputModelChangeSubject(this.viewOptions.outputEventsInterval);
                }
                // With new options, we need to re-normalise model values if necessary
                this.renormaliseModelValues();
                this.viewLowValue = this.modelValueToViewValue(this.value);
                if (this.range) {
                    this.viewHighValue = this.modelValueToViewValue(this.highValue);
                }
                else {
                    this.viewHighValue = null;
                }
                this.resetSlider(rebindEvents);
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.applyOptions = /**
         * @return {?}
         */
            function () {
                this.viewOptions = new Options();
                Object.assign(this.viewOptions, this.options);
                this.viewOptions.draggableRange = this.range && this.viewOptions.draggableRange;
                this.viewOptions.draggableRangeOnly = this.range && this.viewOptions.draggableRangeOnly;
                if (this.viewOptions.draggableRangeOnly) {
                    this.viewOptions.draggableRange = true;
                }
                this.viewOptions.showTicks = this.viewOptions.showTicks ||
                    this.viewOptions.showTicksValues ||
                    !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray);
                if (this.viewOptions.showTicks &&
                    (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) || !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray))) {
                    this.intermediateTicks = true;
                }
                this.viewOptions.showSelectionBar = this.viewOptions.showSelectionBar ||
                    this.viewOptions.showSelectionBarEnd ||
                    !ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue);
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
                    this.applyStepsArrayOptions();
                }
                else {
                    this.applyFloorCeilOptions();
                }
                if (ValueHelper.isNullOrUndefined(this.viewOptions.combineLabels)) {
                    this.viewOptions.combineLabels = function (minValue, maxValue) {
                        return minValue + ' - ' + maxValue;
                    };
                }
                if (this.viewOptions.logScale && this.viewOptions.floor === 0) {
                    throw Error('Can\'t use floor=0 with logarithmic scale');
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.applyStepsArrayOptions = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.viewOptions.floor = 0;
                this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
                this.viewOptions.step = 1;
                if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
                    this.viewOptions.translate = function (modelValue) {
                        if (_this.viewOptions.bindIndexForStepsArray) {
                            return String(_this.getStepValue(modelValue));
                        }
                        return String(modelValue);
                    };
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.applyFloorCeilOptions = /**
         * @return {?}
         */
            function () {
                if (ValueHelper.isNullOrUndefined(this.viewOptions.step)) {
                    this.viewOptions.step = 1;
                }
                else {
                    this.viewOptions.step = +this.viewOptions.step;
                    if (this.viewOptions.step <= 0) {
                        this.viewOptions.step = 1;
                    }
                }
                if (ValueHelper.isNullOrUndefined(this.viewOptions.ceil) ||
                    ValueHelper.isNullOrUndefined(this.viewOptions.floor)) {
                    throw Error('floor and ceil options must be supplied');
                }
                this.viewOptions.ceil = +this.viewOptions.ceil;
                this.viewOptions.floor = +this.viewOptions.floor;
                if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
                    this.viewOptions.translate = function (value) { return String(value); };
                }
            };
        /**
         * @param {?=} rebindEvents
         * @return {?}
         */
        SliderComponent.prototype.resetSlider = /**
         * @param {?=} rebindEvents
         * @return {?}
         */
            function (rebindEvents) {
                if (rebindEvents === void 0) {
                    rebindEvents = true;
                }
                this.manageElementsStyle();
                this.addAccessibility();
                this.updateCeilLabel();
                this.updateFloorLabel();
                if (rebindEvents) {
                    this.unbindEvents();
                    this.manageEventsBindings();
                }
                this.updateDisabledState();
                this.calculateViewDimensions();
                this.refocusPointerIfNeeded();
            };
        /**
         * @param {?} pointerType
         * @return {?}
         */
        SliderComponent.prototype.focusPointer = /**
         * @param {?} pointerType
         * @return {?}
         */
            function (pointerType) {
                // If not supplied, use min pointer as default
                if (pointerType !== PointerType.Min && pointerType !== PointerType.Max) {
                    pointerType = PointerType.Min;
                }
                if (pointerType === PointerType.Min) {
                    this.minHandleElement.focus();
                }
                else if (this.range && pointerType === PointerType.Max) {
                    this.maxHandleElement.focus();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.refocusPointerIfNeeded = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.currentFocusPointer)) {
                    this.onPointerFocus(this.currentFocusPointer);
                    /** @type {?} */
                    var element = this.getPointerElement(this.currentFocusPointer);
                    element.focus();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.manageElementsStyle = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.updateScale();
                this.floorLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
                this.ceilLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
                /** @type {?} */
                var hideLabelsForTicks = this.viewOptions.showTicksValues && !this.intermediateTicks;
                this.minHandleLabelElement.setAlwaysHide(hideLabelsForTicks || this.viewOptions.hidePointerLabels);
                this.maxHandleLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
                this.combinedLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
                this.selectionBarElement.setAlwaysHide(!this.range && !this.viewOptions.showSelectionBar);
                this.leftOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
                this.rightOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
                this.fullBarTransparentClass = this.range && this.viewOptions.showOuterSelectionBars;
                this.selectionBarDraggableClass = this.viewOptions.draggableRange && !this.viewOptions.onlyBindHandles;
                this.ticksUnderValuesClass = this.intermediateTicks && this.options.showTicksValues;
                if (this.sliderElementVerticalClass !== this.viewOptions.vertical) {
                    this.updateVerticalState();
                    // The above change in host component class will not be applied until the end of this cycle
                    // However, functions calculating the slider position expect the slider to be already styled as vertical
                    // So as a workaround, we need to reset the slider once again to compute the correct values
                    setTimeout(function () { _this.resetSlider(); });
                }
                // Changing animate class may interfere with slider reset/initialisation, so we should set it separately,
                // after all is properly set up
                if (this.sliderElementAnimateClass !== this.viewOptions.animate) {
                    setTimeout(function () { _this.sliderElementAnimateClass = _this.viewOptions.animate; });
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.manageEventsBindings = /**
         * @return {?}
         */
            function () {
                if (this.viewOptions.disabled || this.viewOptions.readOnly) {
                    this.unbindEvents();
                }
                else {
                    this.bindEvents();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateDisabledState = /**
         * @return {?}
         */
            function () {
                this.sliderElementDisabledAttr = this.viewOptions.disabled ? 'disabled' : null;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateVerticalState = /**
         * @return {?}
         */
            function () {
                this.sliderElementVerticalClass = this.viewOptions.vertical;
                try {
                    for (var _a = __values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var element = _b.value;
                        // This is also called before ngAfterInit, so need to check that view child bindings work
                        if (!ValueHelper.isNullOrUndefined(element)) {
                            element.setVertical(this.viewOptions.vertical);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                var e_1, _c;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateScale = /**
         * @return {?}
         */
            function () {
                try {
                    for (var _a = __values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var element = _b.value;
                        element.setScale(this.viewOptions.scale);
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                var e_2, _c;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.getAllSliderElements = /**
         * @return {?}
         */
            function () {
                return [this.leftOuterSelectionBarElement,
                    this.rightOuterSelectionBarElement,
                    this.fullBarElement,
                    this.selectionBarElement,
                    this.minHandleElement,
                    this.maxHandleElement,
                    this.floorLabelElement,
                    this.ceilLabelElement,
                    this.minHandleLabelElement,
                    this.maxHandleLabelElement,
                    this.combinedLabelElement,
                    this.ticksElement
                ];
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.initHandles = /**
         * @return {?}
         */
            function () {
                this.updateLowHandle(this.valueToPosition(this.viewLowValue));
                /*
                   the order here is important since the selection bar should be
                   updated after the high handle but before the combined label
                   */
                if (this.range) {
                    this.updateHighHandle(this.valueToPosition(this.viewHighValue));
                }
                this.updateSelectionBar();
                if (this.range) {
                    this.updateCombinedLabel();
                }
                this.updateTicksScale();
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.addAccessibility = /**
         * @return {?}
         */
            function () {
                this.updateAriaAttributes();
                this.minHandleElement.role = 'slider';
                if (this.viewOptions.keyboardSupport &&
                    !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
                    this.minHandleElement.tabindex = '0';
                }
                else {
                    this.minHandleElement.tabindex = '';
                }
                this.minHandleElement.ariaOrientation = this.viewOptions.vertical ? 'vertical' : 'horizontal';
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabel)) {
                    this.minHandleElement.ariaLabel = this.viewOptions.ariaLabel;
                }
                else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledBy)) {
                    this.minHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledBy;
                }
                if (this.range) {
                    this.maxHandleElement.role = 'slider';
                    if (this.viewOptions.keyboardSupport &&
                        !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
                        this.maxHandleElement.tabindex = '0';
                    }
                    else {
                        this.maxHandleElement.tabindex = '';
                    }
                    this.maxHandleElement.ariaOrientation = this.viewOptions.vertical ? 'vertical' : 'horizontal';
                    if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelHigh)) {
                        this.maxHandleElement.ariaLabel = this.viewOptions.ariaLabelHigh;
                    }
                    else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledByHigh)) {
                        this.maxHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledByHigh;
                    }
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateAriaAttributes = /**
         * @return {?}
         */
            function () {
                this.minHandleElement.ariaValueNow = (+this.value).toString();
                this.minHandleElement.ariaValueText = this.viewOptions.translate(+this.value, LabelType.Low);
                this.minHandleElement.ariaValueMin = this.viewOptions.floor.toString();
                this.minHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
                if (this.range) {
                    this.maxHandleElement.ariaValueNow = (+this.highValue).toString();
                    this.maxHandleElement.ariaValueText = this.viewOptions.translate(+this.highValue, LabelType.High);
                    this.maxHandleElement.ariaValueMin = this.viewOptions.floor.toString();
                    this.maxHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.calculateViewDimensions = /**
         * @return {?}
         */
            function () {
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.handleDimension)) {
                    this.minHandleElement.setDimension(this.viewOptions.handleDimension);
                }
                else {
                    this.minHandleElement.calculateDimension();
                }
                /** @type {?} */
                var handleWidth = this.minHandleElement.dimension;
                this.handleHalfDimension = handleWidth / 2;
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.barDimension)) {
                    this.fullBarElement.setDimension(this.viewOptions.barDimension);
                }
                else {
                    this.fullBarElement.calculateDimension();
                }
                this.maxHandlePosition = this.fullBarElement.dimension - handleWidth;
                if (this.initHasRun) {
                    this.updateFloorLabel();
                    this.updateCeilLabel();
                    this.initHandles();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.calculateViewDimensionsAndDetectChanges = /**
         * @return {?}
         */
            function () {
                this.calculateViewDimensions();
                if (!this.isRefDestroyed()) {
                    this.changeDetectionRef.detectChanges();
                }
            };
        /**
         * If the slider reference is already destroyed
         * @return {?} boolean - true if ref is destroyed
         */
        SliderComponent.prototype.isRefDestroyed = /**
         * If the slider reference is already destroyed
         * @return {?} boolean - true if ref is destroyed
         */
            function () {
                return this.changeDetectionRef['destroyed'];
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateTicksScale = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.viewOptions.showTicks) {
                    setTimeout(function () { _this.sliderElementWithLegendClass = false; });
                    return;
                }
                /** @type {?} */
                var ticksArray = !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray)
                    ? this.viewOptions.ticksArray
                    : this.getTicksArray();
                /** @type {?} */
                var translate = this.viewOptions.vertical ? 'translateY' : 'translateX';
                if (this.viewOptions.rightToLeft) {
                    ticksArray.reverse();
                }
                /** @type {?} */
                var tickValueStep = !ValueHelper.isNullOrUndefined(this.viewOptions.tickValueStep) ? this.viewOptions.tickValueStep :
                    (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) ? this.viewOptions.tickStep : this.viewOptions.step);
                /** @type {?} */
                var hasAtLeastOneLegend = false;
                /** @type {?} */
                var newTicks = ticksArray.map(function (value) {
                    /** @type {?} */
                    var position = _this.valueToPosition(value);
                    if (_this.viewOptions.vertical) {
                        position = _this.maxHandlePosition - position;
                    }
                    /** @type {?} */
                    var translation = translate + '(' + Math.round(position) + 'px)';
                    /** @type {?} */
                    var tick = new Tick();
                    tick.selected = _this.isTickSelected(value);
                    tick.style = {
                        '-webkit-transform': translation,
                        '-moz-transform': translation,
                        '-o-transform': translation,
                        '-ms-transform': translation,
                        transform: translation,
                    };
                    if (tick.selected && !ValueHelper.isNullOrUndefined(_this.viewOptions.getSelectionBarColor)) {
                        tick.style['background-color'] = _this.getSelectionBarColor();
                    }
                    if (!tick.selected && !ValueHelper.isNullOrUndefined(_this.viewOptions.getTickColor)) {
                        tick.style['background-color'] = _this.getTickColor(value);
                    }
                    if (!ValueHelper.isNullOrUndefined(_this.viewOptions.ticksTooltip)) {
                        tick.tooltip = _this.viewOptions.ticksTooltip(value);
                        tick.tooltipPlacement = _this.viewOptions.vertical ? 'right' : 'top';
                    }
                    if (_this.viewOptions.showTicksValues && !ValueHelper.isNullOrUndefined(tickValueStep) &&
                        MathHelper.isModuloWithinPrecisionLimit(value, tickValueStep, _this.viewOptions.precisionLimit)) {
                        tick.value = _this.getDisplayValue(value, LabelType.TickValue);
                        if (!ValueHelper.isNullOrUndefined(_this.viewOptions.ticksValuesTooltip)) {
                            tick.valueTooltip = _this.viewOptions.ticksValuesTooltip(value);
                            tick.valueTooltipPlacement = _this.viewOptions.vertical
                                ? 'right'
                                : 'top';
                        }
                    }
                    /** @type {?} */
                    var legend = null;
                    if (!ValueHelper.isNullOrUndefined(_this.viewOptions.stepsArray)) {
                        /** @type {?} */
                        var step = _this.viewOptions.stepsArray[value];
                        if (!ValueHelper.isNullOrUndefined(_this.viewOptions.getStepLegend)) {
                            legend = _this.viewOptions.getStepLegend(step);
                        }
                        else if (!ValueHelper.isNullOrUndefined(step)) {
                            legend = step.legend;
                        }
                    }
                    else if (!ValueHelper.isNullOrUndefined(_this.viewOptions.getLegend)) {
                        legend = _this.viewOptions.getLegend(value);
                    }
                    if (!ValueHelper.isNullOrUndefined(legend)) {
                        tick.legend = legend;
                        hasAtLeastOneLegend = true;
                    }
                    return tick;
                });
                setTimeout(function () { _this.sliderElementWithLegendClass = hasAtLeastOneLegend; });
                // We should avoid re-creating the ticks array if possible
                // This both improves performance and makes CSS animations work correctly
                if (!ValueHelper.isNullOrUndefined(this.ticks) && this.ticks.length === newTicks.length) {
                    for (var i = 0; i < newTicks.length; ++i) {
                        Object.assign(this.ticks[i], newTicks[i]);
                    }
                }
                else {
                    this.ticks = newTicks;
                }
                if (!this.isRefDestroyed()) {
                    this.changeDetectionRef.detectChanges();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.getTicksArray = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var step = (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) ? this.viewOptions.tickStep : this.viewOptions.step;
                /** @type {?} */
                var ticksArray = [];
                /** @type {?} */
                var numberOfValues = 1 + Math.floor(MathHelper.roundToPrecisionLimit(Math.abs(this.viewOptions.ceil - this.viewOptions.floor) / step, this.viewOptions.precisionLimit));
                for (var index = 0; index < numberOfValues; ++index) {
                    ticksArray.push(MathHelper.roundToPrecisionLimit(this.viewOptions.floor + step * index, this.viewOptions.precisionLimit));
                }
                return ticksArray;
            };
        /**
         * @param {?} value
         * @return {?}
         */
        SliderComponent.prototype.isTickSelected = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (!this.range) {
                    if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                        /** @type {?} */
                        var center = this.viewOptions.showSelectionBarFromValue;
                        if (this.viewLowValue > center &&
                            value >= center &&
                            value <= this.viewLowValue) {
                            return true;
                        }
                        else if (this.viewLowValue < center &&
                            value <= center &&
                            value >= this.viewLowValue) {
                            return true;
                        }
                    }
                    else if (this.viewOptions.showSelectionBarEnd) {
                        if (value >= this.viewLowValue) {
                            return true;
                        }
                    }
                    else if (this.viewOptions.showSelectionBar && value <= this.viewLowValue) {
                        return true;
                    }
                }
                if (this.range && value >= this.viewLowValue && value <= this.viewHighValue) {
                    return true;
                }
                return false;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateFloorLabel = /**
         * @return {?}
         */
            function () {
                if (!this.floorLabelElement.alwaysHide) {
                    this.floorLabelElement.setValue(this.getDisplayValue(this.viewOptions.floor, LabelType.Floor));
                    this.floorLabelElement.calculateDimension();
                    /** @type {?} */
                    var position = this.viewOptions.rightToLeft
                        ? this.fullBarElement.dimension - this.floorLabelElement.dimension
                        : 0;
                    this.floorLabelElement.setPosition(position);
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateCeilLabel = /**
         * @return {?}
         */
            function () {
                if (!this.ceilLabelElement.alwaysHide) {
                    this.ceilLabelElement.setValue(this.getDisplayValue(this.viewOptions.ceil, LabelType.Ceil));
                    this.ceilLabelElement.calculateDimension();
                    /** @type {?} */
                    var position = this.viewOptions.rightToLeft
                        ? 0
                        : this.fullBarElement.dimension - this.ceilLabelElement.dimension;
                    this.ceilLabelElement.setPosition(position);
                }
            };
        /**
         * @param {?} which
         * @param {?} newPos
         * @return {?}
         */
        SliderComponent.prototype.updateHandles = /**
         * @param {?} which
         * @param {?} newPos
         * @return {?}
         */
            function (which, newPos) {
                if (which === PointerType.Min) {
                    this.updateLowHandle(newPos);
                }
                else if (which === PointerType.Max) {
                    this.updateHighHandle(newPos);
                }
                this.updateSelectionBar();
                this.updateTicksScale();
                if (this.range) {
                    this.updateCombinedLabel();
                }
            };
        /**
         * @param {?} labelType
         * @param {?} newPos
         * @return {?}
         */
        SliderComponent.prototype.getHandleLabelPos = /**
         * @param {?} labelType
         * @param {?} newPos
         * @return {?}
         */
            function (labelType, newPos) {
                /** @type {?} */
                var labelDimension = (labelType === PointerType.Min)
                    ? this.minHandleLabelElement.dimension
                    : this.maxHandleLabelElement.dimension;
                /** @type {?} */
                var nearHandlePos = newPos - labelDimension / 2 + this.handleHalfDimension;
                /** @type {?} */
                var endOfBarPos = this.fullBarElement.dimension - labelDimension;
                if (!this.viewOptions.boundPointerLabels) {
                    return nearHandlePos;
                }
                if ((this.viewOptions.rightToLeft && labelType === PointerType.Min) ||
                    (!this.viewOptions.rightToLeft && labelType === PointerType.Max)) {
                    return Math.min(nearHandlePos, endOfBarPos);
                }
                else {
                    return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
                }
            };
        /**
         * @param {?} newPos
         * @return {?}
         */
        SliderComponent.prototype.updateLowHandle = /**
         * @param {?} newPos
         * @return {?}
         */
            function (newPos) {
                this.minHandleElement.setPosition(newPos);
                this.minHandleLabelElement.setValue(this.getDisplayValue(this.viewLowValue, LabelType.Low));
                this.minHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Min, newPos));
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
                    this.minPointerStyle = {
                        backgroundColor: this.getPointerColor(PointerType.Min),
                    };
                }
                if (this.viewOptions.autoHideLimitLabels) {
                    this.updateFloorAndCeilLabelsVisibility();
                }
            };
        /**
         * @param {?} newPos
         * @return {?}
         */
        SliderComponent.prototype.updateHighHandle = /**
         * @param {?} newPos
         * @return {?}
         */
            function (newPos) {
                this.maxHandleElement.setPosition(newPos);
                this.maxHandleLabelElement.setValue(this.getDisplayValue(this.viewHighValue, LabelType.High));
                this.maxHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Max, newPos));
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
                    this.maxPointerStyle = {
                        backgroundColor: this.getPointerColor(PointerType.Max),
                    };
                }
                if (this.viewOptions.autoHideLimitLabels) {
                    this.updateFloorAndCeilLabelsVisibility();
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateFloorAndCeilLabelsVisibility = /**
         * @return {?}
         */
            function () {
                // Show based only on hideLimitLabels if pointer labels are hidden
                if (this.viewOptions.hidePointerLabels) {
                    return;
                }
                /** @type {?} */
                var floorLabelHidden = false;
                /** @type {?} */
                var ceilLabelHidden = false;
                /** @type {?} */
                var isMinLabelAtFloor = this.isLabelBelowFloorLabel(this.minHandleLabelElement);
                /** @type {?} */
                var isMinLabelAtCeil = this.isLabelAboveCeilLabel(this.minHandleLabelElement);
                /** @type {?} */
                var isMaxLabelAtCeil = this.isLabelAboveCeilLabel(this.maxHandleLabelElement);
                /** @type {?} */
                var isCombinedLabelAtFloor = this.isLabelBelowFloorLabel(this.combinedLabelElement);
                /** @type {?} */
                var isCombinedLabelAtCeil = this.isLabelAboveCeilLabel(this.combinedLabelElement);
                if (isMinLabelAtFloor) {
                    floorLabelHidden = true;
                    this.floorLabelElement.hide();
                }
                else {
                    floorLabelHidden = false;
                    this.floorLabelElement.show();
                }
                if (isMinLabelAtCeil) {
                    ceilLabelHidden = true;
                    this.ceilLabelElement.hide();
                }
                else {
                    ceilLabelHidden = false;
                    this.ceilLabelElement.show();
                }
                if (this.range) {
                    /** @type {?} */
                    var hideCeil = this.combinedLabelElement.isVisible() ? isCombinedLabelAtCeil : isMaxLabelAtCeil;
                    /** @type {?} */
                    var hideFloor = this.combinedLabelElement.isVisible() ? isCombinedLabelAtFloor : isMinLabelAtFloor;
                    if (hideCeil) {
                        this.ceilLabelElement.hide();
                    }
                    else if (!ceilLabelHidden) {
                        this.ceilLabelElement.show();
                    }
                    // Hide or show floor label
                    if (hideFloor) {
                        this.floorLabelElement.hide();
                    }
                    else if (!floorLabelHidden) {
                        this.floorLabelElement.show();
                    }
                }
            };
        /**
         * @param {?} label
         * @return {?}
         */
        SliderComponent.prototype.isLabelBelowFloorLabel = /**
         * @param {?} label
         * @return {?}
         */
            function (label) {
                /** @type {?} */
                var pos = label.position;
                /** @type {?} */
                var dim = label.dimension;
                /** @type {?} */
                var floorPos = this.floorLabelElement.position;
                /** @type {?} */
                var floorDim = this.floorLabelElement.dimension;
                return this.viewOptions.rightToLeft
                    ? pos + dim >= floorPos - 2
                    : pos <= floorPos + floorDim + 2;
            };
        /**
         * @param {?} label
         * @return {?}
         */
        SliderComponent.prototype.isLabelAboveCeilLabel = /**
         * @param {?} label
         * @return {?}
         */
            function (label) {
                /** @type {?} */
                var pos = label.position;
                /** @type {?} */
                var dim = label.dimension;
                /** @type {?} */
                var ceilPos = this.ceilLabelElement.position;
                /** @type {?} */
                var ceilDim = this.ceilLabelElement.dimension;
                return this.viewOptions.rightToLeft
                    ? pos <= ceilPos + ceilDim + 2
                    : pos + dim >= ceilPos - 2;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateSelectionBar = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var position = 0;
                /** @type {?} */
                var dimension = 0;
                /** @type {?} */
                var isSelectionBarFromRight = this.viewOptions.rightToLeft
                    ? !this.viewOptions.showSelectionBarEnd
                    : this.viewOptions.showSelectionBarEnd;
                /** @type {?} */
                var positionForRange = this.viewOptions.rightToLeft
                    ? this.maxHandleElement.position + this.handleHalfDimension
                    : this.minHandleElement.position + this.handleHalfDimension;
                if (this.range) {
                    dimension = Math.abs(this.maxHandleElement.position - this.minHandleElement.position);
                    position = positionForRange;
                }
                else {
                    if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                        /** @type {?} */
                        var center = this.viewOptions.showSelectionBarFromValue;
                        /** @type {?} */
                        var centerPosition = this.valueToPosition(center);
                        /** @type {?} */
                        var isModelGreaterThanCenter = this.viewOptions.rightToLeft
                            ? this.viewLowValue <= center
                            : this.viewLowValue > center;
                        if (isModelGreaterThanCenter) {
                            dimension = this.minHandleElement.position - centerPosition;
                            position = centerPosition + this.handleHalfDimension;
                        }
                        else {
                            dimension = centerPosition - this.minHandleElement.position;
                            position = this.minHandleElement.position + this.handleHalfDimension;
                        }
                    }
                    else if (isSelectionBarFromRight) {
                        dimension = Math.ceil(Math.abs(this.maxHandlePosition - this.minHandleElement.position) + this.handleHalfDimension);
                        position = Math.floor(this.minHandleElement.position + this.handleHalfDimension);
                    }
                    else {
                        dimension = this.minHandleElement.position + this.handleHalfDimension;
                        position = 0;
                    }
                }
                this.selectionBarElement.setDimension(dimension);
                this.selectionBarElement.setPosition(position);
                if (this.range && this.viewOptions.showOuterSelectionBars) {
                    if (this.viewOptions.rightToLeft) {
                        this.rightOuterSelectionBarElement.setDimension(position);
                        this.rightOuterSelectionBarElement.setPosition(0);
                        this.fullBarElement.calculateDimension();
                        this.leftOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                        this.leftOuterSelectionBarElement.setPosition(position + dimension);
                    }
                    else {
                        this.leftOuterSelectionBarElement.setDimension(position);
                        this.leftOuterSelectionBarElement.setPosition(0);
                        this.fullBarElement.calculateDimension();
                        this.rightOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                        this.rightOuterSelectionBarElement.setPosition(position + dimension);
                    }
                }
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
                    /** @type {?} */
                    var color = this.getSelectionBarColor();
                    this.barStyle = {
                        backgroundColor: color,
                    };
                }
                else if (!ValueHelper.isNullOrUndefined(this.viewOptions.selectionBarGradient)) {
                    /** @type {?} */
                    var offset = (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue))
                        ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
                        : 0;
                    /** @type {?} */
                    var reversed = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
                    /** @type {?} */
                    var direction = this.viewOptions.vertical
                        ? reversed ? 'bottom' : 'top'
                        : reversed ? 'left' : 'right';
                    this.barStyle = {
                        backgroundImage: 'linear-gradient(to ' +
                            direction +
                            ', ' +
                            this.viewOptions.selectionBarGradient.from +
                            ' 0%,' +
                            this.viewOptions.selectionBarGradient.to +
                            ' 100%)',
                    };
                    if (this.viewOptions.vertical) {
                        this.barStyle.backgroundPosition =
                            'center ' +
                                (offset +
                                    dimension +
                                    position +
                                    (reversed ? -this.handleHalfDimension : 0)) +
                                'px';
                        this.barStyle.backgroundSize =
                            '100% ' + (this.fullBarElement.dimension - this.handleHalfDimension) + 'px';
                    }
                    else {
                        this.barStyle.backgroundPosition =
                            offset -
                                position +
                                (reversed ? this.handleHalfDimension : 0) +
                                'px center';
                        this.barStyle.backgroundSize =
                            this.fullBarElement.dimension - this.handleHalfDimension + 'px 100%';
                    }
                }
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.getSelectionBarColor = /**
         * @return {?}
         */
            function () {
                if (this.range) {
                    return this.viewOptions.getSelectionBarColor(this.value, this.highValue);
                }
                return this.viewOptions.getSelectionBarColor(this.value);
            };
        /**
         * @param {?} pointerType
         * @return {?}
         */
        SliderComponent.prototype.getPointerColor = /**
         * @param {?} pointerType
         * @return {?}
         */
            function (pointerType) {
                if (pointerType === PointerType.Max) {
                    return this.viewOptions.getPointerColor(this.highValue, pointerType);
                }
                return this.viewOptions.getPointerColor(this.value, pointerType);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        SliderComponent.prototype.getTickColor = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.viewOptions.getTickColor(value);
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.updateCombinedLabel = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var isLabelOverlap = null;
                if (this.viewOptions.rightToLeft) {
                    isLabelOverlap =
                        this.minHandleLabelElement.position - this.minHandleLabelElement.dimension - 10 <= this.maxHandleLabelElement.position;
                }
                else {
                    isLabelOverlap =
                        this.minHandleLabelElement.position + this.minHandleLabelElement.dimension + 10 >= this.maxHandleLabelElement.position;
                }
                if (isLabelOverlap) {
                    /** @type {?} */
                    var lowDisplayValue = this.getDisplayValue(this.viewLowValue, LabelType.Low);
                    /** @type {?} */
                    var highDisplayValue = this.getDisplayValue(this.viewHighValue, LabelType.High);
                    /** @type {?} */
                    var combinedLabelValue = this.viewOptions.rightToLeft
                        ? this.viewOptions.combineLabels(highDisplayValue, lowDisplayValue)
                        : this.viewOptions.combineLabels(lowDisplayValue, highDisplayValue);
                    this.combinedLabelElement.setValue(combinedLabelValue);
                    /** @type {?} */
                    var pos = this.viewOptions.boundPointerLabels
                        ? Math.min(Math.max(this.selectionBarElement.position +
                            this.selectionBarElement.dimension / 2 -
                            this.combinedLabelElement.dimension / 2, 0), this.fullBarElement.dimension - this.combinedLabelElement.dimension)
                        : this.selectionBarElement.position + this.selectionBarElement.dimension / 2 - this.combinedLabelElement.dimension / 2;
                    this.combinedLabelElement.setPosition(pos);
                    this.minHandleLabelElement.hide();
                    this.maxHandleLabelElement.hide();
                    this.combinedLabelElement.show();
                }
                else {
                    this.updateHighHandle(this.valueToPosition(this.viewHighValue));
                    this.updateLowHandle(this.valueToPosition(this.viewLowValue));
                    this.maxHandleLabelElement.show();
                    this.minHandleLabelElement.show();
                    this.combinedLabelElement.hide();
                }
                if (this.viewOptions.autoHideLimitLabels) {
                    this.updateFloorAndCeilLabelsVisibility();
                }
            };
        /**
         * @param {?} value
         * @param {?} which
         * @return {?}
         */
        SliderComponent.prototype.getDisplayValue = /**
         * @param {?} value
         * @param {?} which
         * @return {?}
         */
            function (value, which) {
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
                    value = this.getStepValue(value);
                }
                return this.viewOptions.translate(value, which);
            };
        /**
         * @param {?} value
         * @param {?=} customStep
         * @return {?}
         */
        SliderComponent.prototype.roundStep = /**
         * @param {?} value
         * @param {?=} customStep
         * @return {?}
         */
            function (value, customStep) {
                /** @type {?} */
                var step = !ValueHelper.isNullOrUndefined(customStep) ? customStep : this.viewOptions.step;
                /** @type {?} */
                var steppedDifference = MathHelper.roundToPrecisionLimit((value - this.viewOptions.floor) / step, this.viewOptions.precisionLimit);
                steppedDifference = Math.round(steppedDifference) * step;
                return MathHelper.roundToPrecisionLimit(this.viewOptions.floor + steppedDifference, this.viewOptions.precisionLimit);
            };
        /**
         * @param {?} val
         * @return {?}
         */
        SliderComponent.prototype.valueToPosition = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                /** @type {?} */
                var fn = ValueHelper.linearValueToPosition;
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.customValueToPosition)) {
                    fn = this.viewOptions.customValueToPosition;
                }
                else if (this.viewOptions.logScale) {
                    fn = ValueHelper.logValueToPosition;
                }
                val = MathHelper.clampToRange(val, this.viewOptions.floor, this.viewOptions.ceil);
                /** @type {?} */
                var percent = fn(val, this.viewOptions.floor, this.viewOptions.ceil);
                if (ValueHelper.isNullOrUndefined(percent)) {
                    percent = 0;
                }
                if (this.viewOptions.rightToLeft) {
                    percent = 1 - percent;
                }
                return percent * this.maxHandlePosition;
            };
        /**
         * @param {?} position
         * @return {?}
         */
        SliderComponent.prototype.positionToValue = /**
         * @param {?} position
         * @return {?}
         */
            function (position) {
                /** @type {?} */
                var percent = position / this.maxHandlePosition;
                if (this.viewOptions.rightToLeft) {
                    percent = 1 - percent;
                }
                /** @type {?} */
                var fn = ValueHelper.linearPositionToValue;
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.customPositionToValue)) {
                    fn = this.viewOptions.customPositionToValue;
                }
                else if (this.viewOptions.logScale) {
                    fn = ValueHelper.logPositionToValue;
                }
                /** @type {?} */
                var value = fn(percent, this.viewOptions.floor, this.viewOptions.ceil);
                return !ValueHelper.isNullOrUndefined(value) ? value : 0;
            };
        /**
         * @param {?} event
         * @param {?=} targetTouchId
         * @return {?}
         */
        SliderComponent.prototype.getEventXY = /**
         * @param {?} event
         * @param {?=} targetTouchId
         * @return {?}
         */
            function (event, targetTouchId) {
                if (event instanceof MouseEvent) {
                    return this.viewOptions.vertical ? event.clientY : event.clientX;
                }
                /** @type {?} */
                var touchIndex = 0;
                /** @type {?} */
                var touches = event.touches;
                if (!ValueHelper.isNullOrUndefined(targetTouchId)) {
                    for (var i = 0; i < touches.length; i++) {
                        if (touches[i].identifier === targetTouchId) {
                            touchIndex = i;
                            break;
                        }
                    }
                }
                // Return the target touch or if the target touch was not found in the event
                // returns the coordinates of the first touch
                return this.viewOptions.vertical ? touches[touchIndex].clientY : touches[touchIndex].clientX;
            };
        /**
         * @param {?} event
         * @param {?=} targetTouchId
         * @return {?}
         */
        SliderComponent.prototype.getEventPosition = /**
         * @param {?} event
         * @param {?=} targetTouchId
         * @return {?}
         */
            function (event, targetTouchId) {
                /** @type {?} */
                var sliderElementBoundingRect = this.elementRef.nativeElement.getBoundingClientRect();
                /** @type {?} */
                var sliderPos = this.viewOptions.vertical ?
                    sliderElementBoundingRect.bottom : sliderElementBoundingRect.left;
                /** @type {?} */
                var eventPos = 0;
                if (this.viewOptions.vertical) {
                    eventPos = -this.getEventXY(event, targetTouchId) + sliderPos;
                }
                else {
                    eventPos = this.getEventXY(event, targetTouchId) - sliderPos;
                }
                return eventPos * this.viewOptions.scale - this.handleHalfDimension;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SliderComponent.prototype.getNearestHandle = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (!this.range) {
                    return PointerType.Min;
                }
                /** @type {?} */
                var position = this.getEventPosition(event);
                /** @type {?} */
                var distanceMin = Math.abs(position - this.minHandleElement.position);
                /** @type {?} */
                var distanceMax = Math.abs(position - this.maxHandleElement.position);
                if (distanceMin < distanceMax) {
                    return PointerType.Min;
                }
                else if (distanceMin > distanceMax) {
                    return PointerType.Max;
                }
                else if (!this.viewOptions.rightToLeft) {
                    // if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
                    return position < this.minHandleElement.position ? PointerType.Min : PointerType.Max;
                }
                // reverse in rtl
                return position > this.minHandleElement.position ? PointerType.Min : PointerType.Max;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.bindEvents = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var draggableRange = this.viewOptions.draggableRange;
                if (!this.viewOptions.onlyBindHandles) {
                    this.selectionBarElement.on('mousedown', function (event) { return _this.onBarStart(null, draggableRange, event, true, true, true); });
                }
                if (this.viewOptions.draggableRangeOnly) {
                    this.minHandleElement.on('mousedown', function (event) { return _this.onBarStart(PointerType.Min, draggableRange, event, true, true); });
                    this.maxHandleElement.on('mousedown', function (event) { return _this.onBarStart(PointerType.Max, draggableRange, event, true, true); });
                }
                else {
                    this.minHandleElement.on('mousedown', function (event) { return _this.onStart(PointerType.Min, event, true, true); });
                    if (this.range) {
                        this.maxHandleElement.on('mousedown', function (event) { return _this.onStart(PointerType.Max, event, true, true); });
                    }
                    if (!this.viewOptions.onlyBindHandles) {
                        this.fullBarElement.on('mousedown', function (event) { return _this.onStart(null, event, true, true, true); });
                        this.ticksElement.on('mousedown', function (event) { return _this.onStart(null, event, true, true, true, true); });
                    }
                }
                if (!this.viewOptions.onlyBindHandles) {
                    this.selectionBarElement.onPassive('touchstart', function (event) { return _this.onBarStart(null, draggableRange, event, true, true, true); });
                }
                if (this.viewOptions.draggableRangeOnly) {
                    this.minHandleElement.onPassive('touchstart', function (event) { return _this.onBarStart(PointerType.Min, draggableRange, event, true, true); });
                    this.maxHandleElement.onPassive('touchstart', function (event) { return _this.onBarStart(PointerType.Max, draggableRange, event, true, true); });
                }
                else {
                    this.minHandleElement.onPassive('touchstart', function (event) { return _this.onStart(PointerType.Min, event, true, true); });
                    if (this.range) {
                        this.maxHandleElement.onPassive('touchstart', function (event) { return _this.onStart(PointerType.Max, event, true, true); });
                    }
                    if (!this.viewOptions.onlyBindHandles) {
                        this.fullBarElement.onPassive('touchstart', function (event) { return _this.onStart(null, event, true, true, true); });
                        this.ticksElement.onPassive('touchstart', function (event) { return _this.onStart(null, event, false, false, true, true); });
                    }
                }
                if (this.viewOptions.keyboardSupport) {
                    this.minHandleElement.on('focus', function () { return _this.onPointerFocus(PointerType.Min); });
                    if (this.range) {
                        this.maxHandleElement.on('focus', function () { return _this.onPointerFocus(PointerType.Max); });
                    }
                }
            };
        /**
         * @param {?} options
         * @return {?}
         */
        SliderComponent.prototype.getOptionsInfluencingEventBindings = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                return [
                    options.disabled,
                    options.readOnly,
                    options.draggableRange,
                    options.draggableRangeOnly,
                    options.onlyBindHandles,
                    options.keyboardSupport
                ];
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.unbindEvents = /**
         * @return {?}
         */
            function () {
                this.unsubscribeOnMove();
                this.unsubscribeOnEnd();
                try {
                    for (var _a = __values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var element = _b.value;
                        if (!ValueHelper.isNullOrUndefined(element)) {
                            element.off();
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                var e_3, _c;
            };
        /**
         * @param {?} pointerType
         * @param {?} draggableRange
         * @param {?} event
         * @param {?} bindMove
         * @param {?} bindEnd
         * @param {?=} simulateImmediateMove
         * @param {?=} simulateImmediateEnd
         * @return {?}
         */
        SliderComponent.prototype.onBarStart = /**
         * @param {?} pointerType
         * @param {?} draggableRange
         * @param {?} event
         * @param {?} bindMove
         * @param {?} bindEnd
         * @param {?=} simulateImmediateMove
         * @param {?=} simulateImmediateEnd
         * @return {?}
         */
            function (pointerType, draggableRange, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
                if (draggableRange) {
                    this.onDragStart(pointerType, event, bindMove, bindEnd);
                }
                else {
                    this.onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
                }
            };
        /**
         * @param {?} pointerType
         * @param {?} event
         * @param {?} bindMove
         * @param {?} bindEnd
         * @param {?=} simulateImmediateMove
         * @param {?=} simulateImmediateEnd
         * @return {?}
         */
        SliderComponent.prototype.onStart = /**
         * @param {?} pointerType
         * @param {?} event
         * @param {?} bindMove
         * @param {?} bindEnd
         * @param {?=} simulateImmediateMove
         * @param {?=} simulateImmediateEnd
         * @return {?}
         */
            function (pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
                var _this = this;
                event.stopPropagation();
                // Only call preventDefault() when handling non-passive events (passive events don't need it)
                if (!CompatibilityHelper.isTouchEvent(event) || !detectPassiveEvents.hasSupport) {
                    event.preventDefault();
                }
                this.moving = false;
                // We have to do this in case the HTML where the sliders are on
                // have been animated into view.
                this.calculateViewDimensions();
                if (ValueHelper.isNullOrUndefined(pointerType)) {
                    pointerType = this.getNearestHandle(event);
                }
                this.currentTrackingPointer = pointerType;
                /** @type {?} */
                var pointerElement = this.getPointerElement(pointerType);
                pointerElement.active = true;
                if (this.viewOptions.keyboardSupport) {
                    pointerElement.focus();
                }
                if (bindMove) {
                    this.unsubscribeOnMove();
                    /** @type {?} */
                    var onMoveCallback = function (e) { return _this.dragging.active ? _this.onDragMove(e) : _this.onMove(e); };
                    if (CompatibilityHelper.isTouchEvent(event)) {
                        this.onMoveEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchmove', onMoveCallback, this.viewOptions.touchEventsInterval);
                    }
                    else {
                        this.onMoveEventListener = this.eventListenerHelper.attachEventListener(document, 'mousemove', onMoveCallback, this.viewOptions.mouseEventsInterval);
                    }
                }
                if (bindEnd) {
                    this.unsubscribeOnEnd();
                    /** @type {?} */
                    var onEndCallback = function (e) { return _this.onEnd(e); };
                    if (CompatibilityHelper.isTouchEvent(event)) {
                        this.onEndEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchend', onEndCallback);
                    }
                    else {
                        this.onEndEventListener = this.eventListenerHelper.attachEventListener(document, 'mouseup', onEndCallback);
                    }
                }
                this.userChangeStart.emit(this.getChangeContext());
                if (CompatibilityHelper.isTouchEvent(event) && !ValueHelper.isNullOrUndefined(( /** @type {?} */(event)).changedTouches)) {
                    // Store the touch identifier
                    if (ValueHelper.isNullOrUndefined(this.touchId)) {
                        this.touchId = ( /** @type {?} */(event)).changedTouches[0].identifier;
                    }
                }
                // Click events, either with mouse or touch gesture are weird. Sometimes they result in full
                // start, move, end sequence, and sometimes, they don't - they only invoke mousedown
                // As a workaround, we simulate the first move event and the end event if it's necessary
                if (simulateImmediateMove) {
                    this.onMove(event, true);
                }
                if (simulateImmediateEnd) {
                    this.onEnd(event);
                }
            };
        /**
         * @param {?} event
         * @param {?=} fromTick
         * @return {?}
         */
        SliderComponent.prototype.onMove = /**
         * @param {?} event
         * @param {?=} fromTick
         * @return {?}
         */
            function (event, fromTick) {
                /** @type {?} */
                var touchForThisSlider = null;
                if (CompatibilityHelper.isTouchEvent(event)) {
                    /** @type {?} */
                    var changedTouches = ( /** @type {?} */(event)).changedTouches;
                    for (var i = 0; i < changedTouches.length; i++) {
                        if (changedTouches[i].identifier === this.touchId) {
                            touchForThisSlider = changedTouches[i];
                            break;
                        }
                    }
                    if (ValueHelper.isNullOrUndefined(touchForThisSlider)) {
                        return;
                    }
                }
                if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
                    if (this.moving) {
                        this.sliderElementAnimateClass = false;
                    }
                }
                this.moving = true;
                /** @type {?} */
                var newPos = !ValueHelper.isNullOrUndefined(touchForThisSlider)
                    ? this.getEventPosition(event, touchForThisSlider.identifier)
                    : this.getEventPosition(event);
                /** @type {?} */
                var newValue;
                /** @type {?} */
                var ceilValue = this.viewOptions.rightToLeft
                    ? this.viewOptions.floor
                    : this.viewOptions.ceil;
                /** @type {?} */
                var floorValue = this.viewOptions.rightToLeft ? this.viewOptions.ceil : this.viewOptions.floor;
                if (newPos <= 0) {
                    newValue = floorValue;
                }
                else if (newPos >= this.maxHandlePosition) {
                    newValue = ceilValue;
                }
                else {
                    newValue = this.positionToValue(newPos);
                    if (fromTick && !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) {
                        newValue = this.roundStep(newValue, this.viewOptions.tickStep);
                    }
                    else {
                        newValue = this.roundStep(newValue);
                    }
                }
                this.positionTrackingHandle(newValue);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SliderComponent.prototype.onEnd = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (CompatibilityHelper.isTouchEvent(event)) {
                    /** @type {?} */
                    var changedTouches = ( /** @type {?} */(event)).changedTouches;
                    if (changedTouches[0].identifier !== this.touchId) {
                        return;
                    }
                }
                this.moving = false;
                if (this.viewOptions.animate) {
                    this.sliderElementAnimateClass = true;
                }
                this.touchId = null;
                if (!this.viewOptions.keyboardSupport) {
                    this.minHandleElement.active = false;
                    this.maxHandleElement.active = false;
                    this.currentTrackingPointer = null;
                }
                this.dragging.active = false;
                this.unsubscribeOnMove();
                this.unsubscribeOnEnd();
                this.userChangeEnd.emit(this.getChangeContext());
            };
        /**
         * @param {?} pointerType
         * @return {?}
         */
        SliderComponent.prototype.onPointerFocus = /**
         * @param {?} pointerType
         * @return {?}
         */
            function (pointerType) {
                var _this = this;
                /** @type {?} */
                var pointerElement = this.getPointerElement(pointerType);
                pointerElement.on('blur', function () { return _this.onPointerBlur(pointerElement); });
                pointerElement.on('keydown', function (event) { return _this.onKeyboardEvent(event); });
                pointerElement.on('keyup', function () { return _this.onKeyUp(); });
                pointerElement.active = true;
                this.currentTrackingPointer = pointerType;
                this.currentFocusPointer = pointerType;
                this.firstKeyDown = true;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.onKeyUp = /**
         * @return {?}
         */
            function () {
                this.firstKeyDown = true;
                this.userChangeEnd.emit(this.getChangeContext());
            };
        /**
         * @param {?} pointer
         * @return {?}
         */
        SliderComponent.prototype.onPointerBlur = /**
         * @param {?} pointer
         * @return {?}
         */
            function (pointer) {
                pointer.off('blur');
                pointer.off('keydown');
                pointer.off('keyup');
                pointer.active = false;
                if (ValueHelper.isNullOrUndefined(this.touchId)) {
                    this.currentTrackingPointer = null;
                    this.currentFocusPointer = null;
                }
            };
        /**
         * @param {?} currentValue
         * @return {?}
         */
        SliderComponent.prototype.getKeyActions = /**
         * @param {?} currentValue
         * @return {?}
         */
            function (currentValue) {
                /** @type {?} */
                var valueRange = this.viewOptions.ceil - this.viewOptions.floor;
                /** @type {?} */
                var increaseStep = currentValue + this.viewOptions.step;
                /** @type {?} */
                var decreaseStep = currentValue - this.viewOptions.step;
                /** @type {?} */
                var increasePage = currentValue + valueRange / 10;
                /** @type {?} */
                var decreasePage = currentValue - valueRange / 10;
                if (this.viewOptions.reversedControls) {
                    increaseStep = currentValue - this.viewOptions.step;
                    decreaseStep = currentValue + this.viewOptions.step;
                    increasePage = currentValue - valueRange / 10;
                    decreasePage = currentValue + valueRange / 10;
                }
                /** @type {?} */
                var actions = {
                    UP: increaseStep,
                    DOWN: decreaseStep,
                    LEFT: decreaseStep,
                    RIGHT: increaseStep,
                    PAGEUP: increasePage,
                    PAGEDOWN: decreasePage,
                    HOME: this.viewOptions.reversedControls ? this.viewOptions.ceil : this.viewOptions.floor,
                    END: this.viewOptions.reversedControls ? this.viewOptions.floor : this.viewOptions.ceil,
                };
                // right to left means swapping right and left arrows
                if (this.viewOptions.rightToLeft) {
                    actions["LEFT"] = increaseStep;
                    actions["RIGHT"] = decreaseStep;
                    // right to left and vertical means we also swap up and down
                    if (this.viewOptions.vertical) {
                        actions["UP"] = decreaseStep;
                        actions["DOWN"] = increaseStep;
                    }
                }
                return actions;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SliderComponent.prototype.onKeyboardEvent = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var currentValue = this.getCurrentTrackingValue();
                /** @type {?} */
                var keyCode = !ValueHelper.isNullOrUndefined(event.keyCode)
                    ? event.keyCode
                    : event.which;
                /** @type {?} */
                var keys = {
                    38: 'UP',
                    40: 'DOWN',
                    37: 'LEFT',
                    39: 'RIGHT',
                    33: 'PAGEUP',
                    34: 'PAGEDOWN',
                    36: 'HOME',
                    35: 'END',
                };
                /** @type {?} */
                var actions = this.getKeyActions(currentValue);
                /** @type {?} */
                var key = keys[keyCode];
                /** @type {?} */
                var action = actions[key];
                if (ValueHelper.isNullOrUndefined(action) || ValueHelper.isNullOrUndefined(this.currentTrackingPointer)) {
                    return;
                }
                event.preventDefault();
                if (this.firstKeyDown) {
                    this.firstKeyDown = false;
                    this.userChangeStart.emit(this.getChangeContext());
                }
                /** @type {?} */
                var actionValue = MathHelper.clampToRange(action, this.viewOptions.floor, this.viewOptions.ceil);
                /** @type {?} */
                var newValue = this.roundStep(actionValue);
                if (!this.viewOptions.draggableRangeOnly) {
                    this.positionTrackingHandle(newValue);
                }
                else {
                    /** @type {?} */
                    var difference = this.viewHighValue - this.viewLowValue;
                    /** @type {?} */
                    var newMinValue = void 0;
                    /** @type {?} */
                    var newMaxValue = void 0;
                    if (this.currentTrackingPointer === PointerType.Min) {
                        newMinValue = newValue;
                        newMaxValue = newValue + difference;
                        if (newMaxValue > this.viewOptions.ceil) {
                            newMaxValue = this.viewOptions.ceil;
                            newMinValue = newMaxValue - difference;
                        }
                    }
                    else if (this.currentTrackingPointer === PointerType.Max) {
                        newMaxValue = newValue;
                        newMinValue = newValue - difference;
                        if (newMinValue < this.viewOptions.floor) {
                            newMinValue = this.viewOptions.floor;
                            newMaxValue = newMinValue + difference;
                        }
                    }
                    this.positionTrackingBar(newMinValue, newMaxValue);
                }
            };
        /**
         * @param {?} pointerType
         * @param {?} event
         * @param {?} bindMove
         * @param {?} bindEnd
         * @return {?}
         */
        SliderComponent.prototype.onDragStart = /**
         * @param {?} pointerType
         * @param {?} event
         * @param {?} bindMove
         * @param {?} bindEnd
         * @return {?}
         */
            function (pointerType, event, bindMove, bindEnd) {
                /** @type {?} */
                var position = this.getEventPosition(event);
                this.dragging = new Dragging();
                this.dragging.active = true;
                this.dragging.value = this.positionToValue(position);
                this.dragging.difference = this.viewHighValue - this.viewLowValue;
                this.dragging.lowLimit = this.viewOptions.rightToLeft
                    ? this.minHandleElement.position - position
                    : position - this.minHandleElement.position;
                this.dragging.highLimit = this.viewOptions.rightToLeft
                    ? position - this.maxHandleElement.position
                    : this.maxHandleElement.position - position;
                this.onStart(pointerType, event, bindMove, bindEnd);
            };
        /**
         * Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
         * @param {?} newPos
         * @param {?} outOfBounds
         * @param {?} isAbove
         * @return {?}
         */
        SliderComponent.prototype.getMinValue = /**
         * Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
         * @param {?} newPos
         * @param {?} outOfBounds
         * @param {?} isAbove
         * @return {?}
         */
            function (newPos, outOfBounds, isAbove) {
                /** @type {?} */
                var isRTL = this.viewOptions.rightToLeft;
                /** @type {?} */
                var value = null;
                if (outOfBounds) {
                    if (isAbove) {
                        value = isRTL
                            ? this.viewOptions.floor
                            : this.viewOptions.ceil - this.dragging.difference;
                    }
                    else {
                        value = isRTL
                            ? this.viewOptions.ceil - this.dragging.difference
                            : this.viewOptions.floor;
                    }
                }
                else {
                    value = isRTL
                        ? this.positionToValue(newPos + this.dragging.lowLimit)
                        : this.positionToValue(newPos - this.dragging.lowLimit);
                }
                return this.roundStep(value);
            };
        /**
         * Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
         * @param {?} newPos
         * @param {?} outOfBounds
         * @param {?} isAbove
         * @return {?}
         */
        SliderComponent.prototype.getMaxValue = /**
         * Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
         * @param {?} newPos
         * @param {?} outOfBounds
         * @param {?} isAbove
         * @return {?}
         */
            function (newPos, outOfBounds, isAbove) {
                /** @type {?} */
                var isRTL = this.viewOptions.rightToLeft;
                /** @type {?} */
                var value = null;
                if (outOfBounds) {
                    if (isAbove) {
                        value = isRTL
                            ? this.viewOptions.floor + this.dragging.difference
                            : this.viewOptions.ceil;
                    }
                    else {
                        value = isRTL
                            ? this.viewOptions.ceil
                            : this.viewOptions.floor + this.dragging.difference;
                    }
                }
                else {
                    if (isRTL) {
                        value =
                            this.positionToValue(newPos + this.dragging.lowLimit) +
                                this.dragging.difference;
                    }
                    else {
                        value =
                            this.positionToValue(newPos - this.dragging.lowLimit) +
                                this.dragging.difference;
                    }
                }
                return this.roundStep(value);
            };
        /**
         * @param {?=} event
         * @return {?}
         */
        SliderComponent.prototype.onDragMove = /**
         * @param {?=} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var newPos = this.getEventPosition(event);
                if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
                    if (this.moving) {
                        this.sliderElementAnimateClass = false;
                    }
                }
                this.moving = true;
                /** @type {?} */
                var ceilLimit;
                /** @type {?} */
                var floorLimit;
                /** @type {?} */
                var floorHandleElement;
                /** @type {?} */
                var ceilHandleElement;
                if (this.viewOptions.rightToLeft) {
                    ceilLimit = this.dragging.lowLimit;
                    floorLimit = this.dragging.highLimit;
                    floorHandleElement = this.maxHandleElement;
                    ceilHandleElement = this.minHandleElement;
                }
                else {
                    ceilLimit = this.dragging.highLimit;
                    floorLimit = this.dragging.lowLimit;
                    floorHandleElement = this.minHandleElement;
                    ceilHandleElement = this.maxHandleElement;
                }
                /** @type {?} */
                var isUnderFloorLimit = (newPos <= floorLimit);
                /** @type {?} */
                var isOverCeilLimit = (newPos >= this.maxHandlePosition - ceilLimit);
                /** @type {?} */
                var newMinValue;
                /** @type {?} */
                var newMaxValue;
                if (isUnderFloorLimit) {
                    if (floorHandleElement.position === 0) {
                        return;
                    }
                    newMinValue = this.getMinValue(newPos, true, false);
                    newMaxValue = this.getMaxValue(newPos, true, false);
                }
                else if (isOverCeilLimit) {
                    if (ceilHandleElement.position === this.maxHandlePosition) {
                        return;
                    }
                    newMaxValue = this.getMaxValue(newPos, true, true);
                    newMinValue = this.getMinValue(newPos, true, true);
                }
                else {
                    newMinValue = this.getMinValue(newPos, false, false);
                    newMaxValue = this.getMaxValue(newPos, false, false);
                }
                this.positionTrackingBar(newMinValue, newMaxValue);
            };
        /**
         * @param {?} newMinValue
         * @param {?} newMaxValue
         * @return {?}
         */
        SliderComponent.prototype.positionTrackingBar = /**
         * @param {?} newMinValue
         * @param {?} newMaxValue
         * @return {?}
         */
            function (newMinValue, newMaxValue) {
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) &&
                    newMinValue < this.viewOptions.minLimit) {
                    newMinValue = this.viewOptions.minLimit;
                    newMaxValue = MathHelper.roundToPrecisionLimit(newMinValue + this.dragging.difference, this.viewOptions.precisionLimit);
                }
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) &&
                    newMaxValue > this.viewOptions.maxLimit) {
                    newMaxValue = this.viewOptions.maxLimit;
                    newMinValue = MathHelper.roundToPrecisionLimit(newMaxValue - this.dragging.difference, this.viewOptions.precisionLimit);
                }
                this.viewLowValue = newMinValue;
                this.viewHighValue = newMaxValue;
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(newMinValue));
                this.updateHandles(PointerType.Max, this.valueToPosition(newMaxValue));
            };
        /**
         * @param {?} newValue
         * @return {?}
         */
        SliderComponent.prototype.positionTrackingHandle = /**
         * @param {?} newValue
         * @return {?}
         */
            function (newValue) {
                newValue = this.applyMinMaxLimit(newValue);
                if (this.range) {
                    if (this.viewOptions.pushRange) {
                        newValue = this.applyPushRange(newValue);
                    }
                    else {
                        if (this.viewOptions.noSwitching) {
                            if (this.currentTrackingPointer === PointerType.Min &&
                                newValue > this.viewHighValue) {
                                newValue = this.applyMinMaxRange(this.viewHighValue);
                            }
                            else if (this.currentTrackingPointer === PointerType.Max &&
                                newValue < this.viewLowValue) {
                                newValue = this.applyMinMaxRange(this.viewLowValue);
                            }
                        }
                        newValue = this.applyMinMaxRange(newValue);
                        /* This is to check if we need to switch the min and max handles */
                        if (this.currentTrackingPointer === PointerType.Min && newValue > this.viewHighValue) {
                            this.viewLowValue = this.viewHighValue;
                            this.applyViewChange();
                            this.updateHandles(PointerType.Min, this.maxHandleElement.position);
                            this.updateAriaAttributes();
                            this.currentTrackingPointer = PointerType.Max;
                            this.minHandleElement.active = false;
                            this.maxHandleElement.active = true;
                            if (this.viewOptions.keyboardSupport) {
                                this.maxHandleElement.focus();
                            }
                        }
                        else if (this.currentTrackingPointer === PointerType.Max &&
                            newValue < this.viewLowValue) {
                            this.viewHighValue = this.viewLowValue;
                            this.applyViewChange();
                            this.updateHandles(PointerType.Max, this.minHandleElement.position);
                            this.updateAriaAttributes();
                            this.currentTrackingPointer = PointerType.Min;
                            this.maxHandleElement.active = false;
                            this.minHandleElement.active = true;
                            if (this.viewOptions.keyboardSupport) {
                                this.minHandleElement.focus();
                            }
                        }
                    }
                }
                if (this.getCurrentTrackingValue() !== newValue) {
                    if (this.currentTrackingPointer === PointerType.Min) {
                        this.viewLowValue = newValue;
                        this.applyViewChange();
                    }
                    else if (this.currentTrackingPointer === PointerType.Max) {
                        this.viewHighValue = newValue;
                        this.applyViewChange();
                    }
                    this.updateHandles(this.currentTrackingPointer, this.valueToPosition(newValue));
                    this.updateAriaAttributes();
                }
            };
        /**
         * @param {?} newValue
         * @return {?}
         */
        SliderComponent.prototype.applyMinMaxLimit = /**
         * @param {?} newValue
         * @return {?}
         */
            function (newValue) {
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) && newValue < this.viewOptions.minLimit) {
                    return this.viewOptions.minLimit;
                }
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) && newValue > this.viewOptions.maxLimit) {
                    return this.viewOptions.maxLimit;
                }
                return newValue;
            };
        /**
         * @param {?} newValue
         * @return {?}
         */
        SliderComponent.prototype.applyMinMaxRange = /**
         * @param {?} newValue
         * @return {?}
         */
            function (newValue) {
                /** @type {?} */
                var oppositeValue = (this.currentTrackingPointer === PointerType.Min)
                    ? this.viewHighValue
                    : this.viewLowValue;
                /** @type {?} */
                var difference = Math.abs(newValue - oppositeValue);
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange)) {
                    if (difference < this.viewOptions.minRange) {
                        if (this.currentTrackingPointer === PointerType.Min) {
                            return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.viewOptions.precisionLimit);
                        }
                        else if (this.currentTrackingPointer === PointerType.Max) {
                            return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.viewOptions.precisionLimit);
                        }
                    }
                }
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxRange)) {
                    if (difference > this.viewOptions.maxRange) {
                        if (this.currentTrackingPointer === PointerType.Min) {
                            return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                        }
                        else if (this.currentTrackingPointer === PointerType.Max) {
                            return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                        }
                    }
                }
                return newValue;
            };
        /**
         * @param {?} newValue
         * @return {?}
         */
        SliderComponent.prototype.applyPushRange = /**
         * @param {?} newValue
         * @return {?}
         */
            function (newValue) {
                /** @type {?} */
                var difference = (this.currentTrackingPointer === PointerType.Min)
                    ? this.viewHighValue - newValue
                    : newValue - this.viewLowValue;
                /** @type {?} */
                var minRange = (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange))
                    ? this.viewOptions.minRange
                    : this.viewOptions.step;
                /** @type {?} */
                var maxRange = this.viewOptions.maxRange;
                // if smaller than minRange
                if (difference < minRange) {
                    if (this.currentTrackingPointer === PointerType.Min) {
                        this.viewHighValue = MathHelper.roundToPrecisionLimit(Math.min(newValue + minRange, this.viewOptions.ceil), this.viewOptions.precisionLimit);
                        newValue = MathHelper.roundToPrecisionLimit(this.viewHighValue - minRange, this.viewOptions.precisionLimit);
                        this.applyViewChange();
                        this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
                    }
                    else if (this.currentTrackingPointer === PointerType.Max) {
                        this.viewLowValue = MathHelper.roundToPrecisionLimit(Math.max(newValue - minRange, this.viewOptions.floor), this.viewOptions.precisionLimit);
                        newValue = MathHelper.roundToPrecisionLimit(this.viewLowValue + minRange, this.viewOptions.precisionLimit);
                        this.applyViewChange();
                        this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
                    }
                    this.updateAriaAttributes();
                }
                else if (!ValueHelper.isNullOrUndefined(maxRange) && difference > maxRange) {
                    // if greater than maxRange
                    if (this.currentTrackingPointer === PointerType.Min) {
                        this.viewHighValue = MathHelper.roundToPrecisionLimit(newValue + maxRange, this.viewOptions.precisionLimit);
                        this.applyViewChange();
                        this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
                    }
                    else if (this.currentTrackingPointer === PointerType.Max) {
                        this.viewLowValue = MathHelper.roundToPrecisionLimit(newValue - maxRange, this.viewOptions.precisionLimit);
                        this.applyViewChange();
                        this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
                    }
                    this.updateAriaAttributes();
                }
                return newValue;
            };
        /**
         * @return {?}
         */
        SliderComponent.prototype.getChangeContext = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var changeContext = new ChangeContext();
                changeContext.pointerType = this.currentTrackingPointer;
                changeContext.value = +this.value;
                if (this.range) {
                    changeContext.highValue = +this.highValue;
                }
                return changeContext;
            };
        SliderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-slider',
                        template: "<!-- // 0 Left selection bar outside two handles -->\n<span ngxSliderElement #leftOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-left-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 1 Right selection bar outside two handles -->\n<span ngxSliderElement #rightOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-right-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 2 The whole slider bar -->\n<span ngxSliderElement #fullBar [class.ngx-slider-transparent]=\"fullBarTransparentClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-full-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 3 Selection bar between two handles -->\n<span ngxSliderElement #selectionBar [class.ngx-slider-draggable]=\"selectionBarDraggableClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-selection-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar ngx-slider-selection\" [ngStyle]=\"barStyle\"></span>\n</span>\n<!-- // 4 Low slider handle -->\n<span ngxSliderHandle #minHandle class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-min\" [ngStyle]=minPointerStyle></span>\n<!-- // 5 High slider handle -->\n<span ngxSliderHandle #maxHandle [style.display]=\"range ? 'inherit' : 'none'\" class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-max\" [ngStyle]=maxPointerStyle></span>\n<!-- // 6 Floor label -->\n<span ngxSliderLabel #floorLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-floor\"></span>\n<!-- // 7 Ceiling label -->\n<span ngxSliderLabel #ceilLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-ceil\"></span>\n<!-- // 8 Label above the low slider handle -->\n<span ngxSliderLabel #minHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-value\"></span>\n<!-- // 9 Label above the high slider handle -->\n<span ngxSliderLabel #maxHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-high\"></span>\n<!-- // 10 Combined range label when the slider handles are close ex. 15 - 17 -->\n<span ngxSliderLabel #combinedLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-combined\"></span>\n<!-- // 11 The ticks -->\n<span ngxSliderElement #ticksElement [hidden]=\"!showTicks\" [class.ngx-slider-ticks-values-under]=\"ticksUnderValuesClass\" class=\"ngx-slider-ticks\">\n  <span *ngFor=\"let t of ticks\" class=\"ngx-slider-tick\" [ngClass]=\"{'ngx-slider-selected': t.selected}\" [ngStyle]=\"t.style\">\n    <ngx-slider-tooltip-wrapper [template]=\"tooltipTemplate\" [tooltip]=\"t.tooltip\" [placement]=\"t.tooltipPlacement\"></ngx-slider-tooltip-wrapper>\n    <ngx-slider-tooltip-wrapper *ngIf=\"t.value != null\" class=\"ngx-slider-span ngx-slider-tick-value\"\n        [template]=\"tooltipTemplate\" [tooltip]=\"t.valueTooltip\" [placement]=\"t.valueTooltipPlacement\" [content]=\"t.value\"></ngx-slider-tooltip-wrapper>\n    <span *ngIf=\"t.legend != null\" class=\"ngx-slider-span ngx-slider-tick-legend\" [innerHTML]=\"t.legend\"></span>\n  </span>\n</span>",
                        styles: ["::ng-deep .ngx-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:pan-y}::ng-deep .ngx-slider.with-legend{margin-bottom:40px}::ng-deep .ngx-slider[disabled]{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}::ng-deep .ngx-slider[disabled] .ngx-slider-draggable{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-selection{background:#8b91a2}::ng-deep .ngx-slider[disabled] .ngx-slider-tick{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-tick.ngx-slider-selected{background:#8b91a2}::ng-deep .ngx-slider .ngx-slider-span{white-space:nowrap;position:absolute;display:inline-block}::ng-deep .ngx-slider .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper{left:0;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}::ng-deep .ngx-slider .ngx-slider-draggable{cursor:move}::ng-deep .ngx-slider .ngx-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-transparent .ngx-slider-bar{background:0 0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-left-out-selection .ngx-slider-bar{background:#df002d}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-right-out-selection .ngx-slider-bar{background:#03a688}::ng-deep .ngx-slider .ngx-slider-selection{z-index:2;background:#0db9f0;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;border-radius:16px}::ng-deep .ngx-slider .ngx-slider-pointer:after{content:'';width:8px;height:8px;position:absolute;top:12px;left:12px;border-radius:4px;background:#fff}::ng-deep .ngx-slider .ngx-slider-pointer:hover:after{background-color:#fff}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active{z-index:4}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active:after{background-color:#451aff}::ng-deep .ngx-slider .ngx-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}::ng-deep .ngx-slider .ngx-slider-bubble.ngx-slider-limit{color:#55637d}::ng-deep .ngx-slider .ngx-slider-ticks{box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}::ng-deep .ngx-slider .ngx-slider-ticks-values-under .ngx-slider-tick-value{top:auto;bottom:-36px}::ng-deep .ngx-slider .ngx-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}::ng-deep .ngx-slider .ngx-slider-tick.ngx-slider-selected{background:#0db9f0}::ng-deep .ngx-slider .ngx-slider-tick-value{position:absolute;top:-34px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}::ng-deep .ngx-slider .ngx-slider-tick-legend{position:absolute;top:24px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);max-width:50px;white-space:normal}::ng-deep .ngx-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;touch-action:pan-x}::ng-deep .ngx-slider.vertical .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider.vertical .ngx-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}::ng-deep .ngx-slider.vertical .ngx-slider-bar{bottom:0;left:auto;width:4px;height:100%}::ng-deep .ngx-slider.vertical .ngx-slider-pointer{left:-14px!important;top:auto;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-bubble{left:16px!important;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}::ng-deep .ngx-slider.vertical .ngx-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}::ng-deep .ngx-slider.vertical .ngx-slider-tick-value{left:24px;top:auto;-webkit-transform:translate(0,-28%);transform:translate(0,-28%)}::ng-deep .ngx-slider.vertical .ngx-slider-tick-legend{top:auto;right:24px;-webkit-transform:translate(0,-28%);transform:translate(0,-28%);max-width:none;white-space:nowrap}::ng-deep .ngx-slider.vertical .ngx-slider-ticks-values-under .ngx-slider-tick-value{bottom:auto;left:auto;right:24px}::ng-deep .ngx-slider *{transition:none}::ng-deep .ngx-slider.animate .ngx-slider-bar-wrapper{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-selection{transition:background-color .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-pointer{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-limit{transition:opacity .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-combined{transition:opacity .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-tick{transition:background-color .3s linear}"],
                        host: { class: 'ngx-slider' },
                        providers: [NGX_SLIDER_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        SliderComponent.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef },
                { type: core.NgZone }
            ];
        };
        SliderComponent.propDecorators = {
            value: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            highValue: [{ type: core.Input }],
            highValueChange: [{ type: core.Output }],
            options: [{ type: core.Input }],
            userChangeStart: [{ type: core.Output }],
            userChange: [{ type: core.Output }],
            userChangeEnd: [{ type: core.Output }],
            manualRefresh: [{ type: core.Input }],
            triggerFocus: [{ type: core.Input }],
            leftOuterSelectionBarElement: [{ type: core.ViewChild, args: ['leftOuterSelectionBar', { read: SliderElementDirective },] }],
            rightOuterSelectionBarElement: [{ type: core.ViewChild, args: ['rightOuterSelectionBar', { read: SliderElementDirective },] }],
            fullBarElement: [{ type: core.ViewChild, args: ['fullBar', { read: SliderElementDirective },] }],
            selectionBarElement: [{ type: core.ViewChild, args: ['selectionBar', { read: SliderElementDirective },] }],
            minHandleElement: [{ type: core.ViewChild, args: ['minHandle', { read: SliderHandleDirective },] }],
            maxHandleElement: [{ type: core.ViewChild, args: ['maxHandle', { read: SliderHandleDirective },] }],
            floorLabelElement: [{ type: core.ViewChild, args: ['floorLabel', { read: SliderLabelDirective },] }],
            ceilLabelElement: [{ type: core.ViewChild, args: ['ceilLabel', { read: SliderLabelDirective },] }],
            minHandleLabelElement: [{ type: core.ViewChild, args: ['minHandleLabel', { read: SliderLabelDirective },] }],
            maxHandleLabelElement: [{ type: core.ViewChild, args: ['maxHandleLabel', { read: SliderLabelDirective },] }],
            combinedLabelElement: [{ type: core.ViewChild, args: ['combinedLabel', { read: SliderLabelDirective },] }],
            ticksElement: [{ type: core.ViewChild, args: ['ticksElement', { read: SliderElementDirective },] }],
            tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
            sliderElementVerticalClass: [{ type: core.HostBinding, args: ['class.vertical',] }],
            sliderElementAnimateClass: [{ type: core.HostBinding, args: ['class.animate',] }],
            sliderElementWithLegendClass: [{ type: core.HostBinding, args: ['class.with-legend',] }],
            sliderElementDisabledAttr: [{ type: core.HostBinding, args: ['attr.disabled',] }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return SliderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TooltipWrapperComponent = /** @class */ (function () {
        function TooltipWrapperComponent() {
        }
        TooltipWrapperComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-slider-tooltip-wrapper',
                        template: "<ng-container *ngIf=\"template\">\n  <ng-template *ngTemplateOutlet=\"template; context: {tooltip: tooltip, placement: placement, content: content}\"></ng-template>\n</ng-container>\n\n<ng-container *ngIf=\"!template\">\n  <div class=\"ngx-slider-inner-tooltip\" [attr.title]=\"tooltip\" [attr.data-tooltip-placement]=\"placement\">\n    {{content}}\n  </div>\n</ng-container>",
                        styles: [".ngx-slider-inner-tooltip{height:100%}"]
                    },] },
        ];
        TooltipWrapperComponent.propDecorators = {
            template: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            content: [{ type: core.Input }]
        };
        return TooltipWrapperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * NgxSlider module
     *
     * The module exports the slider component
     */
    var NgxSliderModule = /** @class */ (function () {
        function NgxSliderModule() {
        }
        NgxSliderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            SliderComponent,
                            SliderElementDirective,
                            SliderHandleDirective,
                            SliderLabelDirective,
                            TooltipWrapperComponent
                        ],
                        exports: [
                            SliderComponent
                        ]
                    },] },
        ];
        return NgxSliderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxSliderModule = NgxSliderModule;
    exports.ChangeContext = ChangeContext;
    exports.PointerType = PointerType;
    exports.LabelType = LabelType;
    exports.Options = Options;
    exports.ɵb = SliderElementDirective;
    exports.ɵc = SliderHandleDirective;
    exports.ɵd = SliderLabelDirective;
    exports.ɵa = SliderComponent;
    exports.ɵe = TooltipWrapperComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlkZXItbmd4LXNsaWRlci51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvb3B0aW9ucy50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvcG9pbnRlci10eXBlLnRzIiwibmc6Ly9AYW5ndWxhci1zbGlkZXIvbmd4LXNsaWRlci9jaGFuZ2UtY29udGV4dC50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvdmFsdWUtaGVscGVyLnRzIiwibmc6Ly9AYW5ndWxhci1zbGlkZXIvbmd4LXNsaWRlci9jb21wYXRpYmlsaXR5LWhlbHBlci50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvbWF0aC1oZWxwZXIudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL2V2ZW50LWxpc3RlbmVyLnRzIiwibmc6Ly9AYW5ndWxhci1zbGlkZXIvbmd4LXNsaWRlci9ldmVudC1saXN0ZW5lci1oZWxwZXIudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci1lbGVtZW50LmRpcmVjdGl2ZS50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvc2xpZGVyLWhhbmRsZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci1sYWJlbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3Rvb2x0aXAtd3JhcHBlci5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBQb2ludGVyVHlwZSB9IGZyb20gJy4vcG9pbnRlci10eXBlJztcblxuLyoqIExhYmVsIHR5cGUgKi9cbmV4cG9ydCBlbnVtIExhYmVsVHlwZSB7XG4gIC8qKiBMYWJlbCBhYm92ZSBsb3cgcG9pbnRlciAqL1xuICBMb3csXG4gIC8qKiBMYWJlbCBhYm92ZSBoaWdoIHBvaW50ZXIgKi9cbiAgSGlnaCxcbiAgLyoqIExhYmVsIGZvciBtaW5pbXVtIHNsaWRlciB2YWx1ZSAqL1xuICBGbG9vcixcbiAgLyoqIExhYmVsIGZvciBtYXhpbXVtIHNsaWRlciB2YWx1ZSAqL1xuICBDZWlsLFxuICAvKiogTGFiZWwgYmVsb3cgbGVnZW5kIHRpY2sgKi9cbiAgVGlja1ZhbHVlXG59XG5cbi8qKiBGdW5jdGlvbiB0byB0cmFuc2xhdGUgbGFiZWwgdmFsdWUgaW50byB0ZXh0ICovXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVGdW5jdGlvbiA9ICh2YWx1ZTogbnVtYmVyLCBsYWJlbDogTGFiZWxUeXBlKSA9PiBzdHJpbmc7XG4vKiogRnVuY3Rpb24gdG8gY29tYmluZCAqL1xuZXhwb3J0IHR5cGUgQ29tYmluZUxhYmVsc0Z1bmN0aW9uID0gKG1pbkxhYmVsOiBzdHJpbmcsIG1heExhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcbi8qKiBGdW5jdGlvbiB0byBwcm92aWRlIGxlZ2VuZCAgKi9cbmV4cG9ydCB0eXBlIEdldExlZ2VuZEZ1bmN0aW9uID0gKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIEdldFN0ZXBMZWdlbmRGdW5jdGlvbiA9IChzdGVwOiBDdXN0b21TdGVwRGVmaW5pdGlvbikgPT4gc3RyaW5nO1xuXG4vKiogRnVuY3Rpb24gY29udmVydGluZyBzbGlkZXIgdmFsdWUgdG8gc2xpZGVyIHBvc2l0aW9uICovXG5leHBvcnQgdHlwZSBWYWx1ZVRvUG9zaXRpb25GdW5jdGlvbiA9ICh2YWw6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKSA9PiBudW1iZXI7XG5cbi8qKiBGdW5jdGlvbiBjb252ZXJ0aW5nIHNsaWRlciBwb3NpdGlvbiB0byBzbGlkZXIgdmFsdWUgKi9cbmV4cG9ydCB0eXBlIFBvc2l0aW9uVG9WYWx1ZUZ1bmN0aW9uID0gKHBlcmNlbnQ6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKSA9PiBudW1iZXI7XG5cbi8qKlxuICogQ3VzdG9tIHN0ZXAgZGVmaW5pdGlvblxuICpcbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBjdXN0b20gdmFsdWVzIGFuZCBsZWdlbmQgdmFsdWVzIGZvciBzbGlkZXIgdGlja3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDdXN0b21TdGVwRGVmaW5pdGlvbiB7XG4gIC8qKiBWYWx1ZSAqL1xuICB2YWx1ZTogbnVtYmVyO1xuICAvKiogTGVnZW5kIChsYWJlbCBmb3IgdGhlIHZhbHVlKSAqL1xuICBsZWdlbmQ/OiBzdHJpbmc7XG59XG5cbi8qKiBTbGlkZXIgb3B0aW9ucyAqL1xuZXhwb3J0IGNsYXNzIE9wdGlvbnMge1xuICAvKiogTWluaW11bSB2YWx1ZSBmb3IgYSBzbGlkZXIuXG4gICAgTm90IGFwcGxpY2FibGUgd2hlbiB1c2luZyBzdGVwc0FycmF5LiAqL1xuICBmbG9vcj86IG51bWJlciA9IDA7XG5cbiAgLyoqIE1heGltdW0gdmFsdWUgZm9yIGEgc2xpZGVyLlxuICAgIE5vdCBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgc3RlcHNBcnJheS4gKi9cbiAgY2VpbD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFN0ZXAgYmV0d2VlbiBlYWNoIHZhbHVlLlxuICAgIE5vdCBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgc3RlcHNBcnJheS4gKi9cbiAgc3RlcD86IG51bWJlciA9IDE7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHJhbmdlIGF1dGhvcml6ZWQgb24gdGhlIHNsaWRlci5cbiAgICBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LlxuICAgIFdoZW4gdXNpbmcgc3RlcHNBcnJheSwgZXhwcmVzc2VkIGFzIGluZGV4IGludG8gc3RlcHNBcnJheS4gKi9cbiAgbWluUmFuZ2U/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBUaGUgbWF4aW11bSByYW5nZSBhdXRob3JpemVkIG9uIHRoZSBzbGlkZXIuXG4gICAgQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIG1heFJhbmdlPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gaGF2ZSBhIHB1c2ggYmVoYXZpb3IuIFdoZW4gdGhlIG1pbiBoYW5kbGUgZ29lcyBhYm92ZSB0aGUgbWF4LFxuICAgIHRoZSBtYXggaXMgbW92ZWQgYXMgd2VsbCAoYW5kIHZpY2UtdmVyc2EpLiBUaGUgcmFuZ2UgYmV0d2VlbiBtaW4gYW5kIG1heCBpc1xuICAgIGRlZmluZWQgYnkgdGhlIHN0ZXAgb3B0aW9uIChkZWZhdWx0cyB0byAxKSBhbmQgY2FuIGFsc28gYmUgb3ZlcnJpZGVuIGJ5XG4gICAgdGhlIG1pblJhbmdlIG9wdGlvbi4gQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS4gKi9cbiAgcHVzaFJhbmdlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgbWluaW11bSB2YWx1ZSBhdXRob3JpemVkIG9uIHRoZSBzbGlkZXIuXG4gICAgV2hlbiB1c2luZyBzdGVwc0FycmF5LCBleHByZXNzZWQgYXMgaW5kZXggaW50byBzdGVwc0FycmF5LiAqL1xuICBtaW5MaW1pdD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbHVlIGF1dGhvcml6ZWQgb24gdGhlIHNsaWRlci5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIG1heExpbWl0PzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogQ3VzdG9tIHRyYW5zbGF0ZSBmdW5jdGlvbi4gVXNlIHRoaXMgaWYgeW91IHdhbnQgdG8gdHJhbnNsYXRlIHZhbHVlcyBkaXNwbGF5ZWRcbiAgICAgIG9uIHRoZSBzbGlkZXIuICovXG4gIHRyYW5zbGF0ZT86IFRyYW5zbGF0ZUZ1bmN0aW9uID0gbnVsbDtcblxuICAvKiogQ3VzdG9tIGZ1bmN0aW9uIGZvciBjb21iaW5pbmcgb3ZlcmxhcHBpbmcgbGFiZWxzIGluIHJhbmdlIHNsaWRlci5cbiAgICAgIEl0IHRha2VzIHRoZSBtaW4gYW5kIG1heCB2YWx1ZXMgKGFscmVhZHkgdHJhbnNsYXRlZCB3aXRoIHRyYW5zbGF0ZSBmdWN0aW9uKVxuICAgICAgYW5kIHNob3VsZCByZXR1cm4gaG93IHRoZXNlIHR3byB2YWx1ZXMgc2hvdWxkIGJlIGNvbWJpbmVkLlxuICAgICAgSWYgbm90IHByb3ZpZGVkLCB0aGUgZGVmYXVsdCBmdW5jdGlvbiB3aWxsIGpvaW4gdGhlIHR3byB2YWx1ZXMgd2l0aFxuICAgICAgJyAtICcgYXMgc2VwYXJhdG9yLiAqL1xuICBjb21iaW5lTGFiZWxzPzogQ29tYmluZUxhYmVsc0Z1bmN0aW9uID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGRpc3BsYXkgbGVnZW5kIHVuZGVyIHRpY2tzICh0aHVzLCBpdCBuZWVkcyB0byBiZSB1c2VkIGFsb25nIHdpdGhcbiAgICAgc2hvd1RpY2tzIG9yIHNob3dUaWNrc1ZhbHVlcykuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGVhY2ggdGlja1xuICAgICB2YWx1ZSBhbmQgcmV0dXJuZWQgY29udGVudCB3aWxsIGJlIGRpc3BsYXllZCB1bmRlciB0aGUgdGljayBhcyBhIGxlZ2VuZC5cbiAgICAgSWYgdGhlIHJldHVybmVkIHZhbHVlIGlzIG51bGwsIHRoZW4gbm8gbGVnZW5kIGlzIGRpc3BsYXllZCB1bmRlclxuICAgICB0aGUgY29ycmVzcG9uZGluZyB0aWNrLllvdSBjYW4gYWxzbyBkaXJlY3RseSBwcm92aWRlIHRoZSBsZWdlbmQgdmFsdWVzXG4gICAgIGluIHRoZSBzdGVwc0FycmF5IG9wdGlvbi4gKi9cbiAgZ2V0TGVnZW5kPzogR2V0TGVnZW5kRnVuY3Rpb24gPSBudWxsO1xuXG4gICAvKiogVXNlIHRvIGRpc3BsYXkgYSBjdXN0b20gbGVnZW5kIG9mIGEgc3RlcEl0ZW0gZnJvbSBzdGVwc0FycmF5LlxuICAgIEl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgZ2V0TGVnZW4gYnV0IGZvciBzdGVwc0FycmF5LiAqL1xuICBnZXRTdGVwTGVnZW5kPzogR2V0U3RlcExlZ2VuZEZ1bmN0aW9uID0gbnVsbDtcblxuICAvKiogSWYgeW91IHdhbnQgdG8gZGlzcGxheSBhIHNsaWRlciB3aXRoIG5vbiBsaW5lYXIvbnVtYmVyIHN0ZXBzLlxuICAgICBKdXN0IHBhc3MgYW4gYXJyYXkgd2l0aCBlYWNoIHNsaWRlciB2YWx1ZSBhbmQgdGhhdCdzIGl0OyB0aGUgZmxvb3IsIGNlaWwgYW5kIHN0ZXAgc2V0dGluZ3NcbiAgICAgb2YgdGhlIHNsaWRlciB3aWxsIGJlIGNvbXB1dGVkIGF1dG9tYXRpY2FsbHkuXG4gICAgIEJ5IGRlZmF1bHQsIHRoZSB2YWx1ZSBtb2RlbCBhbmQgdmFsdWVIaWdoIG1vZGVsIHZhbHVlcyB3aWxsIGJlIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgICBpbiB0aGUgc3RlcHNBcnJheS5cbiAgICAgVGhleSBjYW4gYWxzbyBiZSBib3VuZCB0byB0aGUgaW5kZXggb2YgdGhlIHNlbGVjdGVkIGl0ZW0gYnkgc2V0dGluZyB0aGUgYmluZEluZGV4Rm9yU3RlcHNBcnJheVxuICAgICBvcHRpb24gdG8gdHJ1ZS4gKi9cbiAgc3RlcHNBcnJheT86IEN1c3RvbVN0ZXBEZWZpbml0aW9uW10gPSBudWxsO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBiaW5kIHRoZSBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgaXRlbSB0byB2YWx1ZSBtb2RlbCBhbmQgdmFsdWVIaWdoIG1vZGVsLiAqL1xuICBiaW5kSW5kZXhGb3JTdGVwc0FycmF5PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGVuIHNldCB0byB0cnVlIGFuZCB1c2luZyBhIHJhbmdlIHNsaWRlciwgdGhlIHJhbmdlIGNhbiBiZSBkcmFnZ2VkIGJ5IHRoZSBzZWxlY3Rpb24gYmFyLlxuICAgIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuICovXG4gIGRyYWdnYWJsZVJhbmdlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTYW1lIGFzIGRyYWdnYWJsZVJhbmdlIGJ1dCB0aGUgc2xpZGVyIHJhbmdlIGNhbid0IGJlIGNoYW5nZWQuXG4gICAgQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS4gKi9cbiAgZHJhZ2dhYmxlUmFuZ2VPbmx5PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBhbHdheXMgc2hvdyB0aGUgc2VsZWN0aW9uIGJhciBiZWZvcmUgdGhlIHNsaWRlciBoYW5kbGUuICovXG4gIHNob3dTZWxlY3Rpb25CYXI/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGFsd2F5cyBzaG93IHRoZSBzZWxlY3Rpb24gYmFyIGFmdGVyIHRoZSBzbGlkZXIgaGFuZGxlLiAqL1xuICBzaG93U2VsZWN0aW9uQmFyRW5kPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiAgU2V0IGEgbnVtYmVyIHRvIGRyYXcgdGhlIHNlbGVjdGlvbiBiYXIgYmV0d2VlbiB0aGlzIHZhbHVlIGFuZCB0aGUgc2xpZGVyIGhhbmRsZS5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIHNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWU/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiAgT25seSBmb3IgcmFuZ2Ugc2xpZGVyLiBTZXQgdG8gdHJ1ZSB0byB2aXN1YWxpemUgaW4gZGlmZmVyZW50IGNvbG91ciB0aGUgYXJlYXNcbiAgICBvbiB0aGUgbGVmdC9yaWdodCAodG9wL2JvdHRvbSBmb3IgdmVydGljYWwgcmFuZ2Ugc2xpZGVyKSBvZiBzZWxlY3Rpb24gYmFyIGJldHdlZW4gdGhlIGhhbmRsZXMuICovXG4gIHNob3dPdXRlclNlbGVjdGlvbkJhcnM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGhpZGUgcG9pbnRlciBsYWJlbHMgKi9cbiAgaGlkZVBvaW50ZXJMYWJlbHM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGhpZGUgbWluIC8gbWF4IGxhYmVscyAgKi9cbiAgaGlkZUxpbWl0TGFiZWxzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGUgYXV0by1oaWRpbmcgYmVoYXZpb3Igb2YgdGhlIGxpbWl0IGxhYmVscy4gKi9cbiAgYXV0b0hpZGVMaW1pdExhYmVscz86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBtYWtlIHRoZSBzbGlkZXIgcmVhZC1vbmx5LiAqL1xuICByZWFkT25seT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZGlzYWJsZSB0aGUgc2xpZGVyLiAqL1xuICBkaXNhYmxlZD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhyb3R0bGUgaW50ZXJ2YWwgZm9yIG1vdXNlIGV2ZW50cyBpbiBtaWxsaXNlY29uZHMuXG4gICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYXZvaWQgYSBmbG9vZCBvZiBldmVudHMgd2hlbiBtb3ZpbmcgdGhlIHNsaWRlciB3aXRoIG1vdXNlLiAqL1xuICBtb3VzZUV2ZW50c0ludGVydmFsPzogbnVtYmVyID0gNTA7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciB0b3VjaCBldmVudHMgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGF2b2lkIGEgZmxvb2Qgb2YgZXZlbnRzIHdoZW4gbW92aW5nIHRoZSBzbGlkZXIgd2l0aCB0b3VjaCBnZXN0dXJlLiAqL1xuICB0b3VjaEV2ZW50c0ludGVydmFsPzogbnVtYmVyID0gNTA7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciBpbnB1dCBjaGFuZ2VzIChjaGFuZ2VzIHRvIGJpbmRpbmdzIG9yIHJlYWN0aXZlIGZvcm0gaW5wdXRzKVxuICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGF2b2lkIGEgZmxvb2Qgb2YgZXZlbnRzIG9uIGZyZXF1ZW50IGlucHV0IGJpbmRpbmcgY2hhbmdlcyBhZmZlY3RpbmcgcGVyZm9ybWFuY2UuICovXG4gIGlucHV0RXZlbnRzSW50ZXJ2YWw/OiBudW1iZXIgPSAxMDA7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciBvdXRwdXQgY2hhbmdlcyAoc2lnbmFsbGluZyBjaGFuZ2VzIHRvIG91dHB1dCBiaW5kaW5ncyBhbmQgdXNlciBjYWxsYmFja3MpXG4gICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYXZvaWQgYSBmbG9vZCBvZiBvdXRnb2luZyBldmVudHMgYWZmZWN0aW5nIEFuZ3VsYXIgYXBwIHBlcmZvcm1hbmNlLiAqL1xuICBvdXRwdXRFdmVudHNJbnRlcnZhbD86IG51bWJlciA9IDEwMDtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZGlzcGxheSBhIHRpY2sgZm9yIGVhY2ggc3RlcCBvZiB0aGUgc2xpZGVyLiAqL1xuICBzaG93VGlja3M/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGRpc3BsYXkgYSB0aWNrIGFuZCB0aGUgc3RlcCB2YWx1ZSBmb3IgZWFjaCBzdGVwIG9mIHRoZSBzbGlkZXIuLiAqL1xuICBzaG93VGlja3NWYWx1ZXM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyogVGhlIHN0ZXAgYmV0d2VlbiBlYWNoIHRpY2sgdG8gZGlzcGxheS4gSWYgbm90IHNldCwgdGhlIHN0ZXAgdmFsdWUgaXMgdXNlZC5cbiAgICBOb3QgdXNlZCB3aGVuIHRpY2tzQXJyYXkgaXMgc3BlY2lmaWVkLiAqL1xuICB0aWNrU3RlcD86IG51bWJlciA9IG51bGw7XG5cbiAgLyogVGhlIHN0ZXAgYmV0d2VlbiBkaXNwbGF5aW5nIGVhY2ggdGljayBzdGVwIHZhbHVlLlxuICAgIElmIG5vdCBzZXQsIHRoZW4gdGlja1N0ZXAgb3Igc3RlcCBpcyB1c2VkLCBkZXBlbmRpbmcgb24gd2hpY2ggb25lIGlzIHNldC4gKi9cbiAgdGlja1ZhbHVlU3RlcD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBkaXNwbGF5IHRpY2tzIGF0IHNwZWNpZmljIHBvc2l0aW9ucy5cbiAgICBUaGUgYXJyYXkgY29udGFpbnMgdGhlIGluZGV4IG9mIHRoZSB0aWNrcyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAgRm9yIGV4YW1wbGUsIFswLCAxLCA1XSB3aWxsIGRpc3BsYXkgYSB0aWNrIGZvciB0aGUgZmlyc3QsIHNlY29uZCBhbmQgc2l4dGggdmFsdWVzLiAqL1xuICB0aWNrc0FycmF5PzogbnVtYmVyW10gPSBudWxsO1xuXG4gIC8qKiBVc2VkIHRvIGRpc3BsYXkgYSB0b29sdGlwIHdoZW4gYSB0aWNrIGlzIGhvdmVyZWQuXG4gICAgU2V0IHRvIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB0b29sdGlwIGNvbnRlbnQgZm9yIGEgZ2l2ZW4gdmFsdWUuICovXG4gIHRpY2tzVG9vbHRpcD86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBTYW1lIGFzIHRpY2tzVG9vbHRpcCBidXQgZm9yIHRpY2tzIHZhbHVlcy4gKi9cbiAgdGlja3NWYWx1ZXNUb29sdGlwPzogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciB2ZXJ0aWNhbGx5LlxuICAgIFRoZSBzbGlkZXIgd2lsbCB0YWtlIHRoZSBmdWxsIGhlaWdodCBvZiBpdHMgcGFyZW50LlxuICAgIENoYW5naW5nIHRoaXMgdmFsdWUgYXQgcnVudGltZSBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZC4gKi9cbiAgdmVydGljYWw/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBjb2xvciBvZiB0aGUgc2VsZWN0aW9uIGJhci5cbiAgICBJZiB5b3VyIGNvbG9yIHdvbid0IGNoYW5nZSwgZG9uJ3QgdXNlIHRoaXMgb3B0aW9uIGJ1dCBzZXQgaXQgdGhyb3VnaCBDU1MuXG4gICAgSWYgdGhlIHJldHVybmVkIGNvbG9yIGRlcGVuZHMgb24gYSBtb2RlbCB2YWx1ZSAoZWl0aGVyIHZhbHVlIG9yIHZhbHVlSGlnaCksXG4gICAgeW91IHNob3VsZCB1c2UgdGhlIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uXG4gICAgSW5kZWVkLCB3aGVuIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZXJlIGlzIG5vIGNlcnRhaW50eSB0aGF0IHRoZSBtb2RlbFxuICAgIGhhcyBhbHJlYWR5IGJlZW4gdXBkYXRlZC4qL1xuICBnZXRTZWxlY3Rpb25CYXJDb2xvcj86IChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZT86IG51bWJlcikgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjb2xvciBvZiBhIHRpY2suIHNob3dUaWNrcyBtdXN0IGJlIGVuYWJsZWQuICovXG4gIGdldFRpY2tDb2xvcj86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGN1cnJlbnQgY29sb3Igb2YgYSBwb2ludGVyLlxuICAgIElmIHlvdXIgY29sb3Igd29uJ3QgY2hhbmdlLCBkb24ndCB1c2UgdGhpcyBvcHRpb24gYnV0IHNldCBpdCB0aHJvdWdoIENTUy5cbiAgICBJZiB0aGUgcmV0dXJuZWQgY29sb3IgZGVwZW5kcyBvbiBhIG1vZGVsIHZhbHVlIChlaXRoZXIgdmFsdWUgb3IgdmFsdWVIaWdoKSxcbiAgICB5b3Ugc2hvdWxkIHVzZSB0aGUgYXJndW1lbnQgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cbiAgICBJbmRlZWQsIHdoZW4gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlcmUgaXMgbm8gY2VydGFpbnR5IHRoYXQgdGhlIG1vZGVsIGhhcyBhbHJlYWR5IGJlZW4gdXBkYXRlZC5cbiAgICBUbyBoYW5kbGUgcmFuZ2Ugc2xpZGVyIHBvaW50ZXJzIGluZGVwZW5kZW50bHksIHlvdSBzaG91bGQgZXZhbHVhdGUgcG9pbnRlclR5cGUgd2l0aGluIHRoZSBnaXZlblxuICAgIGZ1bmN0aW9uIHdoZXJlIFwibWluXCIgc3RhbmRzIGZvciB2YWx1ZSBtb2RlbCBhbmQgXCJtYXhcIiBmb3IgdmFsdWVIaWdoIG1vZGVsIHZhbHVlcy4gKi9cbiAgZ2V0UG9pbnRlckNvbG9yPzogKHZhbHVlOiBudW1iZXIsIHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSkgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogSGFuZGxlcyBhcmUgZm9jdXNhYmxlIChvbiBjbGljayBvciB3aXRoIHRhYikgYW5kIGNhbiBiZSBtb2RpZmllZCB1c2luZyB0aGUgZm9sbG93aW5nIGtleWJvYXJkIGNvbnRyb2xzOlxuICAgIExlZnQvYm90dG9tIGFycm93czogLTFcbiAgICBSaWdodC90b3AgYXJyb3dzOiArMVxuICAgIFBhZ2UtZG93bjogLTEwJVxuICAgIFBhZ2UtdXA6ICsxMCVcbiAgICBIb21lOiBtaW5pbXVtIHZhbHVlXG4gICAgRW5kOiBtYXhpbXVtIHZhbHVlXG4gICAqL1xuICBrZXlib2FyZFN1cHBvcnQ/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogSWYgeW91IGRpc3BsYXkgdGhlIHNsaWRlciBpbiBhbiBlbGVtZW50IHRoYXQgdXNlcyB0cmFuc2Zvcm06IHNjYWxlKDAuNSksIHNldCB0aGUgc2NhbGUgdmFsdWUgdG8gMlxuICAgIHNvIHRoYXQgdGhlIHNsaWRlciBpcyByZW5kZXJlZCBwcm9wZXJseSBhbmQgdGhlIGV2ZW50cyBhcmUgaGFuZGxlZCBjb3JyZWN0bHkuICovXG4gIHNjYWxlPzogbnVtYmVyID0gMTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZm9yY2UgdGhlIHZhbHVlKHMpIHRvIGJlIHJvdW5kZWQgdG8gdGhlIHN0ZXAsIGV2ZW4gd2hlbiBtb2RpZmllZCBmcm9tIHRoZSBvdXRzaWRlLlxuICAgIFdoZW4gc2V0IHRvIGZhbHNlLCBpZiB0aGUgbW9kZWwgdmFsdWVzIGFyZSBtb2RpZmllZCBmcm9tIG91dHNpZGUgdGhlIHNsaWRlciwgdGhleSBhcmUgbm90IHJvdW5kZWRcbiAgICBhbmQgY2FuIGJlIGJldHdlZW4gdHdvIHN0ZXBzLiAqL1xuICBlbmZvcmNlU3RlcD86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBmb3JjZSB0aGUgdmFsdWUocykgdG8gYmUgbm9ybWFsaXNlZCB0byBhbGxvd2VkIHJhbmdlIChmbG9vciB0byBjZWlsKSwgZXZlbiB3aGVuIG1vZGlmaWVkIGZyb20gdGhlIG91dHNpZGUuXG4gICAgV2hlbiBzZXQgdG8gZmFsc2UsIGlmIHRoZSBtb2RlbCB2YWx1ZXMgYXJlIG1vZGlmaWVkIGZyb20gb3V0c2lkZSB0aGUgc2xpZGVyLCBhbmQgdGhleSBhcmUgb3V0c2lkZSBhbGxvd2VkIHJhbmdlLFxuICAgIHRoZSBzbGlkZXIgbWF5IGJlIHJlbmRlcmVkIGluY29ycmVjdGx5LiBIb3dldmVyLCBzZXR0aW5nIHRoaXMgdG8gZmFsc2UgbWF5IGJlIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwZXJmb3JtIGN1c3RvbSBub3JtYWxpc2F0aW9uLiAqL1xuICBlbmZvcmNlUmFuZ2U/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZm9yY2UgdGhlIHZhbHVlKHMpIHRvIGJlIHJvdW5kZWQgdG8gdGhlIG5lYXJlc3Qgc3RlcCB2YWx1ZSwgZXZlbiB3aGVuIG1vZGlmaWVkIGZyb20gdGhlIG91dHNpZGUuXG4gICAgV2hlbiBzZXQgdG8gZmFsc2UsIGlmIHRoZSBtb2RlbCB2YWx1ZXMgYXJlIG1vZGlmaWVkIGZyb20gb3V0c2lkZSB0aGUgc2xpZGVyLCBhbmQgdGhleSBhcmUgb3V0c2lkZSBhbGxvd2VkIHJhbmdlLFxuICAgIHRoZSBzbGlkZXIgbWF5IGJlIHJlbmRlcmVkIGluY29ycmVjdGx5LiBIb3dldmVyLCBzZXR0aW5nIHRoaXMgdG8gZmFsc2UgbWF5IGJlIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwZXJmb3JtIGN1c3RvbSBub3JtYWxpc2F0aW9uLiAqL1xuICBlbmZvcmNlU3RlcHNBcnJheT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBwcmV2ZW50IHRvIHVzZXIgZnJvbSBzd2l0Y2hpbmcgdGhlIG1pbiBhbmQgbWF4IGhhbmRsZXMuIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuICovXG4gIG5vU3dpdGNoaW5nPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBvbmx5IGJpbmQgZXZlbnRzIG9uIHNsaWRlciBoYW5kbGVzLiAqL1xuICBvbmx5QmluZEhhbmRsZXM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIHNob3cgZ3JhcGhzIHJpZ2h0IHRvIGxlZnQuXG4gICAgSWYgdmVydGljYWwgaXMgdHJ1ZSBpdCB3aWxsIGJlIGZyb20gdG9wIHRvIGJvdHRvbSBhbmQgbGVmdCAvIHJpZ2h0IGFycm93IGZ1bmN0aW9ucyByZXZlcnNlZC4gKi9cbiAgcmlnaHRUb0xlZnQ/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIHJldmVyc2Uga2V5Ym9hcmQgbmF2aWdhdGlvbjpcbiAgICBSaWdodC90b3AgYXJyb3dzOiAtMVxuICAgIExlZnQvYm90dG9tIGFycm93czogKzFcbiAgICBQYWdlLXVwOiAtMTAlXG4gICAgUGFnZS1kb3duOiArMTAlXG4gICAgRW5kOiBtaW5pbXVtIHZhbHVlXG4gICAgSG9tZTogbWF4aW11bSB2YWx1ZVxuICAgKi9cbiAgcmV2ZXJzZWRDb250cm9scz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8ga2VlcCB0aGUgc2xpZGVyIGxhYmVscyBpbnNpZGUgdGhlIHNsaWRlciBib3VuZHMuICovXG4gIGJvdW5kUG9pbnRlckxhYmVscz86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byB1c2UgYSBsb2dhcml0aG1pYyBzY2FsZSB0byBkaXNwbGF5IHRoZSBzbGlkZXIuICAqL1xuICBsb2dTY2FsZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBwb3NpdGlvbiBvbiB0aGUgc2xpZGVyIGZvciBhIGdpdmVuIHZhbHVlLlxuICAgIFRoZSBwb3NpdGlvbiBtdXN0IGJlIGEgcGVyY2VudGFnZSBiZXR3ZWVuIDAgYW5kIDEuXG4gICAgVGhlIGZ1bmN0aW9uIHNob3VsZCBiZSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgb3IgZGVjcmVhc2luZzsgb3RoZXJ3aXNlIHRoZSBzbGlkZXIgbWF5IGJlaGF2ZSBpbmNvcnJlY3RseS4gKi9cbiAgY3VzdG9tVmFsdWVUb1Bvc2l0aW9uPzogVmFsdWVUb1Bvc2l0aW9uRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGZvciBhIGdpdmVuIHBvc2l0aW9uIG9uIHRoZSBzbGlkZXIuXG4gICAgVGhlIHBvc2l0aW9uIGlzIGEgcGVyY2VudGFnZSBiZXR3ZWVuIDAgYW5kIDEuXG4gICAgVGhlIGZ1bmN0aW9uIHNob3VsZCBiZSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgb3IgZGVjcmVhc2luZzsgb3RoZXJ3aXNlIHRoZSBzbGlkZXIgbWF5IGJlaGF2ZSBpbmNvcnJlY3RseS4gKi9cbiAgY3VzdG9tUG9zaXRpb25Ub1ZhbHVlPzogUG9zaXRpb25Ub1ZhbHVlRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBQcmVjaXNpb24gbGltaXQgZm9yIGNhbGN1bGF0ZWQgdmFsdWVzLlxuICAgIFZhbHVlcyB1c2VkIGluIGNhbGN1bGF0aW9ucyB3aWxsIGJlIHJvdW5kZWQgdG8gdGhpcyBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXG4gICAgdG8gcHJldmVudCBhY2N1bXVsYXRpbmcgc21hbGwgZmxvYXRpbmctcG9pbnQgZXJyb3JzLiAqL1xuICBwcmVjaXNpb25MaW1pdD86IG51bWJlciA9IDEyO1xuXG4gIC8qKiBVc2UgdG8gZGlzcGxheSB0aGUgc2VsZWN0aW9uIGJhciBhcyBhIGdyYWRpZW50LlxuICAgIFRoZSBnaXZlbiBvYmplY3QgbXVzdCBjb250YWluIGZyb20gYW5kIHRvIHByb3BlcnRpZXMgd2hpY2ggYXJlIGNvbG9ycy4gKi9cbiAgc2VsZWN0aW9uQmFyR3JhZGllbnQ/OiB7ZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nfSA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBhZGQgYSBsYWJlbCBkaXJlY3RseSB0byB0aGUgc2xpZGVyIGZvciBhY2Nlc3NpYmlsaXR5LiBBZGRzIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZS4gKi9cbiAgYXJpYUxhYmVsPzogc3RyaW5nID0gbnVsbDtcblxuICAvKiogVXNlIGluc3RlYWQgb2YgYXJpYUxhYmVsIHRvIHJlZmVyZW5jZSB0aGUgaWQgb2YgYW4gZWxlbWVudCB3aGljaCB3aWxsIGJlIHVzZWQgdG8gbGFiZWwgdGhlIHNsaWRlci5cbiAgICBBZGRzIHRoZSBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlLiAqL1xuICBhcmlhTGFiZWxsZWRCeT86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBhZGQgYSBsYWJlbCBkaXJlY3RseSB0byB0aGUgc2xpZGVyIHJhbmdlIGZvciBhY2Nlc3NpYmlsaXR5LiBBZGRzIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZS4gKi9cbiAgYXJpYUxhYmVsSGlnaD86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSBpbnN0ZWFkIG9mIGFyaWFMYWJlbEhpZ2ggdG8gcmVmZXJlbmNlIHRoZSBpZCBvZiBhbiBlbGVtZW50IHdoaWNoIHdpbGwgYmUgdXNlZCB0byBsYWJlbCB0aGUgc2xpZGVyIHJhbmdlLlxuICAgIEFkZHMgdGhlIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUuICovXG4gIGFyaWFMYWJlbGxlZEJ5SGlnaD86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBpbmNyZWFzZSByZW5kZXJpbmcgcGVyZm9ybWFuY2UuIElmIHRoZSB2YWx1ZSBpcyBub3QgcHJvdmlkZWQsIHRoZSBzbGlkZXIgY2FsY3VsYXRlcyB0aGUgd2l0aC9oZWlnaHQgb2YgdGhlIGhhbmRsZSAqL1xuICBoYW5kbGVEaW1lbnNpb24/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gaW5jcmVhc2UgcmVuZGVyaW5nIHBlcmZvcm1hbmNlLiBJZiB0aGUgdmFsdWUgaXMgbm90IHByb3ZpZGVkLCB0aGUgc2xpZGVyIGNhbGN1bGF0ZXMgdGhlIHdpdGgvaGVpZ2h0IG9mIHRoZSBiYXIgKi9cbiAgYmFyRGltZW5zaW9uPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogRW5hYmxlL2Rpc2FibGUgQ1NTIGFuaW1hdGlvbnMgKi9cbiAgYW5pbWF0ZT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBFbmFibGUvZGlzYWJsZSBDU1MgYW5pbWF0aW9ucyB3aGlsZSBtb3ZpbmcgdGhlIHNsaWRlciAqL1xuICBhbmltYXRlT25Nb3ZlPzogYm9vbGVhbiA9IGZhbHNlO1xufVxuIiwiLyoqIFBvaW50ZXIgdHlwZSAqL1xuZXhwb3J0IGVudW0gUG9pbnRlclR5cGUge1xuICAvKiogTG93IHBvaW50ZXIgKi9cbiAgTWluLFxuICAvKiogSGlnaCBwb2ludGVyICovXG4gIE1heFxufVxuIiwiaW1wb3J0IHsgUG9pbnRlclR5cGUgfSBmcm9tICcuL3BvaW50ZXItdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VDb250ZXh0IHtcbiAgdmFsdWU6IG51bWJlcjtcbiAgaGlnaFZhbHVlPzogbnVtYmVyO1xuICBwb2ludGVyVHlwZTogUG9pbnRlclR5cGU7XG59XG4iLCJpbXBvcnQgeyBDdXN0b21TdGVwRGVmaW5pdGlvbiB9IGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogIENvbGxlY3Rpb24gb2YgZnVuY3Rpb25zIHRvIGhhbmRsZSBjb252ZXJzaW9ucy9sb29rdXBzIG9mIHZhbHVlc1xuICovXG5leHBvcnQgY2xhc3MgVmFsdWVIZWxwZXIge1xuICBzdGF0aWMgaXNOdWxsT3JVbmRlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGFyZUFycmF5c0VxdWFsKGFycmF5MTogYW55W10sIGFycmF5MjogYW55W10pOiBib29sZWFuIHtcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChhcnJheTFbaV0gIT09IGFycmF5MltpXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgbGluZWFyVmFsdWVUb1Bvc2l0aW9uKHZhbDogbnVtYmVyLCBtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHJhbmdlOiBudW1iZXIgPSBtYXhWYWwgLSBtaW5WYWw7XG4gICAgcmV0dXJuICh2YWwgLSBtaW5WYWwpIC8gcmFuZ2U7XG4gIH1cblxuICBzdGF0aWMgbG9nVmFsdWVUb1Bvc2l0aW9uKHZhbDogbnVtYmVyLCBtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHZhbCA9IE1hdGgubG9nKHZhbCk7XG4gICAgbWluVmFsID0gTWF0aC5sb2cobWluVmFsKTtcbiAgICBtYXhWYWwgPSBNYXRoLmxvZyhtYXhWYWwpO1xuICAgIGNvbnN0IHJhbmdlOiBudW1iZXIgPSBtYXhWYWwgLSBtaW5WYWw7XG4gICAgcmV0dXJuICh2YWwgLSBtaW5WYWwpIC8gcmFuZ2U7XG4gIH1cblxuICBzdGF0aWMgbGluZWFyUG9zaXRpb25Ub1ZhbHVlKHBlcmNlbnQ6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGVyY2VudCAqIChtYXhWYWwgLSBtaW5WYWwpICsgbWluVmFsO1xuICB9XG5cbiAgc3RhdGljIGxvZ1Bvc2l0aW9uVG9WYWx1ZShwZXJjZW50OiBudW1iZXIsIG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlcik6IG51bWJlciB7XG4gICAgbWluVmFsID0gTWF0aC5sb2cobWluVmFsKTtcbiAgICBtYXhWYWwgPSBNYXRoLmxvZyhtYXhWYWwpO1xuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBwZXJjZW50ICogKG1heFZhbCAtIG1pblZhbCkgKyBtaW5WYWw7XG4gICAgcmV0dXJuIE1hdGguZXhwKHZhbHVlKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kU3RlcEluZGV4KG1vZGVsVmFsdWU6IG51bWJlciwgc3RlcHNBcnJheTogQ3VzdG9tU3RlcERlZmluaXRpb25bXSk6IG51bWJlciB7XG4gICAgY29uc3QgZGlmZmVyZW5jZXM6IG51bWJlcltdID0gc3RlcHNBcnJheS5tYXAoKHN0ZXA6IEN1c3RvbVN0ZXBEZWZpbml0aW9uKTogbnVtYmVyID0+IE1hdGguYWJzKG1vZGVsVmFsdWUgLSBzdGVwLnZhbHVlKSk7XG5cbiAgICBsZXQgbWluRGlmZmVyZW5jZUluZGV4OiBudW1iZXIgPSAwO1xuICAgIGZvciAobGV0IGluZGV4OiBudW1iZXIgPSAwOyBpbmRleCA8IHN0ZXBzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZGlmZmVyZW5jZXNbaW5kZXhdICE9PSBkaWZmZXJlbmNlc1ttaW5EaWZmZXJlbmNlSW5kZXhdICYmIGRpZmZlcmVuY2VzW2luZGV4XSA8IGRpZmZlcmVuY2VzW21pbkRpZmZlcmVuY2VJbmRleF0pIHtcbiAgICAgICAgbWluRGlmZmVyZW5jZUluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pbkRpZmZlcmVuY2VJbmRleDtcbiAgfVxufVxuIiwiLy8gRGVjbGFyYXRpb24gZm9yIFJlc2l6ZU9ic2VydmVyIGEgbmV3IEFQSSBhdmFpbGFibGUgaW4gc29tZSBvZiBuZXdlc3QgYnJvd3NlcnM6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUmVzaXplT2JzZXJ2ZXJcbmRlY2xhcmUgY2xhc3MgUmVzaXplT2JzZXJ2ZXIge1xufVxuXG4vKiogSGVscGVyIHdpdGggY29tcGF0aWJpbGl0eSBmdW5jdGlvbnMgdG8gc3VwcG9ydCBkaWZmZXJlbnQgYnJvd3NlcnMgKi9cbmV4cG9ydCBjbGFzcyBDb21wYXRpYmlsaXR5SGVscGVyIHtcbiAgLyoqIFdvcmthcm91bmQgZm9yIFRvdWNoRXZlbnQgY29uc3RydWN0b3Igc2FkbHkgbm90IGJlaW5nIGF2YWlsYWJsZSBvbiBhbGwgYnJvd3NlcnMgKGUuZy4gRmlyZWZveCwgU2FmYXJpKSAqL1xuICBwdWJsaWMgc3RhdGljIGlzVG91Y2hFdmVudChldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCh3aW5kb3cgYXMgYW55KS5Ub3VjaEV2ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKiBEZXRlY3QgcHJlc2VuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIgQVBJICovXG4gIHB1YmxpYyBzdGF0aWMgaXNSZXNpemVPYnNlcnZlckF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHdpbmRvdyBhcyBhbnkpLlJlc2l6ZU9ic2VydmVyICE9PSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIi8qKiBIZWxwZXIgd2l0aCBtYXRoZW1hdGljYWwgZnVuY3Rpb25zICovXG5leHBvcnQgY2xhc3MgTWF0aEhlbHBlciB7XG4gIC8qIFJvdW5kIG51bWJlcnMgdG8gYSBnaXZlbiBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzICovXG4gIHN0YXRpYyByb3VuZFRvUHJlY2lzaW9uTGltaXQodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uTGltaXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICsoIHZhbHVlLnRvUHJlY2lzaW9uKHByZWNpc2lvbkxpbWl0KSApO1xuICB9XG5cbiAgc3RhdGljIGlzTW9kdWxvV2l0aGluUHJlY2lzaW9uTGltaXQodmFsdWU6IG51bWJlciwgbW9kdWxvOiBudW1iZXIsIHByZWNpc2lvbkxpbWl0OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBsaW1pdDogbnVtYmVyID0gTWF0aC5wb3coMTAsIC1wcmVjaXNpb25MaW1pdCk7XG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlICUgbW9kdWxvKSA8PSBsaW1pdCB8fCBNYXRoLmFicyhNYXRoLmFicyh2YWx1ZSAlIG1vZHVsbykgLSBtb2R1bG8pIDw9IGxpbWl0O1xuICB9XG5cbiAgc3RhdGljIGNsYW1wVG9SYW5nZSh2YWx1ZTogbnVtYmVyLCBmbG9vcjogbnVtYmVyLCBjZWlsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgZmxvb3IpLCBjZWlsKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVyIHtcbiAgZXZlbnROYW1lOiBzdHJpbmcgPSBudWxsO1xuICBldmVudHM6IFN1YmplY3Q8RXZlbnQ+ID0gbnVsbDtcbiAgZXZlbnRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICB0ZWFyZG93bkNhbGxiYWNrOiAoKSA9PiB2b2lkID0gbnVsbDtcbn1cbiIsImltcG9ydCB7IFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGhyb3R0bGVUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgZGV0ZWN0UGFzc2l2ZUV2ZW50cyBmcm9tICdkZXRlY3QtcGFzc2l2ZS1ldmVudHMnO1xuXG5pbXBvcnQgeyBFdmVudExpc3RlbmVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lcic7XG5pbXBvcnQgeyBWYWx1ZUhlbHBlciB9IGZyb20gJy4vdmFsdWUtaGVscGVyJztcblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdG8gYXR0YWNoIGV2ZW50IGxpc3RlbmVycyB0byBET00gZWxlbWVudHMgd2l0aCBkZWJvdW5jZSBzdXBwb3J0IHVzaW5nIHJ4anNcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXJIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgfVxuXG4gIHB1YmxpYyBhdHRhY2hQYXNzaXZlRXZlbnRMaXN0ZW5lcihuYXRpdmVFbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IHZvaWQsXG4gICAgICB0aHJvdHRsZUludGVydmFsPzogbnVtYmVyKTogRXZlbnRMaXN0ZW5lciB7XG4gICAgLy8gT25seSB1c2UgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgaXRcbiAgICBpZiAoZGV0ZWN0UGFzc2l2ZUV2ZW50cy5oYXNTdXBwb3J0ICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2hFdmVudExpc3RlbmVyKG5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2ssIHRocm90dGxlSW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIC8vIEFuZ3VsYXIgZG9lc24ndCBzdXBwb3J0IHBhc3NpdmUgZXZlbnQgaGFuZGxlcnMgKHlldCksIHNvIHdlIG5lZWQgdG8gcm9sbCBvdXIgb3duIGNvZGUgdXNpbmcgbmF0aXZlIGZ1bmN0aW9uc1xuICAgIGNvbnN0IGxpc3RlbmVyOiBFdmVudExpc3RlbmVyID0gbmV3IEV2ZW50TGlzdGVuZXIoKTtcbiAgICBsaXN0ZW5lci5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgbGlzdGVuZXIuZXZlbnRzID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBjb25zdCBvYnNlcnZlckNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgbGlzdGVuZXIuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH07XG4gICAgbmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2JzZXJ2ZXJDYWxsYmFjaywge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlfSk7XG5cbiAgICBsaXN0ZW5lci50ZWFyZG93bkNhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgbmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2JzZXJ2ZXJDYWxsYmFjaywge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlfSk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVyLmV2ZW50c1N1YnNjcmlwdGlvbiA9IGxpc3RlbmVyLmV2ZW50c1xuICAgICAgLnBpcGUoKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aHJvdHRsZUludGVydmFsKSlcbiAgICAgICAgPyB0aHJvdHRsZVRpbWUodGhyb3R0bGVJbnRlcnZhbCwgdW5kZWZpbmVkLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlfSlcbiAgICAgICAgOiB0YXAoKCkgPT4ge30pIC8vIG5vLW9wXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cblxuICBwdWJsaWMgZGV0YWNoRXZlbnRMaXN0ZW5lcihldmVudExpc3RlbmVyOiBFdmVudExpc3RlbmVyKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChldmVudExpc3RlbmVyLmV2ZW50c1N1YnNjcmlwdGlvbikpIHtcbiAgICAgIGV2ZW50TGlzdGVuZXIuZXZlbnRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBldmVudExpc3RlbmVyLmV2ZW50c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChldmVudExpc3RlbmVyLmV2ZW50cykpIHtcbiAgICAgIGV2ZW50TGlzdGVuZXIuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgICBldmVudExpc3RlbmVyLmV2ZW50cyA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChldmVudExpc3RlbmVyLnRlYXJkb3duQ2FsbGJhY2spKSB7XG4gICAgICBldmVudExpc3RlbmVyLnRlYXJkb3duQ2FsbGJhY2soKTtcbiAgICAgIGV2ZW50TGlzdGVuZXIudGVhcmRvd25DYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGF0dGFjaEV2ZW50TGlzdGVuZXIobmF0aXZlRWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiB2b2lkLFxuICAgICAgdGhyb3R0bGVJbnRlcnZhbD86IG51bWJlcik6IEV2ZW50TGlzdGVuZXIge1xuICAgIGNvbnN0IGxpc3RlbmVyOiBFdmVudExpc3RlbmVyID0gbmV3IEV2ZW50TGlzdGVuZXIoKTtcbiAgICBsaXN0ZW5lci5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgbGlzdGVuZXIuZXZlbnRzID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBjb25zdCBvYnNlcnZlckNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgbGlzdGVuZXIuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci50ZWFyZG93bkNhbGxiYWNrID0gdGhpcy5yZW5kZXJlci5saXN0ZW4obmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCBvYnNlcnZlckNhbGxiYWNrKTtcblxuICAgIGxpc3RlbmVyLmV2ZW50c1N1YnNjcmlwdGlvbiA9IGxpc3RlbmVyLmV2ZW50c1xuICAgICAgLnBpcGUoKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aHJvdHRsZUludGVydmFsKSlcbiAgICAgICAgICA/IHRocm90dGxlVGltZSh0aHJvdHRsZUludGVydmFsLCB1bmRlZmluZWQsIHsgbGVhZGluZzogdHJ1ZSwgdHJhaWxpbmc6IHRydWV9KVxuICAgICAgICAgIDogdGFwKCgpID0+IHt9KSAvLyBuby1vcFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEV2ZW50KSA9PiB7IGNhbGxiYWNrKGV2ZW50KTsgfSk7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBIb3N0QmluZGluZywgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJIZWxwZXIgfSBmcm9tICcuL2V2ZW50LWxpc3RlbmVyLWhlbHBlcic7XG5pbXBvcnQgeyBFdmVudExpc3RlbmVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lcic7XG5pbXBvcnQgeyBWYWx1ZUhlbHBlciB9IGZyb20gJy4vdmFsdWUtaGVscGVyJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25neFNsaWRlckVsZW1lbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJFbGVtZW50RGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlciA9IDA7XG4gIGdldCBwb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX2RpbWVuc2lvbjogbnVtYmVyID0gMDtcbiAgZ2V0IGRpbWVuc2lvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb247XG4gIH1cblxuICBwcml2YXRlIF9hbHdheXNIaWRlOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBhbHdheXNIaWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbHdheXNIaWRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgfVxuXG4gIHByaXZhdGUgX3NjYWxlOiBudW1iZXIgPSAxO1xuICBnZXQgc2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm9wYWNpdHknKVxuICBvcGFjaXR5OiBudW1iZXIgPSAxO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUudmlzaWJpbGl0eScpXG4gIHZpc2liaWxpdHk6IHN0cmluZyA9ICd2aXNpYmxlJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQnKVxuICBsZWZ0OiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJvdHRvbScpXG4gIGJvdHRvbTogc3RyaW5nID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxuICBoZWlnaHQ6IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICB3aWR0aDogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBldmVudExpc3RlbmVySGVscGVyOiBFdmVudExpc3RlbmVySGVscGVyO1xuICBwcml2YXRlIGV2ZW50TGlzdGVuZXJzOiBFdmVudExpc3RlbmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbVJlZjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5ldmVudExpc3RlbmVySGVscGVyID0gbmV3IEV2ZW50TGlzdGVuZXJIZWxwZXIodGhpcy5yZW5kZXJlcik7XG4gIH1cblxuICBzZXRBbHdheXNIaWRlKGhpZGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9hbHdheXNIaWRlID0gaGlkZTtcbiAgICBpZiAoaGlkZSkge1xuICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMub3BhY2l0eSA9IDA7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFsd2F5c0hpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9wYWNpdHkgPSAxO1xuICB9XG5cbiAgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmFsd2F5c0hpZGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub3BhY2l0eSAhPT0gMDtcbiAgfVxuXG4gIHNldFZlcnRpY2FsKHZlcnRpY2FsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fdmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgICBpZiAodGhpcy5fdmVydGljYWwpIHtcbiAgICAgIHRoaXMubGVmdCA9ICcnO1xuICAgICAgdGhpcy53aWR0aCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvdHRvbSA9ICcnO1xuICAgICAgdGhpcy5oZWlnaHQgPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRTY2FsZShzY2FsZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgfVxuXG4gICAvLyBTZXQgZWxlbWVudCBsZWZ0L3RvcCBwb3NpdGlvbiBkZXBlbmRpbmcgb24gd2hldGhlciBzbGlkZXIgaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICBzZXRQb3NpdGlvbihwb3M6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9wb3NpdGlvbiAhPT0gcG9zICYmICF0aGlzLmlzUmVmRGVzdHJveWVkKCkpIHtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zO1xuICAgIGlmICh0aGlzLl92ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5ib3R0b20gPSBNYXRoLnJvdW5kKHBvcykgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlZnQgPSBNYXRoLnJvdW5kKHBvcykgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBlbGVtZW50J3Mgd2lkdGgvaGVpZ2h0IGRlcGVuZGluZyBvbiB3aGV0aGVyIHNsaWRlciBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIGNhbGN1bGF0ZURpbWVuc2lvbigpOiB2b2lkIHtcbiAgICBjb25zdCB2YWw6IENsaWVudFJlY3QgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICB0aGlzLl9kaW1lbnNpb24gPSAodmFsLmJvdHRvbSAtIHZhbC50b3ApICogdGhpcy5zY2FsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGltZW5zaW9uID0gKHZhbC5yaWdodCAtIHZhbC5sZWZ0KSAqIHRoaXMuc2NhbGU7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IGVsZW1lbnQgd2lkdGgvaGVpZ2h0IGRlcGVuZGluZyBvbiB3aGV0aGVyIHNsaWRlciBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIHNldERpbWVuc2lvbihkaW06IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kaW1lbnNpb24gIT09IGRpbSAmJiAhdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kaW1lbnNpb24gPSBkaW07XG4gICAgaWYgKHRoaXMuX3ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLmhlaWdodCA9IE1hdGgucm91bmQoZGltKSArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2lkdGggPSBNYXRoLnJvdW5kKGRpbSkgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOiBDbGllbnRSZWN0IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiB2b2lkLCBkZWJvdW5jZUludGVydmFsPzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIgPSB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrLCBkZWJvdW5jZUludGVydmFsKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgb25QYXNzaXZlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IHZvaWQsIGRlYm91bmNlSW50ZXJ2YWw/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5hdHRhY2hQYXNzaXZlRXZlbnRMaXN0ZW5lcihcbiAgICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrLCBkZWJvdW5jZUludGVydmFsKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgb2ZmKGV2ZW50TmFtZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBsaXN0ZW5lcnNUb0tlZXA6IEV2ZW50TGlzdGVuZXJbXTtcbiAgICBsZXQgbGlzdGVuZXJzVG9SZW1vdmU6IEV2ZW50TGlzdGVuZXJbXTtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGV2ZW50TmFtZSkpIHtcbiAgICAgIGxpc3RlbmVyc1RvS2VlcCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZmlsdGVyKChldmVudDogRXZlbnRMaXN0ZW5lcikgPT4gZXZlbnQuZXZlbnROYW1lICE9PSBldmVudE5hbWUpO1xuICAgICAgbGlzdGVuZXJzVG9SZW1vdmUgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmZpbHRlcigoZXZlbnQ6IEV2ZW50TGlzdGVuZXIpID0+IGV2ZW50LmV2ZW50TmFtZSA9PT0gZXZlbnROYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdGVuZXJzVG9LZWVwID0gW107XG4gICAgICBsaXN0ZW5lcnNUb1JlbW92ZSA9IHRoaXMuZXZlbnRMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmRldGFjaEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSBsaXN0ZW5lcnNUb0tlZXA7XG4gIH1cblxuICBwcml2YXRlIGlzUmVmRGVzdHJveWVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLmNoYW5nZURldGVjdGlvblJlZikgfHwgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWZbJ2Rlc3Ryb3llZCddO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgSG9zdEJpbmRpbmcsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbGlkZXJFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9zbGlkZXItZWxlbWVudC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmd4U2xpZGVySGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVySGFuZGxlRGlyZWN0aXZlIGV4dGVuZHMgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Mubmd4LXNsaWRlci1hY3RpdmUnKVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHJvbGU6IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpXG4gIHRhYmluZGV4OiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1vcmllbnRhdGlvbicpXG4gIGFyaWFPcmllbnRhdGlvbjogc3RyaW5nID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKVxuICBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsbGVkYnknKVxuICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVub3cnKVxuICBhcmlhVmFsdWVOb3c6IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVldGV4dCcpXG4gIGFyaWFWYWx1ZVRleHQ6IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbWluJylcbiAgYXJpYVZhbHVlTWluOiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW1heCcpXG4gIGFyaWFWYWx1ZU1heDogc3RyaW5nID0gJyc7XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1SZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGNoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtUmVmLCByZW5kZXJlciwgY2hhbmdlRGV0ZWN0aW9uUmVmKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbGlkZXJFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9zbGlkZXItZWxlbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmFsdWVIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWhlbHBlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ3hTbGlkZXJMYWJlbF0nXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlckxhYmVsRGlyZWN0aXZlIGV4dGVuZHMgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtUmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyLCBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbVJlZiwgcmVuZGVyZXIsIGNoYW5nZURldGVjdGlvblJlZik7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHJlY2FsY3VsYXRlRGltZW5zaW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuYWx3YXlzSGlkZSAmJlxuICAgICAgICAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52YWx1ZSkgfHxcbiAgICAgICAgIHRoaXMudmFsdWUubGVuZ3RoICE9PSB2YWx1ZS5sZW5ndGggfHxcbiAgICAgICAgICh0aGlzLnZhbHVlLmxlbmd0aCA+IDAgJiYgdGhpcy5kaW1lbnNpb24gPT09IDApKSkge1xuICAgICAgcmVjYWxjdWxhdGVEaW1lbnNpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWU7XG5cbiAgICAvLyBVcGRhdGUgZGltZW5zaW9uIG9ubHkgd2hlbiBsZW5ndGggb2YgdGhlIGxhYmVsIGhhdmUgY2hhbmdlZFxuICAgIGlmIChyZWNhbGN1bGF0ZURpbWVuc2lvbikge1xuICAgICAgdGhpcy5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIGZvcndhcmRSZWYsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRocm90dGxlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgZGV0ZWN0UGFzc2l2ZUV2ZW50cyBmcm9tICdkZXRlY3QtcGFzc2l2ZS1ldmVudHMnO1xuXG5pbXBvcnQge1xuICBPcHRpb25zLFxuICBMYWJlbFR5cGUsXG4gIFZhbHVlVG9Qb3NpdGlvbkZ1bmN0aW9uLFxuICBQb3NpdGlvblRvVmFsdWVGdW5jdGlvbixcbiAgQ3VzdG9tU3RlcERlZmluaXRpb25cbn0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IFBvaW50ZXJUeXBlIH0gZnJvbSAnLi9wb2ludGVyLXR5cGUnO1xuaW1wb3J0IHsgQ2hhbmdlQ29udGV4dCB9IGZyb20gJy4vY2hhbmdlLWNvbnRleHQnO1xuaW1wb3J0IHsgVmFsdWVIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWhlbHBlcic7XG5pbXBvcnQgeyBDb21wYXRpYmlsaXR5SGVscGVyIH0gZnJvbSAnLi9jb21wYXRpYmlsaXR5LWhlbHBlcic7XG5pbXBvcnQgeyBNYXRoSGVscGVyIH0gZnJvbSAnLi9tYXRoLWhlbHBlcic7XG5pbXBvcnQgeyBFdmVudExpc3RlbmVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lcic7XG5pbXBvcnQgeyBFdmVudExpc3RlbmVySGVscGVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lci1oZWxwZXInO1xuaW1wb3J0IHsgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNsaWRlckhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2xpZGVyTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1sYWJlbC5kaXJlY3RpdmUnO1xuXG4vLyBEZWNsYXJhdGlvbiBmb3IgUmVzaXplT2JzZXJ2ZXIgYSBuZXcgQVBJIGF2YWlsYWJsZSBpbiBzb21lIG9mIG5ld2VzdCBicm93c2Vyczpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXNpemVPYnNlcnZlclxuZGVjbGFyZSBjbGFzcyBSZXNpemVPYnNlcnZlciB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTtcbiAgb2JzZXJ2ZSh0YXJnZXQ6IGFueSk6IHZvaWQ7XG4gIHVub2JzZXJ2ZSh0YXJnZXQ6IGFueSk6IHZvaWQ7XG4gIGRpc2Nvbm5lY3QoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFRpY2sge1xuICBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzdHlsZTogYW55ID0ge307XG4gIHRvb2x0aXA6IHN0cmluZyA9IG51bGw7XG4gIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9IG51bGw7XG4gIHZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICB2YWx1ZVRvb2x0aXA6IHN0cmluZyA9IG51bGw7XG4gIHZhbHVlVG9vbHRpcFBsYWNlbWVudDogc3RyaW5nID0gbnVsbDtcbiAgbGVnZW5kOiBzdHJpbmcgPSBudWxsO1xufVxuXG5jbGFzcyBEcmFnZ2luZyB7XG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICB2YWx1ZTogbnVtYmVyID0gMDtcbiAgZGlmZmVyZW5jZTogbnVtYmVyID0gMDtcbiAgcG9zaXRpb246IG51bWJlciA9IDA7XG4gIGxvd0xpbWl0OiBudW1iZXIgPSAwO1xuICBoaWdoTGltaXQ6IG51bWJlciA9IDA7XG59XG5cbmNsYXNzIE1vZGVsVmFsdWVzIHtcbiAgdmFsdWU6IG51bWJlcjtcbiAgaGlnaFZhbHVlOiBudW1iZXI7XG5cbiAgcHVibGljIHN0YXRpYyBjb21wYXJlKHg/OiBNb2RlbFZhbHVlcywgeT86IE1vZGVsVmFsdWVzKTogYm9vbGVhbiB7XG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHgpICYmIFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh4KSAhPT0gVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHgudmFsdWUgPT09IHkudmFsdWUgJiYgeC5oaWdoVmFsdWUgPT09IHkuaGlnaFZhbHVlO1xuICB9XG59XG5cbmNsYXNzIE1vZGVsQ2hhbmdlIGV4dGVuZHMgTW9kZWxWYWx1ZXMge1xuICAvLyBGbGFnIHVzZWQgdG8gYnktcGFzcyBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpIGZpbHRlciBvbiBpbnB1dCB2YWx1ZXNcbiAgLy8gKHNvbWV0aW1lcyB0aGVyZSBpcyBhIG5lZWQgdG8gcGFzcyB2YWx1ZXMgdGhyb3VnaCBldmVuIHRob3VnaCB0aGUgbW9kZWwgdmFsdWVzIGhhdmUgbm90IGNoYW5nZWQpXG4gIGZvcmNlQ2hhbmdlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBzdGF0aWMgY29tcGFyZSh4PzogTW9kZWxDaGFuZ2UsIHk/OiBNb2RlbENoYW5nZSk6IGJvb2xlYW4ge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh4KSAmJiBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeCkgIT09IFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4LnZhbHVlID09PSB5LnZhbHVlICYmXG4gICAgICAgICAgIHguaGlnaFZhbHVlID09PSB5LmhpZ2hWYWx1ZSAmJlxuICAgICAgICAgICB4LmZvcmNlQ2hhbmdlID09PSB5LmZvcmNlQ2hhbmdlO1xuICB9XG59XG5cbmNsYXNzIElucHV0TW9kZWxDaGFuZ2UgZXh0ZW5kcyBNb2RlbENoYW5nZSB7XG4gIGludGVybmFsQ2hhbmdlOiBib29sZWFuO1xufVxuXG5jbGFzcyBPdXRwdXRNb2RlbENoYW5nZSBleHRlbmRzIE1vZGVsQ2hhbmdlIHtcbiAgdXNlckV2ZW50SW5pdGlhdGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBOR1hfU0xJREVSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlICovXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNsaWRlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2xpZGVyJyxcbiAgdGVtcGxhdGU6IGA8IS0tIC8vIDAgTGVmdCBzZWxlY3Rpb24gYmFyIG91dHNpZGUgdHdvIGhhbmRsZXMgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICNsZWZ0T3V0ZXJTZWxlY3Rpb25CYXIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXItd3JhcHBlciBuZ3gtc2xpZGVyLWxlZnQtb3V0LXNlbGVjdGlvblwiPlxuICA8c3BhbiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhclwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gMSBSaWdodCBzZWxlY3Rpb24gYmFyIG91dHNpZGUgdHdvIGhhbmRsZXMgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICNyaWdodE91dGVyU2VsZWN0aW9uQmFyIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyLXdyYXBwZXIgbmd4LXNsaWRlci1yaWdodC1vdXQtc2VsZWN0aW9uXCI+XG4gIDxzcGFuIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyXCI+PC9zcGFuPlxuPC9zcGFuPlxuPCEtLSAvLyAyIFRoZSB3aG9sZSBzbGlkZXIgYmFyIC0tPlxuPHNwYW4gbmd4U2xpZGVyRWxlbWVudCAjZnVsbEJhciBbY2xhc3Mubmd4LXNsaWRlci10cmFuc3BhcmVudF09XCJmdWxsQmFyVHJhbnNwYXJlbnRDbGFzc1wiIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyLXdyYXBwZXIgbmd4LXNsaWRlci1mdWxsLWJhclwiPlxuICA8c3BhbiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhclwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gMyBTZWxlY3Rpb24gYmFyIGJldHdlZW4gdHdvIGhhbmRsZXMgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICNzZWxlY3Rpb25CYXIgW2NsYXNzLm5neC1zbGlkZXItZHJhZ2dhYmxlXT1cInNlbGVjdGlvbkJhckRyYWdnYWJsZUNsYXNzXCIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXItd3JhcHBlciBuZ3gtc2xpZGVyLXNlbGVjdGlvbi1iYXJcIj5cbiAgPHNwYW4gY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXIgbmd4LXNsaWRlci1zZWxlY3Rpb25cIiBbbmdTdHlsZV09XCJiYXJTdHlsZVwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gNCBMb3cgc2xpZGVyIGhhbmRsZSAtLT5cbjxzcGFuIG5neFNsaWRlckhhbmRsZSAjbWluSGFuZGxlIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItcG9pbnRlciBuZ3gtc2xpZGVyLXBvaW50ZXItbWluXCIgW25nU3R5bGVdPW1pblBvaW50ZXJTdHlsZT48L3NwYW4+XG48IS0tIC8vIDUgSGlnaCBzbGlkZXIgaGFuZGxlIC0tPlxuPHNwYW4gbmd4U2xpZGVySGFuZGxlICNtYXhIYW5kbGUgW3N0eWxlLmRpc3BsYXldPVwicmFuZ2UgPyAnaW5oZXJpdCcgOiAnbm9uZSdcIiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLXBvaW50ZXIgbmd4LXNsaWRlci1wb2ludGVyLW1heFwiIFtuZ1N0eWxlXT1tYXhQb2ludGVyU3R5bGU+PC9zcGFuPlxuPCEtLSAvLyA2IEZsb29yIGxhYmVsIC0tPlxuPHNwYW4gbmd4U2xpZGVyTGFiZWwgI2Zsb29yTGFiZWwgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1idWJibGUgbmd4LXNsaWRlci1saW1pdCBuZ3gtc2xpZGVyLWZsb29yXCI+PC9zcGFuPlxuPCEtLSAvLyA3IENlaWxpbmcgbGFiZWwgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjY2VpbExhYmVsIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYnViYmxlIG5neC1zbGlkZXItbGltaXQgbmd4LXNsaWRlci1jZWlsXCI+PC9zcGFuPlxuPCEtLSAvLyA4IExhYmVsIGFib3ZlIHRoZSBsb3cgc2xpZGVyIGhhbmRsZSAtLT5cbjxzcGFuIG5neFNsaWRlckxhYmVsICNtaW5IYW5kbGVMYWJlbCBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJ1YmJsZSBuZ3gtc2xpZGVyLW1vZGVsLXZhbHVlXCI+PC9zcGFuPlxuPCEtLSAvLyA5IExhYmVsIGFib3ZlIHRoZSBoaWdoIHNsaWRlciBoYW5kbGUgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjbWF4SGFuZGxlTGFiZWwgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1idWJibGUgbmd4LXNsaWRlci1tb2RlbC1oaWdoXCI+PC9zcGFuPlxuPCEtLSAvLyAxMCBDb21iaW5lZCByYW5nZSBsYWJlbCB3aGVuIHRoZSBzbGlkZXIgaGFuZGxlcyBhcmUgY2xvc2UgZXguIDE1IC0gMTcgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjY29tYmluZWRMYWJlbCBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJ1YmJsZSBuZ3gtc2xpZGVyLWNvbWJpbmVkXCI+PC9zcGFuPlxuPCEtLSAvLyAxMSBUaGUgdGlja3MgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICN0aWNrc0VsZW1lbnQgW2hpZGRlbl09XCIhc2hvd1RpY2tzXCIgW2NsYXNzLm5neC1zbGlkZXItdGlja3MtdmFsdWVzLXVuZGVyXT1cInRpY2tzVW5kZXJWYWx1ZXNDbGFzc1wiIGNsYXNzPVwibmd4LXNsaWRlci10aWNrc1wiPlxuICA8c3BhbiAqbmdGb3I9XCJsZXQgdCBvZiB0aWNrc1wiIGNsYXNzPVwibmd4LXNsaWRlci10aWNrXCIgW25nQ2xhc3NdPVwieyduZ3gtc2xpZGVyLXNlbGVjdGVkJzogdC5zZWxlY3RlZH1cIiBbbmdTdHlsZV09XCJ0LnN0eWxlXCI+XG4gICAgPG5neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyIFt0ZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIiBbdG9vbHRpcF09XCJ0LnRvb2x0aXBcIiBbcGxhY2VtZW50XT1cInQudG9vbHRpcFBsYWNlbWVudFwiPjwvbmd4LXNsaWRlci10b29sdGlwLXdyYXBwZXI+XG4gICAgPG5neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyICpuZ0lmPVwidC52YWx1ZSAhPSBudWxsXCIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci10aWNrLXZhbHVlXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiIFt0b29sdGlwXT1cInQudmFsdWVUb29sdGlwXCIgW3BsYWNlbWVudF09XCJ0LnZhbHVlVG9vbHRpcFBsYWNlbWVudFwiIFtjb250ZW50XT1cInQudmFsdWVcIj48L25neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyPlxuICAgIDxzcGFuICpuZ0lmPVwidC5sZWdlbmQgIT0gbnVsbFwiIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItdGljay1sZWdlbmRcIiBbaW5uZXJIVE1MXT1cInQubGVnZW5kXCI+PC9zcGFuPlxuICA8L3NwYW4+XG48L3NwYW4+YCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LXNsaWRlcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6NHB4O3dpZHRoOjEwMCU7bWFyZ2luOjM1cHggMCAxNXB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7dG91Y2gtYWN0aW9uOnBhbi15fTo6bmctZGVlcCAubmd4LXNsaWRlci53aXRoLWxlZ2VuZHttYXJnaW4tYm90dG9tOjQwcHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXXtjdXJzb3I6bm90LWFsbG93ZWR9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXSAubmd4LXNsaWRlci1wb2ludGVye2N1cnNvcjpub3QtYWxsb3dlZDtiYWNrZ3JvdW5kLWNvbG9yOiNkOGUwZjN9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXSAubmd4LXNsaWRlci1kcmFnZ2FibGV7Y3Vyc29yOm5vdC1hbGxvd2VkfTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF0gLm5neC1zbGlkZXItc2VsZWN0aW9ue2JhY2tncm91bmQ6IzhiOTFhMn06Om5nLWRlZXAgLm5neC1zbGlkZXJbZGlzYWJsZWRdIC5uZ3gtc2xpZGVyLXRpY2t7Y3Vyc29yOm5vdC1hbGxvd2VkfTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF0gLm5neC1zbGlkZXItdGljay5uZ3gtc2xpZGVyLXNlbGVjdGVke2JhY2tncm91bmQ6IzhiOTFhMn06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItc3Bhbnt3aGl0ZS1zcGFjZTpub3dyYXA7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTppbmxpbmUtYmxvY2t9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhc2V7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwYWRkaW5nOjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVye2xlZnQ6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7bWFyZ2luLXRvcDotMTZweDtwYWRkaW5nLXRvcDoxNnB4O3dpZHRoOjEwMCU7aGVpZ2h0OjMycHg7ei1pbmRleDoxfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1kcmFnZ2FibGV7Y3Vyc29yOm1vdmV9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhcntsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6NHB4O3otaW5kZXg6MTtiYWNrZ3JvdW5kOiNkOGUwZjM7Ym9yZGVyLXJhZGl1czoycHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVyLm5neC1zbGlkZXItdHJhbnNwYXJlbnQgLm5neC1zbGlkZXItYmFye2JhY2tncm91bmQ6MCAwfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXItd3JhcHBlci5uZ3gtc2xpZGVyLWxlZnQtb3V0LXNlbGVjdGlvbiAubmd4LXNsaWRlci1iYXJ7YmFja2dyb3VuZDojZGYwMDJkfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXItd3JhcHBlci5uZ3gtc2xpZGVyLXJpZ2h0LW91dC1zZWxlY3Rpb24gLm5neC1zbGlkZXItYmFye2JhY2tncm91bmQ6IzAzYTY4OH06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItc2VsZWN0aW9ue3otaW5kZXg6MjtiYWNrZ3JvdW5kOiMwZGI5ZjA7Ym9yZGVyLXJhZGl1czoycHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDt0b3A6LTE0cHg7YmFja2dyb3VuZC1jb2xvcjojMGRiOWYwO3otaW5kZXg6Mztib3JkZXItcmFkaXVzOjE2cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXI6YWZ0ZXJ7Y29udGVudDonJzt3aWR0aDo4cHg7aGVpZ2h0OjhweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTJweDtsZWZ0OjEycHg7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZDojZmZmfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1wb2ludGVyOmhvdmVyOmFmdGVye2JhY2tncm91bmQtY29sb3I6I2ZmZn06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItcG9pbnRlci5uZ3gtc2xpZGVyLWFjdGl2ZXt6LWluZGV4OjR9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXIubmd4LXNsaWRlci1hY3RpdmU6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjojNDUxYWZmfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1idWJibGV7Y3Vyc29yOmRlZmF1bHQ7Ym90dG9tOjE2cHg7cGFkZGluZzoxcHggM3B4O2NvbG9yOiM1NTYzN2Q7Zm9udC1zaXplOjE2cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJ1YmJsZS5uZ3gtc2xpZGVyLWxpbWl0e2NvbG9yOiM1NTYzN2R9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2tze2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6LTNweDttYXJnaW46MDt6LWluZGV4OjE7bGlzdC1zdHlsZTpub25lfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci10aWNrcy12YWx1ZXMtdW5kZXIgLm5neC1zbGlkZXItdGljay12YWx1ZXt0b3A6YXV0bztib3R0b206LTM2cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2t7dGV4dC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweDtiYWNrZ3JvdW5kOiNkOGUwZjM7Ym9yZGVyLXJhZGl1czo1MCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO21hcmdpbi1sZWZ0OjExcHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2submd4LXNsaWRlci1zZWxlY3RlZHtiYWNrZ3JvdW5kOiMwZGI5ZjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2stdmFsdWV7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0zNHB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKX06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItdGljay1sZWdlbmR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjI0cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO21heC13aWR0aDo1MHB4O3doaXRlLXNwYWNlOm5vcm1hbH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWx7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6NHB4O2hlaWdodDoxMDAlO21hcmdpbjowIDIwcHg7cGFkZGluZzowO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO3RvdWNoLWFjdGlvbjpwYW4teH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItYmFzZXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3BhZGRpbmc6MH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItYmFyLXdyYXBwZXJ7dG9wOmF1dG87bGVmdDowO21hcmdpbjowIDAgMCAtMTZweDtwYWRkaW5nOjAgMCAwIDE2cHg7aGVpZ2h0OjEwMCU7d2lkdGg6MzJweH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItYmFye2JvdHRvbTowO2xlZnQ6YXV0bzt3aWR0aDo0cHg7aGVpZ2h0OjEwMCV9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXBvaW50ZXJ7bGVmdDotMTRweCFpbXBvcnRhbnQ7dG9wOmF1dG87Ym90dG9tOjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLWJ1YmJsZXtsZWZ0OjE2cHghaW1wb3J0YW50O2JvdHRvbTowfTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci10aWNrc3toZWlnaHQ6MTAwJTt3aWR0aDowO2xlZnQ6LTNweDt0b3A6MDt6LWluZGV4OjF9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXRpY2t7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXRvcDoxMXB4fTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci10aWNrLXZhbHVle2xlZnQ6MjRweDt0b3A6YXV0bzstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoMCwtMjglKTt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI4JSl9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXRpY2stbGVnZW5ke3RvcDphdXRvO3JpZ2h0OjI0cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI4JSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLC0yOCUpO21heC13aWR0aDpub25lO3doaXRlLXNwYWNlOm5vd3JhcH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItdGlja3MtdmFsdWVzLXVuZGVyIC5uZ3gtc2xpZGVyLXRpY2stdmFsdWV7Ym90dG9tOmF1dG87bGVmdDphdXRvO3JpZ2h0OjI0cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyICp7dHJhbnNpdGlvbjpub25lfTo6bmctZGVlcCAubmd4LXNsaWRlci5hbmltYXRlIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVye3RyYW5zaXRpb246LjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1zZWxlY3Rpb257dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItcG9pbnRlcnt0cmFuc2l0aW9uOi4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItYnViYmxle3RyYW5zaXRpb246LjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1idWJibGUubmd4LXNsaWRlci1saW1pdHt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1idWJibGUubmd4LXNsaWRlci1jb21iaW5lZHt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci10aWNre3RyYW5zaXRpb246YmFja2dyb3VuZC1jb2xvciAuM3MgbGluZWFyfWBdLFxuICBob3N0OiB7IGNsYXNzOiAnbmd4LXNsaWRlcicgfSxcbiAgcHJvdmlkZXJzOiBbTkdYX1NMSURFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vIE1vZGVsIGZvciBsb3cgdmFsdWUgb2Ygc2xpZGVyLiBGb3Igc2ltcGxlIHNsaWRlciwgdGhpcyBpcyB0aGUgb25seSBpbnB1dC4gRm9yIHJhbmdlIHNsaWRlciwgdGhpcyBpcyB0aGUgbG93IHZhbHVlLlxuICBASW5wdXQoKVxuICBwdWJsaWMgdmFsdWU6IG51bWJlciA9IG51bGw7XG4gIC8vIE91dHB1dCBmb3IgbG93IHZhbHVlIHNsaWRlciB0byBzdXBwb3J0IHR3by13YXkgYmluZGluZ3NcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gTW9kZWwgZm9yIGhpZ2ggdmFsdWUgb2Ygc2xpZGVyLiBOb3QgdXNlZCBpbiBzaW1wbGUgc2xpZGVyLiBGb3IgcmFuZ2Ugc2xpZGVyLCB0aGlzIGlzIHRoZSBoaWdoIHZhbHVlLlxuICBASW5wdXQoKVxuICBwdWJsaWMgaGlnaFZhbHVlOiBudW1iZXIgPSBudWxsO1xuICAvLyBPdXRwdXQgZm9yIGhpZ2ggdmFsdWUgc2xpZGVyIHRvIHN1cHBvcnQgdHdvLXdheSBiaW5kaW5nc1xuICBAT3V0cHV0KClcbiAgcHVibGljIGhpZ2hWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gQW4gb2JqZWN0IHdpdGggYWxsIHRoZSBvdGhlciBvcHRpb25zIG9mIHRoZSBzbGlkZXIuXG4gIC8vIEVhY2ggb3B0aW9uIGNhbiBiZSB1cGRhdGVkIGF0IHJ1bnRpbWUgYW5kIHRoZSBzbGlkZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHJlLXJlbmRlcmVkLlxuICBASW5wdXQoKVxuICBwdWJsaWMgb3B0aW9uczogT3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG5cbiAgLy8gRXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc3RhcnRzIGludGVyYWN0aW9uIHdpdGggdGhlIHNsaWRlclxuICBAT3V0cHV0KClcbiAgcHVibGljIHVzZXJDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPENoYW5nZUNvbnRleHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIEV2ZW50IGVtaXR0ZWQgb24gZWFjaCBjaGFuZ2UgY29taW5nIGZyb20gdXNlciBpbnRlcmFjdGlvblxuICBAT3V0cHV0KClcbiAgcHVibGljIHVzZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDaGFuZ2VDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvLyBFdmVudCBlbWl0dGVkIHdoZW4gdXNlciBmaW5pc2hlcyBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzbGlkZXJcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB1c2VyQ2hhbmdlRW5kOiBFdmVudEVtaXR0ZXI8Q2hhbmdlQ29udGV4dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBtYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uOiBhbnk7XG4gIC8vIElucHV0IGV2ZW50IHRoYXQgdHJpZ2dlcnMgc2xpZGVyIHJlZnJlc2ggKHJlLXBvc2l0aW9uaW5nIG9mIHNsaWRlciBlbGVtZW50cylcbiAgQElucHV0KCkgc2V0IG1hbnVhbFJlZnJlc2gobWFudWFsUmVmcmVzaDogRXZlbnRFbWl0dGVyPHZvaWQ+KSB7XG4gICAgdGhpcy51bnN1YnNjcmliZU1hbnVhbFJlZnJlc2goKTtcblxuICAgIHRoaXMubWFudWFsUmVmcmVzaFN1YnNjcmlwdGlvbiA9IG1hbnVhbFJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9uc0FuZERldGVjdENoYW5nZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbjogYW55O1xuICAvLyBJbnB1dCBldmVudCB0aGF0IHRyaWdnZXJzIHNldHRpbmcgZm9jdXMgb24gZ2l2ZW4gc2xpZGVyIGhhbmRsZVxuICBASW5wdXQoKSBzZXQgdHJpZ2dlckZvY3VzKHRyaWdnZXJGb2N1czogRXZlbnRFbWl0dGVyPHZvaWQ+KSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRyaWdnZXJGb2N1cygpO1xuXG4gICAgdGhpcy50cmlnZ2VyRm9jdXNTdWJzY3JpcHRpb24gPSB0cmlnZ2VyRm9jdXMuc3Vic2NyaWJlKChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUpID0+IHtcbiAgICAgIHRoaXMuZm9jdXNQb2ludGVyKHBvaW50ZXJUeXBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciB0eXBlLCB0cnVlIG1lYW5zIHJhbmdlIHNsaWRlclxuICBwdWJsaWMgZ2V0IHJhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52YWx1ZSkgJiYgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuaGlnaFZhbHVlKTtcbiAgfVxuXG4gIC8vIFNldCB0byB0cnVlIGlmIGluaXQgbWV0aG9kIGFscmVhZHkgZXhlY3V0ZWRcbiAgcHJpdmF0ZSBpbml0SGFzUnVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gQ2hhbmdlcyBpbiBtb2RlbCBpbnB1dHMgYXJlIHBhc3NlZCB0aHJvdWdoIHRoaXMgc3ViamVjdFxuICAvLyBUaGVzZSBhcmUgYWxsIGNoYW5nZXMgY29taW5nIGluIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50IHRocm91Z2ggaW5wdXQgYmluZGluZ3Mgb3IgcmVhY3RpdmUgZm9ybSBpbnB1dHNcbiAgcHJpdmF0ZSBpbnB1dE1vZGVsQ2hhbmdlU3ViamVjdDogU3ViamVjdDxJbnB1dE1vZGVsQ2hhbmdlPiA9IG5ldyBTdWJqZWN0PElucHV0TW9kZWxDaGFuZ2U+KCk7XG4gIHByaXZhdGUgaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICAvLyBDaGFuZ2VzIHRvIG1vZGVsIG91dHB1dHMgYXJlIHBhc3NlZCB0aHJvdWdoIHRoaXMgc3ViamVjdFxuICAvLyBUaGVzZSBhcmUgYWxsIGNoYW5nZXMgdGhhdCBuZWVkIHRvIGJlIGNvbW11bmljYXRlZCB0byBvdXRwdXQgZW1pdHRlcnMgYW5kIHJlZ2lzdGVyZWQgY2FsbGJhY2tzXG4gIHByaXZhdGUgb3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0OiBTdWJqZWN0PE91dHB1dE1vZGVsQ2hhbmdlPiA9IG5ldyBTdWJqZWN0PE91dHB1dE1vZGVsQ2hhbmdlPigpO1xuICBwcml2YXRlIG91dHB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG4gIC8vIExvdyB2YWx1ZSBzeW5jZWQgdG8gbW9kZWwgbG93IHZhbHVlXG4gIHByaXZhdGUgdmlld0xvd1ZhbHVlOiBudW1iZXIgPSBudWxsO1xuICAvLyBIaWdoIHZhbHVlIHN5bmNlZCB0byBtb2RlbCBoaWdoIHZhbHVlXG4gIHByaXZhdGUgdmlld0hpZ2hWYWx1ZTogbnVtYmVyID0gbnVsbDtcbiAgLy8gT3B0aW9ucyBzeW5jZWQgdG8gbW9kZWwgb3B0aW9ucywgYmFzZWQgb24gZGVmYXVsdHNcbiAgcHJpdmF0ZSB2aWV3T3B0aW9uczogT3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG5cbiAgLy8gSGFsZiBvZiB0aGUgd2lkdGggb3IgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgaGFuZGxlc1xuICBwcml2YXRlIGhhbmRsZUhhbGZEaW1lbnNpb246IG51bWJlciA9IDA7XG4gIC8vIE1heGltdW0gcG9zaXRpb24gdGhlIHNsaWRlciBoYW5kbGUgY2FuIGhhdmVcbiAgcHJpdmF0ZSBtYXhIYW5kbGVQb3NpdGlvbjogbnVtYmVyID0gMDtcblxuICAvLyBXaGljaCBoYW5kbGUgaXMgY3VycmVudGx5IHRyYWNrZWQgZm9yIG1vdmUgZXZlbnRzXG4gIHByaXZhdGUgY3VycmVudFRyYWNraW5nUG9pbnRlcjogUG9pbnRlclR5cGUgPSBudWxsO1xuICAvLyBJbnRlcm5hbCB2YXJpYWJsZSB0byBrZWVwIHRyYWNrIG9mIHRoZSBmb2N1cyBlbGVtZW50XG4gIHByaXZhdGUgY3VycmVudEZvY3VzUG9pbnRlcjogUG9pbnRlclR5cGUgPSBudWxsO1xuICAvLyBVc2VkIHRvIGNhbGwgb25TdGFydCBvbiB0aGUgZmlyc3Qga2V5ZG93biBldmVudFxuICBwcml2YXRlIGZpcnN0S2V5RG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBDdXJyZW50IHRvdWNoIGlkIG9mIHRvdWNoIGV2ZW50IGJlaW5nIGhhbmRsZWRcbiAgcHJpdmF0ZSB0b3VjaElkOiBudW1iZXIgPSBudWxsO1xuICAvLyBWYWx1ZXMgcmVjb3JkZWQgd2hlbiBmaXJzdCBkcmFnZ2luZyB0aGUgYmFyXG4gIHByaXZhdGUgZHJhZ2dpbmc6IERyYWdnaW5nID0gbmV3IERyYWdnaW5nKCk7XG5cbiAgLyogU2xpZGVyIERPTSBlbGVtZW50cyAqL1xuXG4gIC8vIExlZnQgc2VsZWN0aW9uIGJhciBvdXRzaWRlIHR3byBoYW5kbGVzXG4gIEBWaWV3Q2hpbGQoJ2xlZnRPdXRlclNlbGVjdGlvbkJhcicsIHtyZWFkOiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBsZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIFJpZ2h0IHNlbGVjdGlvbiBiYXIgb3V0c2lkZSB0d28gaGFuZGxlc1xuICBAVmlld0NoaWxkKCdyaWdodE91dGVyU2VsZWN0aW9uQmFyJywge3JlYWQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmV9KVxuICBwcml2YXRlIHJpZ2h0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIFRoZSB3aG9sZSBzbGlkZXIgYmFyXG4gIEBWaWV3Q2hpbGQoJ2Z1bGxCYXInLCB7cmVhZDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgZnVsbEJhckVsZW1lbnQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmU7XG5cbiAgLy8gSGlnaGxpZ2h0IGJldHdlZW4gdHdvIGhhbmRsZXNcbiAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uQmFyJywge3JlYWQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmV9KVxuICBwcml2YXRlIHNlbGVjdGlvbkJhckVsZW1lbnQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmU7XG5cbiAgLy8gTGVmdCBzbGlkZXIgaGFuZGxlXG4gIEBWaWV3Q2hpbGQoJ21pbkhhbmRsZScsIHtyZWFkOiBTbGlkZXJIYW5kbGVEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1pbkhhbmRsZUVsZW1lbnQ6IFNsaWRlckhhbmRsZURpcmVjdGl2ZTtcblxuICAvLyBSaWdodCBzbGlkZXIgaGFuZGxlXG4gIEBWaWV3Q2hpbGQoJ21heEhhbmRsZScsIHtyZWFkOiBTbGlkZXJIYW5kbGVEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1heEhhbmRsZUVsZW1lbnQ6IFNsaWRlckhhbmRsZURpcmVjdGl2ZTtcblxuICAvLyBGbG9vciBsYWJlbFxuICBAVmlld0NoaWxkKCdmbG9vckxhYmVsJywge3JlYWQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBmbG9vckxhYmVsRWxlbWVudDogU2xpZGVyTGFiZWxEaXJlY3RpdmU7XG5cbiAgLy8gQ2VpbGluZyBsYWJlbFxuICBAVmlld0NoaWxkKCdjZWlsTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIGNlaWxMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIExhYmVsIGFib3ZlIHRoZSBsb3cgdmFsdWVcbiAgQFZpZXdDaGlsZCgnbWluSGFuZGxlTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1pbkhhbmRsZUxhYmVsRWxlbWVudDogU2xpZGVyTGFiZWxEaXJlY3RpdmU7XG5cbiAgLy8gTGFiZWwgYWJvdmUgdGhlIGhpZ2ggdmFsdWVcbiAgQFZpZXdDaGlsZCgnbWF4SGFuZGxlTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1heEhhbmRsZUxhYmVsRWxlbWVudDogU2xpZGVyTGFiZWxEaXJlY3RpdmU7XG5cbiAgLy8gQ29tYmluZWQgbGFiZWxcbiAgQFZpZXdDaGlsZCgnY29tYmluZWRMYWJlbCcsIHtyZWFkOiBTbGlkZXJMYWJlbERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgY29tYmluZWRMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIFRoZSB0aWNrc1xuICBAVmlld0NoaWxkKCd0aWNrc0VsZW1lbnQnLCB7cmVhZDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgdGlja3NFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIE9wdGlvbmFsIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgZGlzcGxheWluZyB0b29sdGlwc1xuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKVxuICBwdWJsaWMgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8vIEhvc3QgZWxlbWVudCBjbGFzcyBiaW5kaW5nc1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZlcnRpY2FsJylcbiAgcHVibGljIHNsaWRlckVsZW1lbnRWZXJ0aWNhbENsYXNzOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZScpXG4gIHB1YmxpYyBzbGlkZXJFbGVtZW50QW5pbWF0ZUNsYXNzOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3Mud2l0aC1sZWdlbmQnKVxuICBwdWJsaWMgc2xpZGVyRWxlbWVudFdpdGhMZWdlbmRDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKVxuICBwdWJsaWMgc2xpZGVyRWxlbWVudERpc2FibGVkQXR0cjogc3RyaW5nID0gbnVsbDtcblxuICAvLyBDU1Mgc3R5bGVzIGFuZCBjbGFzcyBmbGFnc1xuICBwdWJsaWMgYmFyU3R5bGU6IGFueSA9IHt9O1xuICBwdWJsaWMgbWluUG9pbnRlclN0eWxlOiBhbnkgPSB7fTtcbiAgcHVibGljIG1heFBvaW50ZXJTdHlsZTogYW55ID0ge307XG4gIHB1YmxpYyBmdWxsQmFyVHJhbnNwYXJlbnRDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2VsZWN0aW9uQmFyRHJhZ2dhYmxlQ2xhc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHRpY2tzVW5kZXJWYWx1ZXNDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIFdoZXRoZXIgdG8gc2hvdy9oaWRlIHRpY2tzXG4gIHB1YmxpYyBnZXQgc2hvd1RpY2tzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcztcbiAgfVxuXG4gIC8qIElmIHRpY2tTdGVwIGlzIHNldCBvciB0aWNrc0FycmF5IGlzIHNwZWNpZmllZC5cbiAgICAgSW4gdGhpcyBjYXNlLCB0aWNrcyB2YWx1ZXMgc2hvdWxkIGJlIGRpc3BsYXllZCBiZWxvdyB0aGUgc2xpZGVyLiAqL1xuICBwcml2YXRlIGludGVybWVkaWF0ZVRpY2tzOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRpY2tzIGFycmF5IGFzIGRpc3BsYXllZCBpbiB2aWV3XG4gIHB1YmxpYyB0aWNrczogVGlja1tdID0gW107XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lckhlbHBlcjogRXZlbnRMaXN0ZW5lckhlbHBlciA9IG51bGw7XG4gIHByaXZhdGUgb25Nb3ZlRXZlbnRMaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gIHByaXZhdGUgb25FbmRFdmVudExpc3RlbmVyOiBFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgLy8gV2hldGhlciBjdXJyZW50bHkgbW92aW5nIHRoZSBzbGlkZXIgKGJldHdlZW4gb25TdGFydCgpIGFuZCBvbkVuZCgpKVxuICBwcml2YXRlIG1vdmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIE9ic2VydmVyIGZvciBzbGlkZXIgZWxlbWVudCByZXNpemUgZXZlbnRzXG4gIHByaXZhdGUgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyID0gbnVsbDtcblxuICAvLyBDYWxsYmFja3MgZm9yIHJlYWN0aXZlIGZvcm1zIHN1cHBvcnRcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSBudWxsO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gbnVsbDtcblxuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlciA9IG5ldyBFdmVudExpc3RlbmVySGVscGVyKHRoaXMucmVuZGVyZXIpO1xuICB9XG5cbiAgLy8gT25Jbml0IGludGVyZmFjZVxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3T3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnZpZXdPcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgLy8gV2UgbmVlZCB0byBydW4gdGhlc2UgdHdvIHRoaW5ncyBmaXJzdCwgYmVmb3JlIHRoZSByZXN0IG9mIHRoZSBpbml0IGluIG5nQWZ0ZXJWaWV3SW5pdCgpLFxuICAgIC8vIGJlY2F1c2UgdGhlc2UgdHdvIHNldHRpbmdzIGFyZSBzZXQgdGhyb3VnaCBASG9zdEJpbmRpbmcgYW5kIEFuZ3VsYXIgY2hhbmdlIGRldGVjdGlvblxuICAgIC8vIG1lY2hhbmlzbSBkb2Vzbid0IGxpa2UgdGhlbSBjaGFuZ2luZyBpbiBuZ0FmdGVyVmlld0luaXQoKVxuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlVmVydGljYWxTdGF0ZSgpO1xuICB9XG5cbiAgLy8gQWZ0ZXJWaWV3SW5pdCBpbnRlcmZhY2VcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCh0aGlzLnZpZXdPcHRpb25zLmlucHV0RXZlbnRzSW50ZXJ2YWwpO1xuICAgIHRoaXMuc3Vic2NyaWJlT3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0KHRoaXMudmlld09wdGlvbnMub3V0cHV0RXZlbnRzSW50ZXJ2YWwpO1xuXG4gICAgLy8gT25jZSB3ZSBhcHBseSBvcHRpb25zLCB3ZSBuZWVkIHRvIG5vcm1hbGlzZSBtb2RlbCB2YWx1ZXMgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5yZW5vcm1hbGlzZU1vZGVsVmFsdWVzKCk7XG5cbiAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IHRoaXMubW9kZWxWYWx1ZVRvVmlld1ZhbHVlKHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZSh0aGlzLmhpZ2hWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVWZXJ0aWNhbFN0YXRlKCk7IC8vIG5lZWQgdG8gcnVuIHRoaXMgYWdhaW4gdG8gY292ZXIgY2hhbmdlcyB0byBzbGlkZXIgZWxlbWVudHNcbiAgICB0aGlzLm1hbmFnZUVsZW1lbnRzU3R5bGUoKTtcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKCk7XG4gICAgdGhpcy5hZGRBY2Nlc3NpYmlsaXR5KCk7XG4gICAgdGhpcy51cGRhdGVDZWlsTGFiZWwoKTtcbiAgICB0aGlzLnVwZGF0ZUZsb29yTGFiZWwoKTtcbiAgICB0aGlzLmluaXRIYW5kbGVzKCk7XG4gICAgdGhpcy5tYW5hZ2VFdmVudHNCaW5kaW5ncygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVSZXNpemVPYnNlcnZlcigpO1xuXG4gICAgdGhpcy5pbml0SGFzUnVuID0gdHJ1ZTtcblxuICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5IHRvIHJlc29sdmUgc29tZSBpc3N1ZXMgd2hlbiBpbml0IHByb2NlZHVyZSBjaGFuZ2VzIHZhbHVlcyB1c2VkIGluIHRoZSB2aWV3XG4gICAgaWYgKCF0aGlzLmlzUmVmRGVzdHJveWVkKCkpIHtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBPbkNoYW5nZXMgaW50ZXJmYWNlXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gQWx3YXlzIGFwcGx5IG9wdGlvbnMgZmlyc3RcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGNoYW5nZXMub3B0aW9ucykpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgLy8gVGhlbiB2YWx1ZSBjaGFuZ2VzXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChjaGFuZ2VzLnZhbHVlKSB8fFxuICAgICAgICAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoY2hhbmdlcy5oaWdoVmFsdWUpKSB7XG4gICAgICB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0Lm5leHQoe1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgICAgZm9yY2VDaGFuZ2U6IGZhbHNlLFxuICAgICAgICBpbnRlcm5hbENoYW5nZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE9uRGVzdHJveSBpbnRlcmZhY2VcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG5cbiAgICB0aGlzLnVuc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlT3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk7XG4gICAgdGhpcy51bnN1YnNjcmliZU1hbnVhbFJlZnJlc2goKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVHJpZ2dlckZvY3VzKCk7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBvYmpbMF07XG4gICAgICB0aGlzLmhpZ2hWYWx1ZSA9IG9ialsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IG9iajtcbiAgICB9XG5cbiAgICAvLyBuZ09uQ2hhbmdlcygpIGlzIG5vdCBjYWxsZWQgaW4gdGhpcyBpbnN0YW5jZSwgc28gd2UgbmVlZCB0byBjb21tdW5pY2F0ZSB0aGUgY2hhbmdlIG1hbnVhbGx5XG4gICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZSxcbiAgICAgIGludGVybmFsQ2hhbmdlOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKG9uQ2hhbmdlQ2FsbGJhY2s6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IG9uQ2hhbmdlQ2FsbGJhY2s7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKG9uVG91Y2hlZENhbGxiYWNrOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gb25Ub3VjaGVkQ2FsbGJhY2s7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9uc0FuZERldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QoaW50ZXJ2YWw/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0XG4gICAgLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChNb2RlbENoYW5nZS5jb21wYXJlKSxcbiAgICAgIC8vIEhhY2sgdG8gcmVzZXQgdGhlIHN0YXR1cyBvZiB0aGUgZGlzdGluY3RVbnRpbENoYW5nZWQoKSAtIGlmIGEgXCJmYWtlXCIgZXZlbnQgY29tZXMgdGhyb3VnaCB3aXRoIGZvcmNlQ2hhbmdlPXRydWUsXG4gICAgICAvLyB3ZSBmb3JjZWZ1bGx5IGJ5LXBhc3MgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgYnV0IG90aGVyd2lzZSBkcm9wIHRoZSBldmVudFxuICAgICAgZmlsdGVyKChtb2RlbENoYW5nZTogSW5wdXRNb2RlbENoYW5nZSkgPT4gIW1vZGVsQ2hhbmdlLmZvcmNlQ2hhbmdlICYmICFtb2RlbENoYW5nZS5pbnRlcm5hbENoYW5nZSksXG4gICAgICAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGludGVydmFsKSlcbiAgICAgICAgICA/IHRocm90dGxlVGltZShpbnRlcnZhbCwgdW5kZWZpbmVkLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlfSlcbiAgICAgICAgICA6IHRhcCgoKSA9PiB7fSkgLy8gbm8tb3BcbiAgICApXG4gICAgLnN1YnNjcmliZSgobW9kZWxDaGFuZ2U6IElucHV0TW9kZWxDaGFuZ2UpID0+IHRoaXMuYXBwbHlJbnB1dE1vZGVsQ2hhbmdlKG1vZGVsQ2hhbmdlKSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZU91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdChpbnRlcnZhbD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKE1vZGVsQ2hhbmdlLmNvbXBhcmUpLFxuICAgICAgICAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGludGVydmFsKSlcbiAgICAgICAgICA/IHRocm90dGxlVGltZShpbnRlcnZhbCwgdW5kZWZpbmVkLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlfSlcbiAgICAgICAgICA6IHRhcCgoKSA9PiB7fSkgLy8gbm8tb3BcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG1vZGVsQ2hhbmdlOiBPdXRwdXRNb2RlbENoYW5nZSkgPT4gdGhpcy5wdWJsaXNoT3V0cHV0TW9kZWxDaGFuZ2UobW9kZWxDaGFuZ2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNSZXNpemVPYnNlcnZlckF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpOiB2b2lkID0+IHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnNBbmREZXRlY3RDaGFuZ2VzKCkpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNSZXNpemVPYnNlcnZlckF2YWlsYWJsZSgpICYmIHRoaXMucmVzaXplT2JzZXJ2ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZU9uTW92ZSgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25Nb3ZlRXZlbnRMaXN0ZW5lcikpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5kZXRhY2hFdmVudExpc3RlbmVyKHRoaXMub25Nb3ZlRXZlbnRMaXN0ZW5lcik7XG4gICAgICB0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVPbkVuZCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25FbmRFdmVudExpc3RlbmVyKSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmRldGFjaEV2ZW50TGlzdGVuZXIodGhpcy5vbkVuZEV2ZW50TGlzdGVuZXIpO1xuICAgICAgdGhpcy5vbkVuZEV2ZW50TGlzdGVuZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlT3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVNYW51YWxSZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5tYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uKSkge1xuICAgICAgdGhpcy5tYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm1hbnVhbFJlZnJlc2hTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUcmlnZ2VyRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMudHJpZ2dlckZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQb2ludGVyRWxlbWVudChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUpOiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUge1xuICAgIGlmIChwb2ludGVyVHlwZSA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW5IYW5kbGVFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAocG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgcmV0dXJuIHRoaXMubWF4SGFuZGxlRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldEN1cnJlbnRUcmFja2luZ1ZhbHVlKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3TG93VmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld0hpZ2hWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1vZGVsVmFsdWVUb1ZpZXdWYWx1ZShtb2RlbFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChtb2RlbFZhbHVlKSkge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSkgJiYgIXRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgcmV0dXJuIFZhbHVlSGVscGVyLmZpbmRTdGVwSW5kZXgoK21vZGVsVmFsdWUsIHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSk7XG4gICAgfVxuICAgIHJldHVybiArbW9kZWxWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdmlld1ZhbHVlVG9Nb2RlbFZhbHVlKHZpZXdWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSkgJiYgIXRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RlcFZhbHVlKHZpZXdWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3VmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGdldFN0ZXBWYWx1ZShzbGlkZXJWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBzdGVwOiBDdXN0b21TdGVwRGVmaW5pdGlvbiA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVtzbGlkZXJWYWx1ZV07XG4gICAgcmV0dXJuICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoc3RlcCkpID8gc3RlcC52YWx1ZSA6IE5hTjtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlWaWV3Q2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnZpZXdWYWx1ZVRvTW9kZWxWYWx1ZSh0aGlzLnZpZXdMb3dWYWx1ZSk7XG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMuaGlnaFZhbHVlID0gdGhpcy52aWV3VmFsdWVUb01vZGVsVmFsdWUodGhpcy52aWV3SGlnaFZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgIHVzZXJFdmVudEluaXRpYXRlZDogdHJ1ZSxcbiAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gQXQgdGhpcyBwb2ludCBhbGwgY2hhbmdlcyBhcmUgYXBwbGllZCBhbmQgb3V0cHV0cyBhcmUgZW1pdHRlZCwgc28gd2Ugc2hvdWxkIGJlIGRvbmUuXG4gICAgLy8gSG93ZXZlciwgaW5wdXQgY2hhbmdlcyBhcmUgY29tbXVuaWNhdGVkIGluIGRpZmZlcmVudCBzdHJlYW0gYW5kIHdlIG5lZWQgdG8gYmUgcmVhZHkgdG9cbiAgICAvLyBhY3Qgb24gdGhlIG5leHQgaW5wdXQgY2hhbmdlIGV2ZW4gaWYgaXQgaXMgZXhhY3RseSB0aGUgc2FtZSBhcyBsYXN0IGlucHV0IGNoYW5nZS5cbiAgICAvLyBUaGVyZWZvcmUsIHdlIHNlbmQgYSBzcGVjaWFsIGV2ZW50IHRvIHJlc2V0IHRoZSBzdHJlYW0uXG4gICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZSxcbiAgICAgIGludGVybmFsQ2hhbmdlOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvLyBBcHBseSBtb2RlbCBjaGFuZ2UgdG8gdGhlIHNsaWRlciB2aWV3XG4gIHByaXZhdGUgYXBwbHlJbnB1dE1vZGVsQ2hhbmdlKG1vZGVsQ2hhbmdlOiBJbnB1dE1vZGVsQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3Qgbm9ybWFsaXNlZE1vZGVsQ2hhbmdlOiBNb2RlbFZhbHVlcyA9IHRoaXMubm9ybWFsaXNlTW9kZWxWYWx1ZXMobW9kZWxDaGFuZ2UpO1xuXG4gICAgLy8gSWYgbm9ybWFsaXNlZCBtb2RlbCBjaGFuZ2UgaXMgZGlmZmVyZW50LCBhcHBseSB0aGUgY2hhbmdlIHRvIHRoZSBtb2RlbCB2YWx1ZXNcbiAgICBjb25zdCBub3JtYWxpc2F0aW9uQ2hhbmdlOiBib29sZWFuID0gIU1vZGVsVmFsdWVzLmNvbXBhcmUobW9kZWxDaGFuZ2UsIG5vcm1hbGlzZWRNb2RlbENoYW5nZSk7XG4gICAgaWYgKG5vcm1hbGlzYXRpb25DaGFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBub3JtYWxpc2VkTW9kZWxDaGFuZ2UudmFsdWU7XG4gICAgICB0aGlzLmhpZ2hWYWx1ZSA9IG5vcm1hbGlzZWRNb2RlbENoYW5nZS5oaWdoVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3TG93VmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZShub3JtYWxpc2VkTW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZShub3JtYWxpc2VkTW9kZWxDaGFuZ2UuaGlnaFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxvd0hhbmRsZSh0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdMb3dWYWx1ZSkpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUhpZ2hIYW5kbGUodGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3SGlnaFZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQmFyKCk7XG4gICAgdGhpcy51cGRhdGVUaWNrc1NjYWxlKCk7XG4gICAgdGhpcy51cGRhdGVBcmlhQXR0cmlidXRlcygpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbWJpbmVkTGFiZWwoKTtcbiAgICB9XG5cbiAgICAvLyBBdCB0aGUgZW5kLCB3ZSBuZWVkIHRvIGNvbW11bmljYXRlIHRoZSBtb2RlbCBjaGFuZ2UgdG8gdGhlIG91dHB1dHMgYXMgd2VsbFxuICAgIC8vIE5vcm1hbGlzYXRpb24gY2hhbmdlcyBhcmUgYWxzbyBhbHdheXMgZm9yY2VkIG91dCB0byBlbnN1cmUgdGhhdCBzdWJzY3JpYmVycyBhbHdheXMgZW5kIHVwIGluIGNvcnJlY3Qgc3RhdGVcbiAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiBub3JtYWxpc2VkTW9kZWxDaGFuZ2UudmFsdWUsXG4gICAgICBoaWdoVmFsdWU6IG5vcm1hbGlzZWRNb2RlbENoYW5nZS5oaWdoVmFsdWUsXG4gICAgICBmb3JjZUNoYW5nZTogbm9ybWFsaXNhdGlvbkNoYW5nZSxcbiAgICAgIHVzZXJFdmVudEluaXRpYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2ggbW9kZWwgY2hhbmdlIHRvIG91dHB1dCBldmVudCBlbWl0dGVycyBhbmQgcmVnaXN0ZXJlZCBjYWxsYmFja3NcbiAgcHJpdmF0ZSBwdWJsaXNoT3V0cHV0TW9kZWxDaGFuZ2UobW9kZWxDaGFuZ2U6IE91dHB1dE1vZGVsQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgZW1pdE91dHB1dHM6ICgpID0+IHZvaWQgPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5oaWdoVmFsdWVDaGFuZ2UuZW1pdChtb2RlbENoYW5nZS5oaWdoVmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25DaGFuZ2VDYWxsYmFjaykpIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soW21vZGVsQ2hhbmdlLnZhbHVlLCBtb2RlbENoYW5nZS5oaWdoVmFsdWVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sobW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25Ub3VjaGVkQ2FsbGJhY2spKSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayhbbW9kZWxDaGFuZ2UudmFsdWUsIG1vZGVsQ2hhbmdlLmhpZ2hWYWx1ZV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sobW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChtb2RlbENoYW5nZS51c2VyRXZlbnRJbml0aWF0ZWQpIHtcbiAgICAgIC8vIElmIHRoaXMgY2hhbmdlIHdhcyBpbml0aWF0ZWQgYnkgYSB1c2VyIGV2ZW50LCB3ZSBjYW4gZW1pdCBvdXRwdXRzIGluIHRoZSBzYW1lIHRpY2tcbiAgICAgIGVtaXRPdXRwdXRzKCk7XG4gICAgICB0aGlzLnVzZXJDaGFuZ2UuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJ1dCwgaWYgdGhlIGNoYW5nZSB3YXMgaW5pdGF0ZWQgYnkgc29tZXRoaW5nIGVsc2UgbGlrZSBhIGNoYW5nZSBpbiBpbnB1dCBiaW5kaW5ncyxcbiAgICAgIC8vIHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBuZXh0IHRpY2sgdG8gZW1pdCB0aGUgb3V0cHV0cyB0byBrZWVwIEFuZ3VsYXIgY2hhbmdlIGRldGVjdGlvbiBoYXBweVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGVtaXRPdXRwdXRzKCk7IH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9ybWFsaXNlTW9kZWxWYWx1ZXMoaW5wdXQ6IE1vZGVsVmFsdWVzKTogTW9kZWxWYWx1ZXMge1xuICAgIGNvbnN0IG5vcm1hbGlzZWRJbnB1dDogTW9kZWxWYWx1ZXMgPSBuZXcgTW9kZWxWYWx1ZXMoKTtcbiAgICBub3JtYWxpc2VkSW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICBub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlID0gaW5wdXQuaGlnaFZhbHVlO1xuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpKSB7XG4gICAgICAvLyBXaGVuIHVzaW5nIHN0ZXBzIGFycmF5LCBvbmx5IHJvdW5kIHRvIG5lYXJlc3Qgc3RlcCBpbiB0aGUgYXJyYXlcbiAgICAgIC8vIE5vIG90aGVyIGVuZm9yY2VtZW50IGNhbiBiZSBkb25lLCBhcyB0aGUgc3RlcCBhcnJheSBtYXkgYmUgb3V0IG9mIG9yZGVyLCBhbmQgdGhhdCBpcyBwZXJmZWN0bHkgZmluZVxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuZW5mb3JjZVN0ZXBzQXJyYXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVJbmRleDogbnVtYmVyID0gVmFsdWVIZWxwZXIuZmluZFN0ZXBJbmRleChub3JtYWxpc2VkSW5wdXQudmFsdWUsIHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSk7XG4gICAgICAgIG5vcm1hbGlzZWRJbnB1dC52YWx1ZSA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVt2YWx1ZUluZGV4XS52YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICAgIGNvbnN0IGhpZ2hWYWx1ZUluZGV4OiBudW1iZXIgPSBWYWx1ZUhlbHBlci5maW5kU3RlcEluZGV4KG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUsIHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSk7XG4gICAgICAgICAgbm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZSA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVtoaWdoVmFsdWVJbmRleF0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGlzZWRJbnB1dDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5lbmZvcmNlU3RlcCkge1xuICAgICAgbm9ybWFsaXNlZElucHV0LnZhbHVlID0gdGhpcy5yb3VuZFN0ZXAobm9ybWFsaXNlZElucHV0LnZhbHVlKTtcbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUgPSB0aGlzLnJvdW5kU3RlcChub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5lbmZvcmNlUmFuZ2UpIHtcbiAgICAgIG5vcm1hbGlzZWRJbnB1dC52YWx1ZSA9IE1hdGhIZWxwZXIuY2xhbXBUb1JhbmdlKG5vcm1hbGlzZWRJbnB1dC52YWx1ZSwgdGhpcy52aWV3T3B0aW9ucy5mbG9vciwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKTtcblxuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgbm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZSA9IE1hdGhIZWxwZXIuY2xhbXBUb1JhbmdlKG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUsIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHJhbmdlIHNsaWRlciBpbnZhcmlhbnQgKHZhbHVlIDw9IGhpZ2hWYWx1ZSkgaXMgYWx3YXlzIHNhdGlzZmllZFxuICAgICAgaWYgKHRoaXMucmFuZ2UgJiYgaW5wdXQudmFsdWUgPiBpbnB1dC5oaWdoVmFsdWUpIHtcbiAgICAgICAgLy8gV2Uga25vdyB0aGF0IGJvdGggdmFsdWVzIGFyZSBub3cgY2xhbXBlZCBjb3JyZWN0bHksIHRoZXkgbWF5IGp1c3QgYmUgaW4gdGhlIHdyb25nIG9yZGVyXG4gICAgICAgIC8vIFNvIHRoZSBlYXN5IHNvbHV0aW9uIGlzIHRvIHN3YXAgdGhlbS4uLiBleGNlcHQgc3dhcHBpbmcgaXMgc29tZXRpbWVzIGRpc2FibGVkIGluIG9wdGlvbnMsIHNvIHdlIG1ha2UgdGhlIHR3byB2YWx1ZXMgdGhlIHNhbWVcbiAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMubm9Td2l0Y2hpbmcpIHtcbiAgICAgICAgICBub3JtYWxpc2VkSW5wdXQudmFsdWUgPSBub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHRlbXBWYWx1ZTogbnVtYmVyID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgbm9ybWFsaXNlZElucHV0LnZhbHVlID0gaW5wdXQuaGlnaFZhbHVlO1xuICAgICAgICAgIG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUgPSB0ZW1wVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXNlZElucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSByZW5vcm1hbGlzZU1vZGVsVmFsdWVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzTW9kZWxWYWx1ZXM6IE1vZGVsVmFsdWVzID0ge1xuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBoaWdoVmFsdWU6IHRoaXMuaGlnaFZhbHVlXG4gICAgfTtcbiAgICBjb25zdCBub3JtYWxpc2VkTW9kZWxWYWx1ZXM6IE1vZGVsVmFsdWVzID0gdGhpcy5ub3JtYWxpc2VNb2RlbFZhbHVlcyhwcmV2aW91c01vZGVsVmFsdWVzKTtcbiAgICBpZiAoIU1vZGVsVmFsdWVzLmNvbXBhcmUobm9ybWFsaXNlZE1vZGVsVmFsdWVzLCBwcmV2aW91c01vZGVsVmFsdWVzKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IG5vcm1hbGlzZWRNb2RlbFZhbHVlcy52YWx1ZTtcbiAgICAgIHRoaXMuaGlnaFZhbHVlID0gbm9ybWFsaXNlZE1vZGVsVmFsdWVzLmhpZ2hWYWx1ZTtcblxuICAgICAgdGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YmplY3QubmV4dCh7XG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBoaWdoVmFsdWU6IHRoaXMuaGlnaFZhbHVlLFxuICAgICAgICBmb3JjZUNoYW5nZTogdHJ1ZSxcbiAgICAgICAgdXNlckV2ZW50SW5pdGlhdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluaXRIYXNSdW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c0lucHV0RXZlbnRzSW50ZXJ2YWw6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuaW5wdXRFdmVudHNJbnRlcnZhbDtcbiAgICBjb25zdCBwcmV2aW91c091dHB1dEV2ZW50c0ludGVydmFsOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLm91dHB1dEV2ZW50c0ludGVydmFsO1xuXG4gICAgY29uc3QgcHJldmlvdXNPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzOiBib29sZWFuW10gPSB0aGlzLmdldE9wdGlvbnNJbmZsdWVuY2luZ0V2ZW50QmluZGluZ3ModGhpcy52aWV3T3B0aW9ucyk7XG5cbiAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuXG4gICAgY29uc3QgbmV3T3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5nczogYm9vbGVhbltdID0gdGhpcy5nZXRPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKHRoaXMudmlld09wdGlvbnMpO1xuICAgIC8vIEF2b2lkIHJlLWJpbmRpbmcgZXZlbnRzIGluIGNhc2Ugbm90aGluZyBjaGFuZ2VzIHRoYXQgY2FuIGluZmx1ZW5jZSBpdFxuICAgIC8vIEl0IG1ha2VzIGl0IHBvc3NpYmxlIHRvIGNoYW5nZSBvcHRpb25zIHdoaWxlIGRyYWdnaW5nIHRoZSBzbGlkZXJcbiAgICBjb25zdCByZWJpbmRFdmVudHM6IGJvb2xlYW4gPSAhVmFsdWVIZWxwZXIuYXJlQXJyYXlzRXF1YWwocHJldmlvdXNPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzLCBuZXdPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKTtcblxuICAgIGlmIChwcmV2aW91c0lucHV0RXZlbnRzSW50ZXJ2YWwgIT09IHRoaXMudmlld09wdGlvbnMuaW5wdXRFdmVudHNJbnRlcnZhbCkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZUlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk7XG4gICAgICB0aGlzLnN1YnNjcmliZUlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0KHRoaXMudmlld09wdGlvbnMuaW5wdXRFdmVudHNJbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzT3V0cHV0RXZlbnRzSW50ZXJ2YWwgIT09IHRoaXMudmlld09wdGlvbnMub3V0cHV0RXZlbnRzSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCh0aGlzLnZpZXdPcHRpb25zLm91dHB1dEV2ZW50c0ludGVydmFsKTtcbiAgICB9XG5cbiAgICAvLyBXaXRoIG5ldyBvcHRpb25zLCB3ZSBuZWVkIHRvIHJlLW5vcm1hbGlzZSBtb2RlbCB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAgdGhpcy5yZW5vcm1hbGlzZU1vZGVsVmFsdWVzKCk7XG5cbiAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IHRoaXMubW9kZWxWYWx1ZVRvVmlld1ZhbHVlKHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZSh0aGlzLmhpZ2hWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFNsaWRlcihyZWJpbmRFdmVudHMpO1xuICB9XG5cbiAgLy8gUmVhZCB0aGUgdXNlciBvcHRpb25zIGFuZCBhcHBseSB0aGVtIHRvIHRoZSBzbGlkZXIgbW9kZWxcbiAgcHJpdmF0ZSBhcHBseU9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3T3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnZpZXdPcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZSA9IHRoaXMucmFuZ2UgJiYgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZTtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSA9IHRoaXMucmFuZ2UgJiYgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHk7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2VPbmx5KSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcyA9IHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzIHx8XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrc1ZhbHVlcyB8fFxuICAgICAgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja3NBcnJheSk7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzICYmXG4gICAgICAgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tTdGVwKSB8fCAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrc0FycmF5KSkpIHtcbiAgICAgIHRoaXMuaW50ZXJtZWRpYXRlVGlja3MgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhciA9IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhciB8fFxuICAgICAgdGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRW5kIHx8XG4gICAgICAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlKTtcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5KSkge1xuICAgICAgdGhpcy5hcHBseVN0ZXBzQXJyYXlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwbHlGbG9vckNlaWxPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuY29tYmluZUxhYmVscykpIHtcbiAgICAgIHRoaXMudmlld09wdGlvbnMuY29tYmluZUxhYmVscyA9IChtaW5WYWx1ZTogc3RyaW5nLCBtYXhWYWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIG1pblZhbHVlICsgJyAtICcgKyBtYXhWYWx1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMubG9nU2NhbGUgJiYgdGhpcy52aWV3T3B0aW9ucy5mbG9vciA9PT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NhblxcJ3QgdXNlIGZsb29yPTAgd2l0aCBsb2dhcml0aG1pYyBzY2FsZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTdGVwc0FycmF5T3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmZsb29yID0gMDtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmNlaWwgPSB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkubGVuZ3RoIC0gMTtcbiAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSAxO1xuXG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKSkge1xuICAgICAgdGhpcy52aWV3T3B0aW9ucy50cmFuc2xhdGUgPSAobW9kZWxWYWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodGhpcy5nZXRTdGVwVmFsdWUobW9kZWxWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcobW9kZWxWYWx1ZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlGbG9vckNlaWxPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXApKSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSArdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuc3RlcCA8PSAwKSB7XG4gICAgICAgIHRoaXMudmlld09wdGlvbnMuc3RlcCA9IDE7XG4gICAgIH1cbiAgICB9XG5cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5jZWlsKSB8fFxuICAgICAgICBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmZsb29yKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ2Zsb29yIGFuZCBjZWlsIG9wdGlvbnMgbXVzdCBiZSBzdXBwbGllZCcpO1xuICAgIH1cbiAgICB0aGlzLnZpZXdPcHRpb25zLmNlaWwgPSArdGhpcy52aWV3T3B0aW9ucy5jZWlsO1xuICAgIHRoaXMudmlld09wdGlvbnMuZmxvb3IgPSArdGhpcy52aWV3T3B0aW9ucy5mbG9vcjtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRyYW5zbGF0ZSkpIHtcbiAgICAgIHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXNldHMgc2xpZGVyXG4gIHByaXZhdGUgcmVzZXRTbGlkZXIocmViaW5kRXZlbnRzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMubWFuYWdlRWxlbWVudHNTdHlsZSgpO1xuICAgIHRoaXMuYWRkQWNjZXNzaWJpbGl0eSgpO1xuICAgIHRoaXMudXBkYXRlQ2VpbExhYmVsKCk7XG4gICAgdGhpcy51cGRhdGVGbG9vckxhYmVsKCk7XG4gICAgaWYgKHJlYmluZEV2ZW50cykge1xuICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICAgIHRoaXMubWFuYWdlRXZlbnRzQmluZGluZ3MoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpO1xuICAgIHRoaXMucmVmb2N1c1BvaW50ZXJJZk5lZWRlZCgpO1xuICB9XG5cbiAgLy8gU2V0cyBmb2N1cyBvbiB0aGUgc3BlY2lmaWVkIHBvaW50ZXJcbiAgcHJpdmF0ZSBmb2N1c1BvaW50ZXIocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKTogdm9pZCB7XG4gICAgLy8gSWYgbm90IHN1cHBsaWVkLCB1c2UgbWluIHBvaW50ZXIgYXMgZGVmYXVsdFxuICAgIGlmIChwb2ludGVyVHlwZSAhPT0gUG9pbnRlclR5cGUuTWluICYmIHBvaW50ZXJUeXBlICE9PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHBvaW50ZXJUeXBlID0gUG9pbnRlclR5cGUuTWluO1xuICAgIH1cblxuICAgIGlmIChwb2ludGVyVHlwZSA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2UgJiYgcG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZvY3VzUG9pbnRlcklmTmVlZGVkKCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyKSkge1xuICAgICAgdGhpcy5vblBvaW50ZXJGb2N1cyh0aGlzLmN1cnJlbnRGb2N1c1BvaW50ZXIpO1xuICAgICAgY29uc3QgZWxlbWVudDogU2xpZGVySGFuZGxlRGlyZWN0aXZlID0gdGhpcy5nZXRQb2ludGVyRWxlbWVudCh0aGlzLmN1cnJlbnRGb2N1c1BvaW50ZXIpO1xuICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBlYWNoIGVsZW1lbnRzIHN0eWxlIGJhc2VkIG9uIG9wdGlvbnNcbiAgcHJpdmF0ZSBtYW5hZ2VFbGVtZW50c1N0eWxlKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU2NhbGUoKTtcblxuICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZSh0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrc1ZhbHVlcyB8fCB0aGlzLnZpZXdPcHRpb25zLmhpZGVMaW1pdExhYmVscyk7XG4gICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNldEFsd2F5c0hpZGUodGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3NWYWx1ZXMgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlTGltaXRMYWJlbHMpO1xuXG4gICAgY29uc3QgaGlkZUxhYmVsc0ZvclRpY2tzOiBib29sZWFuID0gdGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3NWYWx1ZXMgJiYgIXRoaXMuaW50ZXJtZWRpYXRlVGlja3M7XG4gICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZShoaWRlTGFiZWxzRm9yVGlja3MgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscyk7XG4gICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZShoaWRlTGFiZWxzRm9yVGlja3MgfHwgIXRoaXMucmFuZ2UgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscyk7XG4gICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zZXRBbHdheXNIaWRlKGhpZGVMYWJlbHNGb3JUaWNrcyB8fCAhdGhpcy5yYW5nZSB8fCB0aGlzLnZpZXdPcHRpb25zLmhpZGVQb2ludGVyTGFiZWxzKTtcbiAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuc2V0QWx3YXlzSGlkZSghdGhpcy5yYW5nZSAmJiAhdGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyKTtcbiAgICB0aGlzLmxlZnRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0QWx3YXlzSGlkZSghdGhpcy5yYW5nZSB8fCAhdGhpcy52aWV3T3B0aW9ucy5zaG93T3V0ZXJTZWxlY3Rpb25CYXJzKTtcbiAgICB0aGlzLnJpZ2h0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldEFsd2F5c0hpZGUoIXRoaXMucmFuZ2UgfHwgIXRoaXMudmlld09wdGlvbnMuc2hvd091dGVyU2VsZWN0aW9uQmFycyk7XG5cbiAgICB0aGlzLmZ1bGxCYXJUcmFuc3BhcmVudENsYXNzID0gdGhpcy5yYW5nZSAmJiB0aGlzLnZpZXdPcHRpb25zLnNob3dPdXRlclNlbGVjdGlvbkJhcnM7XG4gICAgdGhpcy5zZWxlY3Rpb25CYXJEcmFnZ2FibGVDbGFzcyA9IHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2UgJiYgIXRoaXMudmlld09wdGlvbnMub25seUJpbmRIYW5kbGVzO1xuICAgIHRoaXMudGlja3NVbmRlclZhbHVlc0NsYXNzID0gdGhpcy5pbnRlcm1lZGlhdGVUaWNrcyAmJiB0aGlzLm9wdGlvbnMuc2hvd1RpY2tzVmFsdWVzO1xuXG4gICAgaWYgKHRoaXMuc2xpZGVyRWxlbWVudFZlcnRpY2FsQ2xhc3MgIT09IHRoaXMudmlld09wdGlvbnMudmVydGljYWwpIHtcbiAgICAgIHRoaXMudXBkYXRlVmVydGljYWxTdGF0ZSgpO1xuICAgICAgLy8gVGhlIGFib3ZlIGNoYW5nZSBpbiBob3N0IGNvbXBvbmVudCBjbGFzcyB3aWxsIG5vdCBiZSBhcHBsaWVkIHVudGlsIHRoZSBlbmQgb2YgdGhpcyBjeWNsZVxuICAgICAgLy8gSG93ZXZlciwgZnVuY3Rpb25zIGNhbGN1bGF0aW5nIHRoZSBzbGlkZXIgcG9zaXRpb24gZXhwZWN0IHRoZSBzbGlkZXIgdG8gYmUgYWxyZWFkeSBzdHlsZWQgYXMgdmVydGljYWxcbiAgICAgIC8vIFNvIGFzIGEgd29ya2Fyb3VuZCwgd2UgbmVlZCB0byByZXNldCB0aGUgc2xpZGVyIG9uY2UgYWdhaW4gdG8gY29tcHV0ZSB0aGUgY29ycmVjdCB2YWx1ZXNcbiAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4geyB0aGlzLnJlc2V0U2xpZGVyKCk7IH0pO1xuICAgIH1cblxuICAgIC8vIENoYW5naW5nIGFuaW1hdGUgY2xhc3MgbWF5IGludGVyZmVyZSB3aXRoIHNsaWRlciByZXNldC9pbml0aWFsaXNhdGlvbiwgc28gd2Ugc2hvdWxkIHNldCBpdCBzZXBhcmF0ZWx5LFxuICAgIC8vIGFmdGVyIGFsbCBpcyBwcm9wZXJseSBzZXQgdXBcbiAgICBpZiAodGhpcy5zbGlkZXJFbGVtZW50QW5pbWF0ZUNsYXNzICE9PSB0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4geyB0aGlzLnNsaWRlckVsZW1lbnRBbmltYXRlQ2xhc3MgPSB0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGU7IH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1hbmFnZSB0aGUgZXZlbnRzIGJpbmRpbmdzIGJhc2VkIG9uIHJlYWRPbmx5IGFuZCBkaXNhYmxlZCBvcHRpb25zXG4gIHByaXZhdGUgbWFuYWdlRXZlbnRzQmluZGluZ3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQgfHwgdGhpcy52aWV3T3B0aW9ucy5yZWFkT25seSkge1xuICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHRoZSBkaXNhYmxlZCBzdGF0ZSBiYXNlZCBvbiBkaXNhYmxlZCBvcHRpb25cbiAgcHJpdmF0ZSB1cGRhdGVEaXNhYmxlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVyRWxlbWVudERpc2FibGVkQXR0ciA9IHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogbnVsbDtcbiAgfVxuXG4gIC8vIFNldCB2ZXJ0aWNhbCBzdGF0ZSBiYXNlZCBvbiB2ZXJ0aWNhbCBvcHRpb25cbiAgcHJpdmF0ZSB1cGRhdGVWZXJ0aWNhbFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVyRWxlbWVudFZlcnRpY2FsQ2xhc3MgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLmdldEFsbFNsaWRlckVsZW1lbnRzKCkpIHtcbiAgICAgIC8vIFRoaXMgaXMgYWxzbyBjYWxsZWQgYmVmb3JlIG5nQWZ0ZXJJbml0LCBzbyBuZWVkIHRvIGNoZWNrIHRoYXQgdmlldyBjaGlsZCBiaW5kaW5ncyB3b3JrXG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0VmVydGljYWwodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTY2FsZSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5nZXRBbGxTbGlkZXJFbGVtZW50cygpKSB7XG4gICAgICBlbGVtZW50LnNldFNjYWxlKHRoaXMudmlld09wdGlvbnMuc2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsU2xpZGVyRWxlbWVudHMoKTogU2xpZGVyRWxlbWVudERpcmVjdGl2ZVtdIHtcbiAgICByZXR1cm4gW3RoaXMubGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudCxcbiAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQsXG4gICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LFxuICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LFxuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LFxuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LFxuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudCxcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudCxcbiAgICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LFxuICAgICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQsXG4gICAgICB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LFxuICAgICAgdGhpcy50aWNrc0VsZW1lbnRcbiAgICBdO1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6ZSBzbGlkZXIgaGFuZGxlcyBwb3NpdGlvbnMgYW5kIGxhYmVsc1xuICAvLyBSdW4gb25seSBvbmNlIGR1cmluZyBpbml0aWFsaXphdGlvbiBhbmQgZXZlcnkgdGltZSB2aWV3IHBvcnQgY2hhbmdlcyBzaXplXG4gIHByaXZhdGUgaW5pdEhhbmRsZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVMb3dIYW5kbGUodGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3TG93VmFsdWUpKTtcblxuICAgIC8qXG4gICB0aGUgb3JkZXIgaGVyZSBpcyBpbXBvcnRhbnQgc2luY2UgdGhlIHNlbGVjdGlvbiBiYXIgc2hvdWxkIGJlXG4gICB1cGRhdGVkIGFmdGVyIHRoZSBoaWdoIGhhbmRsZSBidXQgYmVmb3JlIHRoZSBjb21iaW5lZCBsYWJlbFxuICAgKi9cbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVIaWdoSGFuZGxlKHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0hpZ2hWYWx1ZSkpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQmFyKCk7XG5cbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDb21iaW5lZExhYmVsKCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVUaWNrc1NjYWxlKCk7XG4gIH1cblxuICAvLyBBZGRzIGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlcywgcnVuIG9ubHkgb25jZSBkdXJpbmcgaW5pdGlhbGl6YXRpb25cbiAgcHJpdmF0ZSBhZGRBY2Nlc3NpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcblxuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5yb2xlID0gJ3NsaWRlcic7XG5cbiAgICBpZiAoIHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0ICYmXG4gICAgICAhKHRoaXMudmlld09wdGlvbnMucmVhZE9ubHkgfHwgdGhpcy52aWV3T3B0aW9ucy5kaXNhYmxlZCkgKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQudGFiaW5kZXggPSAnMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC50YWJpbmRleCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhT3JpZW50YXRpb24gPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWwpKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYUxhYmVsID0gdGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWw7XG4gICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxsZWRCeSkpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhTGFiZWxsZWRCeSA9IHRoaXMudmlld09wdGlvbnMuYXJpYUxhYmVsbGVkQnk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5yb2xlID0gJ3NsaWRlcic7XG5cbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmtleWJvYXJkU3VwcG9ydCAmJlxuICAgICAgICAhKHRoaXMudmlld09wdGlvbnMucmVhZE9ubHkgfHwgdGhpcy52aWV3T3B0aW9ucy5kaXNhYmxlZCkpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LnRhYmluZGV4ID0gJzAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LnRhYmluZGV4ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhT3JpZW50YXRpb24gPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcblxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbEhpZ2gpKSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhTGFiZWwgPSB0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbEhpZ2g7XG4gICAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbGxlZEJ5SGlnaCkpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFyaWFMYWJlbGxlZEJ5ID0gdGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxsZWRCeUhpZ2g7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlcyBhcmlhIGF0dHJpYnV0ZXMgYWNjb3JkaW5nIHRvIGN1cnJlbnQgdmFsdWVzXG4gIHByaXZhdGUgdXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU5vdyA9ICgrdGhpcy52YWx1ZSkudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlVGV4dCA9IHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKCt0aGlzLnZhbHVlLCBMYWJlbFR5cGUuTG93KTtcbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTWluID0gdGhpcy52aWV3T3B0aW9ucy5mbG9vci50b1N0cmluZygpO1xuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhVmFsdWVNYXggPSB0aGlzLnZpZXdPcHRpb25zLmNlaWwudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTm93ID0gKCt0aGlzLmhpZ2hWYWx1ZSkudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhVmFsdWVUZXh0ID0gdGhpcy52aWV3T3B0aW9ucy50cmFuc2xhdGUoK3RoaXMuaGlnaFZhbHVlLCBMYWJlbFR5cGUuSGlnaCk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTWluID0gdGhpcy52aWV3T3B0aW9ucy5mbG9vci50b1N0cmluZygpO1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU1heCA9IHRoaXMudmlld09wdGlvbnMuY2VpbC50b1N0cmluZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBkaW1lbnNpb25zIHRoYXQgYXJlIGRlcGVuZGVudCBvbiB2aWV3IHBvcnQgc2l6ZVxuICAvLyBSdW4gb25jZSBkdXJpbmcgaW5pdGlhbGl6YXRpb24gYW5kIGV2ZXJ5IHRpbWUgdmlldyBwb3J0IGNoYW5nZXMgc2l6ZS5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuaGFuZGxlRGltZW5zaW9uKSkge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LnNldERpbWVuc2lvbih0aGlzLnZpZXdPcHRpb25zLmhhbmRsZURpbWVuc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVXaWR0aDogbnVtYmVyID0gdGhpcy5taW5IYW5kbGVFbGVtZW50LmRpbWVuc2lvbjtcblxuICAgIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbiA9IGhhbmRsZVdpZHRoIC8gMjtcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5iYXJEaW1lbnNpb24pKSB7XG4gICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LnNldERpbWVuc2lvbih0aGlzLnZpZXdPcHRpb25zLmJhckRpbWVuc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXhIYW5kbGVQb3NpdGlvbiA9IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gaGFuZGxlV2lkdGg7XG5cbiAgICBpZiAodGhpcy5pbml0SGFzUnVuKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZsb29yTGFiZWwoKTtcbiAgICAgIHRoaXMudXBkYXRlQ2VpbExhYmVsKCk7XG4gICAgICB0aGlzLmluaXRIYW5kbGVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVWaWV3RGltZW5zaW9uc0FuZERldGVjdENoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpO1xuICAgIGlmICghdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHNsaWRlciByZWZlcmVuY2UgaXMgYWxyZWFkeSBkZXN0cm95ZWRcbiAgICogQHJldHVybnMgYm9vbGVhbiAtIHRydWUgaWYgcmVmIGlzIGRlc3Ryb3llZFxuICAgKi9cbiAgcHJpdmF0ZSBpc1JlZkRlc3Ryb3llZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWZbJ2Rlc3Ryb3llZCddO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB0aWNrcyBwb3NpdGlvblxuICBwcml2YXRlIHVwZGF0ZVRpY2tzU2NhbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuc2xpZGVyRWxlbWVudFdpdGhMZWdlbmRDbGFzcyA9IGZhbHNlOyB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aWNrc0FycmF5OiBudW1iZXJbXSA9ICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzQXJyYXkpXG4gICAgICA/IHRoaXMudmlld09wdGlvbnMudGlja3NBcnJheVxuICAgICAgOiB0aGlzLmdldFRpY2tzQXJyYXkoKTtcbiAgICBjb25zdCB0cmFuc2xhdGU6IHN0cmluZyA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWwgPyAndHJhbnNsYXRlWScgOiAndHJhbnNsYXRlWCc7XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgdGlja3NBcnJheS5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGlja1ZhbHVlU3RlcDogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1ZhbHVlU3RlcCkgPyB0aGlzLnZpZXdPcHRpb25zLnRpY2tWYWx1ZVN0ZXAgOlxuICAgICAgICAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1N0ZXApID8gdGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCA6IHRoaXMudmlld09wdGlvbnMuc3RlcCk7XG5cbiAgICBsZXQgaGFzQXRMZWFzdE9uZUxlZ2VuZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3QgbmV3VGlja3M6IFRpY2tbXSA9IHRpY2tzQXJyYXkubWFwKCh2YWx1ZTogbnVtYmVyKTogVGljayA9PiB7XG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlciA9IHRoaXMudmFsdWVUb1Bvc2l0aW9uKHZhbHVlKTtcblxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMudmVydGljYWwpIHtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLm1heEhhbmRsZVBvc2l0aW9uIC0gcG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zbGF0aW9uOiBzdHJpbmcgPSB0cmFuc2xhdGUgKyAnKCcgKyBNYXRoLnJvdW5kKHBvc2l0aW9uKSArICdweCknO1xuICAgICAgY29uc3QgdGljazogVGljayA9IG5ldyBUaWNrKCk7XG4gICAgICB0aWNrLnNlbGVjdGVkID0gdGhpcy5pc1RpY2tTZWxlY3RlZCh2YWx1ZSk7XG4gICAgICB0aWNrLnN0eWxlID0ge1xuICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiB0cmFuc2xhdGlvbixcbiAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogdHJhbnNsYXRpb24sXG4gICAgICAgICctby10cmFuc2Zvcm0nOiB0cmFuc2xhdGlvbixcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiB0cmFuc2xhdGlvbixcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGlvbixcbiAgICAgIH07XG4gICAgICBpZiAodGljay5zZWxlY3RlZCAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcikpIHtcbiAgICAgICAgdGljay5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdGhpcy5nZXRTZWxlY3Rpb25CYXJDb2xvcigpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aWNrLnNlbGVjdGVkICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFRpY2tDb2xvcikpIHtcbiAgICAgICAgdGljay5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdGhpcy5nZXRUaWNrQ29sb3IodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzVG9vbHRpcCkpIHtcbiAgICAgICAgdGljay50b29sdGlwID0gdGhpcy52aWV3T3B0aW9ucy50aWNrc1Rvb2x0aXAodmFsdWUpO1xuICAgICAgICB0aWNrLnRvb2x0aXBQbGFjZW1lbnQgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3JpZ2h0JyA6ICd0b3AnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzVmFsdWVzICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aWNrVmFsdWVTdGVwKSAmJlxuICAgICAgICAgIE1hdGhIZWxwZXIuaXNNb2R1bG9XaXRoaW5QcmVjaXNpb25MaW1pdCh2YWx1ZSwgdGlja1ZhbHVlU3RlcCwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCkpIHtcbiAgICAgICAgdGljay52YWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKHZhbHVlLCBMYWJlbFR5cGUuVGlja1ZhbHVlKTtcbiAgICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzVmFsdWVzVG9vbHRpcCkpIHtcbiAgICAgICAgICB0aWNrLnZhbHVlVG9vbHRpcCA9IHRoaXMudmlld09wdGlvbnMudGlja3NWYWx1ZXNUb29sdGlwKHZhbHVlKTtcbiAgICAgICAgICB0aWNrLnZhbHVlVG9vbHRpcFBsYWNlbWVudCA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWxcbiAgICAgICAgICAgID8gJ3JpZ2h0J1xuICAgICAgICAgICAgOiAndG9wJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgbGVnZW5kOiBzdHJpbmcgPSBudWxsO1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpKSB7XG4gICAgICAgIGNvbnN0IHN0ZXA6IEN1c3RvbVN0ZXBEZWZpbml0aW9uID0gdGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5W3ZhbHVlXTtcbiAgICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFN0ZXBMZWdlbmQpKSB7XG4gICAgICAgICAgbGVnZW5kID0gdGhpcy52aWV3T3B0aW9ucy5nZXRTdGVwTGVnZW5kKHN0ZXApO1xuICAgICAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChzdGVwKSkge1xuICAgICAgICAgIGxlZ2VuZCA9IHN0ZXAubGVnZW5kO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldExlZ2VuZCkpIHtcbiAgICAgICAgbGVnZW5kID0gdGhpcy52aWV3T3B0aW9ucy5nZXRMZWdlbmQodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChsZWdlbmQpKSB7XG4gICAgICAgIHRpY2subGVnZW5kID0gbGVnZW5kO1xuICAgICAgICBoYXNBdExlYXN0T25lTGVnZW5kID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRpY2s7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zbGlkZXJFbGVtZW50V2l0aExlZ2VuZENsYXNzID0gaGFzQXRMZWFzdE9uZUxlZ2VuZDsgfSk7XG5cbiAgICAvLyBXZSBzaG91bGQgYXZvaWQgcmUtY3JlYXRpbmcgdGhlIHRpY2tzIGFycmF5IGlmIHBvc3NpYmxlXG4gICAgLy8gVGhpcyBib3RoIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBtYWtlcyBDU1MgYW5pbWF0aW9ucyB3b3JrIGNvcnJlY3RseVxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy50aWNrcykgJiYgdGhpcy50aWNrcy5sZW5ndGggPT09IG5ld1RpY2tzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSAgPCBuZXdUaWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMudGlja3NbaV0sIG5ld1RpY2tzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aWNrcyA9IG5ld1RpY2tzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaWNrc0FycmF5KCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBzdGVwOiBudW1iZXIgPSAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1N0ZXApKSA/IHRoaXMudmlld09wdGlvbnMudGlja1N0ZXAgOiB0aGlzLnZpZXdPcHRpb25zLnN0ZXA7XG4gICAgY29uc3QgdGlja3NBcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgIGNvbnN0IG51bWJlck9mVmFsdWVzOiBudW1iZXIgPSAxICsgTWF0aC5mbG9vcihNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChcbiAgICAgIE1hdGguYWJzKHRoaXMudmlld09wdGlvbnMuY2VpbCAtIHRoaXMudmlld09wdGlvbnMuZmxvb3IpIC8gc3RlcCxcbiAgICAgIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXRcbiAgICApKTtcbiAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gMDsgaW5kZXggPCBudW1iZXJPZlZhbHVlczsgKytpbmRleCkge1xuICAgICAgdGlja3NBcnJheS5wdXNoKE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld09wdGlvbnMuZmxvb3IgKyBzdGVwICogaW5kZXgsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlja3NBcnJheTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUaWNrU2VsZWN0ZWQodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5yYW5nZSkge1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGNlbnRlcjogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlO1xuICAgICAgICBpZiAodGhpcy52aWV3TG93VmFsdWUgPiBjZW50ZXIgJiZcbiAgICAgICAgICAgIHZhbHVlID49IGNlbnRlciAmJlxuICAgICAgICAgICAgdmFsdWUgPD0gdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXdMb3dWYWx1ZSA8IGNlbnRlciAmJlxuICAgICAgICAgICAgICAgICAgIHZhbHVlIDw9IGNlbnRlciAmJlxuICAgICAgICAgICAgICAgICAgIHZhbHVlID49IHRoaXMudmlld0xvd1ZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRW5kKSB7XG4gICAgICAgIGlmICh2YWx1ZSA+PSB0aGlzLnZpZXdMb3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhciAmJiB2YWx1ZSA8PSB0aGlzLnZpZXdMb3dWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5yYW5nZSAmJiB2YWx1ZSA+PSB0aGlzLnZpZXdMb3dWYWx1ZSAmJiB2YWx1ZSA8PSB0aGlzLnZpZXdIaWdoVmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBwb3NpdGlvbiBvZiB0aGUgZmxvb3IgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVGbG9vckxhYmVsKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mbG9vckxhYmVsRWxlbWVudC5hbHdheXNIaWRlKSB7XG4gICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld09wdGlvbnMuZmxvb3IsIExhYmVsVHlwZS5GbG9vcikpO1xuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gdGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSB0aGlzLmZsb29yTGFiZWxFbGVtZW50LmRpbWVuc2lvblxuICAgICAgICA6IDA7XG4gICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgcG9zaXRpb24gb2YgdGhlIGNlaWxpbmcgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVDZWlsTGFiZWwoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNlaWxMYWJlbEVsZW1lbnQuYWx3YXlzSGlkZSkge1xuICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld09wdGlvbnMuY2VpbCwgTGFiZWxUeXBlLkNlaWwpKTtcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gMFxuICAgICAgICA6IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gdGhpcy5jZWlsTGFiZWxFbGVtZW50LmRpbWVuc2lvbjtcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHNsaWRlciBoYW5kbGVzIGFuZCBsYWJlbCBwb3NpdGlvbnNcbiAgcHJpdmF0ZSB1cGRhdGVIYW5kbGVzKHdoaWNoOiBQb2ludGVyVHlwZSwgbmV3UG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAod2hpY2ggPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgdGhpcy51cGRhdGVMb3dIYW5kbGUobmV3UG9zKTtcbiAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHRoaXMudXBkYXRlSGlnaEhhbmRsZShuZXdQb3MpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQmFyKCk7XG4gICAgdGhpcy51cGRhdGVUaWNrc1NjYWxlKCk7XG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tYmluZWRMYWJlbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byB3b3JrIG91dCB0aGUgcG9zaXRpb24gZm9yIGhhbmRsZSBsYWJlbHMgZGVwZW5kaW5nIG9uIFJUTCBvciBub3RcbiAgcHJpdmF0ZSBnZXRIYW5kbGVMYWJlbFBvcyhsYWJlbFR5cGU6IFBvaW50ZXJUeXBlLCBuZXdQb3M6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbGFiZWxEaW1lbnNpb246IG51bWJlciA9IChsYWJlbFR5cGUgPT09IFBvaW50ZXJUeXBlLk1pbilcbiAgICAgID8gdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuZGltZW5zaW9uXG4gICAgICA6IHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LmRpbWVuc2lvbjtcbiAgICBjb25zdCBuZWFySGFuZGxlUG9zOiBudW1iZXIgPSBuZXdQb3MgLSBsYWJlbERpbWVuc2lvbiAvIDIgKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gICAgY29uc3QgZW5kT2ZCYXJQb3M6IG51bWJlciA9IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gbGFiZWxEaW1lbnNpb247XG5cbiAgICBpZiAoIXRoaXMudmlld09wdGlvbnMuYm91bmRQb2ludGVyTGFiZWxzKSB7XG4gICAgICByZXR1cm4gbmVhckhhbmRsZVBvcztcbiAgICB9XG5cbiAgICBpZiAoKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQgJiYgbGFiZWxUeXBlID09PSBQb2ludGVyVHlwZS5NaW4pIHx8XG4gICAgICAgKCF0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0ICYmIGxhYmVsVHlwZSA9PT0gUG9pbnRlclR5cGUuTWF4KSkge1xuICAgICAgcmV0dXJuIE1hdGgubWluKG5lYXJIYW5kbGVQb3MsIGVuZE9mQmFyUG9zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG5lYXJIYW5kbGVQb3MsIDApLCBlbmRPZkJhclBvcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIGxvdyBzbGlkZXIgaGFuZGxlIHBvc2l0aW9uIGFuZCBsYWJlbFxuICBwcml2YXRlIHVwZGF0ZUxvd0hhbmRsZShuZXdQb3M6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5zZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld0xvd1ZhbHVlLCBMYWJlbFR5cGUuTG93KSk7XG4gICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuc2V0UG9zaXRpb24odGhpcy5nZXRIYW5kbGVMYWJlbFBvcyhQb2ludGVyVHlwZS5NaW4sIG5ld1BvcykpO1xuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFBvaW50ZXJDb2xvcikpIHtcbiAgICAgIHRoaXMubWluUG9pbnRlclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuZ2V0UG9pbnRlckNvbG9yKFBvaW50ZXJUeXBlLk1pbiksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmF1dG9IaWRlTGltaXRMYWJlbHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBoaWdoIHNsaWRlciBoYW5kbGUgcG9zaXRpb24gYW5kIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlSGlnaEhhbmRsZShuZXdQb3M6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5zZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgIHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld0hpZ2hWYWx1ZSwgTGFiZWxUeXBlLkhpZ2gpKTtcbiAgICB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5zZXRQb3NpdGlvbih0aGlzLmdldEhhbmRsZUxhYmVsUG9zKFBvaW50ZXJUeXBlLk1heCwgbmV3UG9zKSk7XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuZ2V0UG9pbnRlckNvbG9yKSkge1xuICAgICAgdGhpcy5tYXhQb2ludGVyU3R5bGUgPSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5nZXRQb2ludGVyQ29sb3IoUG9pbnRlclR5cGUuTWF4KSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmF1dG9IaWRlTGltaXRMYWJlbHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNob3cvaGlkZSBmbG9vci9jZWlsaW5nIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICAvLyBTaG93IGJhc2VkIG9ubHkgb24gaGlkZUxpbWl0TGFiZWxzIGlmIHBvaW50ZXIgbGFiZWxzIGFyZSBoaWRkZW5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZmxvb3JMYWJlbEhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxldCBjZWlsTGFiZWxIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdCBpc01pbkxhYmVsQXRGbG9vcjogYm9vbGVhbiA9IHRoaXMuaXNMYWJlbEJlbG93Rmxvb3JMYWJlbCh0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudCk7XG4gICAgY29uc3QgaXNNaW5MYWJlbEF0Q2VpbDogYm9vbGVhbiA9IHRoaXMuaXNMYWJlbEFib3ZlQ2VpbExhYmVsKHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50KTtcbiAgICBjb25zdCBpc01heExhYmVsQXRDZWlsOiBib29sZWFuID0gdGhpcy5pc0xhYmVsQWJvdmVDZWlsTGFiZWwodGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQpO1xuICAgIGNvbnN0IGlzQ29tYmluZWRMYWJlbEF0Rmxvb3I6IGJvb2xlYW4gPSB0aGlzLmlzTGFiZWxCZWxvd0Zsb29yTGFiZWwodGhpcy5jb21iaW5lZExhYmVsRWxlbWVudCk7XG4gICAgY29uc3QgaXNDb21iaW5lZExhYmVsQXRDZWlsOiBib29sZWFuID0gdGhpcy5pc0xhYmVsQWJvdmVDZWlsTGFiZWwodGhpcy5jb21iaW5lZExhYmVsRWxlbWVudCk7XG5cbiAgICBpZiAoaXNNaW5MYWJlbEF0Rmxvb3IpIHtcbiAgICAgIGZsb29yTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsb29yTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgIH1cblxuICAgIGlmIChpc01pbkxhYmVsQXRDZWlsKSB7XG4gICAgICBjZWlsTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2VpbExhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBjb25zdCBoaWRlQ2VpbDogYm9vbGVhbiA9IHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuaXNWaXNpYmxlKCkgPyBpc0NvbWJpbmVkTGFiZWxBdENlaWwgOiBpc01heExhYmVsQXRDZWlsO1xuICAgICAgY29uc3QgaGlkZUZsb29yOiBib29sZWFuID0gdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5pc1Zpc2libGUoKSA/IGlzQ29tYmluZWRMYWJlbEF0Rmxvb3IgOiBpc01pbkxhYmVsQXRGbG9vcjtcblxuICAgICAgaWYgKGhpZGVDZWlsKSB7XG4gICAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5oaWRlKCk7XG4gICAgICB9IGVsc2UgaWYgKCFjZWlsTGFiZWxIaWRkZW4pIHtcbiAgICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gSGlkZSBvciBzaG93IGZsb29yIGxhYmVsXG4gICAgICBpZiAoaGlkZUZsb29yKSB7XG4gICAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgfSBlbHNlIGlmICghZmxvb3JMYWJlbEhpZGRlbikge1xuICAgICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTGFiZWxCZWxvd0Zsb29yTGFiZWwobGFiZWw6IFNsaWRlckxhYmVsRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcG9zOiBudW1iZXIgPSBsYWJlbC5wb3NpdGlvbjtcbiAgICBjb25zdCBkaW06IG51bWJlciA9IGxhYmVsLmRpbWVuc2lvbjtcbiAgICBjb25zdCBmbG9vclBvczogbnVtYmVyID0gdGhpcy5mbG9vckxhYmVsRWxlbWVudC5wb3NpdGlvbjtcbiAgICBjb25zdCBmbG9vckRpbTogbnVtYmVyID0gdGhpcy5mbG9vckxhYmVsRWxlbWVudC5kaW1lbnNpb247XG4gICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgID8gcG9zICsgZGltID49IGZsb29yUG9zIC0gMlxuICAgICAgOiBwb3MgPD0gZmxvb3JQb3MgKyBmbG9vckRpbSArIDI7XG4gIH1cblxuICBwcml2YXRlIGlzTGFiZWxBYm92ZUNlaWxMYWJlbChsYWJlbDogU2xpZGVyTGFiZWxEaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICBjb25zdCBwb3M6IG51bWJlciA9IGxhYmVsLnBvc2l0aW9uO1xuICAgIGNvbnN0IGRpbTogbnVtYmVyID0gbGFiZWwuZGltZW5zaW9uO1xuICAgIGNvbnN0IGNlaWxQb3M6IG51bWJlciA9IHRoaXMuY2VpbExhYmVsRWxlbWVudC5wb3NpdGlvbjtcbiAgICBjb25zdCBjZWlsRGltOiBudW1iZXIgPSB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuZGltZW5zaW9uO1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICA/IHBvcyA8PSBjZWlsUG9zICsgY2VpbERpbSArIDJcbiAgICAgIDogcG9zICsgZGltID49IGNlaWxQb3MgLSAyO1xuICB9XG5cbiAgLy8gVXBkYXRlIHNsaWRlciBzZWxlY3Rpb24gYmFyLCBjb21iaW5lZCBsYWJlbCBhbmQgcmFuZ2UgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVTZWxlY3Rpb25CYXIoKTogdm9pZCB7XG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICAgIGxldCBkaW1lbnNpb246IG51bWJlciA9IDA7XG4gICAgY29uc3QgaXNTZWxlY3Rpb25CYXJGcm9tUmlnaHQ6IGJvb2xlYW4gPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gIXRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckVuZFxuICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckVuZDtcbiAgICBjb25zdCBwb3NpdGlvbkZvclJhbmdlOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gdGhpcy5tYXhIYW5kbGVFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uXG4gICAgICAgIDogdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uO1xuXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIGRpbWVuc2lvbiA9IE1hdGguYWJzKHRoaXMubWF4SGFuZGxlRWxlbWVudC5wb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG4gICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uRm9yUmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlKSkge1xuICAgICAgICBjb25zdCBjZW50ZXI6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZTtcbiAgICAgICAgY29uc3QgY2VudGVyUG9zaXRpb246IG51bWJlciA9IHRoaXMudmFsdWVUb1Bvc2l0aW9uKGNlbnRlcik7XG4gICAgICAgIGNvbnN0IGlzTW9kZWxHcmVhdGVyVGhhbkNlbnRlcjogYm9vbGVhbiA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgICAgID8gdGhpcy52aWV3TG93VmFsdWUgPD0gY2VudGVyXG4gICAgICAgICAgICA6IHRoaXMudmlld0xvd1ZhbHVlID4gY2VudGVyO1xuICAgICAgICBpZiAoaXNNb2RlbEdyZWF0ZXJUaGFuQ2VudGVyKSB7XG4gICAgICAgICAgZGltZW5zaW9uID0gdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uIC0gY2VudGVyUG9zaXRpb247XG4gICAgICAgICAgcG9zaXRpb24gPSBjZW50ZXJQb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaW1lbnNpb24gPSBjZW50ZXJQb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbjtcbiAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1NlbGVjdGlvbkJhckZyb21SaWdodCkge1xuICAgICAgICBkaW1lbnNpb24gPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5tYXhIYW5kbGVQb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbikgKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb24pO1xuICAgICAgICBwb3NpdGlvbiA9IE1hdGguZmxvb3IodGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpbWVuc2lvbiA9IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcbiAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuc2V0RGltZW5zaW9uKGRpbWVuc2lvbik7XG4gICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICBpZiAodGhpcy5yYW5nZSAmJiB0aGlzLnZpZXdPcHRpb25zLnNob3dPdXRlclNlbGVjdGlvbkJhcnMpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0RGltZW5zaW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbigwKTtcbiAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgICAgdGhpcy5sZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldERpbWVuc2lvbih0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIChwb3NpdGlvbiArIGRpbWVuc2lvbikpO1xuICAgICAgICB0aGlzLmxlZnRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0UG9zaXRpb24ocG9zaXRpb24gKyBkaW1lbnNpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldERpbWVuc2lvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMubGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbigwKTtcbiAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXREaW1lbnNpb24odGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSAocG9zaXRpb24gKyBkaW1lbnNpb24pKTtcbiAgICAgICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbihwb3NpdGlvbiArIGRpbWVuc2lvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcikpIHtcbiAgICAgIGNvbnN0IGNvbG9yOiBzdHJpbmcgPSB0aGlzLmdldFNlbGVjdGlvbkJhckNvbG9yKCk7XG4gICAgICB0aGlzLmJhclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnNlbGVjdGlvbkJhckdyYWRpZW50KSkge1xuICAgICAgY29uc3Qgb2Zmc2V0OiBudW1iZXIgPSAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZSkpXG4gICAgICAgICAgICA/IHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZSlcbiAgICAgICAgICAgIDogMDtcbiAgICAgIGNvbnN0IHJldmVyc2VkOiBib29sZWFuID0gKG9mZnNldCAtIHBvc2l0aW9uID4gMCAmJiAhaXNTZWxlY3Rpb25CYXJGcm9tUmlnaHQpIHx8IChvZmZzZXQgLSBwb3NpdGlvbiA8PSAwICYmIGlzU2VsZWN0aW9uQmFyRnJvbVJpZ2h0KTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbjogc3RyaW5nID0gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbFxuICAgICAgICAgID8gcmV2ZXJzZWQgPyAnYm90dG9tJyA6ICd0b3AnXG4gICAgICAgICAgOiByZXZlcnNlZCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICB0aGlzLmJhclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6XG4gICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCh0byAnICtcbiAgICAgICAgICBkaXJlY3Rpb24gK1xuICAgICAgICAgICcsICcgK1xuICAgICAgICAgIHRoaXMudmlld09wdGlvbnMuc2VsZWN0aW9uQmFyR3JhZGllbnQuZnJvbSArXG4gICAgICAgICAgJyAwJSwnICtcbiAgICAgICAgICB0aGlzLnZpZXdPcHRpb25zLnNlbGVjdGlvbkJhckdyYWRpZW50LnRvICtcbiAgICAgICAgICAnIDEwMCUpJyxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCkge1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9XG4gICAgICAgICAgJ2NlbnRlciAnICtcbiAgICAgICAgICAob2Zmc2V0ICtcbiAgICAgICAgICAgIGRpbWVuc2lvbiArXG4gICAgICAgICAgICBwb3NpdGlvbiArXG4gICAgICAgICAgICAocmV2ZXJzZWQgPyAtdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uIDogMCkpICtcbiAgICAgICAgICAncHgnO1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRTaXplID1cbiAgICAgICAgICAnMTAwJSAnICsgKHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uKSArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9XG4gICAgICAgICAgb2Zmc2V0IC1cbiAgICAgICAgICBwb3NpdGlvbiArXG4gICAgICAgICAgKHJldmVyc2VkID8gdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uIDogMCkgK1xuICAgICAgICAgICdweCBjZW50ZXInO1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRTaXplID1cbiAgICAgICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbiArICdweCAxMDAlJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBXcmFwcGVyIGFyb3VuZCB0aGUgZ2V0U2VsZWN0aW9uQmFyQ29sb3Igb2YgdGhlIHVzZXIgdG8gcGFzcyB0byBjb3JyZWN0IHBhcmFtZXRlcnNcbiAgcHJpdmF0ZSBnZXRTZWxlY3Rpb25CYXJDb2xvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcihcbiAgICAgICAgdGhpcy52YWx1ZSxcbiAgICAgICAgdGhpcy5oaWdoVmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFNlbGVjdGlvbkJhckNvbG9yKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLy8gV3JhcHBlciBhcm91bmQgdGhlIGdldFBvaW50ZXJDb2xvciBvZiB0aGUgdXNlciB0byBwYXNzIHRvICBjb3JyZWN0IHBhcmFtZXRlcnNcbiAgcHJpdmF0ZSBnZXRQb2ludGVyQ29sb3IocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKTogc3RyaW5nIHtcbiAgICBpZiAocG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMuZ2V0UG9pbnRlckNvbG9yKFxuICAgICAgICB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgICAgcG9pbnRlclR5cGVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFBvaW50ZXJDb2xvcihcbiAgICAgIHRoaXMudmFsdWUsXG4gICAgICBwb2ludGVyVHlwZVxuICAgICk7XG4gIH1cblxuICAvLyBXcmFwcGVyIGFyb3VuZCB0aGUgZ2V0VGlja0NvbG9yIG9mIHRoZSB1c2VyIHRvIHBhc3MgdG8gY29ycmVjdCBwYXJhbWV0ZXJzXG4gIHByaXZhdGUgZ2V0VGlja0NvbG9yKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFRpY2tDb2xvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBVcGRhdGUgY29tYmluZWQgbGFiZWwgcG9zaXRpb24gYW5kIHZhbHVlXG4gIHByaXZhdGUgdXBkYXRlQ29tYmluZWRMYWJlbCgpOiB2b2lkIHtcbiAgICBsZXQgaXNMYWJlbE92ZXJsYXA6IGJvb2xlYW4gPSBudWxsO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICBpc0xhYmVsT3ZlcmxhcCA9XG4gICAgICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnBvc2l0aW9uIC0gdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuZGltZW5zaW9uIC0gMTAgPD0gdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQucG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzTGFiZWxPdmVybGFwID1cbiAgICAgICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQucG9zaXRpb24gKyB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudC5kaW1lbnNpb24gKyAxMCA+PSB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAoaXNMYWJlbE92ZXJsYXApIHtcbiAgICAgIGNvbnN0IGxvd0Rpc3BsYXlWYWx1ZTogc3RyaW5nID0gdGhpcy5nZXREaXNwbGF5VmFsdWUodGhpcy52aWV3TG93VmFsdWUsIExhYmVsVHlwZS5Mb3cpO1xuICAgICAgY29uc3QgaGlnaERpc3BsYXlWYWx1ZTogc3RyaW5nID0gdGhpcy5nZXREaXNwbGF5VmFsdWUodGhpcy52aWV3SGlnaFZhbHVlLCBMYWJlbFR5cGUuSGlnaCk7XG4gICAgICBjb25zdCBjb21iaW5lZExhYmVsVmFsdWU6IHN0cmluZyA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmNvbWJpbmVMYWJlbHMoaGlnaERpc3BsYXlWYWx1ZSwgbG93RGlzcGxheVZhbHVlKVxuICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuY29tYmluZUxhYmVscyhsb3dEaXNwbGF5VmFsdWUsIGhpZ2hEaXNwbGF5VmFsdWUpO1xuXG4gICAgICB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LnNldFZhbHVlKGNvbWJpbmVkTGFiZWxWYWx1ZSk7XG4gICAgICBjb25zdCBwb3M6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuYm91bmRQb2ludGVyTGFiZWxzXG4gICAgICAgID8gTWF0aC5taW4oXG4gICAgICAgICAgICBNYXRoLm1heChcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnBvc2l0aW9uICtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuZGltZW5zaW9uIC8gMiAtXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5kaW1lbnNpb24gLyAyLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LmRpbWVuc2lvblxuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQucG9zaXRpb24gKyB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuZGltZW5zaW9uIC8gMiAtIHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuZGltZW5zaW9uIC8gMjtcblxuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlSGlnaEhhbmRsZSh0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdIaWdoVmFsdWUpKTtcbiAgICAgIHRoaXMudXBkYXRlTG93SGFuZGxlKHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0xvd1ZhbHVlKSk7XG4gICAgICB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgICB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgICB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuYXV0b0hpZGVMaW1pdExhYmVscykge1xuICAgICAgdGhpcy51cGRhdGVGbG9vckFuZENlaWxMYWJlbHNWaXNpYmlsaXR5KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSB0cmFuc2xhdGVkIHZhbHVlIGlmIGEgdHJhbnNsYXRlIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGVsc2UgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHByaXZhdGUgZ2V0RGlzcGxheVZhbHVlKHZhbHVlOiBudW1iZXIsIHdoaWNoOiBMYWJlbFR5cGUpOiBzdHJpbmcge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5KSAmJiAhdGhpcy52aWV3T3B0aW9ucy5iaW5kSW5kZXhGb3JTdGVwc0FycmF5KSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0U3RlcFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKHZhbHVlLCB3aGljaCk7XG4gIH1cblxuICAvLyBSb3VuZCB2YWx1ZSB0byBzdGVwIGFuZCBwcmVjaXNpb24gYmFzZWQgb24gbWluVmFsdWVcbiAgcHJpdmF0ZSByb3VuZFN0ZXAodmFsdWU6IG51bWJlciwgY3VzdG9tU3RlcD86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc3RlcDogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGN1c3RvbVN0ZXApID8gY3VzdG9tU3RlcCA6IHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBsZXQgc3RlcHBlZERpZmZlcmVuY2U6IG51bWJlciA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KFxuICAgICAgKHZhbHVlIC0gdGhpcy52aWV3T3B0aW9ucy5mbG9vcikgLyBzdGVwLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICBzdGVwcGVkRGlmZmVyZW5jZSA9IE1hdGgucm91bmQoc3RlcHBlZERpZmZlcmVuY2UpICogc3RlcDtcbiAgICByZXR1cm4gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3T3B0aW9ucy5mbG9vciArIHN0ZXBwZWREaWZmZXJlbmNlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgfVxuXG4gIC8vIFRyYW5zbGF0ZSB2YWx1ZSB0byBwaXhlbCBwb3NpdGlvblxuICBwcml2YXRlIHZhbHVlVG9Qb3NpdGlvbih2YWw6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IGZuOiBWYWx1ZVRvUG9zaXRpb25GdW5jdGlvbiAgPSBWYWx1ZUhlbHBlci5saW5lYXJWYWx1ZVRvUG9zaXRpb247XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmN1c3RvbVZhbHVlVG9Qb3NpdGlvbikpIHtcbiAgICAgIGZuID0gdGhpcy52aWV3T3B0aW9ucy5jdXN0b21WYWx1ZVRvUG9zaXRpb247XG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdPcHRpb25zLmxvZ1NjYWxlKSB7XG4gICAgICBmbiA9IFZhbHVlSGVscGVyLmxvZ1ZhbHVlVG9Qb3NpdGlvbjtcbiAgICB9XG5cbiAgICB2YWwgPSBNYXRoSGVscGVyLmNsYW1wVG9SYW5nZSh2YWwsIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgbGV0IHBlcmNlbnQ6IG51bWJlciA9IGZuKHZhbCwgdGhpcy52aWV3T3B0aW9ucy5mbG9vciwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKTtcbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQocGVyY2VudCkpIHtcbiAgICAgIHBlcmNlbnQgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgcGVyY2VudCA9IDEgLSBwZXJjZW50O1xuICAgIH1cbiAgICByZXR1cm4gcGVyY2VudCAqIHRoaXMubWF4SGFuZGxlUG9zaXRpb247XG4gIH1cblxuICAvLyBUcmFuc2xhdGUgcG9zaXRpb24gdG8gbW9kZWwgdmFsdWVcbiAgcHJpdmF0ZSBwb3NpdGlvblRvVmFsdWUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHBlcmNlbnQ6IG51bWJlciA9IHBvc2l0aW9uIC8gdGhpcy5tYXhIYW5kbGVQb3NpdGlvbjtcbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgcGVyY2VudCA9IDEgLSBwZXJjZW50O1xuICAgIH1cbiAgICBsZXQgZm46IFBvc2l0aW9uVG9WYWx1ZUZ1bmN0aW9uID0gVmFsdWVIZWxwZXIubGluZWFyUG9zaXRpb25Ub1ZhbHVlO1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5jdXN0b21Qb3NpdGlvblRvVmFsdWUpKSB7XG4gICAgICBmbiA9IHRoaXMudmlld09wdGlvbnMuY3VzdG9tUG9zaXRpb25Ub1ZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3T3B0aW9ucy5sb2dTY2FsZSkge1xuICAgICAgZm4gPSBWYWx1ZUhlbHBlci5sb2dQb3NpdGlvblRvVmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBmbihwZXJjZW50LCB0aGlzLnZpZXdPcHRpb25zLmZsb29yLCB0aGlzLnZpZXdPcHRpb25zLmNlaWwpO1xuICAgIHJldHVybiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpID8gdmFsdWUgOiAwO1xuICB9XG5cbiAgLy8gR2V0IHRoZSBYLWNvb3JkaW5hdGUgb3IgWS1jb29yZGluYXRlIG9mIGFuIGV2ZW50XG4gIHByaXZhdGUgZ2V0RXZlbnRYWShldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LCB0YXJnZXRUb3VjaElkPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFkgOiBldmVudC5jbGllbnRYO1xuICAgIH1cblxuICAgIGxldCB0b3VjaEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0IHRvdWNoZXM6IFRvdWNoTGlzdCA9IGV2ZW50LnRvdWNoZXM7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0YXJnZXRUb3VjaElkKSkge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdGFyZ2V0VG91Y2hJZCkge1xuICAgICAgICAgIHRvdWNoSW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSB0YXJnZXQgdG91Y2ggb3IgaWYgdGhlIHRhcmdldCB0b3VjaCB3YXMgbm90IGZvdW5kIGluIHRoZSBldmVudFxuICAgIC8vIHJldHVybnMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBmaXJzdCB0b3VjaFxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gdG91Y2hlc1t0b3VjaEluZGV4XS5jbGllbnRZIDogdG91Y2hlc1t0b3VjaEluZGV4XS5jbGllbnRYO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUgZXZlbnQgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIHNsaWRlciBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIHByaXZhdGUgZ2V0RXZlbnRQb3NpdGlvbihldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LCB0YXJnZXRUb3VjaElkPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBzbGlkZXJFbGVtZW50Qm91bmRpbmdSZWN0OiBDbGllbnRSZWN0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBzbGlkZXJQb3M6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWwgP1xuICAgICAgc2xpZGVyRWxlbWVudEJvdW5kaW5nUmVjdC5ib3R0b20gOiBzbGlkZXJFbGVtZW50Qm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgbGV0IGV2ZW50UG9zOiBudW1iZXIgPSAwO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsKSB7XG4gICAgICBldmVudFBvcyA9IC10aGlzLmdldEV2ZW50WFkoZXZlbnQsIHRhcmdldFRvdWNoSWQpICsgc2xpZGVyUG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudFBvcyA9IHRoaXMuZ2V0RXZlbnRYWShldmVudCwgdGFyZ2V0VG91Y2hJZCkgLSBzbGlkZXJQb3M7XG4gICAgfVxuICAgIHJldHVybiBldmVudFBvcyAqIHRoaXMudmlld09wdGlvbnMuc2NhbGUgLSB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gIH1cblxuICAvLyBHZXQgdGhlIGhhbmRsZSBjbG9zZXN0IHRvIGFuIGV2ZW50XG4gIHByaXZhdGUgZ2V0TmVhcmVzdEhhbmRsZShldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50KTogUG9pbnRlclR5cGUge1xuICAgIGlmICghdGhpcy5yYW5nZSkge1xuICAgICAgcmV0dXJuIFBvaW50ZXJUeXBlLk1pbjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50KTtcbiAgICBjb25zdCBkaXN0YW5jZU1pbjogbnVtYmVyID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24pO1xuICAgIGNvbnN0IGRpc3RhbmNlTWF4OiBudW1iZXIgPSBNYXRoLmFicyhwb3NpdGlvbiAtIHRoaXMubWF4SGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG5cbiAgICBpZiAoZGlzdGFuY2VNaW4gPCBkaXN0YW5jZU1heCkge1xuICAgICAgcmV0dXJuIFBvaW50ZXJUeXBlLk1pbjtcbiAgICB9IGVsc2UgaWYgKGRpc3RhbmNlTWluID4gZGlzdGFuY2VNYXgpIHtcbiAgICAgIHJldHVybiBQb2ludGVyVHlwZS5NYXg7XG4gICAgfSBlbHNlIGlmICghdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgLy8gaWYgZXZlbnQgaXMgYXQgdGhlIHNhbWUgZGlzdGFuY2UgZnJvbSBtaW4vbWF4IHRoZW4gaWYgaXQncyBhdCBsZWZ0IG9mIG1pbkgsIHdlIHJldHVybiBtaW5IIGVsc2UgbWF4SFxuICAgICAgcmV0dXJuIHBvc2l0aW9uIDwgdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uID8gUG9pbnRlclR5cGUuTWluIDogUG9pbnRlclR5cGUuTWF4O1xuICAgIH1cbiAgICAvLyByZXZlcnNlIGluIHJ0bFxuICAgIHJldHVybiBwb3NpdGlvbiA+IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiA/IFBvaW50ZXJUeXBlLk1pbiA6IFBvaW50ZXJUeXBlLk1heDtcbiAgfVxuXG4gIC8vIEJpbmQgbW91c2UgYW5kIHRvdWNoIGV2ZW50cyB0byBzbGlkZXIgaGFuZGxlc1xuICBwcml2YXRlIGJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgZHJhZ2dhYmxlUmFuZ2U6IGJvb2xlYW4gPSB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlO1xuXG4gICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLm9ubHlCaW5kSGFuZGxlcykge1xuICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChudWxsLCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSkge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChQb2ludGVyVHlwZS5NaW4sIGRyYWdnYWJsZVJhbmdlLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQub24oJ21vdXNlZG93bicsXG4gICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vbkJhclN0YXJ0KFBvaW50ZXJUeXBlLk1heCwgZHJhZ2dhYmxlUmFuZ2UsIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25TdGFydChQb2ludGVyVHlwZS5NaW4sIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KFBvaW50ZXJUeXBlLk1heCwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMudmlld09wdGlvbnMub25seUJpbmRIYW5kbGVzKSB7XG4gICAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQub24oJ21vdXNlZG93bicsXG4gICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQobnVsbCwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGlja3NFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KG51bGwsIGV2ZW50LCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5vbmx5QmluZEhhbmRsZXMpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudC5vblBhc3NpdmUoJ3RvdWNoc3RhcnQnLFxuICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChudWxsLCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHkpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5vblBhc3NpdmUoJ3RvdWNoc3RhcnQnLFxuICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChQb2ludGVyVHlwZS5NaW4sIGRyYWdnYWJsZVJhbmdlLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uQmFyU3RhcnQoUG9pbnRlclR5cGUuTWF4LCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQoUG9pbnRlclR5cGUuTWluLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMub25TdGFydChQb2ludGVyVHlwZS5NYXgsIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLm9ubHlCaW5kSGFuZGxlcykge1xuICAgICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQobnVsbCwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGlja3NFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQobnVsbCwgZXZlbnQsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5vbignZm9jdXMnLCAoKTogdm9pZCA9PiB0aGlzLm9uUG9pbnRlckZvY3VzKFBvaW50ZXJUeXBlLk1pbikpO1xuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uKCdmb2N1cycsICgpOiB2b2lkID0+IHRoaXMub25Qb2ludGVyRm9jdXMoUG9pbnRlclR5cGUuTWF4KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKG9wdGlvbnM6IE9wdGlvbnMpOiBib29sZWFuW10ge1xuICAgIHJldHVybiBbXG4gICAgICBvcHRpb25zLmRpc2FibGVkLFxuICAgICAgb3B0aW9ucy5yZWFkT25seSxcbiAgICAgIG9wdGlvbnMuZHJhZ2dhYmxlUmFuZ2UsXG4gICAgICBvcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSxcbiAgICAgIG9wdGlvbnMub25seUJpbmRIYW5kbGVzLFxuICAgICAgb3B0aW9ucy5rZXlib2FyZFN1cHBvcnRcbiAgICBdO1xuICB9XG5cbiAgLy8gVW5iaW5kIG1vdXNlIGFuZCB0b3VjaCBldmVudHMgdG8gc2xpZGVyIGhhbmRsZXNcbiAgcHJpdmF0ZSB1bmJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZU9uTW92ZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmVPbkVuZCgpO1xuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMuZ2V0QWxsU2xpZGVyRWxlbWVudHMoKSkge1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50Lm9mZigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25CYXJTdGFydChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUsIGRyYWdnYWJsZVJhbmdlOiBib29sZWFuLCBldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LFxuICAgIGJpbmRNb3ZlOiBib29sZWFuLCBiaW5kRW5kOiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZU1vdmU/OiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZUVuZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZHJhZ2dhYmxlUmFuZ2UpIHtcbiAgICAgIHRoaXMub25EcmFnU3RhcnQocG9pbnRlclR5cGUsIGV2ZW50LCBiaW5kTW92ZSwgYmluZEVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25TdGFydChwb2ludGVyVHlwZSwgZXZlbnQsIGJpbmRNb3ZlLCBiaW5kRW5kLCBzaW11bGF0ZUltbWVkaWF0ZU1vdmUsIHNpbXVsYXRlSW1tZWRpYXRlRW5kKTtcbiAgICB9XG4gIH1cblxuICAvLyBvblN0YXJ0IGV2ZW50IGhhbmRsZXJcbiAgcHJpdmF0ZSBvblN0YXJ0KHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSwgZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCxcbiAgICAgIGJpbmRNb3ZlOiBib29sZWFuLCBiaW5kRW5kOiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZU1vdmU/OiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZUVuZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyBPbmx5IGNhbGwgcHJldmVudERlZmF1bHQoKSB3aGVuIGhhbmRsaW5nIG5vbi1wYXNzaXZlIGV2ZW50cyAocGFzc2l2ZSBldmVudHMgZG9uJ3QgbmVlZCBpdClcbiAgICBpZiAoIUNvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSB8fCAhZGV0ZWN0UGFzc2l2ZUV2ZW50cy5oYXNTdXBwb3J0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG5cbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoaXMgaW4gY2FzZSB0aGUgSFRNTCB3aGVyZSB0aGUgc2xpZGVycyBhcmUgb25cbiAgICAvLyBoYXZlIGJlZW4gYW5pbWF0ZWQgaW50byB2aWV3LlxuICAgIHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoKTtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChwb2ludGVyVHlwZSkpIHtcbiAgICAgIHBvaW50ZXJUeXBlID0gdGhpcy5nZXROZWFyZXN0SGFuZGxlKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPSBwb2ludGVyVHlwZTtcblxuICAgIGNvbnN0IHBvaW50ZXJFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUgPSB0aGlzLmdldFBvaW50ZXJFbGVtZW50KHBvaW50ZXJUeXBlKTtcbiAgICBwb2ludGVyRWxlbWVudC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICBwb2ludGVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChiaW5kTW92ZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZU9uTW92ZSgpO1xuXG4gICAgICBjb25zdCBvbk1vdmVDYWxsYmFjazogKChlOiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpID0+IHZvaWQpID1cbiAgICAgICAgKGU6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5kcmFnZ2luZy5hY3RpdmUgPyB0aGlzLm9uRHJhZ01vdmUoZSkgOiB0aGlzLm9uTW92ZShlKTtcblxuICAgICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSkge1xuICAgICAgICB0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIuYXR0YWNoUGFzc2l2ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgZG9jdW1lbnQsICd0b3VjaG1vdmUnLCBvbk1vdmVDYWxsYmFjaywgdGhpcy52aWV3T3B0aW9ucy50b3VjaEV2ZW50c0ludGVydmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Nb3ZlRXZlbnRMaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgb25Nb3ZlQ2FsbGJhY2ssIHRoaXMudmlld09wdGlvbnMubW91c2VFdmVudHNJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJpbmRFbmQpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVPbkVuZCgpO1xuXG4gICAgICBjb25zdCBvbkVuZENhbGxiYWNrOiAoKGU6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCkgPT4gdm9pZCkgPVxuICAgICAgICAoZTogTW91c2VFdmVudHxUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uRW5kKGUpO1xuXG4gICAgICBpZiAoQ29tcGF0aWJpbGl0eUhlbHBlci5pc1RvdWNoRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMub25FbmRFdmVudExpc3RlbmVyID0gdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmF0dGFjaFBhc3NpdmVFdmVudExpc3RlbmVyKGRvY3VtZW50LCAndG91Y2hlbmQnLCBvbkVuZENhbGxiYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25FbmRFdmVudExpc3RlbmVyID0gdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmF0dGFjaEV2ZW50TGlzdGVuZXIoZG9jdW1lbnQsICdtb3VzZXVwJywgb25FbmRDYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51c2VyQ2hhbmdlU3RhcnQuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG5cbiAgICBpZiAoQ29tcGF0aWJpbGl0eUhlbHBlci5pc1RvdWNoRXZlbnQoZXZlbnQpICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCgoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXMpKSB7XG4gICAgICAvLyBTdG9yZSB0aGUgdG91Y2ggaWRlbnRpZmllclxuICAgICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG91Y2hJZCkpIHtcbiAgICAgICAgdGhpcy50b3VjaElkID0gKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2xpY2sgZXZlbnRzLCBlaXRoZXIgd2l0aCBtb3VzZSBvciB0b3VjaCBnZXN0dXJlIGFyZSB3ZWlyZC4gU29tZXRpbWVzIHRoZXkgcmVzdWx0IGluIGZ1bGxcbiAgICAvLyBzdGFydCwgbW92ZSwgZW5kIHNlcXVlbmNlLCBhbmQgc29tZXRpbWVzLCB0aGV5IGRvbid0IC0gdGhleSBvbmx5IGludm9rZSBtb3VzZWRvd25cbiAgICAvLyBBcyBhIHdvcmthcm91bmQsIHdlIHNpbXVsYXRlIHRoZSBmaXJzdCBtb3ZlIGV2ZW50IGFuZCB0aGUgZW5kIGV2ZW50IGlmIGl0J3MgbmVjZXNzYXJ5XG4gICAgaWYgKHNpbXVsYXRlSW1tZWRpYXRlTW92ZSkge1xuICAgICAgdGhpcy5vbk1vdmUoZXZlbnQsIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChzaW11bGF0ZUltbWVkaWF0ZUVuZCkge1xuICAgICAgdGhpcy5vbkVuZChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLy8gb25Nb3ZlIGV2ZW50IGhhbmRsZXJcbiAgcHJpdmF0ZSBvbk1vdmUoZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCwgZnJvbVRpY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgbGV0IHRvdWNoRm9yVGhpc1NsaWRlcjogVG91Y2ggPSBudWxsO1xuXG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSkge1xuICAgICAgY29uc3QgY2hhbmdlZFRvdWNoZXM6IFRvdWNoTGlzdCA9IChldmVudCBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlcztcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBjaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaElkKSB7XG4gICAgICAgICAgdG91Y2hGb3JUaGlzU2xpZGVyID0gY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRvdWNoRm9yVGhpc1NsaWRlcikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGUgJiYgIXRoaXMudmlld09wdGlvbnMuYW5pbWF0ZU9uTW92ZSkge1xuICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyRWxlbWVudEFuaW1hdGVDbGFzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5ld1BvczogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRvdWNoRm9yVGhpc1NsaWRlcilcbiAgICAgID8gdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50LCB0b3VjaEZvclRoaXNTbGlkZXIuaWRlbnRpZmllcilcbiAgICAgIDogdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50KTtcbiAgICBsZXQgbmV3VmFsdWU6IG51bWJlcjtcbiAgICBjb25zdCBjZWlsVmFsdWU6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmZsb29yXG4gICAgICAgIDogdGhpcy52aWV3T3B0aW9ucy5jZWlsO1xuICAgIGNvbnN0IGZsb29yVmFsdWU6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQgPyB0aGlzLnZpZXdPcHRpb25zLmNlaWwgOiB0aGlzLnZpZXdPcHRpb25zLmZsb29yO1xuXG4gICAgaWYgKG5ld1BvcyA8PSAwKSB7XG4gICAgICBuZXdWYWx1ZSA9IGZsb29yVmFsdWU7XG4gICAgfSBlbHNlIGlmIChuZXdQb3MgPj0gdGhpcy5tYXhIYW5kbGVQb3NpdGlvbikge1xuICAgICAgbmV3VmFsdWUgPSBjZWlsVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zKTtcbiAgICAgIGlmIChmcm9tVGljayAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnJvdW5kU3RlcChuZXdWYWx1ZSwgdGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucm91bmRTdGVwKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvblRyYWNraW5nSGFuZGxlKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25FbmQoZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChDb21wYXRpYmlsaXR5SGVscGVyLmlzVG91Y2hFdmVudChldmVudCkpIHtcbiAgICAgIGNvbnN0IGNoYW5nZWRUb3VjaGVzOiBUb3VjaExpc3QgPSAoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXM7XG4gICAgICBpZiAoY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllciAhPT0gdGhpcy50b3VjaElkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgIHRoaXMuc2xpZGVyRWxlbWVudEFuaW1hdGVDbGFzcyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy50b3VjaElkID0gbnVsbDtcblxuICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZHJhZ2dpbmcuYWN0aXZlID0gZmFsc2U7XG5cbiAgICB0aGlzLnVuc3Vic2NyaWJlT25Nb3ZlKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZU9uRW5kKCk7XG5cbiAgICB0aGlzLnVzZXJDaGFuZ2VFbmQuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG4gIH1cblxuICBwcml2YXRlIG9uUG9pbnRlckZvY3VzKHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IHBvaW50ZXJFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUgPSB0aGlzLmdldFBvaW50ZXJFbGVtZW50KHBvaW50ZXJUeXBlKTtcbiAgICBwb2ludGVyRWxlbWVudC5vbignYmx1cicsICgpOiB2b2lkID0+IHRoaXMub25Qb2ludGVyQmx1cihwb2ludGVyRWxlbWVudCkpO1xuICAgIHBvaW50ZXJFbGVtZW50Lm9uKCdrZXlkb3duJywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uS2V5Ym9hcmRFdmVudChldmVudCkpO1xuICAgIHBvaW50ZXJFbGVtZW50Lm9uKCdrZXl1cCcsICgpOiB2b2lkID0+IHRoaXMub25LZXlVcCgpKTtcbiAgICBwb2ludGVyRWxlbWVudC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID0gcG9pbnRlclR5cGU7XG4gICAgdGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyID0gcG9pbnRlclR5cGU7XG4gICAgdGhpcy5maXJzdEtleURvd24gPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBvbktleVVwKCk6IHZvaWQge1xuICAgIHRoaXMuZmlyc3RLZXlEb3duID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJDaGFuZ2VFbmQuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG4gIH1cblxuICBwcml2YXRlIG9uUG9pbnRlckJsdXIocG9pbnRlcjogU2xpZGVySGFuZGxlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgcG9pbnRlci5vZmYoJ2JsdXInKTtcbiAgICBwb2ludGVyLm9mZigna2V5ZG93bicpO1xuICAgIHBvaW50ZXIub2ZmKCdrZXl1cCcpO1xuICAgIHBvaW50ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG91Y2hJZCkpIHtcbiAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRGb2N1c1BvaW50ZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0S2V5QWN0aW9ucyhjdXJyZW50VmFsdWU6IG51bWJlcik6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9IHtcbiAgICBjb25zdCB2YWx1ZVJhbmdlOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLmNlaWwgLSB0aGlzLnZpZXdPcHRpb25zLmZsb29yO1xuXG4gICAgbGV0IGluY3JlYXNlU3RlcDogbnVtYmVyID0gY3VycmVudFZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgIGxldCBkZWNyZWFzZVN0ZXA6IG51bWJlciA9IGN1cnJlbnRWYWx1ZSAtIHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBsZXQgaW5jcmVhc2VQYWdlOiBudW1iZXIgPSBjdXJyZW50VmFsdWUgKyB2YWx1ZVJhbmdlIC8gMTA7XG4gICAgbGV0IGRlY3JlYXNlUGFnZTogbnVtYmVyID0gY3VycmVudFZhbHVlIC0gdmFsdWVSYW5nZSAvIDEwO1xuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmV2ZXJzZWRDb250cm9scykge1xuICAgICAgaW5jcmVhc2VTdGVwID0gY3VycmVudFZhbHVlIC0gdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgICAgZGVjcmVhc2VTdGVwID0gY3VycmVudFZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgICAgaW5jcmVhc2VQYWdlID0gY3VycmVudFZhbHVlIC0gdmFsdWVSYW5nZSAvIDEwO1xuICAgICAgZGVjcmVhc2VQYWdlID0gY3VycmVudFZhbHVlICsgdmFsdWVSYW5nZSAvIDEwO1xuICAgIH1cblxuICAgIC8vIExlZnQgdG8gcmlnaHQgZGVmYXVsdCBhY3Rpb25zXG4gICAgY29uc3QgYWN0aW9uczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICAgICBVUDogaW5jcmVhc2VTdGVwLFxuICAgICAgRE9XTjogZGVjcmVhc2VTdGVwLFxuICAgICAgTEVGVDogZGVjcmVhc2VTdGVwLFxuICAgICAgUklHSFQ6IGluY3JlYXNlU3RlcCxcbiAgICAgIFBBR0VVUDogaW5jcmVhc2VQYWdlLFxuICAgICAgUEFHRURPV046IGRlY3JlYXNlUGFnZSxcbiAgICAgIEhPTUU6IHRoaXMudmlld09wdGlvbnMucmV2ZXJzZWRDb250cm9scyA/IHRoaXMudmlld09wdGlvbnMuY2VpbCA6IHRoaXMudmlld09wdGlvbnMuZmxvb3IsXG4gICAgICBFTkQ6IHRoaXMudmlld09wdGlvbnMucmV2ZXJzZWRDb250cm9scyA/IHRoaXMudmlld09wdGlvbnMuZmxvb3IgOiB0aGlzLnZpZXdPcHRpb25zLmNlaWwsXG4gICAgfTtcbiAgICAvLyByaWdodCB0byBsZWZ0IG1lYW5zIHN3YXBwaW5nIHJpZ2h0IGFuZCBsZWZ0IGFycm93c1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICBhY3Rpb25zLkxFRlQgPSBpbmNyZWFzZVN0ZXA7XG4gICAgICBhY3Rpb25zLlJJR0hUID0gZGVjcmVhc2VTdGVwO1xuICAgICAgLy8gcmlnaHQgdG8gbGVmdCBhbmQgdmVydGljYWwgbWVhbnMgd2UgYWxzbyBzd2FwIHVwIGFuZCBkb3duXG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCkge1xuICAgICAgICBhY3Rpb25zLlVQID0gZGVjcmVhc2VTdGVwO1xuICAgICAgICBhY3Rpb25zLkRPV04gPSBpbmNyZWFzZVN0ZXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhY3Rpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBvbktleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWU6IG51bWJlciA9IHRoaXMuZ2V0Q3VycmVudFRyYWNraW5nVmFsdWUoKTtcbiAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnQua2V5Q29kZSlcbiAgICAgID8gZXZlbnQua2V5Q29kZVxuICAgICAgOiBldmVudC53aGljaDtcbiAgICBjb25zdCBrZXlzOiB7W2tleUNvZGU6IG51bWJlcl06IHN0cmluZ30gPSB7XG4gICAgICAgIDM4OiAnVVAnLFxuICAgICAgICA0MDogJ0RPV04nLFxuICAgICAgICAzNzogJ0xFRlQnLFxuICAgICAgICAzOTogJ1JJR0hUJyxcbiAgICAgICAgMzM6ICdQQUdFVVAnLFxuICAgICAgICAzNDogJ1BBR0VET1dOJyxcbiAgICAgICAgMzY6ICdIT01FJyxcbiAgICAgICAgMzU6ICdFTkQnLFxuICAgICAgfTtcbiAgICBjb25zdCBhY3Rpb25zOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHRoaXMuZ2V0S2V5QWN0aW9ucyhjdXJyZW50VmFsdWUpO1xuICAgIGNvbnN0IGtleTogc3RyaW5nID0ga2V5c1trZXlDb2RlXTtcbiAgICBjb25zdCBhY3Rpb246IG51bWJlciA9IGFjdGlvbnNba2V5XTtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChhY3Rpb24pIHx8IFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLmZpcnN0S2V5RG93bikge1xuICAgICAgdGhpcy5maXJzdEtleURvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMudXNlckNoYW5nZVN0YXJ0LmVtaXQodGhpcy5nZXRDaGFuZ2VDb250ZXh0KCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvblZhbHVlOiBudW1iZXIgPSBNYXRoSGVscGVyLmNsYW1wVG9SYW5nZShhY3Rpb24sIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgY29uc3QgbmV3VmFsdWU6IG51bWJlciA9IHRoaXMucm91bmRTdGVwKGFjdGlvblZhbHVlKTtcbiAgICBpZiAoIXRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2VPbmx5KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVHJhY2tpbmdIYW5kbGUobmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnZpZXdIaWdoVmFsdWUgLSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICAgIGxldCBuZXdNaW5WYWx1ZTogbnVtYmVyO1xuICAgICAgbGV0IG5ld01heFZhbHVlOiBudW1iZXI7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgICBuZXdNaW5WYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBuZXdNYXhWYWx1ZSA9IG5ld1ZhbHVlICsgZGlmZmVyZW5jZTtcbiAgICAgICAgaWYgKG5ld01heFZhbHVlID4gdGhpcy52aWV3T3B0aW9ucy5jZWlsKSB7XG4gICAgICAgICAgbmV3TWF4VmFsdWUgPSB0aGlzLnZpZXdPcHRpb25zLmNlaWw7XG4gICAgICAgICAgbmV3TWluVmFsdWUgPSBuZXdNYXhWYWx1ZSAtIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgbmV3TWF4VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgbmV3TWluVmFsdWUgPSBuZXdWYWx1ZSAtIGRpZmZlcmVuY2U7XG4gICAgICAgIGlmIChuZXdNaW5WYWx1ZSA8IHRoaXMudmlld09wdGlvbnMuZmxvb3IpIHtcbiAgICAgICAgICBuZXdNaW5WYWx1ZSA9IHRoaXMudmlld09wdGlvbnMuZmxvb3I7XG4gICAgICAgICAgbmV3TWF4VmFsdWUgPSBuZXdNaW5WYWx1ZSArIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucG9zaXRpb25UcmFja2luZ0JhcihuZXdNaW5WYWx1ZSwgbmV3TWF4VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG9uRHJhZ1N0YXJ0IGV2ZW50IGhhbmRsZXIsIGhhbmRsZXMgZHJhZ2dpbmcgb2YgdGhlIG1pZGRsZSBiYXJcbiAgcHJpdmF0ZSBvbkRyYWdTdGFydChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUsIGV2ZW50OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQsXG4gICAgYmluZE1vdmU6IGJvb2xlYW4sIGJpbmRFbmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50KTtcblxuICAgIHRoaXMuZHJhZ2dpbmcgPSBuZXcgRHJhZ2dpbmcoKTtcbiAgICB0aGlzLmRyYWdnaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5kcmFnZ2luZy52YWx1ZSA9IHRoaXMucG9zaXRpb25Ub1ZhbHVlKHBvc2l0aW9uKTtcbiAgICB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2UgPSB0aGlzLnZpZXdIaWdoVmFsdWUgLSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICB0aGlzLmRyYWdnaW5nLmxvd0xpbWl0ID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiAtIHBvc2l0aW9uXG4gICAgICAgIDogcG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb247XG4gICAgdGhpcy5kcmFnZ2luZy5oaWdoTGltaXQgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gcG9zaXRpb24gLSB0aGlzLm1heEhhbmRsZUVsZW1lbnQucG9zaXRpb25cbiAgICAgICAgOiB0aGlzLm1heEhhbmRsZUVsZW1lbnQucG9zaXRpb24gLSBwb3NpdGlvbjtcblxuICAgIHRoaXMub25TdGFydChwb2ludGVyVHlwZSwgZXZlbnQsIGJpbmRNb3ZlLCBiaW5kRW5kKTtcbiAgfVxuXG4gIC8qKiBHZXQgbWluIHZhbHVlIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBuZXdQb3MgaXMgb3V0T2ZCb3VuZHMgYWJvdmUgb3IgYmVsb3cgdGhlIGJhciBhbmQgcmlnaHRUb0xlZnQgKi9cbiAgcHJpdmF0ZSBnZXRNaW5WYWx1ZShuZXdQb3M6IG51bWJlciwgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sIGlzQWJvdmU6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGlzUlRMOiBib29sZWFuID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdDtcbiAgICBsZXQgdmFsdWU6IG51bWJlciA9IG51bGw7XG5cbiAgICBpZiAob3V0T2ZCb3VuZHMpIHtcbiAgICAgIGlmIChpc0Fib3ZlKSB7XG4gICAgICAgIHZhbHVlID0gaXNSVExcbiAgICAgICAgICA/IHRoaXMudmlld09wdGlvbnMuZmxvb3JcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuY2VpbCAtIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gaXNSVExcbiAgICAgICAgICA/IHRoaXMudmlld09wdGlvbnMuY2VpbCAtIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZVxuICAgICAgICAgIDogdGhpcy52aWV3T3B0aW9ucy5mbG9vcjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBpc1JUTFxuICAgICAgICA/IHRoaXMucG9zaXRpb25Ub1ZhbHVlKG5ld1BvcyArIHRoaXMuZHJhZ2dpbmcubG93TGltaXQpXG4gICAgICAgIDogdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zIC0gdGhpcy5kcmFnZ2luZy5sb3dMaW1pdCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJvdW5kU3RlcCh2YWx1ZSk7XG4gIH1cblxuICAvKiogR2V0IG1heCB2YWx1ZSBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgbmV3UG9zIGlzIG91dE9mQm91bmRzIGFib3ZlIG9yIGJlbG93IHRoZSBiYXIgYW5kIHJpZ2h0VG9MZWZ0ICovXG4gIHByaXZhdGUgZ2V0TWF4VmFsdWUobmV3UG9zOiBudW1iZXIsIG91dE9mQm91bmRzOiBib29sZWFuLCBpc0Fib3ZlOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc1JUTDogYm9vbGVhbiA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQ7XG4gICAgbGV0IHZhbHVlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgaWYgKG91dE9mQm91bmRzKSB7XG4gICAgICBpZiAoaXNBYm92ZSkge1xuICAgICAgICB2YWx1ZSA9IGlzUlRMXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmZsb29yICsgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlXG4gICAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLmNlaWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGlzUlRMXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmNlaWxcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuZmxvb3IgKyB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1JUTCkge1xuICAgICAgICB2YWx1ZSA9XG4gICAgICAgICAgdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zICsgdGhpcy5kcmFnZ2luZy5sb3dMaW1pdCkgK1xuICAgICAgICAgIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID1cbiAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9WYWx1ZShuZXdQb3MgLSB0aGlzLmRyYWdnaW5nLmxvd0xpbWl0KSArXG4gICAgICAgICAgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJvdW5kU3RlcCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG9uRHJhZ01vdmUoZXZlbnQ/OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdQb3M6IG51bWJlciA9IHRoaXMuZ2V0RXZlbnRQb3NpdGlvbihldmVudCk7XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5hbmltYXRlICYmICF0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGVPbk1vdmUpIHtcbiAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICB0aGlzLnNsaWRlckVsZW1lbnRBbmltYXRlQ2xhc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vdmluZyA9IHRydWU7XG5cbiAgICBsZXQgY2VpbExpbWl0OiBudW1iZXIsXG4gICAgICAgIGZsb29yTGltaXQ6IG51bWJlcixcbiAgICAgICAgZmxvb3JIYW5kbGVFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUsXG4gICAgICAgIGNlaWxIYW5kbGVFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmU7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQpIHtcbiAgICAgIGNlaWxMaW1pdCA9IHRoaXMuZHJhZ2dpbmcubG93TGltaXQ7XG4gICAgICBmbG9vckxpbWl0ID0gdGhpcy5kcmFnZ2luZy5oaWdoTGltaXQ7XG4gICAgICBmbG9vckhhbmRsZUVsZW1lbnQgPSB0aGlzLm1heEhhbmRsZUVsZW1lbnQ7XG4gICAgICBjZWlsSGFuZGxlRWxlbWVudCA9IHRoaXMubWluSGFuZGxlRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2VpbExpbWl0ID0gdGhpcy5kcmFnZ2luZy5oaWdoTGltaXQ7XG4gICAgICBmbG9vckxpbWl0ID0gdGhpcy5kcmFnZ2luZy5sb3dMaW1pdDtcbiAgICAgIGZsb29ySGFuZGxlRWxlbWVudCA9IHRoaXMubWluSGFuZGxlRWxlbWVudDtcbiAgICAgIGNlaWxIYW5kbGVFbGVtZW50ID0gdGhpcy5tYXhIYW5kbGVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGlzVW5kZXJGbG9vckxpbWl0OiBib29sZWFuID0gKG5ld1BvcyA8PSBmbG9vckxpbWl0KTtcbiAgICBjb25zdCBpc092ZXJDZWlsTGltaXQ6IGJvb2xlYW4gPSAobmV3UG9zID49IHRoaXMubWF4SGFuZGxlUG9zaXRpb24gLSBjZWlsTGltaXQpO1xuXG4gICAgbGV0IG5ld01pblZhbHVlOiBudW1iZXI7XG4gICAgbGV0IG5ld01heFZhbHVlOiBudW1iZXI7XG4gICAgaWYgKGlzVW5kZXJGbG9vckxpbWl0KSB7XG4gICAgICBpZiAoZmxvb3JIYW5kbGVFbGVtZW50LnBvc2l0aW9uID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG5ld01pblZhbHVlID0gdGhpcy5nZXRNaW5WYWx1ZShuZXdQb3MsIHRydWUsIGZhbHNlKTtcbiAgICAgIG5ld01heFZhbHVlID0gdGhpcy5nZXRNYXhWYWx1ZShuZXdQb3MsIHRydWUsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGlzT3ZlckNlaWxMaW1pdCkge1xuICAgICAgaWYgKGNlaWxIYW5kbGVFbGVtZW50LnBvc2l0aW9uID09PSB0aGlzLm1heEhhbmRsZVBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG5ld01heFZhbHVlID0gdGhpcy5nZXRNYXhWYWx1ZShuZXdQb3MsIHRydWUsIHRydWUpO1xuICAgICAgbmV3TWluVmFsdWUgPSB0aGlzLmdldE1pblZhbHVlKG5ld1BvcywgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld01pblZhbHVlID0gdGhpcy5nZXRNaW5WYWx1ZShuZXdQb3MsIGZhbHNlLCBmYWxzZSk7XG4gICAgICBuZXdNYXhWYWx1ZSA9IHRoaXMuZ2V0TWF4VmFsdWUobmV3UG9zLCBmYWxzZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb25UcmFja2luZ0JhcihuZXdNaW5WYWx1ZSwgbmV3TWF4VmFsdWUpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBuZXcgdmFsdWUgYW5kIHBvc2l0aW9uIGZvciB0aGUgZW50aXJlIGJhclxuICBwcml2YXRlIHBvc2l0aW9uVHJhY2tpbmdCYXIobmV3TWluVmFsdWU6IG51bWJlciwgbmV3TWF4VmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5taW5MaW1pdCkgJiZcbiAgICAgICAgbmV3TWluVmFsdWUgPCB0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0KSB7XG4gICAgICBuZXdNaW5WYWx1ZSA9IHRoaXMudmlld09wdGlvbnMubWluTGltaXQ7XG4gICAgICBuZXdNYXhWYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KG5ld01pblZhbHVlICsgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICB9XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1heExpbWl0KSAmJlxuICAgICAgICBuZXdNYXhWYWx1ZSA+IHRoaXMudmlld09wdGlvbnMubWF4TGltaXQpIHtcbiAgICAgIG5ld01heFZhbHVlID0gdGhpcy52aWV3T3B0aW9ucy5tYXhMaW1pdDtcbiAgICAgIG5ld01pblZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQobmV3TWF4VmFsdWUgLSB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgIH1cblxuICAgIHRoaXMudmlld0xvd1ZhbHVlID0gbmV3TWluVmFsdWU7XG4gICAgdGhpcy52aWV3SGlnaFZhbHVlID0gbmV3TWF4VmFsdWU7XG4gICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWluLCB0aGlzLnZhbHVlVG9Qb3NpdGlvbihuZXdNaW5WYWx1ZSkpO1xuICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NYXgsIHRoaXMudmFsdWVUb1Bvc2l0aW9uKG5ld01heFZhbHVlKSk7XG4gIH1cblxuICAvLyBTZXQgdGhlIG5ldyB2YWx1ZSBhbmQgcG9zaXRpb24gdG8gdGhlIGN1cnJlbnQgdHJhY2tpbmcgaGFuZGxlXG4gIHByaXZhdGUgcG9zaXRpb25UcmFja2luZ0hhbmRsZShuZXdWYWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5TWluTWF4TGltaXQobmV3VmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5wdXNoUmFuZ2UpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5UHVzaFJhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLm5vU3dpdGNoaW5nKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluICYmXG4gICAgICAgICAgICAgIG5ld1ZhbHVlID4gdGhpcy52aWV3SGlnaFZhbHVlKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuYXBwbHlNaW5NYXhSYW5nZSh0aGlzLnZpZXdIaWdoVmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXggJiZcbiAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlIDwgdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5hcHBseU1pbk1heFJhbmdlKHRoaXMudmlld0xvd1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5TWluTWF4UmFuZ2UobmV3VmFsdWUpO1xuICAgICAgICAvKiBUaGlzIGlzIHRvIGNoZWNrIGlmIHdlIG5lZWQgdG8gc3dpdGNoIHRoZSBtaW4gYW5kIG1heCBoYW5kbGVzICovXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbiAmJiBuZXdWYWx1ZSA+IHRoaXMudmlld0hpZ2hWYWx1ZSkge1xuICAgICAgICAgIHRoaXMudmlld0xvd1ZhbHVlID0gdGhpcy52aWV3SGlnaFZhbHVlO1xuICAgICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKFBvaW50ZXJUeXBlLk1pbiwgdGhpcy5tYXhIYW5kbGVFbGVtZW50LnBvc2l0aW9uKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID0gUG9pbnRlclR5cGUuTWF4O1xuICAgICAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1heCAmJlxuICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlIDwgdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NYXgsIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy51cGRhdGVBcmlhQXR0cmlidXRlcygpO1xuICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IFBvaW50ZXJUeXBlLk1pbjtcbiAgICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRDdXJyZW50VHJhY2tpbmdWYWx1ZSgpICE9PSBuZXdWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgIHRoaXMudmlld0xvd1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciwgdGhpcy52YWx1ZVRvUG9zaXRpb24obmV3VmFsdWUpKTtcbiAgICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5TWluTWF4TGltaXQobmV3VmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0KSAmJiBuZXdWYWx1ZSA8IHRoaXMudmlld09wdGlvbnMubWluTGltaXQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0O1xuICAgIH1cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMubWF4TGltaXQpICYmIG5ld1ZhbHVlID4gdGhpcy52aWV3T3B0aW9ucy5tYXhMaW1pdCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMubWF4TGltaXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlNaW5NYXhSYW5nZShuZXdWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBvcHBvc2l0ZVZhbHVlOiBudW1iZXIgPSAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pXG4gICAgICA/IHRoaXMudmlld0hpZ2hWYWx1ZVxuICAgICAgOiB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSBNYXRoLmFicyhuZXdWYWx1ZSAtIG9wcG9zaXRlVmFsdWUpO1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSkpIHtcbiAgICAgIGlmIChkaWZmZXJlbmNlIDwgdGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgICByZXR1cm4gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3SGlnaFZhbHVlIC0gdGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3TG93VmFsdWUgKyB0aGlzLnZpZXdPcHRpb25zLm1pblJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UpKSB7XG4gICAgICBpZiAoZGlmZmVyZW5jZSA+IHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0hpZ2hWYWx1ZSAtIHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0xvd1ZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5tYXhSYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVB1c2hSYW5nZShuZXdWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pXG4gICAgICAgICAgPyB0aGlzLnZpZXdIaWdoVmFsdWUgLSBuZXdWYWx1ZVxuICAgICAgICAgIDogbmV3VmFsdWUgLSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICBjb25zdCBtaW5SYW5nZTogbnVtYmVyID0gKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1pblJhbmdlKSlcbiAgICAgICAgICA/IHRoaXMudmlld09wdGlvbnMubWluUmFuZ2VcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBjb25zdCBtYXhSYW5nZTogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5tYXhSYW5nZTtcbiAgICAvLyBpZiBzbWFsbGVyIHRoYW4gbWluUmFuZ2VcbiAgICBpZiAoZGlmZmVyZW5jZSA8IG1pblJhbmdlKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQoXG4gICAgICAgICAgTWF0aC5taW4obmV3VmFsdWUgKyBtaW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIG5ld1ZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3SGlnaFZhbHVlIC0gbWluUmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWF4LCB0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdIaWdoVmFsdWUpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgdGhpcy52aWV3TG93VmFsdWUgPSBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChcbiAgICAgICAgICBNYXRoLm1heChuZXdWYWx1ZSAtIG1pblJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLmZsb29yKSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIG5ld1ZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3TG93VmFsdWUgKyBtaW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NaW4sIHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0xvd1ZhbHVlKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG4gICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQobWF4UmFuZ2UpICYmIGRpZmZlcmVuY2UgPiBtYXhSYW5nZSkge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIG1heFJhbmdlXG4gICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQobmV3VmFsdWUgKyBtYXhSYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NYXgsIHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0hpZ2hWYWx1ZSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgdGhpcy52aWV3TG93VmFsdWUgPSBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChuZXdWYWx1ZSAtIG1heFJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICAgICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKFBvaW50ZXJUeXBlLk1pbiwgdGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3TG93VmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDaGFuZ2VDb250ZXh0KCk6IENoYW5nZUNvbnRleHQge1xuICAgIGNvbnN0IGNoYW5nZUNvbnRleHQ6IENoYW5nZUNvbnRleHQgPSBuZXcgQ2hhbmdlQ29udGV4dCgpO1xuICAgIGNoYW5nZUNvbnRleHQucG9pbnRlclR5cGUgPSB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXI7XG4gICAgY2hhbmdlQ29udGV4dC52YWx1ZSA9ICt0aGlzLnZhbHVlO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBjaGFuZ2VDb250ZXh0LmhpZ2hWYWx1ZSA9ICt0aGlzLmhpZ2hWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZUNvbnRleHQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwidGVtcGxhdGVcIj5cbiAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHt0b29sdGlwOiB0b29sdGlwLCBwbGFjZW1lbnQ6IHBsYWNlbWVudCwgY29udGVudDogY29udGVudH1cIj48L25nLXRlbXBsYXRlPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCIhdGVtcGxhdGVcIj5cbiAgPGRpdiBjbGFzcz1cIm5neC1zbGlkZXItaW5uZXItdG9vbHRpcFwiIFthdHRyLnRpdGxlXT1cInRvb2x0aXBcIiBbYXR0ci5kYXRhLXRvb2x0aXAtcGxhY2VtZW50XT1cInBsYWNlbWVudFwiPlxuICAgIHt7Y29udGVudH19XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5uZ3gtc2xpZGVyLWlubmVyLXRvb2x0aXB7aGVpZ2h0OjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcFdyYXBwZXJDb21wb25lbnQge1xuICBASW5wdXQoKVxuICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICB0b29sdGlwOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcGxhY2VtZW50OiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgY29udGVudDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTbGlkZXJDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNsaWRlckhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2xpZGVyTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1sYWJlbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9vbHRpcFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2x0aXAtd3JhcHBlci5jb21wb25lbnQnO1xuXG4vKipcbiAqIE5neFNsaWRlciBtb2R1bGVcbiAqXG4gKiBUaGUgbW9kdWxlIGV4cG9ydHMgdGhlIHNsaWRlciBjb21wb25lbnRcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTbGlkZXJDb21wb25lbnQsXG4gICAgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICBTbGlkZXJIYW5kbGVEaXJlY3RpdmUsXG4gICAgU2xpZGVyTGFiZWxEaXJlY3RpdmUsXG4gICAgVG9vbHRpcFdyYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNsaWRlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFNsaWRlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJTdWJqZWN0IiwidGhyb3R0bGVUaW1lIiwidGFwIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlcjIiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkhvc3RCaW5kaW5nIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJFdmVudEVtaXR0ZXIiLCJkaXN0aW5jdFVudGlsQ2hhbmdlZCIsImZpbHRlciIsIkNvbXBvbmVudCIsIk5nWm9uZSIsIklucHV0IiwiT3V0cHV0IiwiVmlld0NoaWxkIiwiQ29udGVudENoaWxkIiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNwQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUvRSx1QkFBMEIsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7QUFFRCxzQkEwRXlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFN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