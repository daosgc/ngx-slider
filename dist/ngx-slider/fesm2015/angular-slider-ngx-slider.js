import { Subject } from 'rxjs';
import { throttleTime, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import detectPassiveEvents from 'detect-passive-events';
import { Directive, ElementRef, Renderer2, HostBinding, ChangeDetectorRef, Component, ViewChild, HostListener, Input, EventEmitter, Output, ContentChild, forwardRef, NgZone, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const LabelType = {
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
class Options {
    constructor() {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const PointerType = {
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
class ChangeContext {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 *  Collection of functions to handle conversions/lookups of values
 */
class ValueHelper {
    /**
     * @param {?} value
     * @return {?}
     */
    static isNullOrUndefined(value) {
        return value === undefined || value === null;
    }
    /**
     * @param {?} array1
     * @param {?} array2
     * @return {?}
     */
    static areArraysEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; ++i) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} val
     * @param {?} minVal
     * @param {?} maxVal
     * @return {?}
     */
    static linearValueToPosition(val, minVal, maxVal) {
        /** @type {?} */
        const range = maxVal - minVal;
        return (val - minVal) / range;
    }
    /**
     * @param {?} val
     * @param {?} minVal
     * @param {?} maxVal
     * @return {?}
     */
    static logValueToPosition(val, minVal, maxVal) {
        val = Math.log(val);
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        /** @type {?} */
        const range = maxVal - minVal;
        return (val - minVal) / range;
    }
    /**
     * @param {?} percent
     * @param {?} minVal
     * @param {?} maxVal
     * @return {?}
     */
    static linearPositionToValue(percent, minVal, maxVal) {
        return percent * (maxVal - minVal) + minVal;
    }
    /**
     * @param {?} percent
     * @param {?} minVal
     * @param {?} maxVal
     * @return {?}
     */
    static logPositionToValue(percent, minVal, maxVal) {
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        /** @type {?} */
        const value = percent * (maxVal - minVal) + minVal;
        return Math.exp(value);
    }
    /**
     * @param {?} modelValue
     * @param {?} stepsArray
     * @return {?}
     */
    static findStepIndex(modelValue, stepsArray) {
        /** @type {?} */
        const differences = stepsArray.map((step) => Math.abs(modelValue - step.value));
        /** @type {?} */
        let minDifferenceIndex = 0;
        for (let index = 0; index < stepsArray.length; index++) {
            if (differences[index] !== differences[minDifferenceIndex] && differences[index] < differences[minDifferenceIndex]) {
                minDifferenceIndex = index;
            }
        }
        return minDifferenceIndex;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Helper with compatibility functions to support different browsers
 */
class CompatibilityHelper {
    /**
     * Workaround for TouchEvent constructor sadly not being available on all browsers (e.g. Firefox, Safari)
     * @param {?} event
     * @return {?}
     */
    static isTouchEvent(event) {
        if ((/** @type {?} */ (window)).TouchEvent !== undefined) {
            return event instanceof TouchEvent;
        }
        return event.touches !== undefined;
    }
    /**
     * Detect presence of ResizeObserver API
     * @return {?}
     */
    static isResizeObserverAvailable() {
        return (/** @type {?} */ (window)).ResizeObserver !== undefined;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Helper with mathematical functions
 */
class MathHelper {
    /**
     * @param {?} value
     * @param {?} precisionLimit
     * @return {?}
     */
    static roundToPrecisionLimit(value, precisionLimit) {
        return +(value.toPrecision(precisionLimit));
    }
    /**
     * @param {?} value
     * @param {?} modulo
     * @param {?} precisionLimit
     * @return {?}
     */
    static isModuloWithinPrecisionLimit(value, modulo, precisionLimit) {
        /** @type {?} */
        const limit = Math.pow(10, -precisionLimit);
        return Math.abs(value % modulo) <= limit || Math.abs(Math.abs(value % modulo) - modulo) <= limit;
    }
    /**
     * @param {?} value
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    static clampToRange(value, floor, ceil) {
        return Math.min(Math.max(value, floor), ceil);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class EventListener {
    constructor() {
        this.eventName = null;
        this.events = null;
        this.eventsSubscription = null;
        this.teardownCallback = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Helper class to attach event listeners to DOM elements with debounce support using rxjs
 */
class EventListenerHelper {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
    }
    /**
     * @param {?} nativeElement
     * @param {?} eventName
     * @param {?} callback
     * @param {?=} throttleInterval
     * @return {?}
     */
    attachPassiveEventListener(nativeElement, eventName, callback, throttleInterval) {
        // Only use passive event listeners if the browser supports it
        if (detectPassiveEvents.hasSupport !== true) {
            return this.attachEventListener(nativeElement, eventName, callback, throttleInterval);
        }
        /** @type {?} */
        const listener = new EventListener();
        listener.eventName = eventName;
        listener.events = new Subject();
        /** @type {?} */
        const observerCallback = (event) => {
            listener.events.next(event);
        };
        nativeElement.addEventListener(eventName, observerCallback, { passive: true, capture: false });
        listener.teardownCallback = () => {
            nativeElement.removeEventListener(eventName, observerCallback, { passive: true, capture: false });
        };
        listener.eventsSubscription = listener.events
            .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
            ? throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
            : tap(() => { }) // no-op
        )
            .subscribe((event) => {
            callback(event);
        });
        return listener;
    }
    /**
     * @param {?} eventListener
     * @return {?}
     */
    detachEventListener(eventListener) {
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
    }
    /**
     * @param {?} nativeElement
     * @param {?} eventName
     * @param {?} callback
     * @param {?=} throttleInterval
     * @return {?}
     */
    attachEventListener(nativeElement, eventName, callback, throttleInterval) {
        /** @type {?} */
        const listener = new EventListener();
        listener.eventName = eventName;
        listener.events = new Subject();
        /** @type {?} */
        const observerCallback = (event) => {
            listener.events.next(event);
        };
        listener.teardownCallback = this.renderer.listen(nativeElement, eventName, observerCallback);
        listener.eventsSubscription = listener.events
            .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
            ? throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
            : tap(() => { }) // no-op
        )
            .subscribe((event) => { callback(event); });
        return listener;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SliderElementDirective {
    /**
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} changeDetectionRef
     */
    constructor(elemRef, renderer, changeDetectionRef) {
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
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * @return {?}
     */
    get dimension() {
        return this._dimension;
    }
    /**
     * @return {?}
     */
    get alwaysHide() {
        return this._alwaysHide;
    }
    /**
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @return {?}
     */
    get scale() {
        return this._scale;
    }
    /**
     * @param {?} hide
     * @return {?}
     */
    setAlwaysHide(hide) {
        this._alwaysHide = hide;
        if (hide) {
            this.visibility = 'hidden';
        }
        else {
            this.visibility = 'visible';
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.opacity = 0;
    }
    /**
     * @return {?}
     */
    show() {
        if (this.alwaysHide) {
            return;
        }
        this.opacity = 1;
    }
    /**
     * @return {?}
     */
    isVisible() {
        if (this.alwaysHide) {
            return false;
        }
        return this.opacity !== 0;
    }
    /**
     * @param {?} vertical
     * @return {?}
     */
    setVertical(vertical) {
        this._vertical = vertical;
        if (this._vertical) {
            this.left = '';
            this.width = '';
        }
        else {
            this.bottom = '';
            this.height = '';
        }
    }
    /**
     * @param {?} scale
     * @return {?}
     */
    setScale(scale) {
        this._scale = scale;
    }
    /**
     * @param {?} pos
     * @return {?}
     */
    setPosition(pos) {
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
    }
    /**
     * @return {?}
     */
    calculateDimension() {
        /** @type {?} */
        const val = this.getBoundingClientRect();
        if (this.vertical) {
            this._dimension = (val.bottom - val.top) * this.scale;
        }
        else {
            this._dimension = (val.right - val.left) * this.scale;
        }
    }
    /**
     * @param {?} dim
     * @return {?}
     */
    setDimension(dim) {
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
    }
    /**
     * @return {?}
     */
    getBoundingClientRect() {
        return this.elemRef.nativeElement.getBoundingClientRect();
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @param {?=} debounceInterval
     * @return {?}
     */
    on(eventName, callback, debounceInterval) {
        /** @type {?} */
        const listener = this.eventListenerHelper.attachEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
        this.eventListeners.push(listener);
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @param {?=} debounceInterval
     * @return {?}
     */
    onPassive(eventName, callback, debounceInterval) {
        /** @type {?} */
        const listener = this.eventListenerHelper.attachPassiveEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
        this.eventListeners.push(listener);
    }
    /**
     * @param {?=} eventName
     * @return {?}
     */
    off(eventName) {
        /** @type {?} */
        let listenersToKeep;
        /** @type {?} */
        let listenersToRemove;
        if (!ValueHelper.isNullOrUndefined(eventName)) {
            listenersToKeep = this.eventListeners.filter((event) => event.eventName !== eventName);
            listenersToRemove = this.eventListeners.filter((event) => event.eventName === eventName);
        }
        else {
            listenersToKeep = [];
            listenersToRemove = this.eventListeners;
        }
        for (const listener of listenersToRemove) {
            this.eventListenerHelper.detachEventListener(listener);
        }
        this.eventListeners = listenersToKeep;
    }
    /**
     * @return {?}
     */
    isRefDestroyed() {
        return ValueHelper.isNullOrUndefined(this.changeDetectionRef) || this.changeDetectionRef['destroyed'];
    }
}
SliderElementDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxSliderElement]'
            },] },
];
/** @nocollapse */
SliderElementDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
SliderElementDirective.propDecorators = {
    opacity: [{ type: HostBinding, args: ['style.opacity',] }],
    visibility: [{ type: HostBinding, args: ['style.visibility',] }],
    left: [{ type: HostBinding, args: ['style.left',] }],
    bottom: [{ type: HostBinding, args: ['style.bottom',] }],
    height: [{ type: HostBinding, args: ['style.height',] }],
    width: [{ type: HostBinding, args: ['style.width',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SliderHandleDirective extends SliderElementDirective {
    /**
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} changeDetectionRef
     */
    constructor(elemRef, renderer, changeDetectionRef) {
        super(elemRef, renderer, changeDetectionRef);
        this.active = false;
        this.role = '';
        this.tabindex = '';
        this.ariaOrientation = '';
        this.ariaLabel = '';
        this.ariaLabelledBy = '';
        this.ariaValueNow = '';
        this.ariaValueText = '';
        this.ariaValueMin = '';
        this.ariaValueMax = '';
    }
    /**
     * @return {?}
     */
    focus() {
        this.elemRef.nativeElement.focus();
    }
}
SliderHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxSliderHandle]'
            },] },
];
/** @nocollapse */
SliderHandleDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
SliderHandleDirective.propDecorators = {
    active: [{ type: HostBinding, args: ['class.ngx-slider-active',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    tabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    ariaOrientation: [{ type: HostBinding, args: ['attr.aria-orientation',] }],
    ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
    ariaLabelledBy: [{ type: HostBinding, args: ['attr.aria-labelledby',] }],
    ariaValueNow: [{ type: HostBinding, args: ['attr.aria-valuenow',] }],
    ariaValueText: [{ type: HostBinding, args: ['attr.aria-valuetext',] }],
    ariaValueMin: [{ type: HostBinding, args: ['attr.aria-valuemin',] }],
    ariaValueMax: [{ type: HostBinding, args: ['attr.aria-valuemax',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SliderLabelDirective extends SliderElementDirective {
    /**
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} changeDetectionRef
     */
    constructor(elemRef, renderer, changeDetectionRef) {
        super(elemRef, renderer, changeDetectionRef);
        this._value = null;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        /** @type {?} */
        let recalculateDimension = false;
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
    }
}
SliderLabelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxSliderLabel]'
            },] },
];
/** @nocollapse */
SliderLabelDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Tick {
    constructor() {
        this.selected = false;
        this.style = {};
        this.tooltip = null;
        this.tooltipPlacement = null;
        this.value = null;
        this.valueTooltip = null;
        this.valueTooltipPlacement = null;
        this.legend = null;
    }
}
class Dragging {
    constructor() {
        this.active = false;
        this.value = 0;
        this.difference = 0;
        this.position = 0;
        this.lowLimit = 0;
        this.highLimit = 0;
    }
}
class ModelValues {
    /**
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    static compare(x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value && x.highValue === y.highValue;
    }
}
class ModelChange extends ModelValues {
    /**
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    static compare(x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value &&
            x.highValue === y.highValue &&
            x.forceChange === y.forceChange;
    }
}
/** @type {?} */
const NGX_SLIDER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef(() => SliderComponent),
    multi: true,
};
class SliderComponent {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} changeDetectionRef
     * @param {?} zone
     */
    constructor(renderer, elementRef, changeDetectionRef, zone) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetectionRef = changeDetectionRef;
        this.zone = zone;
        // Model for low value of slider. For simple slider, this is the only input. For range slider, this is the low value.
        this.value = null;
        // Output for low value slider to support two-way bindings
        this.valueChange = new EventEmitter();
        // Model for high value of slider. Not used in simple slider. For range slider, this is the high value.
        this.highValue = null;
        // Output for high value slider to support two-way bindings
        this.highValueChange = new EventEmitter();
        // An object with all the other options of the slider.
        // Each option can be updated at runtime and the slider will automatically be re-rendered.
        this.options = new Options();
        // Event emitted when user starts interaction with the slider
        this.userChangeStart = new EventEmitter();
        // Event emitted on each change coming from user interaction
        this.userChange = new EventEmitter();
        // Event emitted when user finishes interaction with the slider
        this.userChangeEnd = new EventEmitter();
        this.initHasRun = false;
        this.inputModelChangeSubject = new Subject();
        this.inputModelChangeSubscription = null;
        this.outputModelChangeSubject = new Subject();
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
    /**
     * @param {?} manualRefresh
     * @return {?}
     */
    set manualRefresh(manualRefresh) {
        this.unsubscribeManualRefresh();
        this.manualRefreshSubscription = manualRefresh.subscribe(() => {
            setTimeout(() => this.calculateViewDimensionsAndDetectChanges());
        });
    }
    /**
     * @param {?} triggerFocus
     * @return {?}
     */
    set triggerFocus(triggerFocus) {
        this.unsubscribeTriggerFocus();
        this.triggerFocusSubscription = triggerFocus.subscribe((pointerType) => {
            this.focusPointer(pointerType);
        });
    }
    /**
     * @return {?}
     */
    get range() {
        return !ValueHelper.isNullOrUndefined(this.value) && !ValueHelper.isNullOrUndefined(this.highValue);
    }
    /**
     * @return {?}
     */
    get showTicks() {
        return this.viewOptions.showTicks;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        // We need to run these two things first, before the rest of the init in ngAfterViewInit(),
        // because these two settings are set through @HostBinding and Angular change detection
        // mechanism doesn't like them changing in ngAfterViewInit()
        this.updateDisabledState();
        this.updateVerticalState();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unbindEvents();
        this.unsubscribeResizeObserver();
        this.unsubscribeInputModelChangeSubject();
        this.unsubscribeOutputModelChangeSubject();
        this.unsubscribeManualRefresh();
        this.unsubscribeTriggerFocus();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
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
    }
    /**
     * @param {?} onChangeCallback
     * @return {?}
     */
    registerOnChange(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
    /**
     * @param {?} onTouchedCallback
     * @return {?}
     */
    registerOnTouched(onTouchedCallback) {
        this.onTouchedCallback = onTouchedCallback;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.viewOptions.disabled = isDisabled;
        this.updateDisabledState();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.calculateViewDimensionsAndDetectChanges();
    }
    /**
     * @param {?=} interval
     * @return {?}
     */
    subscribeInputModelChangeSubject(interval) {
        this.inputModelChangeSubscription = this.inputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), 
        // Hack to reset the status of the distinctUntilChanged() - if a "fake" event comes through with forceChange=true,
        // we forcefully by-pass distinctUntilChanged(), but otherwise drop the event
        filter((modelChange) => !modelChange.forceChange && !modelChange.internalChange), (!ValueHelper.isNullOrUndefined(interval))
            ? throttleTime(interval, undefined, { leading: true, trailing: true })
            : tap(() => { }) // no-op
        )
            .subscribe((modelChange) => this.applyInputModelChange(modelChange));
    }
    /**
     * @param {?=} interval
     * @return {?}
     */
    subscribeOutputModelChangeSubject(interval) {
        this.outputModelChangeSubscription = this.outputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), (!ValueHelper.isNullOrUndefined(interval))
            ? throttleTime(interval, undefined, { leading: true, trailing: true })
            : tap(() => { }) // no-op
        )
            .subscribe((modelChange) => this.publishOutputModelChange(modelChange));
    }
    /**
     * @return {?}
     */
    subscribeResizeObserver() {
        if (CompatibilityHelper.isResizeObserverAvailable()) {
            this.resizeObserver = new ResizeObserver(() => this.calculateViewDimensionsAndDetectChanges());
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    unsubscribeResizeObserver() {
        if (CompatibilityHelper.isResizeObserverAvailable() && this.resizeObserver !== null) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeOnMove() {
        if (!ValueHelper.isNullOrUndefined(this.onMoveEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
            this.onMoveEventListener = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeOnEnd() {
        if (!ValueHelper.isNullOrUndefined(this.onEndEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onEndEventListener);
            this.onEndEventListener = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeInputModelChangeSubject() {
        if (!ValueHelper.isNullOrUndefined(this.inputModelChangeSubscription)) {
            this.inputModelChangeSubscription.unsubscribe();
            this.inputModelChangeSubscription = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeOutputModelChangeSubject() {
        if (!ValueHelper.isNullOrUndefined(this.outputModelChangeSubscription)) {
            this.outputModelChangeSubscription.unsubscribe();
            this.outputModelChangeSubscription = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeManualRefresh() {
        if (!ValueHelper.isNullOrUndefined(this.manualRefreshSubscription)) {
            this.manualRefreshSubscription.unsubscribe();
            this.manualRefreshSubscription = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeTriggerFocus() {
        if (!ValueHelper.isNullOrUndefined(this.triggerFocusSubscription)) {
            this.triggerFocusSubscription.unsubscribe();
            this.triggerFocusSubscription = null;
        }
    }
    /**
     * @param {?} pointerType
     * @return {?}
     */
    getPointerElement(pointerType) {
        if (pointerType === PointerType.Min) {
            return this.minHandleElement;
        }
        else if (pointerType === PointerType.Max) {
            return this.maxHandleElement;
        }
        return null;
    }
    /**
     * @return {?}
     */
    getCurrentTrackingValue() {
        if (this.currentTrackingPointer === PointerType.Min) {
            return this.viewLowValue;
        }
        else if (this.currentTrackingPointer === PointerType.Max) {
            return this.viewHighValue;
        }
        return null;
    }
    /**
     * @param {?} modelValue
     * @return {?}
     */
    modelValueToViewValue(modelValue) {
        if (ValueHelper.isNullOrUndefined(modelValue)) {
            return NaN;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            return ValueHelper.findStepIndex(+modelValue, this.viewOptions.stepsArray);
        }
        return +modelValue;
    }
    /**
     * @param {?} viewValue
     * @return {?}
     */
    viewValueToModelValue(viewValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            return this.getStepValue(viewValue);
        }
        return viewValue;
    }
    /**
     * @param {?} sliderValue
     * @return {?}
     */
    getStepValue(sliderValue) {
        /** @type {?} */
        const step = this.viewOptions.stepsArray[sliderValue];
        return (!ValueHelper.isNullOrUndefined(step)) ? step.value : NaN;
    }
    /**
     * @return {?}
     */
    applyViewChange() {
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
    }
    /**
     * @param {?} modelChange
     * @return {?}
     */
    applyInputModelChange(modelChange) {
        /** @type {?} */
        const normalisedModelChange = this.normaliseModelValues(modelChange);
        /** @type {?} */
        const normalisationChange = !ModelValues.compare(modelChange, normalisedModelChange);
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
    }
    /**
     * @param {?} modelChange
     * @return {?}
     */
    publishOutputModelChange(modelChange) {
        /** @type {?} */
        const emitOutputs = () => {
            this.valueChange.emit(modelChange.value);
            if (this.range) {
                this.highValueChange.emit(modelChange.highValue);
            }
            if (!ValueHelper.isNullOrUndefined(this.onChangeCallback)) {
                if (this.range) {
                    this.onChangeCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    this.onChangeCallback(modelChange.value);
                }
            }
            if (!ValueHelper.isNullOrUndefined(this.onTouchedCallback)) {
                if (this.range) {
                    this.onTouchedCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    this.onTouchedCallback(modelChange.value);
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
            setTimeout(() => { emitOutputs(); });
        }
    }
    /**
     * @param {?} input
     * @return {?}
     */
    normaliseModelValues(input) {
        /** @type {?} */
        const normalisedInput = new ModelValues();
        normalisedInput.value = input.value;
        normalisedInput.highValue = input.highValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
            // When using steps array, only round to nearest step in the array
            // No other enforcement can be done, as the step array may be out of order, and that is perfectly fine
            if (this.viewOptions.enforceStepsArray) {
                /** @type {?} */
                const valueIndex = ValueHelper.findStepIndex(normalisedInput.value, this.viewOptions.stepsArray);
                normalisedInput.value = this.viewOptions.stepsArray[valueIndex].value;
                if (this.range) {
                    /** @type {?} */
                    const highValueIndex = ValueHelper.findStepIndex(normalisedInput.highValue, this.viewOptions.stepsArray);
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
                    const tempValue = input.value;
                    normalisedInput.value = input.highValue;
                    normalisedInput.highValue = tempValue;
                }
            }
        }
        return normalisedInput;
    }
    /**
     * @return {?}
     */
    renormaliseModelValues() {
        /** @type {?} */
        const previousModelValues = {
            value: this.value,
            highValue: this.highValue
        };
        /** @type {?} */
        const normalisedModelValues = this.normaliseModelValues(previousModelValues);
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
    }
    /**
     * @return {?}
     */
    onChangeOptions() {
        if (!this.initHasRun) {
            return;
        }
        /** @type {?} */
        const previousInputEventsInterval = this.viewOptions.inputEventsInterval;
        /** @type {?} */
        const previousOutputEventsInterval = this.viewOptions.outputEventsInterval;
        /** @type {?} */
        const previousOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
        this.applyOptions();
        /** @type {?} */
        const newOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
        /** @type {?} */
        const rebindEvents = !ValueHelper.areArraysEqual(previousOptionsInfluencingEventBindings, newOptionsInfluencingEventBindings);
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
    }
    /**
     * @return {?}
     */
    applyOptions() {
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
            this.viewOptions.combineLabels = (minValue, maxValue) => {
                return minValue + ' - ' + maxValue;
            };
        }
        if (this.viewOptions.logScale && this.viewOptions.floor === 0) {
            throw Error('Can\'t use floor=0 with logarithmic scale');
        }
    }
    /**
     * @return {?}
     */
    applyStepsArrayOptions() {
        this.viewOptions.floor = 0;
        this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
        this.viewOptions.step = 1;
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = (modelValue) => {
                if (this.viewOptions.bindIndexForStepsArray) {
                    return String(this.getStepValue(modelValue));
                }
                return String(modelValue);
            };
        }
    }
    /**
     * @return {?}
     */
    applyFloorCeilOptions() {
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
            this.viewOptions.translate = (value) => String(value);
        }
    }
    /**
     * @param {?=} rebindEvents
     * @return {?}
     */
    resetSlider(rebindEvents = true) {
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
    }
    /**
     * @param {?} pointerType
     * @return {?}
     */
    focusPointer(pointerType) {
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
    }
    /**
     * @return {?}
     */
    refocusPointerIfNeeded() {
        if (!ValueHelper.isNullOrUndefined(this.currentFocusPointer)) {
            this.onPointerFocus(this.currentFocusPointer);
            /** @type {?} */
            const element = this.getPointerElement(this.currentFocusPointer);
            element.focus();
        }
    }
    /**
     * @return {?}
     */
    manageElementsStyle() {
        this.updateScale();
        this.floorLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        this.ceilLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        /** @type {?} */
        const hideLabelsForTicks = this.viewOptions.showTicksValues && !this.intermediateTicks;
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
            setTimeout(() => { this.resetSlider(); });
        }
        // Changing animate class may interfere with slider reset/initialisation, so we should set it separately,
        // after all is properly set up
        if (this.sliderElementAnimateClass !== this.viewOptions.animate) {
            setTimeout(() => { this.sliderElementAnimateClass = this.viewOptions.animate; });
        }
    }
    /**
     * @return {?}
     */
    manageEventsBindings() {
        if (this.viewOptions.disabled || this.viewOptions.readOnly) {
            this.unbindEvents();
        }
        else {
            this.bindEvents();
        }
    }
    /**
     * @return {?}
     */
    updateDisabledState() {
        this.sliderElementDisabledAttr = this.viewOptions.disabled ? 'disabled' : null;
    }
    /**
     * @return {?}
     */
    updateVerticalState() {
        this.sliderElementVerticalClass = this.viewOptions.vertical;
        for (const element of this.getAllSliderElements()) {
            // This is also called before ngAfterInit, so need to check that view child bindings work
            if (!ValueHelper.isNullOrUndefined(element)) {
                element.setVertical(this.viewOptions.vertical);
            }
        }
    }
    /**
     * @return {?}
     */
    updateScale() {
        for (const element of this.getAllSliderElements()) {
            element.setScale(this.viewOptions.scale);
        }
    }
    /**
     * @return {?}
     */
    getAllSliderElements() {
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
    }
    /**
     * @return {?}
     */
    initHandles() {
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
    }
    /**
     * @return {?}
     */
    addAccessibility() {
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
    }
    /**
     * @return {?}
     */
    updateAriaAttributes() {
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
    }
    /**
     * @return {?}
     */
    calculateViewDimensions() {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.handleDimension)) {
            this.minHandleElement.setDimension(this.viewOptions.handleDimension);
        }
        else {
            this.minHandleElement.calculateDimension();
        }
        /** @type {?} */
        const handleWidth = this.minHandleElement.dimension;
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
    }
    /**
     * @return {?}
     */
    calculateViewDimensionsAndDetectChanges() {
        this.calculateViewDimensions();
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    }
    /**
     * If the slider reference is already destroyed
     * @return {?} boolean - true if ref is destroyed
     */
    isRefDestroyed() {
        return this.changeDetectionRef['destroyed'];
    }
    /**
     * @return {?}
     */
    updateTicksScale() {
        if (!this.viewOptions.showTicks) {
            setTimeout(() => { this.sliderElementWithLegendClass = false; });
            return;
        }
        /** @type {?} */
        const ticksArray = !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray)
            ? this.viewOptions.ticksArray
            : this.getTicksArray();
        /** @type {?} */
        const translate = this.viewOptions.vertical ? 'translateY' : 'translateX';
        if (this.viewOptions.rightToLeft) {
            ticksArray.reverse();
        }
        /** @type {?} */
        const tickValueStep = !ValueHelper.isNullOrUndefined(this.viewOptions.tickValueStep) ? this.viewOptions.tickValueStep :
            (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) ? this.viewOptions.tickStep : this.viewOptions.step);
        /** @type {?} */
        let hasAtLeastOneLegend = false;
        /** @type {?} */
        const newTicks = ticksArray.map((value) => {
            /** @type {?} */
            let position = this.valueToPosition(value);
            if (this.viewOptions.vertical) {
                position = this.maxHandlePosition - position;
            }
            /** @type {?} */
            const translation = translate + '(' + Math.round(position) + 'px)';
            /** @type {?} */
            const tick = new Tick();
            tick.selected = this.isTickSelected(value);
            tick.style = {
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-o-transform': translation,
                '-ms-transform': translation,
                transform: translation,
            };
            if (tick.selected && !ValueHelper.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
                tick.style['background-color'] = this.getSelectionBarColor();
            }
            if (!tick.selected && !ValueHelper.isNullOrUndefined(this.viewOptions.getTickColor)) {
                tick.style['background-color'] = this.getTickColor(value);
            }
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.ticksTooltip)) {
                tick.tooltip = this.viewOptions.ticksTooltip(value);
                tick.tooltipPlacement = this.viewOptions.vertical ? 'right' : 'top';
            }
            if (this.viewOptions.showTicksValues && !ValueHelper.isNullOrUndefined(tickValueStep) &&
                MathHelper.isModuloWithinPrecisionLimit(value, tickValueStep, this.viewOptions.precisionLimit)) {
                tick.value = this.getDisplayValue(value, LabelType.TickValue);
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.ticksValuesTooltip)) {
                    tick.valueTooltip = this.viewOptions.ticksValuesTooltip(value);
                    tick.valueTooltipPlacement = this.viewOptions.vertical
                        ? 'right'
                        : 'top';
                }
            }
            /** @type {?} */
            let legend = null;
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
                /** @type {?} */
                const step = this.viewOptions.stepsArray[value];
                if (!ValueHelper.isNullOrUndefined(this.viewOptions.getStepLegend)) {
                    legend = this.viewOptions.getStepLegend(step);
                }
                else if (!ValueHelper.isNullOrUndefined(step)) {
                    legend = step.legend;
                }
            }
            else if (!ValueHelper.isNullOrUndefined(this.viewOptions.getLegend)) {
                legend = this.viewOptions.getLegend(value);
            }
            if (!ValueHelper.isNullOrUndefined(legend)) {
                tick.legend = legend;
                hasAtLeastOneLegend = true;
            }
            return tick;
        });
        setTimeout(() => { this.sliderElementWithLegendClass = hasAtLeastOneLegend; });
        // We should avoid re-creating the ticks array if possible
        // This both improves performance and makes CSS animations work correctly
        if (!ValueHelper.isNullOrUndefined(this.ticks) && this.ticks.length === newTicks.length) {
            for (let i = 0; i < newTicks.length; ++i) {
                Object.assign(this.ticks[i], newTicks[i]);
            }
        }
        else {
            this.ticks = newTicks;
        }
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    getTicksArray() {
        /** @type {?} */
        const step = (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) ? this.viewOptions.tickStep : this.viewOptions.step;
        /** @type {?} */
        const ticksArray = [];
        /** @type {?} */
        const numberOfValues = 1 + Math.floor(MathHelper.roundToPrecisionLimit(Math.abs(this.viewOptions.ceil - this.viewOptions.floor) / step, this.viewOptions.precisionLimit));
        for (let index = 0; index < numberOfValues; ++index) {
            ticksArray.push(MathHelper.roundToPrecisionLimit(this.viewOptions.floor + step * index, this.viewOptions.precisionLimit));
        }
        return ticksArray;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isTickSelected(value) {
        if (!this.range) {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                /** @type {?} */
                const center = this.viewOptions.showSelectionBarFromValue;
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
    }
    /**
     * @return {?}
     */
    updateFloorLabel() {
        if (!this.floorLabelElement.alwaysHide) {
            this.floorLabelElement.setValue(this.getDisplayValue(this.viewOptions.floor, LabelType.Floor));
            this.floorLabelElement.calculateDimension();
            /** @type {?} */
            const position = this.viewOptions.rightToLeft
                ? this.fullBarElement.dimension - this.floorLabelElement.dimension
                : 0;
            this.floorLabelElement.setPosition(position);
        }
    }
    /**
     * @return {?}
     */
    updateCeilLabel() {
        if (!this.ceilLabelElement.alwaysHide) {
            this.ceilLabelElement.setValue(this.getDisplayValue(this.viewOptions.ceil, LabelType.Ceil));
            this.ceilLabelElement.calculateDimension();
            /** @type {?} */
            const position = this.viewOptions.rightToLeft
                ? 0
                : this.fullBarElement.dimension - this.ceilLabelElement.dimension;
            this.ceilLabelElement.setPosition(position);
        }
    }
    /**
     * @param {?} which
     * @param {?} newPos
     * @return {?}
     */
    updateHandles(which, newPos) {
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
    }
    /**
     * @param {?} labelType
     * @param {?} newPos
     * @return {?}
     */
    getHandleLabelPos(labelType, newPos) {
        /** @type {?} */
        const labelDimension = (labelType === PointerType.Min)
            ? this.minHandleLabelElement.dimension
            : this.maxHandleLabelElement.dimension;
        /** @type {?} */
        const nearHandlePos = newPos - labelDimension / 2 + this.handleHalfDimension;
        /** @type {?} */
        const endOfBarPos = this.fullBarElement.dimension - labelDimension;
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
    }
    /**
     * @param {?} newPos
     * @return {?}
     */
    updateLowHandle(newPos) {
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
    }
    /**
     * @param {?} newPos
     * @return {?}
     */
    updateHighHandle(newPos) {
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
    }
    /**
     * @return {?}
     */
    updateFloorAndCeilLabelsVisibility() {
        // Show based only on hideLimitLabels if pointer labels are hidden
        if (this.viewOptions.hidePointerLabels) {
            return;
        }
        /** @type {?} */
        let floorLabelHidden = false;
        /** @type {?} */
        let ceilLabelHidden = false;
        /** @type {?} */
        const isMinLabelAtFloor = this.isLabelBelowFloorLabel(this.minHandleLabelElement);
        /** @type {?} */
        const isMinLabelAtCeil = this.isLabelAboveCeilLabel(this.minHandleLabelElement);
        /** @type {?} */
        const isMaxLabelAtCeil = this.isLabelAboveCeilLabel(this.maxHandleLabelElement);
        /** @type {?} */
        const isCombinedLabelAtFloor = this.isLabelBelowFloorLabel(this.combinedLabelElement);
        /** @type {?} */
        const isCombinedLabelAtCeil = this.isLabelAboveCeilLabel(this.combinedLabelElement);
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
            const hideCeil = this.combinedLabelElement.isVisible() ? isCombinedLabelAtCeil : isMaxLabelAtCeil;
            /** @type {?} */
            const hideFloor = this.combinedLabelElement.isVisible() ? isCombinedLabelAtFloor : isMinLabelAtFloor;
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
    }
    /**
     * @param {?} label
     * @return {?}
     */
    isLabelBelowFloorLabel(label) {
        /** @type {?} */
        const pos = label.position;
        /** @type {?} */
        const dim = label.dimension;
        /** @type {?} */
        const floorPos = this.floorLabelElement.position;
        /** @type {?} */
        const floorDim = this.floorLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos + dim >= floorPos - 2
            : pos <= floorPos + floorDim + 2;
    }
    /**
     * @param {?} label
     * @return {?}
     */
    isLabelAboveCeilLabel(label) {
        /** @type {?} */
        const pos = label.position;
        /** @type {?} */
        const dim = label.dimension;
        /** @type {?} */
        const ceilPos = this.ceilLabelElement.position;
        /** @type {?} */
        const ceilDim = this.ceilLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos <= ceilPos + ceilDim + 2
            : pos + dim >= ceilPos - 2;
    }
    /**
     * @return {?}
     */
    updateSelectionBar() {
        /** @type {?} */
        let position = 0;
        /** @type {?} */
        let dimension = 0;
        /** @type {?} */
        const isSelectionBarFromRight = this.viewOptions.rightToLeft
            ? !this.viewOptions.showSelectionBarEnd
            : this.viewOptions.showSelectionBarEnd;
        /** @type {?} */
        const positionForRange = this.viewOptions.rightToLeft
            ? this.maxHandleElement.position + this.handleHalfDimension
            : this.minHandleElement.position + this.handleHalfDimension;
        if (this.range) {
            dimension = Math.abs(this.maxHandleElement.position - this.minHandleElement.position);
            position = positionForRange;
        }
        else {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                /** @type {?} */
                const center = this.viewOptions.showSelectionBarFromValue;
                /** @type {?} */
                const centerPosition = this.valueToPosition(center);
                /** @type {?} */
                const isModelGreaterThanCenter = this.viewOptions.rightToLeft
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
            const color = this.getSelectionBarColor();
            this.barStyle = {
                backgroundColor: color,
            };
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.selectionBarGradient)) {
            /** @type {?} */
            const offset = (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue))
                ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
                : 0;
            /** @type {?} */
            const reversed = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
            /** @type {?} */
            const direction = this.viewOptions.vertical
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
    }
    /**
     * @return {?}
     */
    getSelectionBarColor() {
        if (this.range) {
            return this.viewOptions.getSelectionBarColor(this.value, this.highValue);
        }
        return this.viewOptions.getSelectionBarColor(this.value);
    }
    /**
     * @param {?} pointerType
     * @return {?}
     */
    getPointerColor(pointerType) {
        if (pointerType === PointerType.Max) {
            return this.viewOptions.getPointerColor(this.highValue, pointerType);
        }
        return this.viewOptions.getPointerColor(this.value, pointerType);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getTickColor(value) {
        return this.viewOptions.getTickColor(value);
    }
    /**
     * @return {?}
     */
    updateCombinedLabel() {
        /** @type {?} */
        let isLabelOverlap = null;
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
            const lowDisplayValue = this.getDisplayValue(this.viewLowValue, LabelType.Low);
            /** @type {?} */
            const highDisplayValue = this.getDisplayValue(this.viewHighValue, LabelType.High);
            /** @type {?} */
            const combinedLabelValue = this.viewOptions.rightToLeft
                ? this.viewOptions.combineLabels(highDisplayValue, lowDisplayValue)
                : this.viewOptions.combineLabels(lowDisplayValue, highDisplayValue);
            this.combinedLabelElement.setValue(combinedLabelValue);
            /** @type {?} */
            const pos = this.viewOptions.boundPointerLabels
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
    }
    /**
     * @param {?} value
     * @param {?} which
     * @return {?}
     */
    getDisplayValue(value, which) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            value = this.getStepValue(value);
        }
        return this.viewOptions.translate(value, which);
    }
    /**
     * @param {?} value
     * @param {?=} customStep
     * @return {?}
     */
    roundStep(value, customStep) {
        /** @type {?} */
        const step = !ValueHelper.isNullOrUndefined(customStep) ? customStep : this.viewOptions.step;
        /** @type {?} */
        let steppedDifference = MathHelper.roundToPrecisionLimit((value - this.viewOptions.floor) / step, this.viewOptions.precisionLimit);
        steppedDifference = Math.round(steppedDifference) * step;
        return MathHelper.roundToPrecisionLimit(this.viewOptions.floor + steppedDifference, this.viewOptions.precisionLimit);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    valueToPosition(val) {
        /** @type {?} */
        let fn = ValueHelper.linearValueToPosition;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customValueToPosition)) {
            fn = this.viewOptions.customValueToPosition;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logValueToPosition;
        }
        val = MathHelper.clampToRange(val, this.viewOptions.floor, this.viewOptions.ceil);
        /** @type {?} */
        let percent = fn(val, this.viewOptions.floor, this.viewOptions.ceil);
        if (ValueHelper.isNullOrUndefined(percent)) {
            percent = 0;
        }
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        return percent * this.maxHandlePosition;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    positionToValue(position) {
        /** @type {?} */
        let percent = position / this.maxHandlePosition;
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        /** @type {?} */
        let fn = ValueHelper.linearPositionToValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customPositionToValue)) {
            fn = this.viewOptions.customPositionToValue;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logPositionToValue;
        }
        /** @type {?} */
        const value = fn(percent, this.viewOptions.floor, this.viewOptions.ceil);
        return !ValueHelper.isNullOrUndefined(value) ? value : 0;
    }
    /**
     * @param {?} event
     * @param {?=} targetTouchId
     * @return {?}
     */
    getEventXY(event, targetTouchId) {
        if (event instanceof MouseEvent) {
            return this.viewOptions.vertical ? event.clientY : event.clientX;
        }
        /** @type {?} */
        let touchIndex = 0;
        /** @type {?} */
        const touches = event.touches;
        if (!ValueHelper.isNullOrUndefined(targetTouchId)) {
            for (let i = 0; i < touches.length; i++) {
                if (touches[i].identifier === targetTouchId) {
                    touchIndex = i;
                    break;
                }
            }
        }
        // Return the target touch or if the target touch was not found in the event
        // returns the coordinates of the first touch
        return this.viewOptions.vertical ? touches[touchIndex].clientY : touches[touchIndex].clientX;
    }
    /**
     * @param {?} event
     * @param {?=} targetTouchId
     * @return {?}
     */
    getEventPosition(event, targetTouchId) {
        /** @type {?} */
        const sliderElementBoundingRect = this.elementRef.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const sliderPos = this.viewOptions.vertical ?
            sliderElementBoundingRect.bottom : sliderElementBoundingRect.left;
        /** @type {?} */
        let eventPos = 0;
        if (this.viewOptions.vertical) {
            eventPos = -this.getEventXY(event, targetTouchId) + sliderPos;
        }
        else {
            eventPos = this.getEventXY(event, targetTouchId) - sliderPos;
        }
        return eventPos * this.viewOptions.scale - this.handleHalfDimension;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getNearestHandle(event) {
        if (!this.range) {
            return PointerType.Min;
        }
        /** @type {?} */
        const position = this.getEventPosition(event);
        /** @type {?} */
        const distanceMin = Math.abs(position - this.minHandleElement.position);
        /** @type {?} */
        const distanceMax = Math.abs(position - this.maxHandleElement.position);
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
    }
    /**
     * @return {?}
     */
    bindEvents() {
        /** @type {?} */
        const draggableRange = this.viewOptions.draggableRange;
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.on('mousedown', (event) => this.onBarStart(null, draggableRange, event, true, true, true));
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.on('mousedown', (event) => this.onBarStart(PointerType.Min, draggableRange, event, true, true));
            this.maxHandleElement.on('mousedown', (event) => this.onBarStart(PointerType.Max, draggableRange, event, true, true));
        }
        else {
            this.minHandleElement.on('mousedown', (event) => this.onStart(PointerType.Min, event, true, true));
            if (this.range) {
                this.maxHandleElement.on('mousedown', (event) => this.onStart(PointerType.Max, event, true, true));
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.on('mousedown', (event) => this.onStart(null, event, true, true, true));
                this.ticksElement.on('mousedown', (event) => this.onStart(null, event, true, true, true, true));
            }
        }
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.onPassive('touchstart', (event) => this.onBarStart(null, draggableRange, event, true, true, true));
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.onPassive('touchstart', (event) => this.onBarStart(PointerType.Min, draggableRange, event, true, true));
            this.maxHandleElement.onPassive('touchstart', (event) => this.onBarStart(PointerType.Max, draggableRange, event, true, true));
        }
        else {
            this.minHandleElement.onPassive('touchstart', (event) => this.onStart(PointerType.Min, event, true, true));
            if (this.range) {
                this.maxHandleElement.onPassive('touchstart', (event) => this.onStart(PointerType.Max, event, true, true));
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.onPassive('touchstart', (event) => this.onStart(null, event, true, true, true));
                this.ticksElement.onPassive('touchstart', (event) => this.onStart(null, event, false, false, true, true));
            }
        }
        if (this.viewOptions.keyboardSupport) {
            this.minHandleElement.on('focus', () => this.onPointerFocus(PointerType.Min));
            if (this.range) {
                this.maxHandleElement.on('focus', () => this.onPointerFocus(PointerType.Max));
            }
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    getOptionsInfluencingEventBindings(options) {
        return [
            options.disabled,
            options.readOnly,
            options.draggableRange,
            options.draggableRangeOnly,
            options.onlyBindHandles,
            options.keyboardSupport
        ];
    }
    /**
     * @return {?}
     */
    unbindEvents() {
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        for (const element of this.getAllSliderElements()) {
            if (!ValueHelper.isNullOrUndefined(element)) {
                element.off();
            }
        }
    }
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
    onBarStart(pointerType, draggableRange, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        if (draggableRange) {
            this.onDragStart(pointerType, event, bindMove, bindEnd);
        }
        else {
            this.onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
        }
    }
    /**
     * @param {?} pointerType
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @param {?=} simulateImmediateMove
     * @param {?=} simulateImmediateEnd
     * @return {?}
     */
    onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
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
        const pointerElement = this.getPointerElement(pointerType);
        pointerElement.active = true;
        if (this.viewOptions.keyboardSupport) {
            pointerElement.focus();
        }
        if (bindMove) {
            this.unsubscribeOnMove();
            /** @type {?} */
            const onMoveCallback = (e) => this.dragging.active ? this.onDragMove(e) : this.onMove(e);
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
            const onEndCallback = (e) => this.onEnd(e);
            if (CompatibilityHelper.isTouchEvent(event)) {
                this.onEndEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchend', onEndCallback);
            }
            else {
                this.onEndEventListener = this.eventListenerHelper.attachEventListener(document, 'mouseup', onEndCallback);
            }
        }
        this.userChangeStart.emit(this.getChangeContext());
        if (CompatibilityHelper.isTouchEvent(event) && !ValueHelper.isNullOrUndefined((/** @type {?} */ (event)).changedTouches)) {
            // Store the touch identifier
            if (ValueHelper.isNullOrUndefined(this.touchId)) {
                this.touchId = (/** @type {?} */ (event)).changedTouches[0].identifier;
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
    }
    /**
     * @param {?} event
     * @param {?=} fromTick
     * @return {?}
     */
    onMove(event, fromTick) {
        /** @type {?} */
        let touchForThisSlider = null;
        if (CompatibilityHelper.isTouchEvent(event)) {
            /** @type {?} */
            const changedTouches = (/** @type {?} */ (event)).changedTouches;
            for (let i = 0; i < changedTouches.length; i++) {
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
        const newPos = !ValueHelper.isNullOrUndefined(touchForThisSlider)
            ? this.getEventPosition(event, touchForThisSlider.identifier)
            : this.getEventPosition(event);
        /** @type {?} */
        let newValue;
        /** @type {?} */
        const ceilValue = this.viewOptions.rightToLeft
            ? this.viewOptions.floor
            : this.viewOptions.ceil;
        /** @type {?} */
        const floorValue = this.viewOptions.rightToLeft ? this.viewOptions.ceil : this.viewOptions.floor;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onEnd(event) {
        if (CompatibilityHelper.isTouchEvent(event)) {
            /** @type {?} */
            const changedTouches = (/** @type {?} */ (event)).changedTouches;
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
    }
    /**
     * @param {?} pointerType
     * @return {?}
     */
    onPointerFocus(pointerType) {
        /** @type {?} */
        const pointerElement = this.getPointerElement(pointerType);
        pointerElement.on('blur', () => this.onPointerBlur(pointerElement));
        pointerElement.on('keydown', (event) => this.onKeyboardEvent(event));
        pointerElement.on('keyup', () => this.onKeyUp());
        pointerElement.active = true;
        this.currentTrackingPointer = pointerType;
        this.currentFocusPointer = pointerType;
        this.firstKeyDown = true;
    }
    /**
     * @return {?}
     */
    onKeyUp() {
        this.firstKeyDown = true;
        this.userChangeEnd.emit(this.getChangeContext());
    }
    /**
     * @param {?} pointer
     * @return {?}
     */
    onPointerBlur(pointer) {
        pointer.off('blur');
        pointer.off('keydown');
        pointer.off('keyup');
        pointer.active = false;
        if (ValueHelper.isNullOrUndefined(this.touchId)) {
            this.currentTrackingPointer = null;
            this.currentFocusPointer = null;
        }
    }
    /**
     * @param {?} currentValue
     * @return {?}
     */
    getKeyActions(currentValue) {
        /** @type {?} */
        const valueRange = this.viewOptions.ceil - this.viewOptions.floor;
        /** @type {?} */
        let increaseStep = currentValue + this.viewOptions.step;
        /** @type {?} */
        let decreaseStep = currentValue - this.viewOptions.step;
        /** @type {?} */
        let increasePage = currentValue + valueRange / 10;
        /** @type {?} */
        let decreasePage = currentValue - valueRange / 10;
        if (this.viewOptions.reversedControls) {
            increaseStep = currentValue - this.viewOptions.step;
            decreaseStep = currentValue + this.viewOptions.step;
            increasePage = currentValue - valueRange / 10;
            decreasePage = currentValue + valueRange / 10;
        }
        /** @type {?} */
        const actions = {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyboardEvent(event) {
        /** @type {?} */
        const currentValue = this.getCurrentTrackingValue();
        /** @type {?} */
        const keyCode = !ValueHelper.isNullOrUndefined(event.keyCode)
            ? event.keyCode
            : event.which;
        /** @type {?} */
        const keys = {
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
        const actions = this.getKeyActions(currentValue);
        /** @type {?} */
        const key = keys[keyCode];
        /** @type {?} */
        const action = actions[key];
        if (ValueHelper.isNullOrUndefined(action) || ValueHelper.isNullOrUndefined(this.currentTrackingPointer)) {
            return;
        }
        event.preventDefault();
        if (this.firstKeyDown) {
            this.firstKeyDown = false;
            this.userChangeStart.emit(this.getChangeContext());
        }
        /** @type {?} */
        const actionValue = MathHelper.clampToRange(action, this.viewOptions.floor, this.viewOptions.ceil);
        /** @type {?} */
        const newValue = this.roundStep(actionValue);
        if (!this.viewOptions.draggableRangeOnly) {
            this.positionTrackingHandle(newValue);
        }
        else {
            /** @type {?} */
            const difference = this.viewHighValue - this.viewLowValue;
            /** @type {?} */
            let newMinValue;
            /** @type {?} */
            let newMaxValue;
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
    }
    /**
     * @param {?} pointerType
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @return {?}
     */
    onDragStart(pointerType, event, bindMove, bindEnd) {
        /** @type {?} */
        const position = this.getEventPosition(event);
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
    }
    /**
     * Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
     * @param {?} newPos
     * @param {?} outOfBounds
     * @param {?} isAbove
     * @return {?}
     */
    getMinValue(newPos, outOfBounds, isAbove) {
        /** @type {?} */
        const isRTL = this.viewOptions.rightToLeft;
        /** @type {?} */
        let value = null;
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
    }
    /**
     * Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
     * @param {?} newPos
     * @param {?} outOfBounds
     * @param {?} isAbove
     * @return {?}
     */
    getMaxValue(newPos, outOfBounds, isAbove) {
        /** @type {?} */
        const isRTL = this.viewOptions.rightToLeft;
        /** @type {?} */
        let value = null;
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
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    onDragMove(event) {
        /** @type {?} */
        const newPos = this.getEventPosition(event);
        if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
            if (this.moving) {
                this.sliderElementAnimateClass = false;
            }
        }
        this.moving = true;
        /** @type {?} */
        let ceilLimit;
        /** @type {?} */
        let floorLimit;
        /** @type {?} */
        let floorHandleElement;
        /** @type {?} */
        let ceilHandleElement;
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
        const isUnderFloorLimit = (newPos <= floorLimit);
        /** @type {?} */
        const isOverCeilLimit = (newPos >= this.maxHandlePosition - ceilLimit);
        /** @type {?} */
        let newMinValue;
        /** @type {?} */
        let newMaxValue;
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
    }
    /**
     * @param {?} newMinValue
     * @param {?} newMaxValue
     * @return {?}
     */
    positionTrackingBar(newMinValue, newMaxValue) {
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
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    positionTrackingHandle(newValue) {
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
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    applyMinMaxLimit(newValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) && newValue < this.viewOptions.minLimit) {
            return this.viewOptions.minLimit;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) && newValue > this.viewOptions.maxLimit) {
            return this.viewOptions.maxLimit;
        }
        return newValue;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    applyMinMaxRange(newValue) {
        /** @type {?} */
        const oppositeValue = (this.currentTrackingPointer === PointerType.Min)
            ? this.viewHighValue
            : this.viewLowValue;
        /** @type {?} */
        const difference = Math.abs(newValue - oppositeValue);
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
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    applyPushRange(newValue) {
        /** @type {?} */
        const difference = (this.currentTrackingPointer === PointerType.Min)
            ? this.viewHighValue - newValue
            : newValue - this.viewLowValue;
        /** @type {?} */
        const minRange = (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange))
            ? this.viewOptions.minRange
            : this.viewOptions.step;
        /** @type {?} */
        const maxRange = this.viewOptions.maxRange;
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
    }
    /**
     * @return {?}
     */
    getChangeContext() {
        /** @type {?} */
        const changeContext = new ChangeContext();
        changeContext.pointerType = this.currentTrackingPointer;
        changeContext.value = +this.value;
        if (this.range) {
            changeContext.highValue = +this.highValue;
        }
        return changeContext;
    }
}
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-slider',
                template: `<!-- // 0 Left selection bar outside two handles -->
<span ngxSliderElement #leftOuterSelectionBar class="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-left-out-selection">
  <span class="ngx-slider-span ngx-slider-bar"></span>
</span>
<!-- // 1 Right selection bar outside two handles -->
<span ngxSliderElement #rightOuterSelectionBar class="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-right-out-selection">
  <span class="ngx-slider-span ngx-slider-bar"></span>
</span>
<!-- // 2 The whole slider bar -->
<span ngxSliderElement #fullBar [class.ngx-slider-transparent]="fullBarTransparentClass" class="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-full-bar">
  <span class="ngx-slider-span ngx-slider-bar"></span>
</span>
<!-- // 3 Selection bar between two handles -->
<span ngxSliderElement #selectionBar [class.ngx-slider-draggable]="selectionBarDraggableClass" class="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-selection-bar">
  <span class="ngx-slider-span ngx-slider-bar ngx-slider-selection" [ngStyle]="barStyle"></span>
</span>
<!-- // 4 Low slider handle -->
<span ngxSliderHandle #minHandle class="ngx-slider-span ngx-slider-pointer ngx-slider-pointer-min" [ngStyle]=minPointerStyle></span>
<!-- // 5 High slider handle -->
<span ngxSliderHandle #maxHandle [style.display]="range ? 'inherit' : 'none'" class="ngx-slider-span ngx-slider-pointer ngx-slider-pointer-max" [ngStyle]=maxPointerStyle></span>
<!-- // 6 Floor label -->
<span ngxSliderLabel #floorLabel class="ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-floor"></span>
<!-- // 7 Ceiling label -->
<span ngxSliderLabel #ceilLabel class="ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-ceil"></span>
<!-- // 8 Label above the low slider handle -->
<span ngxSliderLabel #minHandleLabel class="ngx-slider-span ngx-slider-bubble ngx-slider-model-value"></span>
<!-- // 9 Label above the high slider handle -->
<span ngxSliderLabel #maxHandleLabel class="ngx-slider-span ngx-slider-bubble ngx-slider-model-high"></span>
<!-- // 10 Combined range label when the slider handles are close ex. 15 - 17 -->
<span ngxSliderLabel #combinedLabel class="ngx-slider-span ngx-slider-bubble ngx-slider-combined"></span>
<!-- // 11 The ticks -->
<span ngxSliderElement #ticksElement [hidden]="!showTicks" [class.ngx-slider-ticks-values-under]="ticksUnderValuesClass" class="ngx-slider-ticks">
  <span *ngFor="let t of ticks" class="ngx-slider-tick" [ngClass]="{'ngx-slider-selected': t.selected}" [ngStyle]="t.style">
    <ngx-slider-tooltip-wrapper [template]="tooltipTemplate" [tooltip]="t.tooltip" [placement]="t.tooltipPlacement"></ngx-slider-tooltip-wrapper>
    <ngx-slider-tooltip-wrapper *ngIf="t.value != null" class="ngx-slider-span ngx-slider-tick-value"
        [template]="tooltipTemplate" [tooltip]="t.valueTooltip" [placement]="t.valueTooltipPlacement" [content]="t.value"></ngx-slider-tooltip-wrapper>
    <span *ngIf="t.legend != null" class="ngx-slider-span ngx-slider-tick-legend" [innerHTML]="t.legend"></span>
  </span>
</span>`,
                styles: [`::ng-deep .ngx-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:pan-y}::ng-deep .ngx-slider.with-legend{margin-bottom:40px}::ng-deep .ngx-slider[disabled]{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}::ng-deep .ngx-slider[disabled] .ngx-slider-draggable{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-selection{background:#8b91a2}::ng-deep .ngx-slider[disabled] .ngx-slider-tick{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-tick.ngx-slider-selected{background:#8b91a2}::ng-deep .ngx-slider .ngx-slider-span{white-space:nowrap;position:absolute;display:inline-block}::ng-deep .ngx-slider .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper{left:0;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}::ng-deep .ngx-slider .ngx-slider-draggable{cursor:move}::ng-deep .ngx-slider .ngx-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-transparent .ngx-slider-bar{background:0 0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-left-out-selection .ngx-slider-bar{background:#df002d}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-right-out-selection .ngx-slider-bar{background:#03a688}::ng-deep .ngx-slider .ngx-slider-selection{z-index:2;background:#0db9f0;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;border-radius:16px}::ng-deep .ngx-slider .ngx-slider-pointer:after{content:'';width:8px;height:8px;position:absolute;top:12px;left:12px;border-radius:4px;background:#fff}::ng-deep .ngx-slider .ngx-slider-pointer:hover:after{background-color:#fff}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active{z-index:4}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active:after{background-color:#451aff}::ng-deep .ngx-slider .ngx-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}::ng-deep .ngx-slider .ngx-slider-bubble.ngx-slider-limit{color:#55637d}::ng-deep .ngx-slider .ngx-slider-ticks{box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}::ng-deep .ngx-slider .ngx-slider-ticks-values-under .ngx-slider-tick-value{top:auto;bottom:-36px}::ng-deep .ngx-slider .ngx-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}::ng-deep .ngx-slider .ngx-slider-tick.ngx-slider-selected{background:#0db9f0}::ng-deep .ngx-slider .ngx-slider-tick-value{position:absolute;top:-34px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}::ng-deep .ngx-slider .ngx-slider-tick-legend{position:absolute;top:24px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);max-width:50px;white-space:normal}::ng-deep .ngx-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;touch-action:pan-x}::ng-deep .ngx-slider.vertical .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider.vertical .ngx-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}::ng-deep .ngx-slider.vertical .ngx-slider-bar{bottom:0;left:auto;width:4px;height:100%}::ng-deep .ngx-slider.vertical .ngx-slider-pointer{left:-14px!important;top:auto;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-bubble{left:16px!important;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}::ng-deep .ngx-slider.vertical .ngx-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}::ng-deep .ngx-slider.vertical .ngx-slider-tick-value{left:24px;top:auto;-webkit-transform:translate(0,-28%);transform:translate(0,-28%)}::ng-deep .ngx-slider.vertical .ngx-slider-tick-legend{top:auto;right:24px;-webkit-transform:translate(0,-28%);transform:translate(0,-28%);max-width:none;white-space:nowrap}::ng-deep .ngx-slider.vertical .ngx-slider-ticks-values-under .ngx-slider-tick-value{bottom:auto;left:auto;right:24px}::ng-deep .ngx-slider *{transition:none}::ng-deep .ngx-slider.animate .ngx-slider-bar-wrapper{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-selection{transition:background-color .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-pointer{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-limit{transition:opacity .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-combined{transition:opacity .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-tick{transition:background-color .3s linear}`],
                host: { class: 'ngx-slider' },
                providers: [NGX_SLIDER_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
SliderComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
SliderComponent.propDecorators = {
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    highValue: [{ type: Input }],
    highValueChange: [{ type: Output }],
    options: [{ type: Input }],
    userChangeStart: [{ type: Output }],
    userChange: [{ type: Output }],
    userChangeEnd: [{ type: Output }],
    manualRefresh: [{ type: Input }],
    triggerFocus: [{ type: Input }],
    leftOuterSelectionBarElement: [{ type: ViewChild, args: ['leftOuterSelectionBar', { read: SliderElementDirective },] }],
    rightOuterSelectionBarElement: [{ type: ViewChild, args: ['rightOuterSelectionBar', { read: SliderElementDirective },] }],
    fullBarElement: [{ type: ViewChild, args: ['fullBar', { read: SliderElementDirective },] }],
    selectionBarElement: [{ type: ViewChild, args: ['selectionBar', { read: SliderElementDirective },] }],
    minHandleElement: [{ type: ViewChild, args: ['minHandle', { read: SliderHandleDirective },] }],
    maxHandleElement: [{ type: ViewChild, args: ['maxHandle', { read: SliderHandleDirective },] }],
    floorLabelElement: [{ type: ViewChild, args: ['floorLabel', { read: SliderLabelDirective },] }],
    ceilLabelElement: [{ type: ViewChild, args: ['ceilLabel', { read: SliderLabelDirective },] }],
    minHandleLabelElement: [{ type: ViewChild, args: ['minHandleLabel', { read: SliderLabelDirective },] }],
    maxHandleLabelElement: [{ type: ViewChild, args: ['maxHandleLabel', { read: SliderLabelDirective },] }],
    combinedLabelElement: [{ type: ViewChild, args: ['combinedLabel', { read: SliderLabelDirective },] }],
    ticksElement: [{ type: ViewChild, args: ['ticksElement', { read: SliderElementDirective },] }],
    tooltipTemplate: [{ type: ContentChild, args: ['tooltipTemplate',] }],
    sliderElementVerticalClass: [{ type: HostBinding, args: ['class.vertical',] }],
    sliderElementAnimateClass: [{ type: HostBinding, args: ['class.animate',] }],
    sliderElementWithLegendClass: [{ type: HostBinding, args: ['class.with-legend',] }],
    sliderElementDisabledAttr: [{ type: HostBinding, args: ['attr.disabled',] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TooltipWrapperComponent {
}
TooltipWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-slider-tooltip-wrapper',
                template: `<ng-container *ngIf="template">
  <ng-template *ngTemplateOutlet="template; context: {tooltip: tooltip, placement: placement, content: content}"></ng-template>
</ng-container>

<ng-container *ngIf="!template">
  <div class="ngx-slider-inner-tooltip" [attr.title]="tooltip" [attr.data-tooltip-placement]="placement">
    {{content}}
  </div>
</ng-container>`,
                styles: [`.ngx-slider-inner-tooltip{height:100%}`]
            },] },
];
TooltipWrapperComponent.propDecorators = {
    template: [{ type: Input }],
    tooltip: [{ type: Input }],
    placement: [{ type: Input }],
    content: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * NgxSlider module
 *
 * The module exports the slider component
 */
class NgxSliderModule {
}
NgxSliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxSliderModule, ChangeContext, PointerType, LabelType, Options, SliderElementDirective as ɵb, SliderHandleDirective as ɵc, SliderLabelDirective as ɵd, SliderComponent as ɵa, TooltipWrapperComponent as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlkZXItbmd4LXNsaWRlci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvb3B0aW9ucy50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvcG9pbnRlci10eXBlLnRzIiwibmc6Ly9AYW5ndWxhci1zbGlkZXIvbmd4LXNsaWRlci9jaGFuZ2UtY29udGV4dC50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvdmFsdWUtaGVscGVyLnRzIiwibmc6Ly9AYW5ndWxhci1zbGlkZXIvbmd4LXNsaWRlci9jb21wYXRpYmlsaXR5LWhlbHBlci50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvbWF0aC1oZWxwZXIudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL2V2ZW50LWxpc3RlbmVyLnRzIiwibmc6Ly9AYW5ndWxhci1zbGlkZXIvbmd4LXNsaWRlci9ldmVudC1saXN0ZW5lci1oZWxwZXIudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci1lbGVtZW50LmRpcmVjdGl2ZS50cyIsIm5nOi8vQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXIvc2xpZGVyLWhhbmRsZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci1sYWJlbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3Rvb2x0aXAtd3JhcHBlci5jb21wb25lbnQudHMiLCJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyL3NsaWRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9pbnRlclR5cGUgfSBmcm9tICcuL3BvaW50ZXItdHlwZSc7XG5cbi8qKiBMYWJlbCB0eXBlICovXG5leHBvcnQgZW51bSBMYWJlbFR5cGUge1xuICAvKiogTGFiZWwgYWJvdmUgbG93IHBvaW50ZXIgKi9cbiAgTG93LFxuICAvKiogTGFiZWwgYWJvdmUgaGlnaCBwb2ludGVyICovXG4gIEhpZ2gsXG4gIC8qKiBMYWJlbCBmb3IgbWluaW11bSBzbGlkZXIgdmFsdWUgKi9cbiAgRmxvb3IsXG4gIC8qKiBMYWJlbCBmb3IgbWF4aW11bSBzbGlkZXIgdmFsdWUgKi9cbiAgQ2VpbCxcbiAgLyoqIExhYmVsIGJlbG93IGxlZ2VuZCB0aWNrICovXG4gIFRpY2tWYWx1ZVxufVxuXG4vKiogRnVuY3Rpb24gdG8gdHJhbnNsYXRlIGxhYmVsIHZhbHVlIGludG8gdGV4dCAqL1xuZXhwb3J0IHR5cGUgVHJhbnNsYXRlRnVuY3Rpb24gPSAodmFsdWU6IG51bWJlciwgbGFiZWw6IExhYmVsVHlwZSkgPT4gc3RyaW5nO1xuLyoqIEZ1bmN0aW9uIHRvIGNvbWJpbmQgKi9cbmV4cG9ydCB0eXBlIENvbWJpbmVMYWJlbHNGdW5jdGlvbiA9IChtaW5MYWJlbDogc3RyaW5nLCBtYXhMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XG4vKiogRnVuY3Rpb24gdG8gcHJvdmlkZSBsZWdlbmQgICovXG5leHBvcnQgdHlwZSBHZXRMZWdlbmRGdW5jdGlvbiA9ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmc7XG5leHBvcnQgdHlwZSBHZXRTdGVwTGVnZW5kRnVuY3Rpb24gPSAoc3RlcDogQ3VzdG9tU3RlcERlZmluaXRpb24pID0+IHN0cmluZztcblxuLyoqIEZ1bmN0aW9uIGNvbnZlcnRpbmcgc2xpZGVyIHZhbHVlIHRvIHNsaWRlciBwb3NpdGlvbiAqL1xuZXhwb3J0IHR5cGUgVmFsdWVUb1Bvc2l0aW9uRnVuY3Rpb24gPSAodmFsOiBudW1iZXIsIG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlcikgPT4gbnVtYmVyO1xuXG4vKiogRnVuY3Rpb24gY29udmVydGluZyBzbGlkZXIgcG9zaXRpb24gdG8gc2xpZGVyIHZhbHVlICovXG5leHBvcnQgdHlwZSBQb3NpdGlvblRvVmFsdWVGdW5jdGlvbiA9IChwZXJjZW50OiBudW1iZXIsIG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlcikgPT4gbnVtYmVyO1xuXG4vKipcbiAqIEN1c3RvbSBzdGVwIGRlZmluaXRpb25cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgY3VzdG9tIHZhbHVlcyBhbmQgbGVnZW5kIHZhbHVlcyBmb3Igc2xpZGVyIHRpY2tzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tU3RlcERlZmluaXRpb24ge1xuICAvKiogVmFsdWUgKi9cbiAgdmFsdWU6IG51bWJlcjtcbiAgLyoqIExlZ2VuZCAobGFiZWwgZm9yIHRoZSB2YWx1ZSkgKi9cbiAgbGVnZW5kPzogc3RyaW5nO1xufVxuXG4vKiogU2xpZGVyIG9wdGlvbnMgKi9cbmV4cG9ydCBjbGFzcyBPcHRpb25zIHtcbiAgLyoqIE1pbmltdW0gdmFsdWUgZm9yIGEgc2xpZGVyLlxuICAgIE5vdCBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgc3RlcHNBcnJheS4gKi9cbiAgZmxvb3I/OiBudW1iZXIgPSAwO1xuXG4gIC8qKiBNYXhpbXVtIHZhbHVlIGZvciBhIHNsaWRlci5cbiAgICBOb3QgYXBwbGljYWJsZSB3aGVuIHVzaW5nIHN0ZXBzQXJyYXkuICovXG4gIGNlaWw/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBTdGVwIGJldHdlZW4gZWFjaCB2YWx1ZS5cbiAgICBOb3QgYXBwbGljYWJsZSB3aGVuIHVzaW5nIHN0ZXBzQXJyYXkuICovXG4gIHN0ZXA/OiBudW1iZXIgPSAxO1xuXG4gIC8qKiBUaGUgbWluaW11bSByYW5nZSBhdXRob3JpemVkIG9uIHRoZSBzbGlkZXIuXG4gICAgQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIG1pblJhbmdlPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogVGhlIG1heGltdW0gcmFuZ2UgYXV0aG9yaXplZCBvbiB0aGUgc2xpZGVyLlxuICAgIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuXG4gICAgV2hlbiB1c2luZyBzdGVwc0FycmF5LCBleHByZXNzZWQgYXMgaW5kZXggaW50byBzdGVwc0FycmF5LiAqL1xuICBtYXhSYW5nZT86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGhhdmUgYSBwdXNoIGJlaGF2aW9yLiBXaGVuIHRoZSBtaW4gaGFuZGxlIGdvZXMgYWJvdmUgdGhlIG1heCxcbiAgICB0aGUgbWF4IGlzIG1vdmVkIGFzIHdlbGwgKGFuZCB2aWNlLXZlcnNhKS4gVGhlIHJhbmdlIGJldHdlZW4gbWluIGFuZCBtYXggaXNcbiAgICBkZWZpbmVkIGJ5IHRoZSBzdGVwIG9wdGlvbiAoZGVmYXVsdHMgdG8gMSkgYW5kIGNhbiBhbHNvIGJlIG92ZXJyaWRlbiBieVxuICAgIHRoZSBtaW5SYW5nZSBvcHRpb24uIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuICovXG4gIHB1c2hSYW5nZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIG1pbmltdW0gdmFsdWUgYXV0aG9yaXplZCBvbiB0aGUgc2xpZGVyLlxuICAgIFdoZW4gdXNpbmcgc3RlcHNBcnJheSwgZXhwcmVzc2VkIGFzIGluZGV4IGludG8gc3RlcHNBcnJheS4gKi9cbiAgbWluTGltaXQ/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWx1ZSBhdXRob3JpemVkIG9uIHRoZSBzbGlkZXIuXG4gICAgV2hlbiB1c2luZyBzdGVwc0FycmF5LCBleHByZXNzZWQgYXMgaW5kZXggaW50byBzdGVwc0FycmF5LiAqL1xuICBtYXhMaW1pdD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIEN1c3RvbSB0cmFuc2xhdGUgZnVuY3Rpb24uIFVzZSB0aGlzIGlmIHlvdSB3YW50IHRvIHRyYW5zbGF0ZSB2YWx1ZXMgZGlzcGxheWVkXG4gICAgICBvbiB0aGUgc2xpZGVyLiAqL1xuICB0cmFuc2xhdGU/OiBUcmFuc2xhdGVGdW5jdGlvbiA9IG51bGw7XG5cbiAgLyoqIEN1c3RvbSBmdW5jdGlvbiBmb3IgY29tYmluaW5nIG92ZXJsYXBwaW5nIGxhYmVscyBpbiByYW5nZSBzbGlkZXIuXG4gICAgICBJdCB0YWtlcyB0aGUgbWluIGFuZCBtYXggdmFsdWVzIChhbHJlYWR5IHRyYW5zbGF0ZWQgd2l0aCB0cmFuc2xhdGUgZnVjdGlvbilcbiAgICAgIGFuZCBzaG91bGQgcmV0dXJuIGhvdyB0aGVzZSB0d28gdmFsdWVzIHNob3VsZCBiZSBjb21iaW5lZC5cbiAgICAgIElmIG5vdCBwcm92aWRlZCwgdGhlIGRlZmF1bHQgZnVuY3Rpb24gd2lsbCBqb2luIHRoZSB0d28gdmFsdWVzIHdpdGhcbiAgICAgICcgLSAnIGFzIHNlcGFyYXRvci4gKi9cbiAgY29tYmluZUxhYmVscz86IENvbWJpbmVMYWJlbHNGdW5jdGlvbiA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBkaXNwbGF5IGxlZ2VuZCB1bmRlciB0aWNrcyAodGh1cywgaXQgbmVlZHMgdG8gYmUgdXNlZCBhbG9uZyB3aXRoXG4gICAgIHNob3dUaWNrcyBvciBzaG93VGlja3NWYWx1ZXMpLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBlYWNoIHRpY2tcbiAgICAgdmFsdWUgYW5kIHJldHVybmVkIGNvbnRlbnQgd2lsbCBiZSBkaXNwbGF5ZWQgdW5kZXIgdGhlIHRpY2sgYXMgYSBsZWdlbmQuXG4gICAgIElmIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBudWxsLCB0aGVuIG5vIGxlZ2VuZCBpcyBkaXNwbGF5ZWQgdW5kZXJcbiAgICAgdGhlIGNvcnJlc3BvbmRpbmcgdGljay5Zb3UgY2FuIGFsc28gZGlyZWN0bHkgcHJvdmlkZSB0aGUgbGVnZW5kIHZhbHVlc1xuICAgICBpbiB0aGUgc3RlcHNBcnJheSBvcHRpb24uICovXG4gIGdldExlZ2VuZD86IEdldExlZ2VuZEZ1bmN0aW9uID0gbnVsbDtcblxuICAgLyoqIFVzZSB0byBkaXNwbGF5IGEgY3VzdG9tIGxlZ2VuZCBvZiBhIHN0ZXBJdGVtIGZyb20gc3RlcHNBcnJheS5cbiAgICBJdCB3aWxsIGJlIHRoZSBzYW1lIGFzIGdldExlZ2VuIGJ1dCBmb3Igc3RlcHNBcnJheS4gKi9cbiAgZ2V0U3RlcExlZ2VuZD86IEdldFN0ZXBMZWdlbmRGdW5jdGlvbiA9IG51bGw7XG5cbiAgLyoqIElmIHlvdSB3YW50IHRvIGRpc3BsYXkgYSBzbGlkZXIgd2l0aCBub24gbGluZWFyL251bWJlciBzdGVwcy5cbiAgICAgSnVzdCBwYXNzIGFuIGFycmF5IHdpdGggZWFjaCBzbGlkZXIgdmFsdWUgYW5kIHRoYXQncyBpdDsgdGhlIGZsb29yLCBjZWlsIGFuZCBzdGVwIHNldHRpbmdzXG4gICAgIG9mIHRoZSBzbGlkZXIgd2lsbCBiZSBjb21wdXRlZCBhdXRvbWF0aWNhbGx5LlxuICAgICBCeSBkZWZhdWx0LCB0aGUgdmFsdWUgbW9kZWwgYW5kIHZhbHVlSGlnaCBtb2RlbCB2YWx1ZXMgd2lsbCBiZSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICAgaW4gdGhlIHN0ZXBzQXJyYXkuXG4gICAgIFRoZXkgY2FuIGFsc28gYmUgYm91bmQgdG8gdGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBpdGVtIGJ5IHNldHRpbmcgdGhlIGJpbmRJbmRleEZvclN0ZXBzQXJyYXlcbiAgICAgb3B0aW9uIHRvIHRydWUuICovXG4gIHN0ZXBzQXJyYXk/OiBDdXN0b21TdGVwRGVmaW5pdGlvbltdID0gbnVsbDtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gYmluZCB0aGUgaW5kZXggb2YgdGhlIHNlbGVjdGVkIGl0ZW0gdG8gdmFsdWUgbW9kZWwgYW5kIHZhbHVlSGlnaCBtb2RlbC4gKi9cbiAgYmluZEluZGV4Rm9yU3RlcHNBcnJheT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSBhbmQgdXNpbmcgYSByYW5nZSBzbGlkZXIsIHRoZSByYW5nZSBjYW4gYmUgZHJhZ2dlZCBieSB0aGUgc2VsZWN0aW9uIGJhci5cbiAgICBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LiAqL1xuICBkcmFnZ2FibGVSYW5nZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2FtZSBhcyBkcmFnZ2FibGVSYW5nZSBidXQgdGhlIHNsaWRlciByYW5nZSBjYW4ndCBiZSBjaGFuZ2VkLlxuICAgIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuICovXG4gIGRyYWdnYWJsZVJhbmdlT25seT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gYWx3YXlzIHNob3cgdGhlIHNlbGVjdGlvbiBiYXIgYmVmb3JlIHRoZSBzbGlkZXIgaGFuZGxlLiAqL1xuICBzaG93U2VsZWN0aW9uQmFyPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBhbHdheXMgc2hvdyB0aGUgc2VsZWN0aW9uIGJhciBhZnRlciB0aGUgc2xpZGVyIGhhbmRsZS4gKi9cbiAgc2hvd1NlbGVjdGlvbkJhckVuZD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogIFNldCBhIG51bWJlciB0byBkcmF3IHRoZSBzZWxlY3Rpb24gYmFyIGJldHdlZW4gdGhpcyB2YWx1ZSBhbmQgdGhlIHNsaWRlciBoYW5kbGUuXG4gICAgV2hlbiB1c2luZyBzdGVwc0FycmF5LCBleHByZXNzZWQgYXMgaW5kZXggaW50byBzdGVwc0FycmF5LiAqL1xuICBzaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogIE9ubHkgZm9yIHJhbmdlIHNsaWRlci4gU2V0IHRvIHRydWUgdG8gdmlzdWFsaXplIGluIGRpZmZlcmVudCBjb2xvdXIgdGhlIGFyZWFzXG4gICAgb24gdGhlIGxlZnQvcmlnaHQgKHRvcC9ib3R0b20gZm9yIHZlcnRpY2FsIHJhbmdlIHNsaWRlcikgb2Ygc2VsZWN0aW9uIGJhciBiZXR3ZWVuIHRoZSBoYW5kbGVzLiAqL1xuICBzaG93T3V0ZXJTZWxlY3Rpb25CYXJzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBoaWRlIHBvaW50ZXIgbGFiZWxzICovXG4gIGhpZGVQb2ludGVyTGFiZWxzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBoaWRlIG1pbiAvIG1heCBsYWJlbHMgICovXG4gIGhpZGVMaW1pdExhYmVscz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhlIGF1dG8taGlkaW5nIGJlaGF2aW9yIG9mIHRoZSBsaW1pdCBsYWJlbHMuICovXG4gIGF1dG9IaWRlTGltaXRMYWJlbHM/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gbWFrZSB0aGUgc2xpZGVyIHJlYWQtb25seS4gKi9cbiAgcmVhZE9ubHk/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGRpc2FibGUgdGhlIHNsaWRlci4gKi9cbiAgZGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciBtb3VzZSBldmVudHMgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGF2b2lkIGEgZmxvb2Qgb2YgZXZlbnRzIHdoZW4gbW92aW5nIHRoZSBzbGlkZXIgd2l0aCBtb3VzZS4gKi9cbiAgbW91c2VFdmVudHNJbnRlcnZhbD86IG51bWJlciA9IDUwO1xuXG4gIC8qKiBUaHJvdHRsZSBpbnRlcnZhbCBmb3IgdG91Y2ggZXZlbnRzIGluIG1pbGxpc2Vjb25kcy5cbiAgICogVGhpcyBpcyBwcm92aWRlZCB0byBhdm9pZCBhIGZsb29kIG9mIGV2ZW50cyB3aGVuIG1vdmluZyB0aGUgc2xpZGVyIHdpdGggdG91Y2ggZ2VzdHVyZS4gKi9cbiAgdG91Y2hFdmVudHNJbnRlcnZhbD86IG51bWJlciA9IDUwO1xuXG4gIC8qKiBUaHJvdHRsZSBpbnRlcnZhbCBmb3IgaW5wdXQgY2hhbmdlcyAoY2hhbmdlcyB0byBiaW5kaW5ncyBvciByZWFjdGl2ZSBmb3JtIGlucHV0cylcbiAgICogVGhpcyBpcyBwcm92aWRlZCB0byBhdm9pZCBhIGZsb29kIG9mIGV2ZW50cyBvbiBmcmVxdWVudCBpbnB1dCBiaW5kaW5nIGNoYW5nZXMgYWZmZWN0aW5nIHBlcmZvcm1hbmNlLiAqL1xuICBpbnB1dEV2ZW50c0ludGVydmFsPzogbnVtYmVyID0gMTAwO1xuXG4gIC8qKiBUaHJvdHRsZSBpbnRlcnZhbCBmb3Igb3V0cHV0IGNoYW5nZXMgKHNpZ25hbGxpbmcgY2hhbmdlcyB0byBvdXRwdXQgYmluZGluZ3MgYW5kIHVzZXIgY2FsbGJhY2tzKVxuICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGF2b2lkIGEgZmxvb2Qgb2Ygb3V0Z29pbmcgZXZlbnRzIGFmZmVjdGluZyBBbmd1bGFyIGFwcCBwZXJmb3JtYW5jZS4gKi9cbiAgb3V0cHV0RXZlbnRzSW50ZXJ2YWw/OiBudW1iZXIgPSAxMDA7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGRpc3BsYXkgYSB0aWNrIGZvciBlYWNoIHN0ZXAgb2YgdGhlIHNsaWRlci4gKi9cbiAgc2hvd1RpY2tzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBkaXNwbGF5IGEgdGljayBhbmQgdGhlIHN0ZXAgdmFsdWUgZm9yIGVhY2ggc3RlcCBvZiB0aGUgc2xpZGVyLi4gKi9cbiAgc2hvd1RpY2tzVmFsdWVzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qIFRoZSBzdGVwIGJldHdlZW4gZWFjaCB0aWNrIHRvIGRpc3BsYXkuIElmIG5vdCBzZXQsIHRoZSBzdGVwIHZhbHVlIGlzIHVzZWQuXG4gICAgTm90IHVzZWQgd2hlbiB0aWNrc0FycmF5IGlzIHNwZWNpZmllZC4gKi9cbiAgdGlja1N0ZXA/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qIFRoZSBzdGVwIGJldHdlZW4gZGlzcGxheWluZyBlYWNoIHRpY2sgc3RlcCB2YWx1ZS5cbiAgICBJZiBub3Qgc2V0LCB0aGVuIHRpY2tTdGVwIG9yIHN0ZXAgaXMgdXNlZCwgZGVwZW5kaW5nIG9uIHdoaWNoIG9uZSBpcyBzZXQuICovXG4gIHRpY2tWYWx1ZVN0ZXA/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gZGlzcGxheSB0aWNrcyBhdCBzcGVjaWZpYyBwb3NpdGlvbnMuXG4gICAgVGhlIGFycmF5IGNvbnRhaW5zIHRoZSBpbmRleCBvZiB0aGUgdGlja3MgdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgIEZvciBleGFtcGxlLCBbMCwgMSwgNV0gd2lsbCBkaXNwbGF5IGEgdGljayBmb3IgdGhlIGZpcnN0LCBzZWNvbmQgYW5kIHNpeHRoIHZhbHVlcy4gKi9cbiAgdGlja3NBcnJheT86IG51bWJlcltdID0gbnVsbDtcblxuICAvKiogVXNlZCB0byBkaXNwbGF5IGEgdG9vbHRpcCB3aGVuIGEgdGljayBpcyBob3ZlcmVkLlxuICAgIFNldCB0byBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdG9vbHRpcCBjb250ZW50IGZvciBhIGdpdmVuIHZhbHVlLiAqL1xuICB0aWNrc1Rvb2x0aXA/OiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogU2FtZSBhcyB0aWNrc1Rvb2x0aXAgYnV0IGZvciB0aWNrcyB2YWx1ZXMuICovXG4gIHRpY2tzVmFsdWVzVG9vbHRpcD86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBkaXNwbGF5IHRoZSBzbGlkZXIgdmVydGljYWxseS5cbiAgICBUaGUgc2xpZGVyIHdpbGwgdGFrZSB0aGUgZnVsbCBoZWlnaHQgb2YgaXRzIHBhcmVudC5cbiAgICBDaGFuZ2luZyB0aGlzIHZhbHVlIGF0IHJ1bnRpbWUgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuICovXG4gIHZlcnRpY2FsPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGN1cnJlbnQgY29sb3Igb2YgdGhlIHNlbGVjdGlvbiBiYXIuXG4gICAgSWYgeW91ciBjb2xvciB3b24ndCBjaGFuZ2UsIGRvbid0IHVzZSB0aGlzIG9wdGlvbiBidXQgc2V0IGl0IHRocm91Z2ggQ1NTLlxuICAgIElmIHRoZSByZXR1cm5lZCBjb2xvciBkZXBlbmRzIG9uIGEgbW9kZWwgdmFsdWUgKGVpdGhlciB2YWx1ZSBvciB2YWx1ZUhpZ2gpLFxuICAgIHlvdSBzaG91bGQgdXNlIHRoZSBhcmd1bWVudCBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLlxuICAgIEluZGVlZCwgd2hlbiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGVyZSBpcyBubyBjZXJ0YWludHkgdGhhdCB0aGUgbW9kZWxcbiAgICBoYXMgYWxyZWFkeSBiZWVuIHVwZGF0ZWQuKi9cbiAgZ2V0U2VsZWN0aW9uQmFyQ29sb3I/OiAobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU/OiBudW1iZXIpID0+IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY29sb3Igb2YgYSB0aWNrLiBzaG93VGlja3MgbXVzdCBiZSBlbmFibGVkLiAqL1xuICBnZXRUaWNrQ29sb3I/OiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjdXJyZW50IGNvbG9yIG9mIGEgcG9pbnRlci5cbiAgICBJZiB5b3VyIGNvbG9yIHdvbid0IGNoYW5nZSwgZG9uJ3QgdXNlIHRoaXMgb3B0aW9uIGJ1dCBzZXQgaXQgdGhyb3VnaCBDU1MuXG4gICAgSWYgdGhlIHJldHVybmVkIGNvbG9yIGRlcGVuZHMgb24gYSBtb2RlbCB2YWx1ZSAoZWl0aGVyIHZhbHVlIG9yIHZhbHVlSGlnaCksXG4gICAgeW91IHNob3VsZCB1c2UgdGhlIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uXG4gICAgSW5kZWVkLCB3aGVuIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZXJlIGlzIG5vIGNlcnRhaW50eSB0aGF0IHRoZSBtb2RlbCBoYXMgYWxyZWFkeSBiZWVuIHVwZGF0ZWQuXG4gICAgVG8gaGFuZGxlIHJhbmdlIHNsaWRlciBwb2ludGVycyBpbmRlcGVuZGVudGx5LCB5b3Ugc2hvdWxkIGV2YWx1YXRlIHBvaW50ZXJUeXBlIHdpdGhpbiB0aGUgZ2l2ZW5cbiAgICBmdW5jdGlvbiB3aGVyZSBcIm1pblwiIHN0YW5kcyBmb3IgdmFsdWUgbW9kZWwgYW5kIFwibWF4XCIgZm9yIHZhbHVlSGlnaCBtb2RlbCB2YWx1ZXMuICovXG4gIGdldFBvaW50ZXJDb2xvcj86ICh2YWx1ZTogbnVtYmVyLCBwb2ludGVyVHlwZTogUG9pbnRlclR5cGUpID0+IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIEhhbmRsZXMgYXJlIGZvY3VzYWJsZSAob24gY2xpY2sgb3Igd2l0aCB0YWIpIGFuZCBjYW4gYmUgbW9kaWZpZWQgdXNpbmcgdGhlIGZvbGxvd2luZyBrZXlib2FyZCBjb250cm9sczpcbiAgICBMZWZ0L2JvdHRvbSBhcnJvd3M6IC0xXG4gICAgUmlnaHQvdG9wIGFycm93czogKzFcbiAgICBQYWdlLWRvd246IC0xMCVcbiAgICBQYWdlLXVwOiArMTAlXG4gICAgSG9tZTogbWluaW11bSB2YWx1ZVxuICAgIEVuZDogbWF4aW11bSB2YWx1ZVxuICAgKi9cbiAga2V5Ym9hcmRTdXBwb3J0PzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIElmIHlvdSBkaXNwbGF5IHRoZSBzbGlkZXIgaW4gYW4gZWxlbWVudCB0aGF0IHVzZXMgdHJhbnNmb3JtOiBzY2FsZSgwLjUpLCBzZXQgdGhlIHNjYWxlIHZhbHVlIHRvIDJcbiAgICBzbyB0aGF0IHRoZSBzbGlkZXIgaXMgcmVuZGVyZWQgcHJvcGVybHkgYW5kIHRoZSBldmVudHMgYXJlIGhhbmRsZWQgY29ycmVjdGx5LiAqL1xuICBzY2FsZT86IG51bWJlciA9IDE7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGZvcmNlIHRoZSB2YWx1ZShzKSB0byBiZSByb3VuZGVkIHRvIHRoZSBzdGVwLCBldmVuIHdoZW4gbW9kaWZpZWQgZnJvbSB0aGUgb3V0c2lkZS5cbiAgICBXaGVuIHNldCB0byBmYWxzZSwgaWYgdGhlIG1vZGVsIHZhbHVlcyBhcmUgbW9kaWZpZWQgZnJvbSBvdXRzaWRlIHRoZSBzbGlkZXIsIHRoZXkgYXJlIG5vdCByb3VuZGVkXG4gICAgYW5kIGNhbiBiZSBiZXR3ZWVuIHR3byBzdGVwcy4gKi9cbiAgZW5mb3JjZVN0ZXA/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZm9yY2UgdGhlIHZhbHVlKHMpIHRvIGJlIG5vcm1hbGlzZWQgdG8gYWxsb3dlZCByYW5nZSAoZmxvb3IgdG8gY2VpbCksIGV2ZW4gd2hlbiBtb2RpZmllZCBmcm9tIHRoZSBvdXRzaWRlLlxuICAgIFdoZW4gc2V0IHRvIGZhbHNlLCBpZiB0aGUgbW9kZWwgdmFsdWVzIGFyZSBtb2RpZmllZCBmcm9tIG91dHNpZGUgdGhlIHNsaWRlciwgYW5kIHRoZXkgYXJlIG91dHNpZGUgYWxsb3dlZCByYW5nZSxcbiAgICB0aGUgc2xpZGVyIG1heSBiZSByZW5kZXJlZCBpbmNvcnJlY3RseS4gSG93ZXZlciwgc2V0dGluZyB0aGlzIHRvIGZhbHNlIG1heSBiZSB1c2VmdWwgaWYgeW91IHdhbnQgdG8gcGVyZm9ybSBjdXN0b20gbm9ybWFsaXNhdGlvbi4gKi9cbiAgZW5mb3JjZVJhbmdlPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGZvcmNlIHRoZSB2YWx1ZShzKSB0byBiZSByb3VuZGVkIHRvIHRoZSBuZWFyZXN0IHN0ZXAgdmFsdWUsIGV2ZW4gd2hlbiBtb2RpZmllZCBmcm9tIHRoZSBvdXRzaWRlLlxuICAgIFdoZW4gc2V0IHRvIGZhbHNlLCBpZiB0aGUgbW9kZWwgdmFsdWVzIGFyZSBtb2RpZmllZCBmcm9tIG91dHNpZGUgdGhlIHNsaWRlciwgYW5kIHRoZXkgYXJlIG91dHNpZGUgYWxsb3dlZCByYW5nZSxcbiAgICB0aGUgc2xpZGVyIG1heSBiZSByZW5kZXJlZCBpbmNvcnJlY3RseS4gSG93ZXZlciwgc2V0dGluZyB0aGlzIHRvIGZhbHNlIG1heSBiZSB1c2VmdWwgaWYgeW91IHdhbnQgdG8gcGVyZm9ybSBjdXN0b20gbm9ybWFsaXNhdGlvbi4gKi9cbiAgZW5mb3JjZVN0ZXBzQXJyYXk/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gcHJldmVudCB0byB1c2VyIGZyb20gc3dpdGNoaW5nIHRoZSBtaW4gYW5kIG1heCBoYW5kbGVzLiBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LiAqL1xuICBub1N3aXRjaGluZz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gb25seSBiaW5kIGV2ZW50cyBvbiBzbGlkZXIgaGFuZGxlcy4gKi9cbiAgb25seUJpbmRIYW5kbGVzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBzaG93IGdyYXBocyByaWdodCB0byBsZWZ0LlxuICAgIElmIHZlcnRpY2FsIGlzIHRydWUgaXQgd2lsbCBiZSBmcm9tIHRvcCB0byBib3R0b20gYW5kIGxlZnQgLyByaWdodCBhcnJvdyBmdW5jdGlvbnMgcmV2ZXJzZWQuICovXG4gIHJpZ2h0VG9MZWZ0PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byByZXZlcnNlIGtleWJvYXJkIG5hdmlnYXRpb246XG4gICAgUmlnaHQvdG9wIGFycm93czogLTFcbiAgICBMZWZ0L2JvdHRvbSBhcnJvd3M6ICsxXG4gICAgUGFnZS11cDogLTEwJVxuICAgIFBhZ2UtZG93bjogKzEwJVxuICAgIEVuZDogbWluaW11bSB2YWx1ZVxuICAgIEhvbWU6IG1heGltdW0gdmFsdWVcbiAgICovXG4gIHJldmVyc2VkQ29udHJvbHM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGtlZXAgdGhlIHNsaWRlciBsYWJlbHMgaW5zaWRlIHRoZSBzbGlkZXIgYm91bmRzLiAqL1xuICBib3VuZFBvaW50ZXJMYWJlbHM/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gdXNlIGEgbG9nYXJpdGhtaWMgc2NhbGUgdG8gZGlzcGxheSB0aGUgc2xpZGVyLiAgKi9cbiAgbG9nU2NhbGU/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgcG9zaXRpb24gb24gdGhlIHNsaWRlciBmb3IgYSBnaXZlbiB2YWx1ZS5cbiAgICBUaGUgcG9zaXRpb24gbXVzdCBiZSBhIHBlcmNlbnRhZ2UgYmV0d2VlbiAwIGFuZCAxLlxuICAgIFRoZSBmdW5jdGlvbiBzaG91bGQgYmUgbW9ub3RvbmljYWxseSBpbmNyZWFzaW5nIG9yIGRlY3JlYXNpbmc7IG90aGVyd2lzZSB0aGUgc2xpZGVyIG1heSBiZWhhdmUgaW5jb3JyZWN0bHkuICovXG4gIGN1c3RvbVZhbHVlVG9Qb3NpdGlvbj86IFZhbHVlVG9Qb3NpdGlvbkZ1bmN0aW9uID0gbnVsbDtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBmb3IgYSBnaXZlbiBwb3NpdGlvbiBvbiB0aGUgc2xpZGVyLlxuICAgIFRoZSBwb3NpdGlvbiBpcyBhIHBlcmNlbnRhZ2UgYmV0d2VlbiAwIGFuZCAxLlxuICAgIFRoZSBmdW5jdGlvbiBzaG91bGQgYmUgbW9ub3RvbmljYWxseSBpbmNyZWFzaW5nIG9yIGRlY3JlYXNpbmc7IG90aGVyd2lzZSB0aGUgc2xpZGVyIG1heSBiZWhhdmUgaW5jb3JyZWN0bHkuICovXG4gIGN1c3RvbVBvc2l0aW9uVG9WYWx1ZT86IFBvc2l0aW9uVG9WYWx1ZUZ1bmN0aW9uID0gbnVsbDtcblxuICAvKiogUHJlY2lzaW9uIGxpbWl0IGZvciBjYWxjdWxhdGVkIHZhbHVlcy5cbiAgICBWYWx1ZXMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgd2lsbCBiZSByb3VuZGVkIHRvIHRoaXMgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xuICAgIHRvIHByZXZlbnQgYWNjdW11bGF0aW5nIHNtYWxsIGZsb2F0aW5nLXBvaW50IGVycm9ycy4gKi9cbiAgcHJlY2lzaW9uTGltaXQ/OiBudW1iZXIgPSAxMjtcblxuICAvKiogVXNlIHRvIGRpc3BsYXkgdGhlIHNlbGVjdGlvbiBiYXIgYXMgYSBncmFkaWVudC5cbiAgICBUaGUgZ2l2ZW4gb2JqZWN0IG11c3QgY29udGFpbiBmcm9tIGFuZCB0byBwcm9wZXJ0aWVzIHdoaWNoIGFyZSBjb2xvcnMuICovXG4gIHNlbGVjdGlvbkJhckdyYWRpZW50Pzoge2Zyb206IHN0cmluZywgdG86IHN0cmluZ30gPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gYWRkIGEgbGFiZWwgZGlyZWN0bHkgdG8gdGhlIHNsaWRlciBmb3IgYWNjZXNzaWJpbGl0eS4gQWRkcyB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUuICovXG4gIGFyaWFMYWJlbD86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSBpbnN0ZWFkIG9mIGFyaWFMYWJlbCB0byByZWZlcmVuY2UgdGhlIGlkIG9mIGFuIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGxhYmVsIHRoZSBzbGlkZXIuXG4gICAgQWRkcyB0aGUgYXJpYS1sYWJlbGxlZGJ5IGF0dHJpYnV0ZS4gKi9cbiAgYXJpYUxhYmVsbGVkQnk/OiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gYWRkIGEgbGFiZWwgZGlyZWN0bHkgdG8gdGhlIHNsaWRlciByYW5nZSBmb3IgYWNjZXNzaWJpbGl0eS4gQWRkcyB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUuICovXG4gIGFyaWFMYWJlbEhpZ2g/OiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBVc2UgaW5zdGVhZCBvZiBhcmlhTGFiZWxIaWdoIHRvIHJlZmVyZW5jZSB0aGUgaWQgb2YgYW4gZWxlbWVudCB3aGljaCB3aWxsIGJlIHVzZWQgdG8gbGFiZWwgdGhlIHNsaWRlciByYW5nZS5cbiAgICBBZGRzIHRoZSBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlLiAqL1xuICBhcmlhTGFiZWxsZWRCeUhpZ2g/OiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gaW5jcmVhc2UgcmVuZGVyaW5nIHBlcmZvcm1hbmNlLiBJZiB0aGUgdmFsdWUgaXMgbm90IHByb3ZpZGVkLCB0aGUgc2xpZGVyIGNhbGN1bGF0ZXMgdGhlIHdpdGgvaGVpZ2h0IG9mIHRoZSBoYW5kbGUgKi9cbiAgaGFuZGxlRGltZW5zaW9uPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGluY3JlYXNlIHJlbmRlcmluZyBwZXJmb3JtYW5jZS4gSWYgdGhlIHZhbHVlIGlzIG5vdCBwcm92aWRlZCwgdGhlIHNsaWRlciBjYWxjdWxhdGVzIHRoZSB3aXRoL2hlaWdodCBvZiB0aGUgYmFyICovXG4gIGJhckRpbWVuc2lvbj86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIEVuYWJsZS9kaXNhYmxlIENTUyBhbmltYXRpb25zICovXG4gIGFuaW1hdGU/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogRW5hYmxlL2Rpc2FibGUgQ1NTIGFuaW1hdGlvbnMgd2hpbGUgbW92aW5nIHRoZSBzbGlkZXIgKi9cbiAgYW5pbWF0ZU9uTW92ZT86IGJvb2xlYW4gPSBmYWxzZTtcbn1cbiIsIi8qKiBQb2ludGVyIHR5cGUgKi9cbmV4cG9ydCBlbnVtIFBvaW50ZXJUeXBlIHtcbiAgLyoqIExvdyBwb2ludGVyICovXG4gIE1pbixcbiAgLyoqIEhpZ2ggcG9pbnRlciAqL1xuICBNYXhcbn1cbiIsImltcG9ydCB7IFBvaW50ZXJUeXBlIH0gZnJvbSAnLi9wb2ludGVyLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlQ29udGV4dCB7XG4gIHZhbHVlOiBudW1iZXI7XG4gIGhpZ2hWYWx1ZT86IG51bWJlcjtcbiAgcG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlO1xufVxuIiwiaW1wb3J0IHsgQ3VzdG9tU3RlcERlZmluaXRpb24gfSBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqICBDb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0byBoYW5kbGUgY29udmVyc2lvbnMvbG9va3VwcyBvZiB2YWx1ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlSGVscGVyIHtcbiAgc3RhdGljIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBhcmVBcnJheXNFcXVhbChhcnJheTE6IGFueVtdLCBhcnJheTI6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgYXJyYXkxLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoYXJyYXkxW2ldICE9PSBhcnJheTJbaV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIGxpbmVhclZhbHVlVG9Qb3NpdGlvbih2YWw6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCByYW5nZTogbnVtYmVyID0gbWF4VmFsIC0gbWluVmFsO1xuICAgIHJldHVybiAodmFsIC0gbWluVmFsKSAvIHJhbmdlO1xuICB9XG5cbiAgc3RhdGljIGxvZ1ZhbHVlVG9Qb3NpdGlvbih2YWw6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICB2YWwgPSBNYXRoLmxvZyh2YWwpO1xuICAgIG1pblZhbCA9IE1hdGgubG9nKG1pblZhbCk7XG4gICAgbWF4VmFsID0gTWF0aC5sb2cobWF4VmFsKTtcbiAgICBjb25zdCByYW5nZTogbnVtYmVyID0gbWF4VmFsIC0gbWluVmFsO1xuICAgIHJldHVybiAodmFsIC0gbWluVmFsKSAvIHJhbmdlO1xuICB9XG5cbiAgc3RhdGljIGxpbmVhclBvc2l0aW9uVG9WYWx1ZShwZXJjZW50OiBudW1iZXIsIG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHBlcmNlbnQgKiAobWF4VmFsIC0gbWluVmFsKSArIG1pblZhbDtcbiAgfVxuXG4gIHN0YXRpYyBsb2dQb3NpdGlvblRvVmFsdWUocGVyY2VudDogbnVtYmVyLCBtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIG1pblZhbCA9IE1hdGgubG9nKG1pblZhbCk7XG4gICAgbWF4VmFsID0gTWF0aC5sb2cobWF4VmFsKTtcbiAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gcGVyY2VudCAqIChtYXhWYWwgLSBtaW5WYWwpICsgbWluVmFsO1xuICAgIHJldHVybiBNYXRoLmV4cCh2YWx1ZSk7XG4gIH1cblxuICBzdGF0aWMgZmluZFN0ZXBJbmRleChtb2RlbFZhbHVlOiBudW1iZXIsIHN0ZXBzQXJyYXk6IEN1c3RvbVN0ZXBEZWZpbml0aW9uW10pOiBudW1iZXIge1xuICAgIGNvbnN0IGRpZmZlcmVuY2VzOiBudW1iZXJbXSA9IHN0ZXBzQXJyYXkubWFwKChzdGVwOiBDdXN0b21TdGVwRGVmaW5pdGlvbik6IG51bWJlciA9PiBNYXRoLmFicyhtb2RlbFZhbHVlIC0gc3RlcC52YWx1ZSkpO1xuXG4gICAgbGV0IG1pbkRpZmZlcmVuY2VJbmRleDogbnVtYmVyID0gMDtcbiAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gMDsgaW5kZXggPCBzdGVwc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGRpZmZlcmVuY2VzW2luZGV4XSAhPT0gZGlmZmVyZW5jZXNbbWluRGlmZmVyZW5jZUluZGV4XSAmJiBkaWZmZXJlbmNlc1tpbmRleF0gPCBkaWZmZXJlbmNlc1ttaW5EaWZmZXJlbmNlSW5kZXhdKSB7XG4gICAgICAgIG1pbkRpZmZlcmVuY2VJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtaW5EaWZmZXJlbmNlSW5kZXg7XG4gIH1cbn1cbiIsIi8vIERlY2xhcmF0aW9uIGZvciBSZXNpemVPYnNlcnZlciBhIG5ldyBBUEkgYXZhaWxhYmxlIGluIHNvbWUgb2YgbmV3ZXN0IGJyb3dzZXJzOlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1Jlc2l6ZU9ic2VydmVyXG5kZWNsYXJlIGNsYXNzIFJlc2l6ZU9ic2VydmVyIHtcbn1cblxuLyoqIEhlbHBlciB3aXRoIGNvbXBhdGliaWxpdHkgZnVuY3Rpb25zIHRvIHN1cHBvcnQgZGlmZmVyZW50IGJyb3dzZXJzICovXG5leHBvcnQgY2xhc3MgQ29tcGF0aWJpbGl0eUhlbHBlciB7XG4gIC8qKiBXb3JrYXJvdW5kIGZvciBUb3VjaEV2ZW50IGNvbnN0cnVjdG9yIHNhZGx5IG5vdCBiZWluZyBhdmFpbGFibGUgb24gYWxsIGJyb3dzZXJzIChlLmcuIEZpcmVmb3gsIFNhZmFyaSkgKi9cbiAgcHVibGljIHN0YXRpYyBpc1RvdWNoRXZlbnQoZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICgod2luZG93IGFzIGFueSkuVG91Y2hFdmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50O1xuICAgIH1cblxuICAgIHJldHVybiBldmVudC50b3VjaGVzICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKiogRGV0ZWN0IHByZXNlbmNlIG9mIFJlc2l6ZU9ic2VydmVyIEFQSSAqL1xuICBwdWJsaWMgc3RhdGljIGlzUmVzaXplT2JzZXJ2ZXJBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlciAhPT0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCIvKiogSGVscGVyIHdpdGggbWF0aGVtYXRpY2FsIGZ1bmN0aW9ucyAqL1xuZXhwb3J0IGNsYXNzIE1hdGhIZWxwZXIge1xuICAvKiBSb3VuZCBudW1iZXJzIHRvIGEgZ2l2ZW4gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyAqL1xuICBzdGF0aWMgcm91bmRUb1ByZWNpc2lvbkxpbWl0KHZhbHVlOiBudW1iZXIsIHByZWNpc2lvbkxpbWl0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiArKCB2YWx1ZS50b1ByZWNpc2lvbihwcmVjaXNpb25MaW1pdCkgKTtcbiAgfVxuXG4gIHN0YXRpYyBpc01vZHVsb1dpdGhpblByZWNpc2lvbkxpbWl0KHZhbHVlOiBudW1iZXIsIG1vZHVsbzogbnVtYmVyLCBwcmVjaXNpb25MaW1pdDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbGltaXQ6IG51bWJlciA9IE1hdGgucG93KDEwLCAtcHJlY2lzaW9uTGltaXQpO1xuICAgIHJldHVybiBNYXRoLmFicyh2YWx1ZSAlIG1vZHVsbykgPD0gbGltaXQgfHwgTWF0aC5hYnMoTWF0aC5hYnModmFsdWUgJSBtb2R1bG8pIC0gbW9kdWxvKSA8PSBsaW1pdDtcbiAgfVxuXG4gIHN0YXRpYyBjbGFtcFRvUmFuZ2UodmFsdWU6IG51bWJlciwgZmxvb3I6IG51bWJlciwgY2VpbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIGZsb29yKSwgY2VpbCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lciB7XG4gIGV2ZW50TmFtZTogc3RyaW5nID0gbnVsbDtcbiAgZXZlbnRzOiBTdWJqZWN0PEV2ZW50PiA9IG51bGw7XG4gIGV2ZW50c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgdGVhcmRvd25DYWxsYmFjazogKCkgPT4gdm9pZCA9IG51bGw7XG59XG4iLCJpbXBvcnQgeyBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRocm90dGxlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IGRldGVjdFBhc3NpdmVFdmVudHMgZnJvbSAnZGV0ZWN0LXBhc3NpdmUtZXZlbnRzJztcblxuaW1wb3J0IHsgRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vZXZlbnQtbGlzdGVuZXInO1xuaW1wb3J0IHsgVmFsdWVIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWhlbHBlcic7XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgdG8gRE9NIGVsZW1lbnRzIHdpdGggZGVib3VuY2Ugc3VwcG9ydCB1c2luZyByeGpzXG4gKi9cbmV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVySGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBwdWJsaWMgYXR0YWNoUGFzc2l2ZUV2ZW50TGlzdGVuZXIobmF0aXZlRWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiB2b2lkLFxuICAgICAgdGhyb3R0bGVJbnRlcnZhbD86IG51bWJlcik6IEV2ZW50TGlzdGVuZXIge1xuICAgIC8vIE9ubHkgdXNlIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIGl0XG4gICAgaWYgKGRldGVjdFBhc3NpdmVFdmVudHMuaGFzU3VwcG9ydCAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcihuYXRpdmVFbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrLCB0aHJvdHRsZUludGVydmFsKTtcbiAgICB9XG5cbiAgICAvLyBBbmd1bGFyIGRvZXNuJ3Qgc3VwcG9ydCBwYXNzaXZlIGV2ZW50IGhhbmRsZXJzICh5ZXQpLCBzbyB3ZSBuZWVkIHRvIHJvbGwgb3VyIG93biBjb2RlIHVzaW5nIG5hdGl2ZSBmdW5jdGlvbnNcbiAgICBjb25zdCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IG5ldyBFdmVudExpc3RlbmVyKCk7XG4gICAgbGlzdGVuZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgIGxpc3RlbmVyLmV2ZW50cyA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXJDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgIGxpc3RlbmVyLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9O1xuICAgIG5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9ic2VydmVyQ2FsbGJhY2ssIHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZX0pO1xuXG4gICAgbGlzdGVuZXIudGVhcmRvd25DYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgIG5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9ic2VydmVyQ2FsbGJhY2ssIHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZX0pO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci5ldmVudHNTdWJzY3JpcHRpb24gPSBsaXN0ZW5lci5ldmVudHNcbiAgICAgIC5waXBlKCghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhyb3R0bGVJbnRlcnZhbCkpXG4gICAgICAgID8gdGhyb3R0bGVUaW1lKHRocm90dGxlSW50ZXJ2YWwsIHVuZGVmaW5lZCwgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogdHJ1ZX0pXG4gICAgICAgIDogdGFwKCgpID0+IHt9KSAvLyBuby1vcFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcHVibGljIGRldGFjaEV2ZW50TGlzdGVuZXIoZXZlbnRMaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcik6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnRMaXN0ZW5lci5ldmVudHNTdWJzY3JpcHRpb24pKSB7XG4gICAgICBldmVudExpc3RlbmVyLmV2ZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgZXZlbnRMaXN0ZW5lci5ldmVudHNTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnRMaXN0ZW5lci5ldmVudHMpKSB7XG4gICAgICBldmVudExpc3RlbmVyLmV2ZW50cy5jb21wbGV0ZSgpO1xuICAgICAgZXZlbnRMaXN0ZW5lci5ldmVudHMgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnRMaXN0ZW5lci50ZWFyZG93bkNhbGxiYWNrKSkge1xuICAgICAgZXZlbnRMaXN0ZW5lci50ZWFyZG93bkNhbGxiYWNrKCk7XG4gICAgICBldmVudExpc3RlbmVyLnRlYXJkb3duQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhdHRhY2hFdmVudExpc3RlbmVyKG5hdGl2ZUVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCxcbiAgICAgIHRocm90dGxlSW50ZXJ2YWw/OiBudW1iZXIpOiBFdmVudExpc3RlbmVyIHtcbiAgICBjb25zdCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IG5ldyBFdmVudExpc3RlbmVyKCk7XG4gICAgbGlzdGVuZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgIGxpc3RlbmVyLmV2ZW50cyA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXJDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgIGxpc3RlbmVyLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIudGVhcmRvd25DYWxsYmFjayA9IHRoaXMucmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgb2JzZXJ2ZXJDYWxsYmFjayk7XG5cbiAgICBsaXN0ZW5lci5ldmVudHNTdWJzY3JpcHRpb24gPSBsaXN0ZW5lci5ldmVudHNcbiAgICAgIC5waXBlKCghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhyb3R0bGVJbnRlcnZhbCkpXG4gICAgICAgICAgPyB0aHJvdHRsZVRpbWUodGhyb3R0bGVJbnRlcnZhbCwgdW5kZWZpbmVkLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlfSlcbiAgICAgICAgICA6IHRhcCgoKSA9PiB7fSkgLy8gbm8tb3BcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBFdmVudCkgPT4geyBjYWxsYmFjayhldmVudCk7IH0pO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgSG9zdEJpbmRpbmcsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudExpc3RlbmVySGVscGVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lci1oZWxwZXInO1xuaW1wb3J0IHsgRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vZXZlbnQtbGlzdGVuZXInO1xuaW1wb3J0IHsgVmFsdWVIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWhlbHBlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ3hTbGlkZXJFbGVtZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIF9kaW1lbnNpb246IG51bWJlciA9IDA7XG4gIGdldCBkaW1lbnNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWx3YXlzSGlkZTogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgYWx3YXlzSGlkZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWx3YXlzSGlkZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cblxuICBwcml2YXRlIF9zY2FsZTogbnVtYmVyID0gMTtcbiAgZ2V0IHNjYWxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5vcGFjaXR5JylcbiAgb3BhY2l0eTogbnVtYmVyID0gMTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnZpc2liaWxpdHknKVxuICB2aXNpYmlsaXR5OiBzdHJpbmcgPSAndmlzaWJsZSc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JylcbiAgbGVmdDogc3RyaW5nID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3R0b20nKVxuICBib3R0b206IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcbiAgaGVpZ2h0OiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgd2lkdGg6IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lckhlbHBlcjogRXZlbnRMaXN0ZW5lckhlbHBlcjtcbiAgcHJpdmF0ZSBldmVudExpc3RlbmVyczogRXZlbnRMaXN0ZW5lcltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLCBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlciA9IG5ldyBFdmVudExpc3RlbmVySGVscGVyKHRoaXMucmVuZGVyZXIpO1xuICB9XG5cbiAgc2V0QWx3YXlzSGlkZShoaWRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fYWx3YXlzSGlkZSA9IGhpZGU7XG4gICAgaWYgKGhpZGUpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9wYWNpdHkgPSAwO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbHdheXNIaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgfVxuXG4gIGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5hbHdheXNIaWRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wYWNpdHkgIT09IDA7XG4gIH1cblxuICBzZXRWZXJ0aWNhbCh2ZXJ0aWNhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX3ZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgaWYgKHRoaXMuX3ZlcnRpY2FsKSB7XG4gICAgICB0aGlzLmxlZnQgPSAnJztcbiAgICAgIHRoaXMud2lkdGggPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib3R0b20gPSAnJztcbiAgICAgIHRoaXMuaGVpZ2h0ID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0U2NhbGUoc2NhbGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XG4gIH1cblxuICAgLy8gU2V0IGVsZW1lbnQgbGVmdC90b3AgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHdoZXRoZXIgc2xpZGVyIGlzIGhvcml6b250YWwgb3IgdmVydGljYWxcbiAgc2V0UG9zaXRpb24ocG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcG9zaXRpb24gIT09IHBvcyAmJiAhdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvcztcbiAgICBpZiAodGhpcy5fdmVydGljYWwpIHtcbiAgICAgIHRoaXMuYm90dG9tID0gTWF0aC5yb3VuZChwb3MpICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yb3VuZChwb3MpICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgZWxlbWVudCdzIHdpZHRoL2hlaWdodCBkZXBlbmRpbmcgb24gd2hldGhlciBzbGlkZXIgaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICBjYWxjdWxhdGVEaW1lbnNpb24oKTogdm9pZCB7XG4gICAgY29uc3QgdmFsOiBDbGllbnRSZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5fZGltZW5zaW9uID0gKHZhbC5ib3R0b20gLSB2YWwudG9wKSAqIHRoaXMuc2NhbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RpbWVuc2lvbiA9ICh2YWwucmlnaHQgLSB2YWwubGVmdCkgKiB0aGlzLnNjYWxlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBlbGVtZW50IHdpZHRoL2hlaWdodCBkZXBlbmRpbmcgb24gd2hldGhlciBzbGlkZXIgaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICBzZXREaW1lbnNpb24oZGltOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGltZW5zaW9uICE9PSBkaW0gJiYgIXRoaXMuaXNSZWZEZXN0cm95ZWQoKSkge1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGltZW5zaW9uID0gZGltO1xuICAgIGlmICh0aGlzLl92ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLnJvdW5kKGRpbSkgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndpZHRoID0gTWF0aC5yb3VuZChkaW0pICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKTogQ2xpZW50UmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCwgZGVib3VuY2VJbnRlcnZhbD86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxpc3RlbmVyOiBFdmVudExpc3RlbmVyID0gdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmF0dGFjaEV2ZW50TGlzdGVuZXIoXG4gICAgICB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaywgZGVib3VuY2VJbnRlcnZhbCk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIG9uUGFzc2l2ZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiB2b2lkLCBkZWJvdW5jZUludGVydmFsPzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIgPSB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIuYXR0YWNoUGFzc2l2ZUV2ZW50TGlzdGVuZXIoXG4gICAgICB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaywgZGVib3VuY2VJbnRlcnZhbCk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIG9mZihldmVudE5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgbGlzdGVuZXJzVG9LZWVwOiBFdmVudExpc3RlbmVyW107XG4gICAgbGV0IGxpc3RlbmVyc1RvUmVtb3ZlOiBFdmVudExpc3RlbmVyW107XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChldmVudE5hbWUpKSB7XG4gICAgICBsaXN0ZW5lcnNUb0tlZXAgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmZpbHRlcigoZXZlbnQ6IEV2ZW50TGlzdGVuZXIpID0+IGV2ZW50LmV2ZW50TmFtZSAhPT0gZXZlbnROYW1lKTtcbiAgICAgIGxpc3RlbmVyc1RvUmVtb3ZlID0gdGhpcy5ldmVudExpc3RlbmVycy5maWx0ZXIoKGV2ZW50OiBFdmVudExpc3RlbmVyKSA9PiBldmVudC5ldmVudE5hbWUgPT09IGV2ZW50TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RlbmVyc1RvS2VlcCA9IFtdO1xuICAgICAgbGlzdGVuZXJzVG9SZW1vdmUgPSB0aGlzLmV2ZW50TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5kZXRhY2hFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gbGlzdGVuZXJzVG9LZWVwO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1JlZkRlc3Ryb3llZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYpIHx8IHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmWydkZXN0cm95ZWQnXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEhvc3RCaW5kaW5nLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25neFNsaWRlckhhbmRsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlckhhbmRsZURpcmVjdGl2ZSBleHRlbmRzIFNsaWRlckVsZW1lbnREaXJlY3RpdmUge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5neC1zbGlkZXItYWN0aXZlJylcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICByb2xlOiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKVxuICB0YWJpbmRleDogc3RyaW5nID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtb3JpZW50YXRpb24nKVxuICBhcmlhT3JpZW50YXRpb246IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJylcbiAgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbGxlZGJ5JylcbiAgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXZhbHVlbm93JylcbiAgYXJpYVZhbHVlTm93OiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZXRleHQnKVxuICBhcmlhVmFsdWVUZXh0OiBzdHJpbmcgPSAnJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW1pbicpXG4gIGFyaWFWYWx1ZU1pbjogc3RyaW5nID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtdmFsdWVtYXgnKVxuICBhcmlhVmFsdWVNYXg6IHN0cmluZyA9ICcnO1xuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtUmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyLCBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbVJlZiwgcmVuZGVyZXIsIGNoYW5nZURldGVjdGlvblJlZik7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZhbHVlSGVscGVyIH0gZnJvbSAnLi92YWx1ZS1oZWxwZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmd4U2xpZGVyTGFiZWxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJMYWJlbERpcmVjdGl2ZSBleHRlbmRzIFNsaWRlckVsZW1lbnREaXJlY3RpdmUge1xuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbVJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1SZWYsIHJlbmRlcmVyLCBjaGFuZ2VEZXRlY3Rpb25SZWYpO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCByZWNhbGN1bGF0ZURpbWVuc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLmFsd2F5c0hpZGUgJiZcbiAgICAgICAgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmFsdWUpIHx8XG4gICAgICAgICB0aGlzLnZhbHVlLmxlbmd0aCAhPT0gdmFsdWUubGVuZ3RoIHx8XG4gICAgICAgICAodGhpcy52YWx1ZS5sZW5ndGggPiAwICYmIHRoaXMuZGltZW5zaW9uID09PSAwKSkpIHtcbiAgICAgIHJlY2FsY3VsYXRlRGltZW5zaW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHZhbHVlO1xuXG4gICAgLy8gVXBkYXRlIGRpbWVuc2lvbiBvbmx5IHdoZW4gbGVuZ3RoIG9mIHRoZSBsYWJlbCBoYXZlIGNoYW5nZWRcbiAgICBpZiAocmVjYWxjdWxhdGVEaW1lbnNpb24pIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBmb3J3YXJkUmVmLFxuICBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCB0aHJvdHRsZVRpbWUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IGRldGVjdFBhc3NpdmVFdmVudHMgZnJvbSAnZGV0ZWN0LXBhc3NpdmUtZXZlbnRzJztcblxuaW1wb3J0IHtcbiAgT3B0aW9ucyxcbiAgTGFiZWxUeXBlLFxuICBWYWx1ZVRvUG9zaXRpb25GdW5jdGlvbixcbiAgUG9zaXRpb25Ub1ZhbHVlRnVuY3Rpb24sXG4gIEN1c3RvbVN0ZXBEZWZpbml0aW9uXG59IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgeyBQb2ludGVyVHlwZSB9IGZyb20gJy4vcG9pbnRlci10eXBlJztcbmltcG9ydCB7IENoYW5nZUNvbnRleHQgfSBmcm9tICcuL2NoYW5nZS1jb250ZXh0JztcbmltcG9ydCB7IFZhbHVlSGVscGVyIH0gZnJvbSAnLi92YWx1ZS1oZWxwZXInO1xuaW1wb3J0IHsgQ29tcGF0aWJpbGl0eUhlbHBlciB9IGZyb20gJy4vY29tcGF0aWJpbGl0eS1oZWxwZXInO1xuaW1wb3J0IHsgTWF0aEhlbHBlciB9IGZyb20gJy4vbWF0aC1oZWxwZXInO1xuaW1wb3J0IHsgRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vZXZlbnQtbGlzdGVuZXInO1xuaW1wb3J0IHsgRXZlbnRMaXN0ZW5lckhlbHBlciB9IGZyb20gJy4vZXZlbnQtbGlzdGVuZXItaGVscGVyJztcbmltcG9ydCB7IFNsaWRlckVsZW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1lbGVtZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTbGlkZXJIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNsaWRlckxhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9zbGlkZXItbGFiZWwuZGlyZWN0aXZlJztcblxuLy8gRGVjbGFyYXRpb24gZm9yIFJlc2l6ZU9ic2VydmVyIGEgbmV3IEFQSSBhdmFpbGFibGUgaW4gc29tZSBvZiBuZXdlc3QgYnJvd3NlcnM6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUmVzaXplT2JzZXJ2ZXJcbmRlY2xhcmUgY2xhc3MgUmVzaXplT2JzZXJ2ZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjazogKCkgPT4gdm9pZCk7XG4gIG9ic2VydmUodGFyZ2V0OiBhbnkpOiB2b2lkO1xuICB1bm9ic2VydmUodGFyZ2V0OiBhbnkpOiB2b2lkO1xuICBkaXNjb25uZWN0KCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBUaWNrIHtcbiAgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3R5bGU6IGFueSA9IHt9O1xuICB0b29sdGlwOiBzdHJpbmcgPSBudWxsO1xuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmcgPSBudWxsO1xuICB2YWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgdmFsdWVUb29sdGlwOiBzdHJpbmcgPSBudWxsO1xuICB2YWx1ZVRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9IG51bGw7XG4gIGxlZ2VuZDogc3RyaW5nID0gbnVsbDtcbn1cblxuY2xhc3MgRHJhZ2dpbmcge1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdmFsdWU6IG51bWJlciA9IDA7XG4gIGRpZmZlcmVuY2U6IG51bWJlciA9IDA7XG4gIHBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBsb3dMaW1pdDogbnVtYmVyID0gMDtcbiAgaGlnaExpbWl0OiBudW1iZXIgPSAwO1xufVxuXG5jbGFzcyBNb2RlbFZhbHVlcyB7XG4gIHZhbHVlOiBudW1iZXI7XG4gIGhpZ2hWYWx1ZTogbnVtYmVyO1xuXG4gIHB1YmxpYyBzdGF0aWMgY29tcGFyZSh4PzogTW9kZWxWYWx1ZXMsIHk/OiBNb2RlbFZhbHVlcyk6IGJvb2xlYW4ge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh4KSAmJiBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeCkgIT09IFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4LnZhbHVlID09PSB5LnZhbHVlICYmIHguaGlnaFZhbHVlID09PSB5LmhpZ2hWYWx1ZTtcbiAgfVxufVxuXG5jbGFzcyBNb2RlbENoYW5nZSBleHRlbmRzIE1vZGVsVmFsdWVzIHtcbiAgLy8gRmxhZyB1c2VkIHRvIGJ5LXBhc3MgZGlzdGluY3RVbnRpbENoYW5nZWQoKSBmaWx0ZXIgb24gaW5wdXQgdmFsdWVzXG4gIC8vIChzb21ldGltZXMgdGhlcmUgaXMgYSBuZWVkIHRvIHBhc3MgdmFsdWVzIHRocm91Z2ggZXZlbiB0aG91Z2ggdGhlIG1vZGVsIHZhbHVlcyBoYXZlIG5vdCBjaGFuZ2VkKVxuICBmb3JjZUNoYW5nZTogYm9vbGVhbjtcblxuICBwdWJsaWMgc3RhdGljIGNvbXBhcmUoeD86IE1vZGVsQ2hhbmdlLCB5PzogTW9kZWxDaGFuZ2UpOiBib29sZWFuIHtcbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeCkgJiYgVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHgpICE9PSBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geC52YWx1ZSA9PT0geS52YWx1ZSAmJlxuICAgICAgICAgICB4LmhpZ2hWYWx1ZSA9PT0geS5oaWdoVmFsdWUgJiZcbiAgICAgICAgICAgeC5mb3JjZUNoYW5nZSA9PT0geS5mb3JjZUNoYW5nZTtcbiAgfVxufVxuXG5jbGFzcyBJbnB1dE1vZGVsQ2hhbmdlIGV4dGVuZHMgTW9kZWxDaGFuZ2Uge1xuICBpbnRlcm5hbENoYW5nZTogYm9vbGVhbjtcbn1cblxuY2xhc3MgT3V0cHV0TW9kZWxDaGFuZ2UgZXh0ZW5kcyBNb2RlbENoYW5nZSB7XG4gIHVzZXJFdmVudEluaXRpYXRlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgTkdYX1NMSURFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTbGlkZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXNsaWRlcicsXG4gIHRlbXBsYXRlOiBgPCEtLSAvLyAwIExlZnQgc2VsZWN0aW9uIGJhciBvdXRzaWRlIHR3byBoYW5kbGVzIC0tPlxuPHNwYW4gbmd4U2xpZGVyRWxlbWVudCAjbGVmdE91dGVyU2VsZWN0aW9uQmFyIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyLXdyYXBwZXIgbmd4LXNsaWRlci1sZWZ0LW91dC1zZWxlY3Rpb25cIj5cbiAgPHNwYW4gY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXJcIj48L3NwYW4+XG48L3NwYW4+XG48IS0tIC8vIDEgUmlnaHQgc2VsZWN0aW9uIGJhciBvdXRzaWRlIHR3byBoYW5kbGVzIC0tPlxuPHNwYW4gbmd4U2xpZGVyRWxlbWVudCAjcmlnaHRPdXRlclNlbGVjdGlvbkJhciBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhci13cmFwcGVyIG5neC1zbGlkZXItcmlnaHQtb3V0LXNlbGVjdGlvblwiPlxuICA8c3BhbiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhclwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gMiBUaGUgd2hvbGUgc2xpZGVyIGJhciAtLT5cbjxzcGFuIG5neFNsaWRlckVsZW1lbnQgI2Z1bGxCYXIgW2NsYXNzLm5neC1zbGlkZXItdHJhbnNwYXJlbnRdPVwiZnVsbEJhclRyYW5zcGFyZW50Q2xhc3NcIiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhci13cmFwcGVyIG5neC1zbGlkZXItZnVsbC1iYXJcIj5cbiAgPHNwYW4gY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXJcIj48L3NwYW4+XG48L3NwYW4+XG48IS0tIC8vIDMgU2VsZWN0aW9uIGJhciBiZXR3ZWVuIHR3byBoYW5kbGVzIC0tPlxuPHNwYW4gbmd4U2xpZGVyRWxlbWVudCAjc2VsZWN0aW9uQmFyIFtjbGFzcy5uZ3gtc2xpZGVyLWRyYWdnYWJsZV09XCJzZWxlY3Rpb25CYXJEcmFnZ2FibGVDbGFzc1wiIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyLXdyYXBwZXIgbmd4LXNsaWRlci1zZWxlY3Rpb24tYmFyXCI+XG4gIDxzcGFuIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyIG5neC1zbGlkZXItc2VsZWN0aW9uXCIgW25nU3R5bGVdPVwiYmFyU3R5bGVcIj48L3NwYW4+XG48L3NwYW4+XG48IS0tIC8vIDQgTG93IHNsaWRlciBoYW5kbGUgLS0+XG48c3BhbiBuZ3hTbGlkZXJIYW5kbGUgI21pbkhhbmRsZSBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLXBvaW50ZXIgbmd4LXNsaWRlci1wb2ludGVyLW1pblwiIFtuZ1N0eWxlXT1taW5Qb2ludGVyU3R5bGU+PC9zcGFuPlxuPCEtLSAvLyA1IEhpZ2ggc2xpZGVyIGhhbmRsZSAtLT5cbjxzcGFuIG5neFNsaWRlckhhbmRsZSAjbWF4SGFuZGxlIFtzdHlsZS5kaXNwbGF5XT1cInJhbmdlID8gJ2luaGVyaXQnIDogJ25vbmUnXCIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1wb2ludGVyIG5neC1zbGlkZXItcG9pbnRlci1tYXhcIiBbbmdTdHlsZV09bWF4UG9pbnRlclN0eWxlPjwvc3Bhbj5cbjwhLS0gLy8gNiBGbG9vciBsYWJlbCAtLT5cbjxzcGFuIG5neFNsaWRlckxhYmVsICNmbG9vckxhYmVsIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYnViYmxlIG5neC1zbGlkZXItbGltaXQgbmd4LXNsaWRlci1mbG9vclwiPjwvc3Bhbj5cbjwhLS0gLy8gNyBDZWlsaW5nIGxhYmVsIC0tPlxuPHNwYW4gbmd4U2xpZGVyTGFiZWwgI2NlaWxMYWJlbCBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJ1YmJsZSBuZ3gtc2xpZGVyLWxpbWl0IG5neC1zbGlkZXItY2VpbFwiPjwvc3Bhbj5cbjwhLS0gLy8gOCBMYWJlbCBhYm92ZSB0aGUgbG93IHNsaWRlciBoYW5kbGUgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjbWluSGFuZGxlTGFiZWwgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1idWJibGUgbmd4LXNsaWRlci1tb2RlbC12YWx1ZVwiPjwvc3Bhbj5cbjwhLS0gLy8gOSBMYWJlbCBhYm92ZSB0aGUgaGlnaCBzbGlkZXIgaGFuZGxlIC0tPlxuPHNwYW4gbmd4U2xpZGVyTGFiZWwgI21heEhhbmRsZUxhYmVsIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYnViYmxlIG5neC1zbGlkZXItbW9kZWwtaGlnaFwiPjwvc3Bhbj5cbjwhLS0gLy8gMTAgQ29tYmluZWQgcmFuZ2UgbGFiZWwgd2hlbiB0aGUgc2xpZGVyIGhhbmRsZXMgYXJlIGNsb3NlIGV4LiAxNSAtIDE3IC0tPlxuPHNwYW4gbmd4U2xpZGVyTGFiZWwgI2NvbWJpbmVkTGFiZWwgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1idWJibGUgbmd4LXNsaWRlci1jb21iaW5lZFwiPjwvc3Bhbj5cbjwhLS0gLy8gMTEgVGhlIHRpY2tzIC0tPlxuPHNwYW4gbmd4U2xpZGVyRWxlbWVudCAjdGlja3NFbGVtZW50IFtoaWRkZW5dPVwiIXNob3dUaWNrc1wiIFtjbGFzcy5uZ3gtc2xpZGVyLXRpY2tzLXZhbHVlcy11bmRlcl09XCJ0aWNrc1VuZGVyVmFsdWVzQ2xhc3NcIiBjbGFzcz1cIm5neC1zbGlkZXItdGlja3NcIj5cbiAgPHNwYW4gKm5nRm9yPVwibGV0IHQgb2YgdGlja3NcIiBjbGFzcz1cIm5neC1zbGlkZXItdGlja1wiIFtuZ0NsYXNzXT1cInsnbmd4LXNsaWRlci1zZWxlY3RlZCc6IHQuc2VsZWN0ZWR9XCIgW25nU3R5bGVdPVwidC5zdHlsZVwiPlxuICAgIDxuZ3gtc2xpZGVyLXRvb2x0aXAtd3JhcHBlciBbdGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCIgW3Rvb2x0aXBdPVwidC50b29sdGlwXCIgW3BsYWNlbWVudF09XCJ0LnRvb2x0aXBQbGFjZW1lbnRcIj48L25neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyPlxuICAgIDxuZ3gtc2xpZGVyLXRvb2x0aXAtd3JhcHBlciAqbmdJZj1cInQudmFsdWUgIT0gbnVsbFwiIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItdGljay12YWx1ZVwiXG4gICAgICAgIFt0ZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIiBbdG9vbHRpcF09XCJ0LnZhbHVlVG9vbHRpcFwiIFtwbGFjZW1lbnRdPVwidC52YWx1ZVRvb2x0aXBQbGFjZW1lbnRcIiBbY29udGVudF09XCJ0LnZhbHVlXCI+PC9uZ3gtc2xpZGVyLXRvb2x0aXAtd3JhcHBlcj5cbiAgICA8c3BhbiAqbmdJZj1cInQubGVnZW5kICE9IG51bGxcIiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLXRpY2stbGVnZW5kXCIgW2lubmVySFRNTF09XCJ0LmxlZ2VuZFwiPjwvc3Bhbj5cbiAgPC9zcGFuPlxuPC9zcGFuPmAsXG4gIHN0eWxlczogW2A6Om5nLWRlZXAgLm5neC1zbGlkZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjRweDt3aWR0aDoxMDAlO21hcmdpbjozNXB4IDAgMTVweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3RvdWNoLWFjdGlvbjpwYW4teX06Om5nLWRlZXAgLm5neC1zbGlkZXIud2l0aC1sZWdlbmR7bWFyZ2luLWJvdHRvbTo0MHB4fTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF17Y3Vyc29yOm5vdC1hbGxvd2VkfTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF0gLm5neC1zbGlkZXItcG9pbnRlcntjdXJzb3I6bm90LWFsbG93ZWQ7YmFja2dyb3VuZC1jb2xvcjojZDhlMGYzfTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF0gLm5neC1zbGlkZXItZHJhZ2dhYmxle2N1cnNvcjpub3QtYWxsb3dlZH06Om5nLWRlZXAgLm5neC1zbGlkZXJbZGlzYWJsZWRdIC5uZ3gtc2xpZGVyLXNlbGVjdGlvbntiYWNrZ3JvdW5kOiM4YjkxYTJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXSAubmd4LXNsaWRlci10aWNre2N1cnNvcjpub3QtYWxsb3dlZH06Om5nLWRlZXAgLm5neC1zbGlkZXJbZGlzYWJsZWRdIC5uZ3gtc2xpZGVyLXRpY2submd4LXNsaWRlci1zZWxlY3RlZHtiYWNrZ3JvdW5kOiM4YjkxYTJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXNwYW57d2hpdGUtc3BhY2U6bm93cmFwO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6aW5saW5lLWJsb2NrfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXNle3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cGFkZGluZzowfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXItd3JhcHBlcntsZWZ0OjA7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbi10b3A6LTE2cHg7cGFkZGluZy10b3A6MTZweDt3aWR0aDoxMDAlO2hlaWdodDozMnB4O3otaW5kZXg6MX06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItZHJhZ2dhYmxle2N1cnNvcjptb3ZlfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXJ7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjRweDt6LWluZGV4OjE7YmFja2dyb3VuZDojZDhlMGYzO2JvcmRlci1yYWRpdXM6MnB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXItd3JhcHBlci5uZ3gtc2xpZGVyLXRyYW5zcGFyZW50IC5uZ3gtc2xpZGVyLWJhcntiYWNrZ3JvdW5kOjAgMH06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItYmFyLXdyYXBwZXIubmd4LXNsaWRlci1sZWZ0LW91dC1zZWxlY3Rpb24gLm5neC1zbGlkZXItYmFye2JhY2tncm91bmQ6I2RmMDAyZH06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItYmFyLXdyYXBwZXIubmd4LXNsaWRlci1yaWdodC1vdXQtc2VsZWN0aW9uIC5uZ3gtc2xpZGVyLWJhcntiYWNrZ3JvdW5kOiMwM2E2ODh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXNlbGVjdGlvbnt6LWluZGV4OjI7YmFja2dyb3VuZDojMGRiOWYwO2JvcmRlci1yYWRpdXM6MnB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1wb2ludGVye2N1cnNvcjpwb2ludGVyO3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7dG9wOi0xNHB4O2JhY2tncm91bmQtY29sb3I6IzBkYjlmMDt6LWluZGV4OjM7Ym9yZGVyLXJhZGl1czoxNnB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1wb2ludGVyOmFmdGVye2NvbnRlbnQ6Jyc7d2lkdGg6OHB4O2hlaWdodDo4cHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEycHg7bGVmdDoxMnB4O2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQ6I2ZmZn06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItcG9pbnRlcjpob3ZlcjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXIubmd4LXNsaWRlci1hY3RpdmV7ei1pbmRleDo0fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1wb2ludGVyLm5neC1zbGlkZXItYWN0aXZlOmFmdGVye2JhY2tncm91bmQtY29sb3I6IzQ1MWFmZn06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItYnViYmxle2N1cnNvcjpkZWZhdWx0O2JvdHRvbToxNnB4O3BhZGRpbmc6MXB4IDNweDtjb2xvcjojNTU2MzdkO2ZvbnQtc2l6ZToxNnB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1idWJibGUubmd4LXNsaWRlci1saW1pdHtjb2xvcjojNTU2MzdkfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci10aWNrc3tib3gtc2l6aW5nOmJvcmRlci1ib3g7d2lkdGg6MTAwJTtoZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOi0zcHg7bWFyZ2luOjA7ei1pbmRleDoxO2xpc3Qtc3R5bGU6bm9uZX06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItdGlja3MtdmFsdWVzLXVuZGVyIC5uZ3gtc2xpZGVyLXRpY2stdmFsdWV7dG9wOmF1dG87Ym90dG9tOi0zNnB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci10aWNre3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO3dpZHRoOjEwcHg7aGVpZ2h0OjEwcHg7YmFja2dyb3VuZDojZDhlMGYzO2JvcmRlci1yYWRpdXM6NTAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDttYXJnaW4tbGVmdDoxMXB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci10aWNrLm5neC1zbGlkZXItc2VsZWN0ZWR7YmFja2dyb3VuZDojMGRiOWYwfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci10aWNrLXZhbHVle3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMzRweDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMCl9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2stbGVnZW5ke3Bvc2l0aW9uOmFic29sdXRlO3RvcDoyNHB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKTttYXgtd2lkdGg6NTBweDt3aGl0ZS1zcGFjZTpub3JtYWx9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2Fse3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjRweDtoZWlnaHQ6MTAwJTttYXJnaW46MCAyMHB4O3BhZGRpbmc6MDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTt0b3VjaC1hY3Rpb246cGFuLXh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLWJhc2V7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwYWRkaW5nOjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVye3RvcDphdXRvO2xlZnQ6MDttYXJnaW46MCAwIDAgLTE2cHg7cGFkZGluZzowIDAgMCAxNnB4O2hlaWdodDoxMDAlO3dpZHRoOjMycHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLWJhcntib3R0b206MDtsZWZ0OmF1dG87d2lkdGg6NHB4O2hlaWdodDoxMDAlfTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci1wb2ludGVye2xlZnQ6LTE0cHghaW1wb3J0YW50O3RvcDphdXRvO2JvdHRvbTowfTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci1idWJibGV7bGVmdDoxNnB4IWltcG9ydGFudDtib3R0b206MH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItdGlja3N7aGVpZ2h0OjEwMCU7d2lkdGg6MDtsZWZ0Oi0zcHg7dG9wOjA7ei1pbmRleDoxfTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci10aWNre3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tbGVmdDphdXRvO21hcmdpbi10b3A6MTFweH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItdGljay12YWx1ZXtsZWZ0OjI0cHg7dG9wOmF1dG87LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI4JSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLC0yOCUpfTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci10aWNrLWxlZ2VuZHt0b3A6YXV0bztyaWdodDoyNHB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgwLC0yOCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCwtMjglKTttYXgtd2lkdGg6bm9uZTt3aGl0ZS1zcGFjZTpub3dyYXB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXRpY2tzLXZhbHVlcy11bmRlciAubmd4LXNsaWRlci10aWNrLXZhbHVle2JvdHRvbTphdXRvO2xlZnQ6YXV0bztyaWdodDoyNHB4fTo6bmctZGVlcCAubmd4LXNsaWRlciAqe3RyYW5zaXRpb246bm9uZX06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1iYXItd3JhcHBlcnt0cmFuc2l0aW9uOi4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItc2VsZWN0aW9ue3RyYW5zaXRpb246YmFja2dyb3VuZC1jb2xvciAuM3MgbGluZWFyfTo6bmctZGVlcCAubmd4LXNsaWRlci5hbmltYXRlIC5uZ3gtc2xpZGVyLXBvaW50ZXJ7dHJhbnNpdGlvbjouM3MgbGluZWFyfTo6bmctZGVlcCAubmd4LXNsaWRlci5hbmltYXRlIC5uZ3gtc2xpZGVyLWJ1YmJsZXt0cmFuc2l0aW9uOi4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItYnViYmxlLm5neC1zbGlkZXItbGltaXR7dHJhbnNpdGlvbjpvcGFjaXR5IC4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItYnViYmxlLm5neC1zbGlkZXItY29tYmluZWR7dHJhbnNpdGlvbjpvcGFjaXR5IC4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItdGlja3t0cmFuc2l0aW9uOmJhY2tncm91bmQtY29sb3IgLjNzIGxpbmVhcn1gXSxcbiAgaG9zdDogeyBjbGFzczogJ25neC1zbGlkZXInIH0sXG4gIHByb3ZpZGVyczogW05HWF9TTElERVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvLyBNb2RlbCBmb3IgbG93IHZhbHVlIG9mIHNsaWRlci4gRm9yIHNpbXBsZSBzbGlkZXIsIHRoaXMgaXMgdGhlIG9ubHkgaW5wdXQuIEZvciByYW5nZSBzbGlkZXIsIHRoaXMgaXMgdGhlIGxvdyB2YWx1ZS5cbiAgQElucHV0KClcbiAgcHVibGljIHZhbHVlOiBudW1iZXIgPSBudWxsO1xuICAvLyBPdXRwdXQgZm9yIGxvdyB2YWx1ZSBzbGlkZXIgdG8gc3VwcG9ydCB0d28td2F5IGJpbmRpbmdzXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIE1vZGVsIGZvciBoaWdoIHZhbHVlIG9mIHNsaWRlci4gTm90IHVzZWQgaW4gc2ltcGxlIHNsaWRlci4gRm9yIHJhbmdlIHNsaWRlciwgdGhpcyBpcyB0aGUgaGlnaCB2YWx1ZS5cbiAgQElucHV0KClcbiAgcHVibGljIGhpZ2hWYWx1ZTogbnVtYmVyID0gbnVsbDtcbiAgLy8gT3V0cHV0IGZvciBoaWdoIHZhbHVlIHNsaWRlciB0byBzdXBwb3J0IHR3by13YXkgYmluZGluZ3NcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBoaWdoVmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIEFuIG9iamVjdCB3aXRoIGFsbCB0aGUgb3RoZXIgb3B0aW9ucyBvZiB0aGUgc2xpZGVyLlxuICAvLyBFYWNoIG9wdGlvbiBjYW4gYmUgdXBkYXRlZCBhdCBydW50aW1lIGFuZCB0aGUgc2xpZGVyIHdpbGwgYXV0b21hdGljYWxseSBiZSByZS1yZW5kZXJlZC5cbiAgQElucHV0KClcbiAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnMgPSBuZXcgT3B0aW9ucygpO1xuXG4gIC8vIEV2ZW50IGVtaXR0ZWQgd2hlbiB1c2VyIHN0YXJ0cyBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzbGlkZXJcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB1c2VyQ2hhbmdlU3RhcnQ6IEV2ZW50RW1pdHRlcjxDaGFuZ2VDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvLyBFdmVudCBlbWl0dGVkIG9uIGVhY2ggY2hhbmdlIGNvbWluZyBmcm9tIHVzZXIgaW50ZXJhY3Rpb25cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB1c2VyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2hhbmdlQ29udGV4dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gRXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgZmluaXNoZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgc2xpZGVyXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgdXNlckNoYW5nZUVuZDogRXZlbnRFbWl0dGVyPENoYW5nZUNvbnRleHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgbWFudWFsUmVmcmVzaFN1YnNjcmlwdGlvbjogYW55O1xuICAvLyBJbnB1dCBldmVudCB0aGF0IHRyaWdnZXJzIHNsaWRlciByZWZyZXNoIChyZS1wb3NpdGlvbmluZyBvZiBzbGlkZXIgZWxlbWVudHMpXG4gIEBJbnB1dCgpIHNldCBtYW51YWxSZWZyZXNoKG1hbnVhbFJlZnJlc2g6IEV2ZW50RW1pdHRlcjx2b2lkPikge1xuICAgIHRoaXMudW5zdWJzY3JpYmVNYW51YWxSZWZyZXNoKCk7XG5cbiAgICB0aGlzLm1hbnVhbFJlZnJlc2hTdWJzY3JpcHRpb24gPSBtYW51YWxSZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnNBbmREZXRlY3RDaGFuZ2VzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyRm9jdXNTdWJzY3JpcHRpb246IGFueTtcbiAgLy8gSW5wdXQgZXZlbnQgdGhhdCB0cmlnZ2VycyBzZXR0aW5nIGZvY3VzIG9uIGdpdmVuIHNsaWRlciBoYW5kbGVcbiAgQElucHV0KCkgc2V0IHRyaWdnZXJGb2N1cyh0cmlnZ2VyRm9jdXM6IEV2ZW50RW1pdHRlcjx2b2lkPikge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUcmlnZ2VyRm9jdXMoKTtcblxuICAgIHRoaXMudHJpZ2dlckZvY3VzU3Vic2NyaXB0aW9uID0gdHJpZ2dlckZvY3VzLnN1YnNjcmliZSgocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzUG9pbnRlcihwb2ludGVyVHlwZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTbGlkZXIgdHlwZSwgdHJ1ZSBtZWFucyByYW5nZSBzbGlkZXJcbiAgcHVibGljIGdldCByYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmFsdWUpICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLmhpZ2hWYWx1ZSk7XG4gIH1cblxuICAvLyBTZXQgdG8gdHJ1ZSBpZiBpbml0IG1ldGhvZCBhbHJlYWR5IGV4ZWN1dGVkXG4gIHByaXZhdGUgaW5pdEhhc1J1bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIENoYW5nZXMgaW4gbW9kZWwgaW5wdXRzIGFyZSBwYXNzZWQgdGhyb3VnaCB0aGlzIHN1YmplY3RcbiAgLy8gVGhlc2UgYXJlIGFsbCBjaGFuZ2VzIGNvbWluZyBpbiBmcm9tIG91dHNpZGUgdGhlIGNvbXBvbmVudCB0aHJvdWdoIGlucHV0IGJpbmRpbmdzIG9yIHJlYWN0aXZlIGZvcm0gaW5wdXRzXG4gIHByaXZhdGUgaW5wdXRNb2RlbENoYW5nZVN1YmplY3Q6IFN1YmplY3Q8SW5wdXRNb2RlbENoYW5nZT4gPSBuZXcgU3ViamVjdDxJbnB1dE1vZGVsQ2hhbmdlPigpO1xuICBwcml2YXRlIGlucHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XG5cbiAgLy8gQ2hhbmdlcyB0byBtb2RlbCBvdXRwdXRzIGFyZSBwYXNzZWQgdGhyb3VnaCB0aGlzIHN1YmplY3RcbiAgLy8gVGhlc2UgYXJlIGFsbCBjaGFuZ2VzIHRoYXQgbmVlZCB0byBiZSBjb21tdW5pY2F0ZWQgdG8gb3V0cHV0IGVtaXR0ZXJzIGFuZCByZWdpc3RlcmVkIGNhbGxiYWNrc1xuICBwcml2YXRlIG91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdDogU3ViamVjdDxPdXRwdXRNb2RlbENoYW5nZT4gPSBuZXcgU3ViamVjdDxPdXRwdXRNb2RlbENoYW5nZT4oKTtcbiAgcHJpdmF0ZSBvdXRwdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICAvLyBMb3cgdmFsdWUgc3luY2VkIHRvIG1vZGVsIGxvdyB2YWx1ZVxuICBwcml2YXRlIHZpZXdMb3dWYWx1ZTogbnVtYmVyID0gbnVsbDtcbiAgLy8gSGlnaCB2YWx1ZSBzeW5jZWQgdG8gbW9kZWwgaGlnaCB2YWx1ZVxuICBwcml2YXRlIHZpZXdIaWdoVmFsdWU6IG51bWJlciA9IG51bGw7XG4gIC8vIE9wdGlvbnMgc3luY2VkIHRvIG1vZGVsIG9wdGlvbnMsIGJhc2VkIG9uIGRlZmF1bHRzXG4gIHByaXZhdGUgdmlld09wdGlvbnM6IE9wdGlvbnMgPSBuZXcgT3B0aW9ucygpO1xuXG4gIC8vIEhhbGYgb2YgdGhlIHdpZHRoIG9yIGhlaWdodCBvZiB0aGUgc2xpZGVyIGhhbmRsZXNcbiAgcHJpdmF0ZSBoYW5kbGVIYWxmRGltZW5zaW9uOiBudW1iZXIgPSAwO1xuICAvLyBNYXhpbXVtIHBvc2l0aW9uIHRoZSBzbGlkZXIgaGFuZGxlIGNhbiBoYXZlXG4gIHByaXZhdGUgbWF4SGFuZGxlUG9zaXRpb246IG51bWJlciA9IDA7XG5cbiAgLy8gV2hpY2ggaGFuZGxlIGlzIGN1cnJlbnRseSB0cmFja2VkIGZvciBtb3ZlIGV2ZW50c1xuICBwcml2YXRlIGN1cnJlbnRUcmFja2luZ1BvaW50ZXI6IFBvaW50ZXJUeXBlID0gbnVsbDtcbiAgLy8gSW50ZXJuYWwgdmFyaWFibGUgdG8ga2VlcCB0cmFjayBvZiB0aGUgZm9jdXMgZWxlbWVudFxuICBwcml2YXRlIGN1cnJlbnRGb2N1c1BvaW50ZXI6IFBvaW50ZXJUeXBlID0gbnVsbDtcbiAgLy8gVXNlZCB0byBjYWxsIG9uU3RhcnQgb24gdGhlIGZpcnN0IGtleWRvd24gZXZlbnRcbiAgcHJpdmF0ZSBmaXJzdEtleURvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gQ3VycmVudCB0b3VjaCBpZCBvZiB0b3VjaCBldmVudCBiZWluZyBoYW5kbGVkXG4gIHByaXZhdGUgdG91Y2hJZDogbnVtYmVyID0gbnVsbDtcbiAgLy8gVmFsdWVzIHJlY29yZGVkIHdoZW4gZmlyc3QgZHJhZ2dpbmcgdGhlIGJhclxuICBwcml2YXRlIGRyYWdnaW5nOiBEcmFnZ2luZyA9IG5ldyBEcmFnZ2luZygpO1xuXG4gIC8qIFNsaWRlciBET00gZWxlbWVudHMgKi9cblxuICAvLyBMZWZ0IHNlbGVjdGlvbiBiYXIgb3V0c2lkZSB0d28gaGFuZGxlc1xuICBAVmlld0NoaWxkKCdsZWZ0T3V0ZXJTZWxlY3Rpb25CYXInLCB7cmVhZDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgbGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZTtcblxuICAvLyBSaWdodCBzZWxlY3Rpb24gYmFyIG91dHNpZGUgdHdvIGhhbmRsZXNcbiAgQFZpZXdDaGlsZCgncmlnaHRPdXRlclNlbGVjdGlvbkJhcicsIHtyZWFkOiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSByaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZTtcblxuICAvLyBUaGUgd2hvbGUgc2xpZGVyIGJhclxuICBAVmlld0NoaWxkKCdmdWxsQmFyJywge3JlYWQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmV9KVxuICBwcml2YXRlIGZ1bGxCYXJFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIEhpZ2hsaWdodCBiZXR3ZWVuIHR3byBoYW5kbGVzXG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdGlvbkJhcicsIHtyZWFkOiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBzZWxlY3Rpb25CYXJFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIExlZnQgc2xpZGVyIGhhbmRsZVxuICBAVmlld0NoaWxkKCdtaW5IYW5kbGUnLCB7cmVhZDogU2xpZGVySGFuZGxlRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBtaW5IYW5kbGVFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmU7XG5cbiAgLy8gUmlnaHQgc2xpZGVyIGhhbmRsZVxuICBAVmlld0NoaWxkKCdtYXhIYW5kbGUnLCB7cmVhZDogU2xpZGVySGFuZGxlRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBtYXhIYW5kbGVFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmU7XG5cbiAgLy8gRmxvb3IgbGFiZWxcbiAgQFZpZXdDaGlsZCgnZmxvb3JMYWJlbCcsIHtyZWFkOiBTbGlkZXJMYWJlbERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgZmxvb3JMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIENlaWxpbmcgbGFiZWxcbiAgQFZpZXdDaGlsZCgnY2VpbExhYmVsJywge3JlYWQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBjZWlsTGFiZWxFbGVtZW50OiBTbGlkZXJMYWJlbERpcmVjdGl2ZTtcblxuICAvLyBMYWJlbCBhYm92ZSB0aGUgbG93IHZhbHVlXG4gIEBWaWV3Q2hpbGQoJ21pbkhhbmRsZUxhYmVsJywge3JlYWQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBtaW5IYW5kbGVMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIExhYmVsIGFib3ZlIHRoZSBoaWdoIHZhbHVlXG4gIEBWaWV3Q2hpbGQoJ21heEhhbmRsZUxhYmVsJywge3JlYWQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBtYXhIYW5kbGVMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIENvbWJpbmVkIGxhYmVsXG4gIEBWaWV3Q2hpbGQoJ2NvbWJpbmVkTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIGNvbWJpbmVkTGFiZWxFbGVtZW50OiBTbGlkZXJMYWJlbERpcmVjdGl2ZTtcblxuICAvLyBUaGUgdGlja3NcbiAgQFZpZXdDaGlsZCgndGlja3NFbGVtZW50Jywge3JlYWQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmV9KVxuICBwcml2YXRlIHRpY2tzRWxlbWVudDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZTtcblxuICAvLyBPcHRpb25hbCBjdXN0b20gdGVtcGxhdGUgZm9yIGRpc3BsYXlpbmcgdG9vbHRpcHNcbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJylcbiAgcHVibGljIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyBIb3N0IGVsZW1lbnQgY2xhc3MgYmluZGluZ3NcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy52ZXJ0aWNhbCcpXG4gIHB1YmxpYyBzbGlkZXJFbGVtZW50VmVydGljYWxDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFuaW1hdGUnKVxuICBwdWJsaWMgc2xpZGVyRWxlbWVudEFuaW1hdGVDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLndpdGgtbGVnZW5kJylcbiAgcHVibGljIHNsaWRlckVsZW1lbnRXaXRoTGVnZW5kQ2xhc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRpc2FibGVkJylcbiAgcHVibGljIHNsaWRlckVsZW1lbnREaXNhYmxlZEF0dHI6IHN0cmluZyA9IG51bGw7XG5cbiAgLy8gQ1NTIHN0eWxlcyBhbmQgY2xhc3MgZmxhZ3NcbiAgcHVibGljIGJhclN0eWxlOiBhbnkgPSB7fTtcbiAgcHVibGljIG1pblBvaW50ZXJTdHlsZTogYW55ID0ge307XG4gIHB1YmxpYyBtYXhQb2ludGVyU3R5bGU6IGFueSA9IHt9O1xuICBwdWJsaWMgZnVsbEJhclRyYW5zcGFyZW50Q2xhc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNlbGVjdGlvbkJhckRyYWdnYWJsZUNsYXNzOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyB0aWNrc1VuZGVyVmFsdWVzQ2xhc3M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBXaGV0aGVyIHRvIHNob3cvaGlkZSB0aWNrc1xuICBwdWJsaWMgZ2V0IHNob3dUaWNrcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3M7XG4gIH1cblxuICAvKiBJZiB0aWNrU3RlcCBpcyBzZXQgb3IgdGlja3NBcnJheSBpcyBzcGVjaWZpZWQuXG4gICAgIEluIHRoaXMgY2FzZSwgdGlja3MgdmFsdWVzIHNob3VsZCBiZSBkaXNwbGF5ZWQgYmVsb3cgdGhlIHNsaWRlci4gKi9cbiAgcHJpdmF0ZSBpbnRlcm1lZGlhdGVUaWNrczogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUaWNrcyBhcnJheSBhcyBkaXNwbGF5ZWQgaW4gdmlld1xuICBwdWJsaWMgdGlja3M6IFRpY2tbXSA9IFtdO1xuXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICBwcml2YXRlIGV2ZW50TGlzdGVuZXJIZWxwZXI6IEV2ZW50TGlzdGVuZXJIZWxwZXIgPSBudWxsO1xuICBwcml2YXRlIG9uTW92ZUV2ZW50TGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIgPSBudWxsO1xuICBwcml2YXRlIG9uRW5kRXZlbnRMaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gIC8vIFdoZXRoZXIgY3VycmVudGx5IG1vdmluZyB0aGUgc2xpZGVyIChiZXR3ZWVuIG9uU3RhcnQoKSBhbmQgb25FbmQoKSlcbiAgcHJpdmF0ZSBtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBPYnNlcnZlciBmb3Igc2xpZGVyIGVsZW1lbnQgcmVzaXplIGV2ZW50c1xuICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciA9IG51bGw7XG5cbiAgLy8gQ2FsbGJhY2tzIGZvciByZWFjdGl2ZSBmb3JtcyBzdXBwb3J0XG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gbnVsbDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9IG51bGw7XG5cblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIgPSBuZXcgRXZlbnRMaXN0ZW5lckhlbHBlcih0aGlzLnJlbmRlcmVyKTtcbiAgfVxuXG4gIC8vIE9uSW5pdCBpbnRlcmZhY2VcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld09wdGlvbnMgPSBuZXcgT3B0aW9ucygpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy52aWV3T3B0aW9ucywgdGhpcy5vcHRpb25zKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gcnVuIHRoZXNlIHR3byB0aGluZ3MgZmlyc3QsIGJlZm9yZSB0aGUgcmVzdCBvZiB0aGUgaW5pdCBpbiBuZ0FmdGVyVmlld0luaXQoKSxcbiAgICAvLyBiZWNhdXNlIHRoZXNlIHR3byBzZXR0aW5ncyBhcmUgc2V0IHRocm91Z2ggQEhvc3RCaW5kaW5nIGFuZCBBbmd1bGFyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAvLyBtZWNoYW5pc20gZG9lc24ndCBsaWtlIHRoZW0gY2hhbmdpbmcgaW4gbmdBZnRlclZpZXdJbml0KClcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZVZlcnRpY2FsU3RhdGUoKTtcbiAgfVxuXG4gIC8vIEFmdGVyVmlld0luaXQgaW50ZXJmYWNlXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hcHBseU9wdGlvbnMoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QodGhpcy52aWV3T3B0aW9ucy5pbnB1dEV2ZW50c0ludGVydmFsKTtcbiAgICB0aGlzLnN1YnNjcmliZU91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdCh0aGlzLnZpZXdPcHRpb25zLm91dHB1dEV2ZW50c0ludGVydmFsKTtcblxuICAgIC8vIE9uY2Ugd2UgYXBwbHkgb3B0aW9ucywgd2UgbmVlZCB0byBub3JtYWxpc2UgbW9kZWwgdmFsdWVzIGZvciB0aGUgZmlyc3QgdGltZVxuICAgIHRoaXMucmVub3JtYWxpc2VNb2RlbFZhbHVlcygpO1xuXG4gICAgdGhpcy52aWV3TG93VmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gdGhpcy5tb2RlbFZhbHVlVG9WaWV3VmFsdWUodGhpcy5oaWdoVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVmVydGljYWxTdGF0ZSgpOyAvLyBuZWVkIHRvIHJ1biB0aGlzIGFnYWluIHRvIGNvdmVyIGNoYW5nZXMgdG8gc2xpZGVyIGVsZW1lbnRzXG4gICAgdGhpcy5tYW5hZ2VFbGVtZW50c1N0eWxlKCk7XG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpO1xuICAgIHRoaXMuYWRkQWNjZXNzaWJpbGl0eSgpO1xuICAgIHRoaXMudXBkYXRlQ2VpbExhYmVsKCk7XG4gICAgdGhpcy51cGRhdGVGbG9vckxhYmVsKCk7XG4gICAgdGhpcy5pbml0SGFuZGxlcygpO1xuICAgIHRoaXMubWFuYWdlRXZlbnRzQmluZGluZ3MoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTtcblxuICAgIHRoaXMuaW5pdEhhc1J1biA9IHRydWU7XG5cbiAgICAvLyBSdW4gY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseSB0byByZXNvbHZlIHNvbWUgaXNzdWVzIHdoZW4gaW5pdCBwcm9jZWR1cmUgY2hhbmdlcyB2YWx1ZXMgdXNlZCBpbiB0aGUgdmlld1xuICAgIGlmICghdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gT25DaGFuZ2VzIGludGVyZmFjZVxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIC8vIEFsd2F5cyBhcHBseSBvcHRpb25zIGZpcnN0XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChjaGFuZ2VzLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlT3B0aW9ucygpO1xuICAgIH1cblxuICAgIC8vIFRoZW4gdmFsdWUgY2hhbmdlc1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoY2hhbmdlcy52YWx1ZSkgfHxcbiAgICAgICAgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGNoYW5nZXMuaGlnaFZhbHVlKSkge1xuICAgICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIGhpZ2hWYWx1ZTogdGhpcy5oaWdoVmFsdWUsXG4gICAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZSxcbiAgICAgICAgaW50ZXJuYWxDaGFuZ2U6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBPbkRlc3Ryb3kgaW50ZXJmYWNlXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgdGhpcy51bnN1YnNjcmliZVJlc2l6ZU9ic2VydmVyKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZUlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk7XG4gICAgdGhpcy51bnN1YnNjcmliZU91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmVNYW51YWxSZWZyZXNoKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZVRyaWdnZXJGb2N1cygpO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLnZhbHVlID0gb2JqWzBdO1xuICAgICAgdGhpcy5oaWdoVmFsdWUgPSBvYmpbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSBvYmo7XG4gICAgfVxuXG4gICAgLy8gbmdPbkNoYW5nZXMoKSBpcyBub3QgY2FsbGVkIGluIHRoaXMgaW5zdGFuY2UsIHNvIHdlIG5lZWQgdG8gY29tbXVuaWNhdGUgdGhlIGNoYW5nZSBtYW51YWxseVxuICAgIHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YmplY3QubmV4dCh7XG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGhpZ2hWYWx1ZTogdGhpcy5oaWdoVmFsdWUsXG4gICAgICBmb3JjZUNoYW5nZTogZmFsc2UsXG4gICAgICBpbnRlcm5hbENoYW5nZTogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShvbkNoYW5nZUNhbGxiYWNrOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBvbkNoYW5nZUNhbGxiYWNrO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChvblRvdWNoZWRDYWxsYmFjazogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IG9uVG91Y2hlZENhbGxiYWNrO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnNBbmREZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0KGludGVydmFsPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3ViamVjdFxuICAgIC5waXBlKFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoTW9kZWxDaGFuZ2UuY29tcGFyZSksXG4gICAgICAvLyBIYWNrIHRvIHJlc2V0IHRoZSBzdGF0dXMgb2YgdGhlIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkgLSBpZiBhIFwiZmFrZVwiIGV2ZW50IGNvbWVzIHRocm91Z2ggd2l0aCBmb3JjZUNoYW5nZT10cnVlLFxuICAgICAgLy8gd2UgZm9yY2VmdWxseSBieS1wYXNzIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIGJ1dCBvdGhlcndpc2UgZHJvcCB0aGUgZXZlbnRcbiAgICAgIGZpbHRlcigobW9kZWxDaGFuZ2U6IElucHV0TW9kZWxDaGFuZ2UpID0+ICFtb2RlbENoYW5nZS5mb3JjZUNoYW5nZSAmJiAhbW9kZWxDaGFuZ2UuaW50ZXJuYWxDaGFuZ2UpLFxuICAgICAgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChpbnRlcnZhbCkpXG4gICAgICAgICAgPyB0aHJvdHRsZVRpbWUoaW50ZXJ2YWwsIHVuZGVmaW5lZCwgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogdHJ1ZX0pXG4gICAgICAgICAgOiB0YXAoKCkgPT4ge30pIC8vIG5vLW9wXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKG1vZGVsQ2hhbmdlOiBJbnB1dE1vZGVsQ2hhbmdlKSA9PiB0aGlzLmFwcGx5SW5wdXRNb2RlbENoYW5nZShtb2RlbENoYW5nZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVPdXRwdXRNb2RlbENoYW5nZVN1YmplY3QoaW50ZXJ2YWw/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YmplY3RcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChNb2RlbENoYW5nZS5jb21wYXJlKSxcbiAgICAgICAgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChpbnRlcnZhbCkpXG4gICAgICAgICAgPyB0aHJvdHRsZVRpbWUoaW50ZXJ2YWwsIHVuZGVmaW5lZCwgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogdHJ1ZX0pXG4gICAgICAgICAgOiB0YXAoKCkgPT4ge30pIC8vIG5vLW9wXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChtb2RlbENoYW5nZTogT3V0cHV0TW9kZWxDaGFuZ2UpID0+IHRoaXMucHVibGlzaE91dHB1dE1vZGVsQ2hhbmdlKG1vZGVsQ2hhbmdlKSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIGlmIChDb21wYXRpYmlsaXR5SGVscGVyLmlzUmVzaXplT2JzZXJ2ZXJBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKTogdm9pZCA9PiB0aGlzLmNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zQW5kRGV0ZWN0Q2hhbmdlcygpKTtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIGlmIChDb21wYXRpYmlsaXR5SGVscGVyLmlzUmVzaXplT2JzZXJ2ZXJBdmFpbGFibGUoKSAmJiB0aGlzLnJlc2l6ZU9ic2VydmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVPbk1vdmUoKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIpKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIuZGV0YWNoRXZlbnRMaXN0ZW5lcih0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIpO1xuICAgICAgdGhpcy5vbk1vdmVFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlT25FbmQoKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLm9uRW5kRXZlbnRMaXN0ZW5lcikpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5kZXRhY2hFdmVudExpc3RlbmVyKHRoaXMub25FbmRFdmVudExpc3RlbmVyKTtcbiAgICAgIHRoaXMub25FbmRFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QoKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24pKSB7XG4gICAgICB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZU91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24pKSB7XG4gICAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlTWFudWFsUmVmcmVzaCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMubWFudWFsUmVmcmVzaFN1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMubWFudWFsUmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5tYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlVHJpZ2dlckZvY3VzKCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy50cmlnZ2VyRm9jdXNTdWJzY3JpcHRpb24pKSB7XG4gICAgICB0aGlzLnRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy50cmlnZ2VyRm9jdXNTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UG9pbnRlckVsZW1lbnQocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKTogU2xpZGVySGFuZGxlRGlyZWN0aXZlIHtcbiAgICBpZiAocG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgcmV0dXJuIHRoaXMubWluSGFuZGxlRWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJUeXBlID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1heEhhbmRsZUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50VHJhY2tpbmdWYWx1ZSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgcmV0dXJuIHRoaXMudmlld0xvd1ZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZXdIaWdoVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtb2RlbFZhbHVlVG9WaWV3VmFsdWUobW9kZWxWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQobW9kZWxWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpICYmICF0aGlzLnZpZXdPcHRpb25zLmJpbmRJbmRleEZvclN0ZXBzQXJyYXkpIHtcbiAgICAgIHJldHVybiBWYWx1ZUhlbHBlci5maW5kU3RlcEluZGV4KCttb2RlbFZhbHVlLCB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpO1xuICAgIH1cbiAgICByZXR1cm4gK21vZGVsVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHZpZXdWYWx1ZVRvTW9kZWxWYWx1ZSh2aWV3VmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpICYmICF0aGlzLnZpZXdPcHRpb25zLmJpbmRJbmRleEZvclN0ZXBzQXJyYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFN0ZXBWYWx1ZSh2aWV3VmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmlld1ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGVwVmFsdWUoc2xpZGVyVmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc3RlcDogQ3VzdG9tU3RlcERlZmluaXRpb24gPSB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXlbc2xpZGVyVmFsdWVdO1xuICAgIHJldHVybiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHN0ZXApKSA/IHN0ZXAudmFsdWUgOiBOYU47XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Vmlld0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy52aWV3VmFsdWVUb01vZGVsVmFsdWUodGhpcy52aWV3TG93VmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLmhpZ2hWYWx1ZSA9IHRoaXMudmlld1ZhbHVlVG9Nb2RlbFZhbHVlKHRoaXMudmlld0hpZ2hWYWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YmplY3QubmV4dCh7XG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGhpZ2hWYWx1ZTogdGhpcy5oaWdoVmFsdWUsXG4gICAgICB1c2VyRXZlbnRJbml0aWF0ZWQ6IHRydWUsXG4gICAgICBmb3JjZUNoYW5nZTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgYWxsIGNoYW5nZXMgYXJlIGFwcGxpZWQgYW5kIG91dHB1dHMgYXJlIGVtaXR0ZWQsIHNvIHdlIHNob3VsZCBiZSBkb25lLlxuICAgIC8vIEhvd2V2ZXIsIGlucHV0IGNoYW5nZXMgYXJlIGNvbW11bmljYXRlZCBpbiBkaWZmZXJlbnQgc3RyZWFtIGFuZCB3ZSBuZWVkIHRvIGJlIHJlYWR5IHRvXG4gICAgLy8gYWN0IG9uIHRoZSBuZXh0IGlucHV0IGNoYW5nZSBldmVuIGlmIGl0IGlzIGV4YWN0bHkgdGhlIHNhbWUgYXMgbGFzdCBpbnB1dCBjaGFuZ2UuXG4gICAgLy8gVGhlcmVmb3JlLCB3ZSBzZW5kIGEgc3BlY2lhbCBldmVudCB0byByZXNldCB0aGUgc3RyZWFtLlxuICAgIHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YmplY3QubmV4dCh7XG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIGhpZ2hWYWx1ZTogdGhpcy5oaWdoVmFsdWUsXG4gICAgICBmb3JjZUNoYW5nZTogZmFsc2UsXG4gICAgICBpbnRlcm5hbENoYW5nZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQXBwbHkgbW9kZWwgY2hhbmdlIHRvIHRoZSBzbGlkZXIgdmlld1xuICBwcml2YXRlIGFwcGx5SW5wdXRNb2RlbENoYW5nZShtb2RlbENoYW5nZTogSW5wdXRNb2RlbENoYW5nZSk6IHZvaWQge1xuICAgIGNvbnN0IG5vcm1hbGlzZWRNb2RlbENoYW5nZTogTW9kZWxWYWx1ZXMgPSB0aGlzLm5vcm1hbGlzZU1vZGVsVmFsdWVzKG1vZGVsQ2hhbmdlKTtcblxuICAgIC8vIElmIG5vcm1hbGlzZWQgbW9kZWwgY2hhbmdlIGlzIGRpZmZlcmVudCwgYXBwbHkgdGhlIGNoYW5nZSB0byB0aGUgbW9kZWwgdmFsdWVzXG4gICAgY29uc3Qgbm9ybWFsaXNhdGlvbkNoYW5nZTogYm9vbGVhbiA9ICFNb2RlbFZhbHVlcy5jb21wYXJlKG1vZGVsQ2hhbmdlLCBub3JtYWxpc2VkTW9kZWxDaGFuZ2UpO1xuICAgIGlmIChub3JtYWxpc2F0aW9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gbm9ybWFsaXNlZE1vZGVsQ2hhbmdlLnZhbHVlO1xuICAgICAgdGhpcy5oaWdoVmFsdWUgPSBub3JtYWxpc2VkTW9kZWxDaGFuZ2UuaGlnaFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMudmlld0xvd1ZhbHVlID0gdGhpcy5tb2RlbFZhbHVlVG9WaWV3VmFsdWUobm9ybWFsaXNlZE1vZGVsQ2hhbmdlLnZhbHVlKTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gdGhpcy5tb2RlbFZhbHVlVG9WaWV3VmFsdWUobm9ybWFsaXNlZE1vZGVsQ2hhbmdlLmhpZ2hWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVMb3dIYW5kbGUodGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3TG93VmFsdWUpKTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVIaWdoSGFuZGxlKHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0hpZ2hWYWx1ZSkpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkJhcigpO1xuICAgIHRoaXMudXBkYXRlVGlja3NTY2FsZSgpO1xuICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDb21iaW5lZExhYmVsKCk7XG4gICAgfVxuXG4gICAgLy8gQXQgdGhlIGVuZCwgd2UgbmVlZCB0byBjb21tdW5pY2F0ZSB0aGUgbW9kZWwgY2hhbmdlIHRvIHRoZSBvdXRwdXRzIGFzIHdlbGxcbiAgICAvLyBOb3JtYWxpc2F0aW9uIGNoYW5nZXMgYXJlIGFsc28gYWx3YXlzIGZvcmNlZCBvdXQgdG8gZW5zdXJlIHRoYXQgc3Vic2NyaWJlcnMgYWx3YXlzIGVuZCB1cCBpbiBjb3JyZWN0IHN0YXRlXG4gICAgdGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YmplY3QubmV4dCh7XG4gICAgICB2YWx1ZTogbm9ybWFsaXNlZE1vZGVsQ2hhbmdlLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiBub3JtYWxpc2VkTW9kZWxDaGFuZ2UuaGlnaFZhbHVlLFxuICAgICAgZm9yY2VDaGFuZ2U6IG5vcm1hbGlzYXRpb25DaGFuZ2UsXG4gICAgICB1c2VyRXZlbnRJbml0aWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICAvLyBQdWJsaXNoIG1vZGVsIGNoYW5nZSB0byBvdXRwdXQgZXZlbnQgZW1pdHRlcnMgYW5kIHJlZ2lzdGVyZWQgY2FsbGJhY2tzXG4gIHByaXZhdGUgcHVibGlzaE91dHB1dE1vZGVsQ2hhbmdlKG1vZGVsQ2hhbmdlOiBPdXRwdXRNb2RlbENoYW5nZSk6IHZvaWQge1xuICAgIGNvbnN0IGVtaXRPdXRwdXRzOiAoKSA9PiB2b2lkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG1vZGVsQ2hhbmdlLnZhbHVlKTtcbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIHRoaXMuaGlnaFZhbHVlQ2hhbmdlLmVtaXQobW9kZWxDaGFuZ2UuaGlnaFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spKSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKFttb2RlbENoYW5nZS52YWx1ZSwgbW9kZWxDaGFuZ2UuaGlnaFZhbHVlXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKG1vZGVsQ2hhbmdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLm9uVG91Y2hlZENhbGxiYWNrKSkge1xuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soW21vZGVsQ2hhbmdlLnZhbHVlLCBtb2RlbENoYW5nZS5oaWdoVmFsdWVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKG1vZGVsQ2hhbmdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAobW9kZWxDaGFuZ2UudXNlckV2ZW50SW5pdGlhdGVkKSB7XG4gICAgICAvLyBJZiB0aGlzIGNoYW5nZSB3YXMgaW5pdGlhdGVkIGJ5IGEgdXNlciBldmVudCwgd2UgY2FuIGVtaXQgb3V0cHV0cyBpbiB0aGUgc2FtZSB0aWNrXG4gICAgICBlbWl0T3V0cHV0cygpO1xuICAgICAgdGhpcy51c2VyQ2hhbmdlLmVtaXQodGhpcy5nZXRDaGFuZ2VDb250ZXh0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCdXQsIGlmIHRoZSBjaGFuZ2Ugd2FzIGluaXRhdGVkIGJ5IHNvbWV0aGluZyBlbHNlIGxpa2UgYSBjaGFuZ2UgaW4gaW5wdXQgYmluZGluZ3MsXG4gICAgICAvLyB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgbmV4dCB0aWNrIHRvIGVtaXQgdGhlIG91dHB1dHMgdG8ga2VlcCBBbmd1bGFyIGNoYW5nZSBkZXRlY3Rpb24gaGFwcHlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBlbWl0T3V0cHV0cygpOyB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGlzZU1vZGVsVmFsdWVzKGlucHV0OiBNb2RlbFZhbHVlcyk6IE1vZGVsVmFsdWVzIHtcbiAgICBjb25zdCBub3JtYWxpc2VkSW5wdXQ6IE1vZGVsVmFsdWVzID0gbmV3IE1vZGVsVmFsdWVzKCk7XG4gICAgbm9ybWFsaXNlZElucHV0LnZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgbm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZSA9IGlucHV0LmhpZ2hWYWx1ZTtcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5KSkge1xuICAgICAgLy8gV2hlbiB1c2luZyBzdGVwcyBhcnJheSwgb25seSByb3VuZCB0byBuZWFyZXN0IHN0ZXAgaW4gdGhlIGFycmF5XG4gICAgICAvLyBObyBvdGhlciBlbmZvcmNlbWVudCBjYW4gYmUgZG9uZSwgYXMgdGhlIHN0ZXAgYXJyYXkgbWF5IGJlIG91dCBvZiBvcmRlciwgYW5kIHRoYXQgaXMgcGVyZmVjdGx5IGZpbmVcbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmVuZm9yY2VTdGVwc0FycmF5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlSW5kZXg6IG51bWJlciA9IFZhbHVlSGVscGVyLmZpbmRTdGVwSW5kZXgobm9ybWFsaXNlZElucHV0LnZhbHVlLCB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpO1xuICAgICAgICBub3JtYWxpc2VkSW5wdXQudmFsdWUgPSB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXlbdmFsdWVJbmRleF0udmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICBjb25zdCBoaWdoVmFsdWVJbmRleDogbnVtYmVyID0gVmFsdWVIZWxwZXIuZmluZFN0ZXBJbmRleChub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlLCB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpO1xuICAgICAgICAgIG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUgPSB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXlbaGlnaFZhbHVlSW5kZXhdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpc2VkSW5wdXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZW5mb3JjZVN0ZXApIHtcbiAgICAgIG5vcm1hbGlzZWRJbnB1dC52YWx1ZSA9IHRoaXMucm91bmRTdGVwKG5vcm1hbGlzZWRJbnB1dC52YWx1ZSk7XG4gICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICBub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlID0gdGhpcy5yb3VuZFN0ZXAobm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZW5mb3JjZVJhbmdlKSB7XG4gICAgICBub3JtYWxpc2VkSW5wdXQudmFsdWUgPSBNYXRoSGVscGVyLmNsYW1wVG9SYW5nZShub3JtYWxpc2VkSW5wdXQudmFsdWUsIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG5cbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUgPSBNYXRoSGVscGVyLmNsYW1wVG9SYW5nZShub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlLCB0aGlzLnZpZXdPcHRpb25zLmZsb29yLCB0aGlzLnZpZXdPcHRpb25zLmNlaWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCByYW5nZSBzbGlkZXIgaW52YXJpYW50ICh2YWx1ZSA8PSBoaWdoVmFsdWUpIGlzIGFsd2F5cyBzYXRpc2ZpZWRcbiAgICAgIGlmICh0aGlzLnJhbmdlICYmIGlucHV0LnZhbHVlID4gaW5wdXQuaGlnaFZhbHVlKSB7XG4gICAgICAgIC8vIFdlIGtub3cgdGhhdCBib3RoIHZhbHVlcyBhcmUgbm93IGNsYW1wZWQgY29ycmVjdGx5LCB0aGV5IG1heSBqdXN0IGJlIGluIHRoZSB3cm9uZyBvcmRlclxuICAgICAgICAvLyBTbyB0aGUgZWFzeSBzb2x1dGlvbiBpcyB0byBzd2FwIHRoZW0uLi4gZXhjZXB0IHN3YXBwaW5nIGlzIHNvbWV0aW1lcyBkaXNhYmxlZCBpbiBvcHRpb25zLCBzbyB3ZSBtYWtlIHRoZSB0d28gdmFsdWVzIHRoZSBzYW1lXG4gICAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLm5vU3dpdGNoaW5nKSB7XG4gICAgICAgICAgbm9ybWFsaXNlZElucHV0LnZhbHVlID0gbm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB0ZW1wVmFsdWU6IG51bWJlciA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgIG5vcm1hbGlzZWRJbnB1dC52YWx1ZSA9IGlucHV0LmhpZ2hWYWx1ZTtcbiAgICAgICAgICBub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlID0gdGVtcFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGlzZWRJbnB1dDtcbiAgfVxuXG4gIHByaXZhdGUgcmVub3JtYWxpc2VNb2RlbFZhbHVlcygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c01vZGVsVmFsdWVzOiBNb2RlbFZhbHVlcyA9IHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZVxuICAgIH07XG4gICAgY29uc3Qgbm9ybWFsaXNlZE1vZGVsVmFsdWVzOiBNb2RlbFZhbHVlcyA9IHRoaXMubm9ybWFsaXNlTW9kZWxWYWx1ZXMocHJldmlvdXNNb2RlbFZhbHVlcyk7XG4gICAgaWYgKCFNb2RlbFZhbHVlcy5jb21wYXJlKG5vcm1hbGlzZWRNb2RlbFZhbHVlcywgcHJldmlvdXNNb2RlbFZhbHVlcykpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBub3JtYWxpc2VkTW9kZWxWYWx1ZXMudmFsdWU7XG4gICAgICB0aGlzLmhpZ2hWYWx1ZSA9IG5vcm1hbGlzZWRNb2RlbFZhbHVlcy5oaWdoVmFsdWU7XG5cbiAgICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0Lm5leHQoe1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgICAgZm9yY2VDaGFuZ2U6IHRydWUsXG4gICAgICAgIHVzZXJFdmVudEluaXRpYXRlZDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2VPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0SGFzUnVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNJbnB1dEV2ZW50c0ludGVydmFsOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLmlucHV0RXZlbnRzSW50ZXJ2YWw7XG4gICAgY29uc3QgcHJldmlvdXNPdXRwdXRFdmVudHNJbnRlcnZhbDogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5vdXRwdXRFdmVudHNJbnRlcnZhbDtcblxuICAgIGNvbnN0IHByZXZpb3VzT3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5nczogYm9vbGVhbltdID0gdGhpcy5nZXRPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKHRoaXMudmlld09wdGlvbnMpO1xuXG4gICAgdGhpcy5hcHBseU9wdGlvbnMoKTtcblxuICAgIGNvbnN0IG5ld09wdGlvbnNJbmZsdWVuY2luZ0V2ZW50QmluZGluZ3M6IGJvb2xlYW5bXSA9IHRoaXMuZ2V0T3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5ncyh0aGlzLnZpZXdPcHRpb25zKTtcbiAgICAvLyBBdm9pZCByZS1iaW5kaW5nIGV2ZW50cyBpbiBjYXNlIG5vdGhpbmcgY2hhbmdlcyB0aGF0IGNhbiBpbmZsdWVuY2UgaXRcbiAgICAvLyBJdCBtYWtlcyBpdCBwb3NzaWJsZSB0byBjaGFuZ2Ugb3B0aW9ucyB3aGlsZSBkcmFnZ2luZyB0aGUgc2xpZGVyXG4gICAgY29uc3QgcmViaW5kRXZlbnRzOiBib29sZWFuID0gIVZhbHVlSGVscGVyLmFyZUFycmF5c0VxdWFsKHByZXZpb3VzT3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5ncywgbmV3T3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5ncyk7XG5cbiAgICBpZiAocHJldmlvdXNJbnB1dEV2ZW50c0ludGVydmFsICE9PSB0aGlzLnZpZXdPcHRpb25zLmlucHV0RXZlbnRzSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCh0aGlzLnZpZXdPcHRpb25zLmlucHV0RXZlbnRzSW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmIChwcmV2aW91c091dHB1dEV2ZW50c0ludGVydmFsICE9PSB0aGlzLnZpZXdPcHRpb25zLm91dHB1dEV2ZW50c0ludGVydmFsKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QoKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QodGhpcy52aWV3T3B0aW9ucy5vdXRwdXRFdmVudHNJbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgLy8gV2l0aCBuZXcgb3B0aW9ucywgd2UgbmVlZCB0byByZS1ub3JtYWxpc2UgbW9kZWwgdmFsdWVzIGlmIG5lY2Vzc2FyeVxuICAgIHRoaXMucmVub3JtYWxpc2VNb2RlbFZhbHVlcygpO1xuXG4gICAgdGhpcy52aWV3TG93VmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gdGhpcy5tb2RlbFZhbHVlVG9WaWV3VmFsdWUodGhpcy5oaWdoVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRTbGlkZXIocmViaW5kRXZlbnRzKTtcbiAgfVxuXG4gIC8vIFJlYWQgdGhlIHVzZXIgb3B0aW9ucyBhbmQgYXBwbHkgdGhlbSB0byB0aGUgc2xpZGVyIG1vZGVsXG4gIHByaXZhdGUgYXBwbHlPcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMudmlld09wdGlvbnMgPSBuZXcgT3B0aW9ucygpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy52aWV3T3B0aW9ucywgdGhpcy5vcHRpb25zKTtcblxuICAgIHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2UgPSB0aGlzLnJhbmdlICYmIHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2U7XG4gICAgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHkgPSB0aGlzLnJhbmdlICYmIHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2VPbmx5O1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSkge1xuICAgICAgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3MgPSB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcyB8fFxuICAgICAgdGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3NWYWx1ZXMgfHxcbiAgICAgICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzQXJyYXkpO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcyAmJlxuICAgICAgICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCkgfHwgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja3NBcnJheSkpKSB7XG4gICAgICB0aGlzLmludGVybWVkaWF0ZVRpY2tzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXIgPSB0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXIgfHxcbiAgICAgIHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckVuZCB8fFxuICAgICAgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZSk7XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSkpIHtcbiAgICAgIHRoaXMuYXBwbHlTdGVwc0FycmF5T3B0aW9ucygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGx5Rmxvb3JDZWlsT3B0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmNvbWJpbmVMYWJlbHMpKSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLmNvbWJpbmVMYWJlbHMgPSAobWluVmFsdWU6IHN0cmluZywgbWF4VmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIHJldHVybiBtaW5WYWx1ZSArICcgLSAnICsgbWF4VmFsdWU7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmxvZ1NjYWxlICYmIHRoaXMudmlld09wdGlvbnMuZmxvb3IgPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCdDYW5cXCd0IHVzZSBmbG9vcj0wIHdpdGggbG9nYXJpdGhtaWMgc2NhbGUnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U3RlcHNBcnJheU9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3T3B0aW9ucy5mbG9vciA9IDA7XG4gICAgdGhpcy52aWV3T3B0aW9ucy5jZWlsID0gdGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5Lmxlbmd0aCAtIDE7XG4gICAgdGhpcy52aWV3T3B0aW9ucy5zdGVwID0gMTtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRyYW5zbGF0ZSkpIHtcbiAgICAgIHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlID0gKG1vZGVsVmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmJpbmRJbmRleEZvclN0ZXBzQXJyYXkpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHRoaXMuZ2V0U3RlcFZhbHVlKG1vZGVsVmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vZGVsVmFsdWUpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Rmxvb3JDZWlsT3B0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwKSkge1xuICAgICAgdGhpcy52aWV3T3B0aW9ucy5zdGVwID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3T3B0aW9ucy5zdGVwID0gK3RoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPD0gMCkge1xuICAgICAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSAxO1xuICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuY2VpbCkgfHxcbiAgICAgICAgVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5mbG9vcikpIHtcbiAgICAgIHRocm93IEVycm9yKCdmbG9vciBhbmQgY2VpbCBvcHRpb25zIG11c3QgYmUgc3VwcGxpZWQnKTtcbiAgICB9XG4gICAgdGhpcy52aWV3T3B0aW9ucy5jZWlsID0gK3RoaXMudmlld09wdGlvbnMuY2VpbDtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmZsb29yID0gK3RoaXMudmlld09wdGlvbnMuZmxvb3I7XG5cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50cmFuc2xhdGUpKSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnRyYW5zbGF0ZSA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVzZXRzIHNsaWRlclxuICBwcml2YXRlIHJlc2V0U2xpZGVyKHJlYmluZEV2ZW50czogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLm1hbmFnZUVsZW1lbnRzU3R5bGUoKTtcbiAgICB0aGlzLmFkZEFjY2Vzc2liaWxpdHkoKTtcbiAgICB0aGlzLnVwZGF0ZUNlaWxMYWJlbCgpO1xuICAgIHRoaXMudXBkYXRlRmxvb3JMYWJlbCgpO1xuICAgIGlmIChyZWJpbmRFdmVudHMpIHtcbiAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgICB0aGlzLm1hbmFnZUV2ZW50c0JpbmRpbmdzKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoKTtcbiAgICB0aGlzLnJlZm9jdXNQb2ludGVySWZOZWVkZWQoKTtcbiAgfVxuXG4gIC8vIFNldHMgZm9jdXMgb24gdGhlIHNwZWNpZmllZCBwb2ludGVyXG4gIHByaXZhdGUgZm9jdXNQb2ludGVyKHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSk6IHZvaWQge1xuICAgIC8vIElmIG5vdCBzdXBwbGllZCwgdXNlIG1pbiBwb2ludGVyIGFzIGRlZmF1bHRcbiAgICBpZiAocG9pbnRlclR5cGUgIT09IFBvaW50ZXJUeXBlLk1pbiAmJiBwb2ludGVyVHlwZSAhPT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICBwb2ludGVyVHlwZSA9IFBvaW50ZXJUeXBlLk1pbjtcbiAgICB9XG5cbiAgICBpZiAocG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJhbmdlICYmIHBvaW50ZXJUeXBlID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmb2N1c1BvaW50ZXJJZk5lZWRlZCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuY3VycmVudEZvY3VzUG9pbnRlcikpIHtcbiAgICAgIHRoaXMub25Qb2ludGVyRm9jdXModGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyKTtcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IFNsaWRlckhhbmRsZURpcmVjdGl2ZSA9IHRoaXMuZ2V0UG9pbnRlckVsZW1lbnQodGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyKTtcbiAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgZWFjaCBlbGVtZW50cyBzdHlsZSBiYXNlZCBvbiBvcHRpb25zXG4gIHByaXZhdGUgbWFuYWdlRWxlbWVudHNTdHlsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVNjYWxlKCk7XG5cbiAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNldEFsd2F5c0hpZGUodGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3NWYWx1ZXMgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlTGltaXRMYWJlbHMpO1xuICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5zZXRBbHdheXNIaWRlKHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzVmFsdWVzIHx8IHRoaXMudmlld09wdGlvbnMuaGlkZUxpbWl0TGFiZWxzKTtcblxuICAgIGNvbnN0IGhpZGVMYWJlbHNGb3JUaWNrczogYm9vbGVhbiA9IHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzVmFsdWVzICYmICF0aGlzLmludGVybWVkaWF0ZVRpY2tzO1xuICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnNldEFsd2F5c0hpZGUoaGlkZUxhYmVsc0ZvclRpY2tzIHx8IHRoaXMudmlld09wdGlvbnMuaGlkZVBvaW50ZXJMYWJlbHMpO1xuICAgIHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LnNldEFsd2F5c0hpZGUoaGlkZUxhYmVsc0ZvclRpY2tzIHx8ICF0aGlzLnJhbmdlIHx8IHRoaXMudmlld09wdGlvbnMuaGlkZVBvaW50ZXJMYWJlbHMpO1xuICAgIHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZShoaWRlTGFiZWxzRm9yVGlja3MgfHwgIXRoaXMucmFuZ2UgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscyk7XG4gICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnNldEFsd2F5c0hpZGUoIXRoaXMucmFuZ2UgJiYgIXRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhcik7XG4gICAgdGhpcy5sZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldEFsd2F5c0hpZGUoIXRoaXMucmFuZ2UgfHwgIXRoaXMudmlld09wdGlvbnMuc2hvd091dGVyU2VsZWN0aW9uQmFycyk7XG4gICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRBbHdheXNIaWRlKCF0aGlzLnJhbmdlIHx8ICF0aGlzLnZpZXdPcHRpb25zLnNob3dPdXRlclNlbGVjdGlvbkJhcnMpO1xuXG4gICAgdGhpcy5mdWxsQmFyVHJhbnNwYXJlbnRDbGFzcyA9IHRoaXMucmFuZ2UgJiYgdGhpcy52aWV3T3B0aW9ucy5zaG93T3V0ZXJTZWxlY3Rpb25CYXJzO1xuICAgIHRoaXMuc2VsZWN0aW9uQmFyRHJhZ2dhYmxlQ2xhc3MgPSB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlICYmICF0aGlzLnZpZXdPcHRpb25zLm9ubHlCaW5kSGFuZGxlcztcbiAgICB0aGlzLnRpY2tzVW5kZXJWYWx1ZXNDbGFzcyA9IHRoaXMuaW50ZXJtZWRpYXRlVGlja3MgJiYgdGhpcy5vcHRpb25zLnNob3dUaWNrc1ZhbHVlcztcblxuICAgIGlmICh0aGlzLnNsaWRlckVsZW1lbnRWZXJ0aWNhbENsYXNzICE9PSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZlcnRpY2FsU3RhdGUoKTtcbiAgICAgIC8vIFRoZSBhYm92ZSBjaGFuZ2UgaW4gaG9zdCBjb21wb25lbnQgY2xhc3Mgd2lsbCBub3QgYmUgYXBwbGllZCB1bnRpbCB0aGUgZW5kIG9mIHRoaXMgY3ljbGVcbiAgICAgIC8vIEhvd2V2ZXIsIGZ1bmN0aW9ucyBjYWxjdWxhdGluZyB0aGUgc2xpZGVyIHBvc2l0aW9uIGV4cGVjdCB0aGUgc2xpZGVyIHRvIGJlIGFscmVhZHkgc3R5bGVkIGFzIHZlcnRpY2FsXG4gICAgICAvLyBTbyBhcyBhIHdvcmthcm91bmQsIHdlIG5lZWQgdG8gcmVzZXQgdGhlIHNsaWRlciBvbmNlIGFnYWluIHRvIGNvbXB1dGUgdGhlIGNvcnJlY3QgdmFsdWVzXG4gICAgICBzZXRUaW1lb3V0KCgpOiB2b2lkID0+IHsgdGhpcy5yZXNldFNsaWRlcigpOyB9KTtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2luZyBhbmltYXRlIGNsYXNzIG1heSBpbnRlcmZlcmUgd2l0aCBzbGlkZXIgcmVzZXQvaW5pdGlhbGlzYXRpb24sIHNvIHdlIHNob3VsZCBzZXQgaXQgc2VwYXJhdGVseSxcbiAgICAvLyBhZnRlciBhbGwgaXMgcHJvcGVybHkgc2V0IHVwXG4gICAgaWYgKHRoaXMuc2xpZGVyRWxlbWVudEFuaW1hdGVDbGFzcyAhPT0gdGhpcy52aWV3T3B0aW9ucy5hbmltYXRlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpOiB2b2lkID0+IHsgdGhpcy5zbGlkZXJFbGVtZW50QW5pbWF0ZUNsYXNzID0gdGhpcy52aWV3T3B0aW9ucy5hbmltYXRlOyB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBNYW5hZ2UgdGhlIGV2ZW50cyBiaW5kaW5ncyBiYXNlZCBvbiByZWFkT25seSBhbmQgZGlzYWJsZWQgb3B0aW9uc1xuICBwcml2YXRlIG1hbmFnZUV2ZW50c0JpbmRpbmdzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmRpc2FibGVkIHx8IHRoaXMudmlld09wdGlvbnMucmVhZE9ubHkpIHtcbiAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCB0aGUgZGlzYWJsZWQgc3RhdGUgYmFzZWQgb24gZGlzYWJsZWQgb3B0aW9uXG4gIHByaXZhdGUgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlckVsZW1lbnREaXNhYmxlZEF0dHIgPSB0aGlzLnZpZXdPcHRpb25zLmRpc2FibGVkID8gJ2Rpc2FibGVkJyA6IG51bGw7XG4gIH1cblxuICAvLyBTZXQgdmVydGljYWwgc3RhdGUgYmFzZWQgb24gdmVydGljYWwgb3B0aW9uXG4gIHByaXZhdGUgdXBkYXRlVmVydGljYWxTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlckVsZW1lbnRWZXJ0aWNhbENsYXNzID0gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbDtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5nZXRBbGxTbGlkZXJFbGVtZW50cygpKSB7XG4gICAgICAvLyBUaGlzIGlzIGFsc28gY2FsbGVkIGJlZm9yZSBuZ0FmdGVySW5pdCwgc28gbmVlZCB0byBjaGVjayB0aGF0IHZpZXcgY2hpbGQgYmluZGluZ3Mgd29ya1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50LnNldFZlcnRpY2FsKHRoaXMudmlld09wdGlvbnMudmVydGljYWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2NhbGUoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMuZ2V0QWxsU2xpZGVyRWxlbWVudHMoKSkge1xuICAgICAgZWxlbWVudC5zZXRTY2FsZSh0aGlzLnZpZXdPcHRpb25zLnNjYWxlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFsbFNsaWRlckVsZW1lbnRzKCk6IFNsaWRlckVsZW1lbnREaXJlY3RpdmVbXSB7XG4gICAgcmV0dXJuIFt0aGlzLmxlZnRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQsXG4gICAgICB0aGlzLnJpZ2h0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LFxuICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudCxcbiAgICAgIHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudCxcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudCxcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudCxcbiAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQsXG4gICAgICB0aGlzLmNlaWxMYWJlbEVsZW1lbnQsXG4gICAgICB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudCxcbiAgICAgIHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LFxuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudCxcbiAgICAgIHRoaXMudGlja3NFbGVtZW50XG4gICAgXTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgc2xpZGVyIGhhbmRsZXMgcG9zaXRpb25zIGFuZCBsYWJlbHNcbiAgLy8gUnVuIG9ubHkgb25jZSBkdXJpbmcgaW5pdGlhbGl6YXRpb24gYW5kIGV2ZXJ5IHRpbWUgdmlldyBwb3J0IGNoYW5nZXMgc2l6ZVxuICBwcml2YXRlIGluaXRIYW5kbGVzKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlTG93SGFuZGxlKHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0xvd1ZhbHVlKSk7XG5cbiAgICAvKlxuICAgdGhlIG9yZGVyIGhlcmUgaXMgaW1wb3J0YW50IHNpbmNlIHRoZSBzZWxlY3Rpb24gYmFyIHNob3VsZCBiZVxuICAgdXBkYXRlZCBhZnRlciB0aGUgaGlnaCBoYW5kbGUgYnV0IGJlZm9yZSB0aGUgY29tYmluZWQgbGFiZWxcbiAgICovXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlSGlnaEhhbmRsZSh0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdIaWdoVmFsdWUpKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkJhcigpO1xuXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tYmluZWRMYWJlbCgpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVGlja3NTY2FsZSgpO1xuICB9XG5cbiAgLy8gQWRkcyBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXMsIHJ1biBvbmx5IG9uY2UgZHVyaW5nIGluaXRpYWxpemF0aW9uXG4gIHByaXZhdGUgYWRkQWNjZXNzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG5cbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucm9sZSA9ICdzbGlkZXInO1xuXG4gICAgaWYgKCB0aGlzLnZpZXdPcHRpb25zLmtleWJvYXJkU3VwcG9ydCAmJlxuICAgICAgISh0aGlzLnZpZXdPcHRpb25zLnJlYWRPbmx5IHx8IHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQpICkge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LnRhYmluZGV4ID0gJzAnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQudGFiaW5kZXggPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYU9yaWVudGF0aW9uID0gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuYXJpYUxhYmVsKSkge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFyaWFMYWJlbCA9IHRoaXMudmlld09wdGlvbnMuYXJpYUxhYmVsO1xuICAgIH0gZWxzZSBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuYXJpYUxhYmVsbGVkQnkpKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYUxhYmVsbGVkQnkgPSB0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbGxlZEJ5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQucm9sZSA9ICdzbGlkZXInO1xuXG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQgJiZcbiAgICAgICAgISh0aGlzLnZpZXdPcHRpb25zLnJlYWRPbmx5IHx8IHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQpKSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC50YWJpbmRleCA9ICcwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC50YWJpbmRleCA9ICcnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYU9yaWVudGF0aW9uID0gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG5cbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxIaWdoKSkge1xuICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYUxhYmVsID0gdGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxIaWdoO1xuICAgICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxsZWRCeUhpZ2gpKSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhTGFiZWxsZWRCeSA9IHRoaXMudmlld09wdGlvbnMuYXJpYUxhYmVsbGVkQnlIaWdoO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZXMgYXJpYSBhdHRyaWJ1dGVzIGFjY29yZGluZyB0byBjdXJyZW50IHZhbHVlc1xuICBwcml2YXRlIHVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk6IHZvaWQge1xuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhVmFsdWVOb3cgPSAoK3RoaXMudmFsdWUpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFyaWFWYWx1ZVRleHQgPSB0aGlzLnZpZXdPcHRpb25zLnRyYW5zbGF0ZSgrdGhpcy52YWx1ZSwgTGFiZWxUeXBlLkxvdyk7XG4gICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU1pbiA9IHRoaXMudmlld09wdGlvbnMuZmxvb3IudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTWF4ID0gdGhpcy52aWV3T3B0aW9ucy5jZWlsLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU5vdyA9ICgrdGhpcy5oaWdoVmFsdWUpLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlVGV4dCA9IHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKCt0aGlzLmhpZ2hWYWx1ZSwgTGFiZWxUeXBlLkhpZ2gpO1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU1pbiA9IHRoaXMudmlld09wdGlvbnMuZmxvb3IudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhVmFsdWVNYXggPSB0aGlzLnZpZXdPcHRpb25zLmNlaWwudG9TdHJpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgZGltZW5zaW9ucyB0aGF0IGFyZSBkZXBlbmRlbnQgb24gdmlldyBwb3J0IHNpemVcbiAgLy8gUnVuIG9uY2UgZHVyaW5nIGluaXRpYWxpemF0aW9uIGFuZCBldmVyeSB0aW1lIHZpZXcgcG9ydCBjaGFuZ2VzIHNpemUuXG4gIHByaXZhdGUgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmhhbmRsZURpbWVuc2lvbikpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5zZXREaW1lbnNpb24odGhpcy52aWV3T3B0aW9ucy5oYW5kbGVEaW1lbnNpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlV2lkdGg6IG51bWJlciA9IHRoaXMubWluSGFuZGxlRWxlbWVudC5kaW1lbnNpb247XG5cbiAgICB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb24gPSBoYW5kbGVXaWR0aCAvIDI7XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuYmFyRGltZW5zaW9uKSkge1xuICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5zZXREaW1lbnNpb24odGhpcy52aWV3T3B0aW9ucy5iYXJEaW1lbnNpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LmNhbGN1bGF0ZURpbWVuc2lvbigpO1xuICAgIH1cblxuICAgIHRoaXMubWF4SGFuZGxlUG9zaXRpb24gPSB0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIGhhbmRsZVdpZHRoO1xuXG4gICAgaWYgKHRoaXMuaW5pdEhhc1J1bikge1xuICAgICAgdGhpcy51cGRhdGVGbG9vckxhYmVsKCk7XG4gICAgICB0aGlzLnVwZGF0ZUNlaWxMYWJlbCgpO1xuICAgICAgdGhpcy5pbml0SGFuZGxlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnNBbmREZXRlY3RDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoKTtcbiAgICBpZiAoIXRoaXMuaXNSZWZEZXN0cm95ZWQoKSkge1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzbGlkZXIgcmVmZXJlbmNlIGlzIGFscmVhZHkgZGVzdHJveWVkXG4gICAqIEByZXR1cm5zIGJvb2xlYW4gLSB0cnVlIGlmIHJlZiBpcyBkZXN0cm95ZWRcbiAgICovXG4gIHByaXZhdGUgaXNSZWZEZXN0cm95ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmWydkZXN0cm95ZWQnXTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdGlja3MgcG9zaXRpb25cbiAgcHJpdmF0ZSB1cGRhdGVUaWNrc1NjYWxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3MpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnNsaWRlckVsZW1lbnRXaXRoTGVnZW5kQ2xhc3MgPSBmYWxzZTsgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGlja3NBcnJheTogbnVtYmVyW10gPSAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrc0FycmF5KVxuICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLnRpY2tzQXJyYXlcbiAgICAgIDogdGhpcy5nZXRUaWNrc0FycmF5KCk7XG4gICAgY29uc3QgdHJhbnNsYXRlOiBzdHJpbmcgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3RyYW5zbGF0ZVknIDogJ3RyYW5zbGF0ZVgnO1xuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQpIHtcbiAgICAgIHRpY2tzQXJyYXkucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHRpY2tWYWx1ZVN0ZXA6IG51bWJlciA9ICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tWYWx1ZVN0ZXApID8gdGhpcy52aWV3T3B0aW9ucy50aWNrVmFsdWVTdGVwIDpcbiAgICAgICAgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tTdGVwKSA/IHRoaXMudmlld09wdGlvbnMudGlja1N0ZXAgOiB0aGlzLnZpZXdPcHRpb25zLnN0ZXApO1xuXG4gICAgbGV0IGhhc0F0TGVhc3RPbmVMZWdlbmQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0IG5ld1RpY2tzOiBUaWNrW10gPSB0aWNrc0FycmF5Lm1hcCgodmFsdWU6IG51bWJlcik6IFRpY2sgPT4ge1xuICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLnZhbHVlVG9Qb3NpdGlvbih2YWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsKSB7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5tYXhIYW5kbGVQb3NpdGlvbiAtIHBvc2l0aW9uO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2xhdGlvbjogc3RyaW5nID0gdHJhbnNsYXRlICsgJygnICsgTWF0aC5yb3VuZChwb3NpdGlvbikgKyAncHgpJztcbiAgICAgIGNvbnN0IHRpY2s6IFRpY2sgPSBuZXcgVGljaygpO1xuICAgICAgdGljay5zZWxlY3RlZCA9IHRoaXMuaXNUaWNrU2VsZWN0ZWQodmFsdWUpO1xuICAgICAgdGljay5zdHlsZSA9IHtcbiAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogdHJhbnNsYXRpb24sXG4gICAgICAgICctbW96LXRyYW5zZm9ybSc6IHRyYW5zbGF0aW9uLFxuICAgICAgICAnLW8tdHJhbnNmb3JtJzogdHJhbnNsYXRpb24sXG4gICAgICAgICctbXMtdHJhbnNmb3JtJzogdHJhbnNsYXRpb24sXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRpb24sXG4gICAgICB9O1xuICAgICAgaWYgKHRpY2suc2VsZWN0ZWQgJiYgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuZ2V0U2VsZWN0aW9uQmFyQ29sb3IpKSB7XG4gICAgICAgIHRpY2suc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHRoaXMuZ2V0U2VsZWN0aW9uQmFyQ29sb3IoKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGljay5zZWxlY3RlZCAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRUaWNrQ29sb3IpKSB7XG4gICAgICAgIHRpY2suc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHRoaXMuZ2V0VGlja0NvbG9yKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrc1Rvb2x0aXApKSB7XG4gICAgICAgIHRpY2sudG9vbHRpcCA9IHRoaXMudmlld09wdGlvbnMudGlja3NUb29sdGlwKHZhbHVlKTtcbiAgICAgICAgdGljay50b29sdGlwUGxhY2VtZW50ID0gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCA/ICdyaWdodCcgOiAndG9wJztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrc1ZhbHVlcyAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGlja1ZhbHVlU3RlcCkgJiZcbiAgICAgICAgICBNYXRoSGVscGVyLmlzTW9kdWxvV2l0aGluUHJlY2lzaW9uTGltaXQodmFsdWUsIHRpY2tWYWx1ZVN0ZXAsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpKSB7XG4gICAgICAgIHRpY2sudmFsdWUgPSB0aGlzLmdldERpc3BsYXlWYWx1ZSh2YWx1ZSwgTGFiZWxUeXBlLlRpY2tWYWx1ZSk7XG4gICAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrc1ZhbHVlc1Rvb2x0aXApKSB7XG4gICAgICAgICAgdGljay52YWx1ZVRvb2x0aXAgPSB0aGlzLnZpZXdPcHRpb25zLnRpY2tzVmFsdWVzVG9vbHRpcCh2YWx1ZSk7XG4gICAgICAgICAgdGljay52YWx1ZVRvb2x0aXBQbGFjZW1lbnQgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsXG4gICAgICAgICAgICA/ICdyaWdodCdcbiAgICAgICAgICAgIDogJ3RvcCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGxlZ2VuZDogc3RyaW5nID0gbnVsbDtcbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5KSkge1xuICAgICAgICBjb25zdCBzdGVwOiBDdXN0b21TdGVwRGVmaW5pdGlvbiA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVt2YWx1ZV07XG4gICAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRTdGVwTGVnZW5kKSkge1xuICAgICAgICAgIGxlZ2VuZCA9IHRoaXMudmlld09wdGlvbnMuZ2V0U3RlcExlZ2VuZChzdGVwKTtcbiAgICAgICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoc3RlcCkpIHtcbiAgICAgICAgICBsZWdlbmQgPSBzdGVwLmxlZ2VuZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRMZWdlbmQpKSB7XG4gICAgICAgIGxlZ2VuZCA9IHRoaXMudmlld09wdGlvbnMuZ2V0TGVnZW5kKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQobGVnZW5kKSkge1xuICAgICAgICB0aWNrLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICAgICAgaGFzQXRMZWFzdE9uZUxlZ2VuZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aWNrO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuc2xpZGVyRWxlbWVudFdpdGhMZWdlbmRDbGFzcyA9IGhhc0F0TGVhc3RPbmVMZWdlbmQ7IH0pO1xuXG4gICAgLy8gV2Ugc2hvdWxkIGF2b2lkIHJlLWNyZWF0aW5nIHRoZSB0aWNrcyBhcnJheSBpZiBwb3NzaWJsZVxuICAgIC8vIFRoaXMgYm90aCBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgbWFrZXMgQ1NTIGFuaW1hdGlvbnMgd29yayBjb3JyZWN0bHlcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudGlja3MpICYmIHRoaXMudGlja3MubGVuZ3RoID09PSBuZXdUaWNrcy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgIDwgbmV3VGlja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnRpY2tzW2ldLCBuZXdUaWNrc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGlja3MgPSBuZXdUaWNrcztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNSZWZEZXN0cm95ZWQoKSkge1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGlja3NBcnJheSgpOiBudW1iZXJbXSB7XG4gICAgY29uc3Qgc3RlcDogbnVtYmVyID0gKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tTdGVwKSkgPyB0aGlzLnZpZXdPcHRpb25zLnRpY2tTdGVwIDogdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgIGNvbnN0IHRpY2tzQXJyYXk6IG51bWJlcltdID0gW107XG5cbiAgICBjb25zdCBudW1iZXJPZlZhbHVlczogbnVtYmVyID0gMSArIE1hdGguZmxvb3IoTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQoXG4gICAgICBNYXRoLmFicyh0aGlzLnZpZXdPcHRpb25zLmNlaWwgLSB0aGlzLnZpZXdPcHRpb25zLmZsb29yKSAvIHN0ZXAsXG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0XG4gICAgKSk7XG4gICAgZm9yIChsZXQgaW5kZXg6IG51bWJlciA9IDA7IGluZGV4IDwgbnVtYmVyT2ZWYWx1ZXM7ICsraW5kZXgpIHtcbiAgICAgIHRpY2tzQXJyYXkucHVzaChNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdCh0aGlzLnZpZXdPcHRpb25zLmZsb29yICsgc3RlcCAqIGluZGV4LCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpY2tzQXJyYXk7XG4gIH1cblxuICBwcml2YXRlIGlzVGlja1NlbGVjdGVkKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMucmFuZ2UpIHtcbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlKSkge1xuICAgICAgICBjb25zdCBjZW50ZXI6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudmlld0xvd1ZhbHVlID4gY2VudGVyICYmXG4gICAgICAgICAgICB2YWx1ZSA+PSBjZW50ZXIgJiZcbiAgICAgICAgICAgIHZhbHVlIDw9IHRoaXMudmlld0xvd1ZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TG93VmFsdWUgPCBjZW50ZXIgJiZcbiAgICAgICAgICAgICAgICAgICB2YWx1ZSA8PSBjZW50ZXIgJiZcbiAgICAgICAgICAgICAgICAgICB2YWx1ZSA+PSB0aGlzLnZpZXdMb3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckVuZCkge1xuICAgICAgICBpZiAodmFsdWUgPj0gdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXIgJiYgdmFsdWUgPD0gdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmFuZ2UgJiYgdmFsdWUgPj0gdGhpcy52aWV3TG93VmFsdWUgJiYgdmFsdWUgPD0gdGhpcy52aWV3SGlnaFZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBVcGRhdGUgcG9zaXRpb24gb2YgdGhlIGZsb29yIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlRmxvb3JMYWJlbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuYWx3YXlzSGlkZSkge1xuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5zZXRWYWx1ZSh0aGlzLmdldERpc3BsYXlWYWx1ZSh0aGlzLnZpZXdPcHRpb25zLmZsb29yLCBMYWJlbFR5cGUuRmxvb3IpKTtcbiAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gdGhpcy5mbG9vckxhYmVsRWxlbWVudC5kaW1lbnNpb25cbiAgICAgICAgOiAwO1xuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uIG9mIHRoZSBjZWlsaW5nIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlQ2VpbExhYmVsKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jZWlsTGFiZWxFbGVtZW50LmFsd2F5c0hpZGUpIHtcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5zZXRWYWx1ZSh0aGlzLmdldERpc3BsYXlWYWx1ZSh0aGlzLnZpZXdPcHRpb25zLmNlaWwsIExhYmVsVHlwZS5DZWlsKSk7XG4gICAgICB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/IDBcbiAgICAgICAgOiB0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIHRoaXMuY2VpbExhYmVsRWxlbWVudC5kaW1lbnNpb247XG4gICAgICB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBzbGlkZXIgaGFuZGxlcyBhbmQgbGFiZWwgcG9zaXRpb25zXG4gIHByaXZhdGUgdXBkYXRlSGFuZGxlcyh3aGljaDogUG9pbnRlclR5cGUsIG5ld1BvczogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHdoaWNoID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgIHRoaXMudXBkYXRlTG93SGFuZGxlKG5ld1Bvcyk7XG4gICAgfSBlbHNlIGlmICh3aGljaCA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICB0aGlzLnVwZGF0ZUhpZ2hIYW5kbGUobmV3UG9zKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkJhcigpO1xuICAgIHRoaXMudXBkYXRlVGlja3NTY2FsZSgpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbWJpbmVkTGFiZWwoKTtcbiAgICB9XG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gd29yayBvdXQgdGhlIHBvc2l0aW9uIGZvciBoYW5kbGUgbGFiZWxzIGRlcGVuZGluZyBvbiBSVEwgb3Igbm90XG4gIHByaXZhdGUgZ2V0SGFuZGxlTGFiZWxQb3MobGFiZWxUeXBlOiBQb2ludGVyVHlwZSwgbmV3UG9zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGxhYmVsRGltZW5zaW9uOiBudW1iZXIgPSAobGFiZWxUeXBlID09PSBQb2ludGVyVHlwZS5NaW4pXG4gICAgICA/IHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LmRpbWVuc2lvblxuICAgICAgOiB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5kaW1lbnNpb247XG4gICAgY29uc3QgbmVhckhhbmRsZVBvczogbnVtYmVyID0gbmV3UG9zIC0gbGFiZWxEaW1lbnNpb24gLyAyICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uO1xuICAgIGNvbnN0IGVuZE9mQmFyUG9zOiBudW1iZXIgPSB0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIGxhYmVsRGltZW5zaW9uO1xuXG4gICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLmJvdW5kUG9pbnRlckxhYmVscykge1xuICAgICAgcmV0dXJuIG5lYXJIYW5kbGVQb3M7XG4gICAgfVxuXG4gICAgaWYgKCh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0ICYmIGxhYmVsVHlwZSA9PT0gUG9pbnRlclR5cGUuTWluKSB8fFxuICAgICAgICghdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCAmJiBsYWJlbFR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkpIHtcbiAgICAgIHJldHVybiBNYXRoLm1pbihuZWFySGFuZGxlUG9zLCBlbmRPZkJhclBvcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChuZWFySGFuZGxlUG9zLCAwKSwgZW5kT2ZCYXJQb3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBsb3cgc2xpZGVyIGhhbmRsZSBwb3NpdGlvbiBhbmQgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVMb3dIYW5kbGUobmV3UG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuc2V0UG9zaXRpb24obmV3UG9zKTtcbiAgICB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudC5zZXRWYWx1ZSh0aGlzLmdldERpc3BsYXlWYWx1ZSh0aGlzLnZpZXdMb3dWYWx1ZSwgTGFiZWxUeXBlLkxvdykpO1xuICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnNldFBvc2l0aW9uKHRoaXMuZ2V0SGFuZGxlTGFiZWxQb3MoUG9pbnRlclR5cGUuTWluLCBuZXdQb3MpKTtcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRQb2ludGVyQ29sb3IpKSB7XG4gICAgICB0aGlzLm1pblBvaW50ZXJTdHlsZSA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmdldFBvaW50ZXJDb2xvcihQb2ludGVyVHlwZS5NaW4pLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5hdXRvSGlkZUxpbWl0TGFiZWxzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZsb29yQW5kQ2VpbExhYmVsc1Zpc2liaWxpdHkoKTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgaGlnaCBzbGlkZXIgaGFuZGxlIHBvc2l0aW9uIGFuZCBsYWJlbFxuICBwcml2YXRlIHVwZGF0ZUhpZ2hIYW5kbGUobmV3UG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuc2V0UG9zaXRpb24obmV3UG9zKTtcbiAgICB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5zZXRWYWx1ZSh0aGlzLmdldERpc3BsYXlWYWx1ZSh0aGlzLnZpZXdIaWdoVmFsdWUsIExhYmVsVHlwZS5IaWdoKSk7XG4gICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQuc2V0UG9zaXRpb24odGhpcy5nZXRIYW5kbGVMYWJlbFBvcyhQb2ludGVyVHlwZS5NYXgsIG5ld1BvcykpO1xuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFBvaW50ZXJDb2xvcikpIHtcbiAgICAgIHRoaXMubWF4UG9pbnRlclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuZ2V0UG9pbnRlckNvbG9yKFBvaW50ZXJUeXBlLk1heCksXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5hdXRvSGlkZUxpbWl0TGFiZWxzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZsb29yQW5kQ2VpbExhYmVsc1Zpc2liaWxpdHkoKTtcbiAgICB9XG4gIH1cblxuICAvLyBTaG93L2hpZGUgZmxvb3IvY2VpbGluZyBsYWJlbFxuICBwcml2YXRlIHVwZGF0ZUZsb29yQW5kQ2VpbExhYmVsc1Zpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgLy8gU2hvdyBiYXNlZCBvbmx5IG9uIGhpZGVMaW1pdExhYmVscyBpZiBwb2ludGVyIGxhYmVscyBhcmUgaGlkZGVuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuaGlkZVBvaW50ZXJMYWJlbHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGZsb29yTGFiZWxIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsZXQgY2VpbExhYmVsSGlkZGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3QgaXNNaW5MYWJlbEF0Rmxvb3I6IGJvb2xlYW4gPSB0aGlzLmlzTGFiZWxCZWxvd0Zsb29yTGFiZWwodGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQpO1xuICAgIGNvbnN0IGlzTWluTGFiZWxBdENlaWw6IGJvb2xlYW4gPSB0aGlzLmlzTGFiZWxBYm92ZUNlaWxMYWJlbCh0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudCk7XG4gICAgY29uc3QgaXNNYXhMYWJlbEF0Q2VpbDogYm9vbGVhbiA9IHRoaXMuaXNMYWJlbEFib3ZlQ2VpbExhYmVsKHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50KTtcbiAgICBjb25zdCBpc0NvbWJpbmVkTGFiZWxBdEZsb29yOiBib29sZWFuID0gdGhpcy5pc0xhYmVsQmVsb3dGbG9vckxhYmVsKHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQpO1xuICAgIGNvbnN0IGlzQ29tYmluZWRMYWJlbEF0Q2VpbDogYm9vbGVhbiA9IHRoaXMuaXNMYWJlbEFib3ZlQ2VpbExhYmVsKHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQpO1xuXG4gICAgaWYgKGlzTWluTGFiZWxBdEZsb29yKSB7XG4gICAgICBmbG9vckxhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbG9vckxhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNob3coKTtcbiAgICB9XG5cbiAgICBpZiAoaXNNaW5MYWJlbEF0Q2VpbCkge1xuICAgICAgY2VpbExhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlaWxMYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNob3coKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgY29uc3QgaGlkZUNlaWw6IGJvb2xlYW4gPSB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LmlzVmlzaWJsZSgpID8gaXNDb21iaW5lZExhYmVsQXRDZWlsIDogaXNNYXhMYWJlbEF0Q2VpbDtcbiAgICAgIGNvbnN0IGhpZGVGbG9vcjogYm9vbGVhbiA9IHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuaXNWaXNpYmxlKCkgPyBpc0NvbWJpbmVkTGFiZWxBdEZsb29yIDogaXNNaW5MYWJlbEF0Rmxvb3I7XG5cbiAgICAgIGlmIChoaWRlQ2VpbCkge1xuICAgICAgICB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgfSBlbHNlIGlmICghY2VpbExhYmVsSGlkZGVuKSB7XG4gICAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEhpZGUgb3Igc2hvdyBmbG9vciBsYWJlbFxuICAgICAgaWYgKGhpZGVGbG9vcikge1xuICAgICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICAgIH0gZWxzZSBpZiAoIWZsb29yTGFiZWxIaWRkZW4pIHtcbiAgICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0xhYmVsQmVsb3dGbG9vckxhYmVsKGxhYmVsOiBTbGlkZXJMYWJlbERpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBvczogbnVtYmVyID0gbGFiZWwucG9zaXRpb247XG4gICAgY29uc3QgZGltOiBudW1iZXIgPSBsYWJlbC5kaW1lbnNpb247XG4gICAgY29uc3QgZmxvb3JQb3M6IG51bWJlciA9IHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQucG9zaXRpb247XG4gICAgY29uc3QgZmxvb3JEaW06IG51bWJlciA9IHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuZGltZW5zaW9uO1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICA/IHBvcyArIGRpbSA+PSBmbG9vclBvcyAtIDJcbiAgICAgIDogcG9zIDw9IGZsb29yUG9zICsgZmxvb3JEaW0gKyAyO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0xhYmVsQWJvdmVDZWlsTGFiZWwobGFiZWw6IFNsaWRlckxhYmVsRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcG9zOiBudW1iZXIgPSBsYWJlbC5wb3NpdGlvbjtcbiAgICBjb25zdCBkaW06IG51bWJlciA9IGxhYmVsLmRpbWVuc2lvbjtcbiAgICBjb25zdCBjZWlsUG9zOiBudW1iZXIgPSB0aGlzLmNlaWxMYWJlbEVsZW1lbnQucG9zaXRpb247XG4gICAgY29uc3QgY2VpbERpbTogbnVtYmVyID0gdGhpcy5jZWlsTGFiZWxFbGVtZW50LmRpbWVuc2lvbjtcbiAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgPyBwb3MgPD0gY2VpbFBvcyArIGNlaWxEaW0gKyAyXG4gICAgICA6IHBvcyArIGRpbSA+PSBjZWlsUG9zIC0gMjtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBzbGlkZXIgc2VsZWN0aW9uIGJhciwgY29tYmluZWQgbGFiZWwgYW5kIHJhbmdlIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlU2VsZWN0aW9uQmFyKCk6IHZvaWQge1xuICAgIGxldCBwb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgICBsZXQgZGltZW5zaW9uOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0IGlzU2VsZWN0aW9uQmFyRnJvbVJpZ2h0OiBib29sZWFuID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/ICF0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJFbmRcbiAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJFbmQ7XG4gICAgY29uc3QgcG9zaXRpb25Gb3JSYW5nZTogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/IHRoaXMubWF4SGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvblxuICAgICAgICA6IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcblxuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBkaW1lbnNpb24gPSBNYXRoLmFicyh0aGlzLm1heEhhbmRsZUVsZW1lbnQucG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24pO1xuICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbkZvclJhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgY2VudGVyOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWU7XG4gICAgICAgIGNvbnN0IGNlbnRlclBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLnZhbHVlVG9Qb3NpdGlvbihjZW50ZXIpO1xuICAgICAgICBjb25zdCBpc01vZGVsR3JlYXRlclRoYW5DZW50ZXI6IGJvb2xlYW4gPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgICAgICA/IHRoaXMudmlld0xvd1ZhbHVlIDw9IGNlbnRlclxuICAgICAgICAgICAgOiB0aGlzLnZpZXdMb3dWYWx1ZSA+IGNlbnRlcjtcbiAgICAgICAgaWYgKGlzTW9kZWxHcmVhdGVyVGhhbkNlbnRlcikge1xuICAgICAgICAgIGRpbWVuc2lvbiA9IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiAtIGNlbnRlclBvc2l0aW9uO1xuICAgICAgICAgIHBvc2l0aW9uID0gY2VudGVyUG9zaXRpb24gKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGltZW5zaW9uID0gY2VudGVyUG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb247XG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24gKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNTZWxlY3Rpb25CYXJGcm9tUmlnaHQpIHtcbiAgICAgICAgZGltZW5zaW9uID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMubWF4SGFuZGxlUG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24pICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uKTtcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLmZsb29yKHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaW1lbnNpb24gPSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24gKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gICAgICAgIHBvc2l0aW9uID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnNldERpbWVuc2lvbihkaW1lbnNpb24pO1xuICAgIHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgaWYgKHRoaXMucmFuZ2UgJiYgdGhpcy52aWV3T3B0aW9ucy5zaG93T3V0ZXJTZWxlY3Rpb25CYXJzKSB7XG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgICB0aGlzLnJpZ2h0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldERpbWVuc2lvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0UG9zaXRpb24oMCk7XG4gICAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgICAgIHRoaXMubGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXREaW1lbnNpb24odGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSAocG9zaXRpb24gKyBkaW1lbnNpb24pKTtcbiAgICAgICAgdGhpcy5sZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldFBvc2l0aW9uKHBvc2l0aW9uICsgZGltZW5zaW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXREaW1lbnNpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLmxlZnRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0UG9zaXRpb24oMCk7XG4gICAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0RGltZW5zaW9uKHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gKHBvc2l0aW9uICsgZGltZW5zaW9uKSk7XG4gICAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0UG9zaXRpb24ocG9zaXRpb24gKyBkaW1lbnNpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuZ2V0U2VsZWN0aW9uQmFyQ29sb3IpKSB7XG4gICAgICBjb25zdCBjb2xvcjogc3RyaW5nID0gdGhpcy5nZXRTZWxlY3Rpb25CYXJDb2xvcigpO1xuICAgICAgdGhpcy5iYXJTdHlsZSA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zZWxlY3Rpb25CYXJHcmFkaWVudCkpIHtcbiAgICAgIGNvbnN0IG9mZnNldDogbnVtYmVyID0gKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWUpKVxuICAgICAgICAgICAgPyB0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWUpXG4gICAgICAgICAgICA6IDA7XG4gICAgICBjb25zdCByZXZlcnNlZDogYm9vbGVhbiA9IChvZmZzZXQgLSBwb3NpdGlvbiA+IDAgJiYgIWlzU2VsZWN0aW9uQmFyRnJvbVJpZ2h0KSB8fCAob2Zmc2V0IC0gcG9zaXRpb24gPD0gMCAmJiBpc1NlbGVjdGlvbkJhckZyb21SaWdodCk7XG4gICAgICBjb25zdCBkaXJlY3Rpb246IHN0cmluZyA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWxcbiAgICAgICAgICA/IHJldmVyc2VkID8gJ2JvdHRvbScgOiAndG9wJ1xuICAgICAgICAgIDogcmV2ZXJzZWQgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgdGhpcy5iYXJTdHlsZSA9IHtcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOlxuICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQodG8gJyArXG4gICAgICAgICAgZGlyZWN0aW9uICtcbiAgICAgICAgICAnLCAnICtcbiAgICAgICAgICB0aGlzLnZpZXdPcHRpb25zLnNlbGVjdGlvbkJhckdyYWRpZW50LmZyb20gK1xuICAgICAgICAgICcgMCUsJyArXG4gICAgICAgICAgdGhpcy52aWV3T3B0aW9ucy5zZWxlY3Rpb25CYXJHcmFkaWVudC50byArXG4gICAgICAgICAgJyAxMDAlKScsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMudmVydGljYWwpIHtcbiAgICAgICAgdGhpcy5iYXJTdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPVxuICAgICAgICAgICdjZW50ZXIgJyArXG4gICAgICAgICAgKG9mZnNldCArXG4gICAgICAgICAgICBkaW1lbnNpb24gK1xuICAgICAgICAgICAgcG9zaXRpb24gK1xuICAgICAgICAgICAgKHJldmVyc2VkID8gLXRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbiA6IDApKSArXG4gICAgICAgICAgJ3B4JztcbiAgICAgICAgdGhpcy5iYXJTdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9XG4gICAgICAgICAgJzEwMCUgJyArICh0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbikgKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iYXJTdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPVxuICAgICAgICAgIG9mZnNldCAtXG4gICAgICAgICAgcG9zaXRpb24gK1xuICAgICAgICAgIChyZXZlcnNlZCA/IHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbiA6IDApICtcbiAgICAgICAgICAncHggY2VudGVyJztcbiAgICAgICAgdGhpcy5iYXJTdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9XG4gICAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb24gKyAncHggMTAwJSc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gV3JhcHBlciBhcm91bmQgdGhlIGdldFNlbGVjdGlvbkJhckNvbG9yIG9mIHRoZSB1c2VyIHRvIHBhc3MgdG8gY29ycmVjdCBwYXJhbWV0ZXJzXG4gIHByaXZhdGUgZ2V0U2VsZWN0aW9uQmFyQ29sb3IoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMuZ2V0U2VsZWN0aW9uQmFyQ29sb3IoXG4gICAgICAgIHRoaXMudmFsdWUsXG4gICAgICAgIHRoaXMuaGlnaFZhbHVlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcih0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIC8vIFdyYXBwZXIgYXJvdW5kIHRoZSBnZXRQb2ludGVyQ29sb3Igb2YgdGhlIHVzZXIgdG8gcGFzcyB0byAgY29ycmVjdCBwYXJhbWV0ZXJzXG4gIHByaXZhdGUgZ2V0UG9pbnRlckNvbG9yKHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSk6IHN0cmluZyB7XG4gICAgaWYgKHBvaW50ZXJUeXBlID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFBvaW50ZXJDb2xvcihcbiAgICAgICAgdGhpcy5oaWdoVmFsdWUsXG4gICAgICAgIHBvaW50ZXJUeXBlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5nZXRQb2ludGVyQ29sb3IoXG4gICAgICB0aGlzLnZhbHVlLFxuICAgICAgcG9pbnRlclR5cGVcbiAgICApO1xuICB9XG5cbiAgLy8gV3JhcHBlciBhcm91bmQgdGhlIGdldFRpY2tDb2xvciBvZiB0aGUgdXNlciB0byBwYXNzIHRvIGNvcnJlY3QgcGFyYW1ldGVyc1xuICBwcml2YXRlIGdldFRpY2tDb2xvcih2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5nZXRUaWNrQ29sb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gVXBkYXRlIGNvbWJpbmVkIGxhYmVsIHBvc2l0aW9uIGFuZCB2YWx1ZVxuICBwcml2YXRlIHVwZGF0ZUNvbWJpbmVkTGFiZWwoKTogdm9pZCB7XG4gICAgbGV0IGlzTGFiZWxPdmVybGFwOiBib29sZWFuID0gbnVsbDtcbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgaXNMYWJlbE92ZXJsYXAgPVxuICAgICAgICB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudC5wb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LmRpbWVuc2lvbiAtIDEwIDw9IHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LnBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc0xhYmVsT3ZlcmxhcCA9XG4gICAgICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuZGltZW5zaW9uICsgMTAgPj0gdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQucG9zaXRpb247XG4gICAgfVxuXG4gICAgaWYgKGlzTGFiZWxPdmVybGFwKSB7XG4gICAgICBjb25zdCBsb3dEaXNwbGF5VmFsdWU6IHN0cmluZyA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld0xvd1ZhbHVlLCBMYWJlbFR5cGUuTG93KTtcbiAgICAgIGNvbnN0IGhpZ2hEaXNwbGF5VmFsdWU6IHN0cmluZyA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld0hpZ2hWYWx1ZSwgTGFiZWxUeXBlLkhpZ2gpO1xuICAgICAgY29uc3QgY29tYmluZWRMYWJlbFZhbHVlOiBzdHJpbmcgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gdGhpcy52aWV3T3B0aW9ucy5jb21iaW5lTGFiZWxzKGhpZ2hEaXNwbGF5VmFsdWUsIGxvd0Rpc3BsYXlWYWx1ZSlcbiAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLmNvbWJpbmVMYWJlbHMobG93RGlzcGxheVZhbHVlLCBoaWdoRGlzcGxheVZhbHVlKTtcblxuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zZXRWYWx1ZShjb21iaW5lZExhYmVsVmFsdWUpO1xuICAgICAgY29uc3QgcG9zOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLmJvdW5kUG9pbnRlckxhYmVsc1xuICAgICAgICA/IE1hdGgubWluKFxuICAgICAgICAgICAgTWF0aC5tYXgoXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudC5wb3NpdGlvbiArXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LmRpbWVuc2lvbiAvIDIgLVxuICAgICAgICAgICAgICAgIHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuZGltZW5zaW9uIC8gMixcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5kaW1lbnNpb25cbiAgICAgICAgICApXG4gICAgICAgIDogdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LmRpbWVuc2lvbiAvIDIgLSB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LmRpbWVuc2lvbiAvIDI7XG5cbiAgICAgIHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICAgIHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICAgIHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZUhpZ2hIYW5kbGUodGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3SGlnaFZhbHVlKSk7XG4gICAgICB0aGlzLnVwZGF0ZUxvd0hhbmRsZSh0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdMb3dWYWx1ZSkpO1xuICAgICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5oaWRlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmF1dG9IaWRlTGltaXRMYWJlbHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgdHJhbnNsYXRlZCB2YWx1ZSBpZiBhIHRyYW5zbGF0ZSBmdW5jdGlvbiBpcyBwcm92aWRlZCBlbHNlIHRoZSBvcmlnaW5hbCB2YWx1ZVxuICBwcml2YXRlIGdldERpc3BsYXlWYWx1ZSh2YWx1ZTogbnVtYmVyLCB3aGljaDogTGFiZWxUeXBlKTogc3RyaW5nIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSkgJiYgIXRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldFN0ZXBWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnRyYW5zbGF0ZSh2YWx1ZSwgd2hpY2gpO1xuICB9XG5cbiAgLy8gUm91bmQgdmFsdWUgdG8gc3RlcCBhbmQgcHJlY2lzaW9uIGJhc2VkIG9uIG1pblZhbHVlXG4gIHByaXZhdGUgcm91bmRTdGVwKHZhbHVlOiBudW1iZXIsIGN1c3RvbVN0ZXA/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHN0ZXA6IG51bWJlciA9ICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChjdXN0b21TdGVwKSA/IGN1c3RvbVN0ZXAgOiB0aGlzLnZpZXdPcHRpb25zLnN0ZXA7XG4gICAgbGV0IHN0ZXBwZWREaWZmZXJlbmNlOiBudW1iZXIgPSBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChcbiAgICAgICh2YWx1ZSAtIHRoaXMudmlld09wdGlvbnMuZmxvb3IpIC8gc3RlcCwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgc3RlcHBlZERpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKHN0ZXBwZWREaWZmZXJlbmNlKSAqIHN0ZXA7XG4gICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld09wdGlvbnMuZmxvb3IgKyBzdGVwcGVkRGlmZmVyZW5jZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gIH1cblxuICAvLyBUcmFuc2xhdGUgdmFsdWUgdG8gcGl4ZWwgcG9zaXRpb25cbiAgcHJpdmF0ZSB2YWx1ZVRvUG9zaXRpb24odmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBmbjogVmFsdWVUb1Bvc2l0aW9uRnVuY3Rpb24gID0gVmFsdWVIZWxwZXIubGluZWFyVmFsdWVUb1Bvc2l0aW9uO1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5jdXN0b21WYWx1ZVRvUG9zaXRpb24pKSB7XG4gICAgICBmbiA9IHRoaXMudmlld09wdGlvbnMuY3VzdG9tVmFsdWVUb1Bvc2l0aW9uO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3T3B0aW9ucy5sb2dTY2FsZSkge1xuICAgICAgZm4gPSBWYWx1ZUhlbHBlci5sb2dWYWx1ZVRvUG9zaXRpb247XG4gICAgfVxuXG4gICAgdmFsID0gTWF0aEhlbHBlci5jbGFtcFRvUmFuZ2UodmFsLCB0aGlzLnZpZXdPcHRpb25zLmZsb29yLCB0aGlzLnZpZXdPcHRpb25zLmNlaWwpO1xuICAgIGxldCBwZXJjZW50OiBudW1iZXIgPSBmbih2YWwsIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHBlcmNlbnQpKSB7XG4gICAgICBwZXJjZW50ID0gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQpIHtcbiAgICAgIHBlcmNlbnQgPSAxIC0gcGVyY2VudDtcbiAgICB9XG4gICAgcmV0dXJuIHBlcmNlbnQgKiB0aGlzLm1heEhhbmRsZVBvc2l0aW9uO1xuICB9XG5cbiAgLy8gVHJhbnNsYXRlIHBvc2l0aW9uIHRvIG1vZGVsIHZhbHVlXG4gIHByaXZhdGUgcG9zaXRpb25Ub1ZhbHVlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBwZXJjZW50OiBudW1iZXIgPSBwb3NpdGlvbiAvIHRoaXMubWF4SGFuZGxlUG9zaXRpb247XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQpIHtcbiAgICAgIHBlcmNlbnQgPSAxIC0gcGVyY2VudDtcbiAgICB9XG4gICAgbGV0IGZuOiBQb3NpdGlvblRvVmFsdWVGdW5jdGlvbiA9IFZhbHVlSGVscGVyLmxpbmVhclBvc2l0aW9uVG9WYWx1ZTtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuY3VzdG9tUG9zaXRpb25Ub1ZhbHVlKSkge1xuICAgICAgZm4gPSB0aGlzLnZpZXdPcHRpb25zLmN1c3RvbVBvc2l0aW9uVG9WYWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlld09wdGlvbnMubG9nU2NhbGUpIHtcbiAgICAgIGZuID0gVmFsdWVIZWxwZXIubG9nUG9zaXRpb25Ub1ZhbHVlO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gZm4ocGVyY2VudCwgdGhpcy52aWV3T3B0aW9ucy5mbG9vciwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKTtcbiAgICByZXR1cm4gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlKSA/IHZhbHVlIDogMDtcbiAgfVxuXG4gIC8vIEdldCB0aGUgWC1jb29yZGluYXRlIG9yIFktY29vcmRpbmF0ZSBvZiBhbiBldmVudFxuICBwcml2YXRlIGdldEV2ZW50WFkoZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCwgdGFyZ2V0VG91Y2hJZD86IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMudmVydGljYWwgPyBldmVudC5jbGllbnRZIDogZXZlbnQuY2xpZW50WDtcbiAgICB9XG5cbiAgICBsZXQgdG91Y2hJbmRleDogbnVtYmVyID0gMDtcbiAgICBjb25zdCB0b3VjaGVzOiBUb3VjaExpc3QgPSBldmVudC50b3VjaGVzO1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGFyZ2V0VG91Y2hJZCkpIHtcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0b3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0b3VjaGVzW2ldLmlkZW50aWZpZXIgPT09IHRhcmdldFRvdWNoSWQpIHtcbiAgICAgICAgICB0b3VjaEluZGV4ID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgdGFyZ2V0IHRvdWNoIG9yIGlmIHRoZSB0YXJnZXQgdG91Y2ggd2FzIG5vdCBmb3VuZCBpbiB0aGUgZXZlbnRcbiAgICAvLyByZXR1cm5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgZmlyc3QgdG91Y2hcbiAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCA/IHRvdWNoZXNbdG91Y2hJbmRleF0uY2xpZW50WSA6IHRvdWNoZXNbdG91Y2hJbmRleF0uY2xpZW50WDtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGV2ZW50IHBvc2l0aW9uIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICBwcml2YXRlIGdldEV2ZW50UG9zaXRpb24oZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCwgdGFyZ2V0VG91Y2hJZD86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2xpZGVyRWxlbWVudEJvdW5kaW5nUmVjdDogQ2xpZW50UmVjdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3Qgc2xpZGVyUG9zOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID9cbiAgICAgIHNsaWRlckVsZW1lbnRCb3VuZGluZ1JlY3QuYm90dG9tIDogc2xpZGVyRWxlbWVudEJvdW5kaW5nUmVjdC5sZWZ0O1xuICAgIGxldCBldmVudFBvczogbnVtYmVyID0gMDtcbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCkge1xuICAgICAgZXZlbnRQb3MgPSAtdGhpcy5nZXRFdmVudFhZKGV2ZW50LCB0YXJnZXRUb3VjaElkKSArIHNsaWRlclBvcztcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRQb3MgPSB0aGlzLmdldEV2ZW50WFkoZXZlbnQsIHRhcmdldFRvdWNoSWQpIC0gc2xpZGVyUG9zO1xuICAgIH1cbiAgICByZXR1cm4gZXZlbnRQb3MgKiB0aGlzLnZpZXdPcHRpb25zLnNjYWxlIC0gdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uO1xuICB9XG5cbiAgLy8gR2V0IHRoZSBoYW5kbGUgY2xvc2VzdCB0byBhbiBldmVudFxuICBwcml2YXRlIGdldE5lYXJlc3RIYW5kbGUoZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCk6IFBvaW50ZXJUeXBlIHtcbiAgICBpZiAoIXRoaXMucmFuZ2UpIHtcbiAgICAgIHJldHVybiBQb2ludGVyVHlwZS5NaW47XG4gICAgfVxuXG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9IHRoaXMuZ2V0RXZlbnRQb3NpdGlvbihldmVudCk7XG4gICAgY29uc3QgZGlzdGFuY2VNaW46IG51bWJlciA9IE1hdGguYWJzKHBvc2l0aW9uIC0gdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uKTtcbiAgICBjb25zdCBkaXN0YW5jZU1heDogbnVtYmVyID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLm1heEhhbmRsZUVsZW1lbnQucG9zaXRpb24pO1xuXG4gICAgaWYgKGRpc3RhbmNlTWluIDwgZGlzdGFuY2VNYXgpIHtcbiAgICAgIHJldHVybiBQb2ludGVyVHlwZS5NaW47XG4gICAgfSBlbHNlIGlmIChkaXN0YW5jZU1pbiA+IGRpc3RhbmNlTWF4KSB7XG4gICAgICByZXR1cm4gUG9pbnRlclR5cGUuTWF4O1xuICAgIH0gZWxzZSBpZiAoIXRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQpIHtcbiAgICAgIC8vIGlmIGV2ZW50IGlzIGF0IHRoZSBzYW1lIGRpc3RhbmNlIGZyb20gbWluL21heCB0aGVuIGlmIGl0J3MgYXQgbGVmdCBvZiBtaW5ILCB3ZSByZXR1cm4gbWluSCBlbHNlIG1heEhcbiAgICAgIHJldHVybiBwb3NpdGlvbiA8IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiA/IFBvaW50ZXJUeXBlLk1pbiA6IFBvaW50ZXJUeXBlLk1heDtcbiAgICB9XG4gICAgLy8gcmV2ZXJzZSBpbiBydGxcbiAgICByZXR1cm4gcG9zaXRpb24gPiB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24gPyBQb2ludGVyVHlwZS5NaW4gOiBQb2ludGVyVHlwZS5NYXg7XG4gIH1cblxuICAvLyBCaW5kIG1vdXNlIGFuZCB0b3VjaCBldmVudHMgdG8gc2xpZGVyIGhhbmRsZXNcbiAgcHJpdmF0ZSBiaW5kRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGRyYWdnYWJsZVJhbmdlOiBib29sZWFuID0gdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZTtcblxuICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5vbmx5QmluZEhhbmRsZXMpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudC5vbignbW91c2Vkb3duJyxcbiAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB0aGlzLm9uQmFyU3RhcnQobnVsbCwgZHJhZ2dhYmxlUmFuZ2UsIGV2ZW50LCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHkpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5vbignbW91c2Vkb3duJyxcbiAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB0aGlzLm9uQmFyU3RhcnQoUG9pbnRlclR5cGUuTWluLCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChQb2ludGVyVHlwZS5NYXgsIGRyYWdnYWJsZVJhbmdlLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5vbignbW91c2Vkb3duJyxcbiAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQoUG9pbnRlclR5cGUuTWluLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5vbignbW91c2Vkb3duJyxcbiAgICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25TdGFydChQb2ludGVyVHlwZS5NYXgsIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLm9ubHlCaW5kSGFuZGxlcykge1xuICAgICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KG51bGwsIGV2ZW50LCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnRpY2tzRWxlbWVudC5vbignbW91c2Vkb3duJyxcbiAgICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25TdGFydChudWxsLCBldmVudCwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudmlld09wdGlvbnMub25seUJpbmRIYW5kbGVzKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uQmFyU3RhcnQobnVsbCwgZHJhZ2dhYmxlUmFuZ2UsIGV2ZW50LCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2VPbmx5KSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uQmFyU3RhcnQoUG9pbnRlclR5cGUuTWluLCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgIChldmVudDogVG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5vbkJhclN0YXJ0KFBvaW50ZXJUeXBlLk1heCwgZHJhZ2dhYmxlUmFuZ2UsIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgIChldmVudDogVG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KFBvaW50ZXJUeXBlLk1pbiwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQoUG9pbnRlclR5cGUuTWF4LCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5vbmx5QmluZEhhbmRsZXMpIHtcbiAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5vblBhc3NpdmUoJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgIChldmVudDogVG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KG51bGwsIGV2ZW50LCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnRpY2tzRWxlbWVudC5vblBhc3NpdmUoJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgIChldmVudDogVG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KG51bGwsIGV2ZW50LCBmYWxzZSwgZmFsc2UsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQub24oJ2ZvY3VzJywgKCk6IHZvaWQgPT4gdGhpcy5vblBvaW50ZXJGb2N1cyhQb2ludGVyVHlwZS5NaW4pKTtcbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5vbignZm9jdXMnLCAoKTogdm9pZCA9PiB0aGlzLm9uUG9pbnRlckZvY3VzKFBvaW50ZXJUeXBlLk1heCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5ncyhvcHRpb25zOiBPcHRpb25zKTogYm9vbGVhbltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgb3B0aW9ucy5kaXNhYmxlZCxcbiAgICAgIG9wdGlvbnMucmVhZE9ubHksXG4gICAgICBvcHRpb25zLmRyYWdnYWJsZVJhbmdlLFxuICAgICAgb3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHksXG4gICAgICBvcHRpb25zLm9ubHlCaW5kSGFuZGxlcyxcbiAgICAgIG9wdGlvbnMua2V5Ym9hcmRTdXBwb3J0XG4gICAgXTtcbiAgfVxuXG4gIC8vIFVuYmluZCBtb3VzZSBhbmQgdG91Y2ggZXZlbnRzIHRvIHNsaWRlciBoYW5kbGVzXG4gIHByaXZhdGUgdW5iaW5kRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmVPbk1vdmUoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlT25FbmQoKTtcblxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLmdldEFsbFNsaWRlckVsZW1lbnRzKCkpIHtcbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoZWxlbWVudCkpIHtcbiAgICAgICAgZWxlbWVudC5vZmYoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uQmFyU3RhcnQocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlLCBkcmFnZ2FibGVSYW5nZTogYm9vbGVhbiwgZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCxcbiAgICBiaW5kTW92ZTogYm9vbGVhbiwgYmluZEVuZDogYm9vbGVhbiwgc2ltdWxhdGVJbW1lZGlhdGVNb3ZlPzogYm9vbGVhbiwgc2ltdWxhdGVJbW1lZGlhdGVFbmQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGRyYWdnYWJsZVJhbmdlKSB7XG4gICAgICB0aGlzLm9uRHJhZ1N0YXJ0KHBvaW50ZXJUeXBlLCBldmVudCwgYmluZE1vdmUsIGJpbmRFbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU3RhcnQocG9pbnRlclR5cGUsIGV2ZW50LCBiaW5kTW92ZSwgYmluZEVuZCwgc2ltdWxhdGVJbW1lZGlhdGVNb3ZlLCBzaW11bGF0ZUltbWVkaWF0ZUVuZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gb25TdGFydCBldmVudCBoYW5kbGVyXG4gIHByaXZhdGUgb25TdGFydChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUsIGV2ZW50OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQsXG4gICAgICBiaW5kTW92ZTogYm9vbGVhbiwgYmluZEVuZDogYm9vbGVhbiwgc2ltdWxhdGVJbW1lZGlhdGVNb3ZlPzogYm9vbGVhbiwgc2ltdWxhdGVJbW1lZGlhdGVFbmQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gT25seSBjYWxsIHByZXZlbnREZWZhdWx0KCkgd2hlbiBoYW5kbGluZyBub24tcGFzc2l2ZSBldmVudHMgKHBhc3NpdmUgZXZlbnRzIGRvbid0IG5lZWQgaXQpXG4gICAgaWYgKCFDb21wYXRpYmlsaXR5SGVscGVyLmlzVG91Y2hFdmVudChldmVudCkgfHwgIWRldGVjdFBhc3NpdmVFdmVudHMuaGFzU3VwcG9ydCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuXG4gICAgLy8gV2UgaGF2ZSB0byBkbyB0aGlzIGluIGNhc2UgdGhlIEhUTUwgd2hlcmUgdGhlIHNsaWRlcnMgYXJlIG9uXG4gICAgLy8gaGF2ZSBiZWVuIGFuaW1hdGVkIGludG8gdmlldy5cbiAgICB0aGlzLmNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKCk7XG5cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQocG9pbnRlclR5cGUpKSB7XG4gICAgICBwb2ludGVyVHlwZSA9IHRoaXMuZ2V0TmVhcmVzdEhhbmRsZShldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID0gcG9pbnRlclR5cGU7XG5cbiAgICBjb25zdCBwb2ludGVyRWxlbWVudDogU2xpZGVySGFuZGxlRGlyZWN0aXZlID0gdGhpcy5nZXRQb2ludGVyRWxlbWVudChwb2ludGVyVHlwZSk7XG4gICAgcG9pbnRlckVsZW1lbnQuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmtleWJvYXJkU3VwcG9ydCkge1xuICAgICAgcG9pbnRlckVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBpZiAoYmluZE1vdmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVPbk1vdmUoKTtcblxuICAgICAgY29uc3Qgb25Nb3ZlQ2FsbGJhY2s6ICgoZTogTW91c2VFdmVudHxUb3VjaEV2ZW50KSA9PiB2b2lkKSA9XG4gICAgICAgIChlOiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMuZHJhZ2dpbmcuYWN0aXZlID8gdGhpcy5vbkRyYWdNb3ZlKGUpIDogdGhpcy5vbk1vdmUoZSk7XG5cbiAgICAgIGlmIChDb21wYXRpYmlsaXR5SGVscGVyLmlzVG91Y2hFdmVudChldmVudCkpIHtcbiAgICAgICAgdGhpcy5vbk1vdmVFdmVudExpc3RlbmVyID0gdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmF0dGFjaFBhc3NpdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGRvY3VtZW50LCAndG91Y2htb3ZlJywgb25Nb3ZlQ2FsbGJhY2ssIHRoaXMudmlld09wdGlvbnMudG91Y2hFdmVudHNJbnRlcnZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBkb2N1bWVudCwgJ21vdXNlbW92ZScsIG9uTW92ZUNhbGxiYWNrLCB0aGlzLnZpZXdPcHRpb25zLm1vdXNlRXZlbnRzSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChiaW5kRW5kKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlT25FbmQoKTtcblxuICAgICAgY29uc3Qgb25FbmRDYWxsYmFjazogKChlOiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpID0+IHZvaWQpID1cbiAgICAgICAgKGU6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5vbkVuZChlKTtcblxuICAgICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSkge1xuICAgICAgICB0aGlzLm9uRW5kRXZlbnRMaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5hdHRhY2hQYXNzaXZlRXZlbnRMaXN0ZW5lcihkb2N1bWVudCwgJ3RvdWNoZW5kJywgb25FbmRDYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uRW5kRXZlbnRMaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5hdHRhY2hFdmVudExpc3RlbmVyKGRvY3VtZW50LCAnbW91c2V1cCcsIG9uRW5kQ2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXNlckNoYW5nZVN0YXJ0LmVtaXQodGhpcy5nZXRDaGFuZ2VDb250ZXh0KCkpO1xuXG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzKSkge1xuICAgICAgLy8gU3RvcmUgdGhlIHRvdWNoIGlkZW50aWZpZXJcbiAgICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnRvdWNoSWQpKSB7XG4gICAgICAgIHRoaXMudG91Y2hJZCA9IChldmVudCBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXS5pZGVudGlmaWVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENsaWNrIGV2ZW50cywgZWl0aGVyIHdpdGggbW91c2Ugb3IgdG91Y2ggZ2VzdHVyZSBhcmUgd2VpcmQuIFNvbWV0aW1lcyB0aGV5IHJlc3VsdCBpbiBmdWxsXG4gICAgLy8gc3RhcnQsIG1vdmUsIGVuZCBzZXF1ZW5jZSwgYW5kIHNvbWV0aW1lcywgdGhleSBkb24ndCAtIHRoZXkgb25seSBpbnZva2UgbW91c2Vkb3duXG4gICAgLy8gQXMgYSB3b3JrYXJvdW5kLCB3ZSBzaW11bGF0ZSB0aGUgZmlyc3QgbW92ZSBldmVudCBhbmQgdGhlIGVuZCBldmVudCBpZiBpdCdzIG5lY2Vzc2FyeVxuICAgIGlmIChzaW11bGF0ZUltbWVkaWF0ZU1vdmUpIHtcbiAgICAgIHRoaXMub25Nb3ZlKGV2ZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoc2ltdWxhdGVJbW1lZGlhdGVFbmQpIHtcbiAgICAgIHRoaXMub25FbmQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG9uTW92ZSBldmVudCBoYW5kbGVyXG4gIHByaXZhdGUgb25Nb3ZlKGV2ZW50OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQsIGZyb21UaWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGxldCB0b3VjaEZvclRoaXNTbGlkZXI6IFRvdWNoID0gbnVsbDtcblxuICAgIGlmIChDb21wYXRpYmlsaXR5SGVscGVyLmlzVG91Y2hFdmVudChldmVudCkpIHtcbiAgICAgIGNvbnN0IGNoYW5nZWRUb3VjaGVzOiBUb3VjaExpc3QgPSAoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXM7XG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXIgPT09IHRoaXMudG91Y2hJZCkge1xuICAgICAgICAgIHRvdWNoRm9yVGhpc1NsaWRlciA9IGNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0b3VjaEZvclRoaXNTbGlkZXIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5hbmltYXRlICYmICF0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGVPbk1vdmUpIHtcbiAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICB0aGlzLnNsaWRlckVsZW1lbnRBbmltYXRlQ2xhc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vdmluZyA9IHRydWU7XG5cbiAgICBjb25zdCBuZXdQb3M6IG51bWJlciA9ICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0b3VjaEZvclRoaXNTbGlkZXIpXG4gICAgICA/IHRoaXMuZ2V0RXZlbnRQb3NpdGlvbihldmVudCwgdG91Y2hGb3JUaGlzU2xpZGVyLmlkZW50aWZpZXIpXG4gICAgICA6IHRoaXMuZ2V0RXZlbnRQb3NpdGlvbihldmVudCk7XG4gICAgbGV0IG5ld1ZhbHVlOiBudW1iZXI7XG4gICAgY29uc3QgY2VpbFZhbHVlOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gdGhpcy52aWV3T3B0aW9ucy5mbG9vclxuICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuY2VpbDtcbiAgICBjb25zdCBmbG9vclZhbHVlOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0ID8gdGhpcy52aWV3T3B0aW9ucy5jZWlsIDogdGhpcy52aWV3T3B0aW9ucy5mbG9vcjtcblxuICAgIGlmIChuZXdQb3MgPD0gMCkge1xuICAgICAgbmV3VmFsdWUgPSBmbG9vclZhbHVlO1xuICAgIH0gZWxzZSBpZiAobmV3UG9zID49IHRoaXMubWF4SGFuZGxlUG9zaXRpb24pIHtcbiAgICAgIG5ld1ZhbHVlID0gY2VpbFZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMucG9zaXRpb25Ub1ZhbHVlKG5ld1Bvcyk7XG4gICAgICBpZiAoZnJvbVRpY2sgJiYgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1N0ZXApKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5yb3VuZFN0ZXAobmV3VmFsdWUsIHRoaXMudmlld09wdGlvbnMudGlja1N0ZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnJvdW5kU3RlcChuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb25UcmFja2luZ0hhbmRsZShuZXdWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG9uRW5kKGV2ZW50OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoQ29tcGF0aWJpbGl0eUhlbHBlci5pc1RvdWNoRXZlbnQoZXZlbnQpKSB7XG4gICAgICBjb25zdCBjaGFuZ2VkVG91Y2hlczogVG91Y2hMaXN0ID0gKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzO1xuICAgICAgaWYgKGNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXIgIT09IHRoaXMudG91Y2hJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5hbmltYXRlKSB7XG4gICAgICB0aGlzLnNsaWRlckVsZW1lbnRBbmltYXRlQ2xhc3MgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudG91Y2hJZCA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmRyYWdnaW5nLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy51bnN1YnNjcmliZU9uTW92ZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmVPbkVuZCgpO1xuXG4gICAgdGhpcy51c2VyQ2hhbmdlRW5kLmVtaXQodGhpcy5nZXRDaGFuZ2VDb250ZXh0KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblBvaW50ZXJGb2N1cyhwb2ludGVyVHlwZTogUG9pbnRlclR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBwb2ludGVyRWxlbWVudDogU2xpZGVySGFuZGxlRGlyZWN0aXZlID0gdGhpcy5nZXRQb2ludGVyRWxlbWVudChwb2ludGVyVHlwZSk7XG4gICAgcG9pbnRlckVsZW1lbnQub24oJ2JsdXInLCAoKTogdm9pZCA9PiB0aGlzLm9uUG9pbnRlckJsdXIocG9pbnRlckVsZW1lbnQpKTtcbiAgICBwb2ludGVyRWxlbWVudC5vbigna2V5ZG93bicsIChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4gdGhpcy5vbktleWJvYXJkRXZlbnQoZXZlbnQpKTtcbiAgICBwb2ludGVyRWxlbWVudC5vbigna2V5dXAnLCAoKTogdm9pZCA9PiB0aGlzLm9uS2V5VXAoKSk7XG4gICAgcG9pbnRlckVsZW1lbnQuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IHBvaW50ZXJUeXBlO1xuICAgIHRoaXMuY3VycmVudEZvY3VzUG9pbnRlciA9IHBvaW50ZXJUeXBlO1xuICAgIHRoaXMuZmlyc3RLZXlEb3duID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgb25LZXlVcCgpOiB2b2lkIHtcbiAgICB0aGlzLmZpcnN0S2V5RG93biA9IHRydWU7XG4gICAgdGhpcy51c2VyQ2hhbmdlRW5kLmVtaXQodGhpcy5nZXRDaGFuZ2VDb250ZXh0KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblBvaW50ZXJCbHVyKHBvaW50ZXI6IFNsaWRlckhhbmRsZURpcmVjdGl2ZSk6IHZvaWQge1xuICAgIHBvaW50ZXIub2ZmKCdibHVyJyk7XG4gICAgcG9pbnRlci5vZmYoJ2tleWRvd24nKTtcbiAgICBwb2ludGVyLm9mZigna2V5dXAnKTtcbiAgICBwb2ludGVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnRvdWNoSWQpKSB7XG4gICAgICB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEtleUFjdGlvbnMoY3VycmVudFZhbHVlOiBudW1iZXIpOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSB7XG4gICAgY29uc3QgdmFsdWVSYW5nZTogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5jZWlsIC0gdGhpcy52aWV3T3B0aW9ucy5mbG9vcjtcblxuICAgIGxldCBpbmNyZWFzZVN0ZXA6IG51bWJlciA9IGN1cnJlbnRWYWx1ZSArIHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBsZXQgZGVjcmVhc2VTdGVwOiBudW1iZXIgPSBjdXJyZW50VmFsdWUgLSB0aGlzLnZpZXdPcHRpb25zLnN0ZXA7XG4gICAgbGV0IGluY3JlYXNlUGFnZTogbnVtYmVyID0gY3VycmVudFZhbHVlICsgdmFsdWVSYW5nZSAvIDEwO1xuICAgIGxldCBkZWNyZWFzZVBhZ2U6IG51bWJlciA9IGN1cnJlbnRWYWx1ZSAtIHZhbHVlUmFuZ2UgLyAxMDtcblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJldmVyc2VkQ29udHJvbHMpIHtcbiAgICAgIGluY3JlYXNlU3RlcCA9IGN1cnJlbnRWYWx1ZSAtIHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICAgIGRlY3JlYXNlU3RlcCA9IGN1cnJlbnRWYWx1ZSArIHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICAgIGluY3JlYXNlUGFnZSA9IGN1cnJlbnRWYWx1ZSAtIHZhbHVlUmFuZ2UgLyAxMDtcbiAgICAgIGRlY3JlYXNlUGFnZSA9IGN1cnJlbnRWYWx1ZSArIHZhbHVlUmFuZ2UgLyAxMDtcbiAgICB9XG5cbiAgICAvLyBMZWZ0IHRvIHJpZ2h0IGRlZmF1bHQgYWN0aW9uc1xuICAgIGNvbnN0IGFjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge1xuICAgICAgVVA6IGluY3JlYXNlU3RlcCxcbiAgICAgIERPV046IGRlY3JlYXNlU3RlcCxcbiAgICAgIExFRlQ6IGRlY3JlYXNlU3RlcCxcbiAgICAgIFJJR0hUOiBpbmNyZWFzZVN0ZXAsXG4gICAgICBQQUdFVVA6IGluY3JlYXNlUGFnZSxcbiAgICAgIFBBR0VET1dOOiBkZWNyZWFzZVBhZ2UsXG4gICAgICBIT01FOiB0aGlzLnZpZXdPcHRpb25zLnJldmVyc2VkQ29udHJvbHMgPyB0aGlzLnZpZXdPcHRpb25zLmNlaWwgOiB0aGlzLnZpZXdPcHRpb25zLmZsb29yLFxuICAgICAgRU5EOiB0aGlzLnZpZXdPcHRpb25zLnJldmVyc2VkQ29udHJvbHMgPyB0aGlzLnZpZXdPcHRpb25zLmZsb29yIDogdGhpcy52aWV3T3B0aW9ucy5jZWlsLFxuICAgIH07XG4gICAgLy8gcmlnaHQgdG8gbGVmdCBtZWFucyBzd2FwcGluZyByaWdodCBhbmQgbGVmdCBhcnJvd3NcbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgYWN0aW9ucy5MRUZUID0gaW5jcmVhc2VTdGVwO1xuICAgICAgYWN0aW9ucy5SSUdIVCA9IGRlY3JlYXNlU3RlcDtcbiAgICAgIC8vIHJpZ2h0IHRvIGxlZnQgYW5kIHZlcnRpY2FsIG1lYW5zIHdlIGFsc28gc3dhcCB1cCBhbmQgZG93blxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMudmVydGljYWwpIHtcbiAgICAgICAgYWN0aW9ucy5VUCA9IGRlY3JlYXNlU3RlcDtcbiAgICAgICAgYWN0aW9ucy5ET1dOID0gaW5jcmVhc2VTdGVwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWN0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgb25LZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlOiBudW1iZXIgPSB0aGlzLmdldEN1cnJlbnRUcmFja2luZ1ZhbHVlKCk7XG4gICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGV2ZW50LmtleUNvZGUpXG4gICAgICA/IGV2ZW50LmtleUNvZGVcbiAgICAgIDogZXZlbnQud2hpY2g7XG4gICAgY29uc3Qga2V5czoge1trZXlDb2RlOiBudW1iZXJdOiBzdHJpbmd9ID0ge1xuICAgICAgICAzODogJ1VQJyxcbiAgICAgICAgNDA6ICdET1dOJyxcbiAgICAgICAgMzc6ICdMRUZUJyxcbiAgICAgICAgMzk6ICdSSUdIVCcsXG4gICAgICAgIDMzOiAnUEFHRVVQJyxcbiAgICAgICAgMzQ6ICdQQUdFRE9XTicsXG4gICAgICAgIDM2OiAnSE9NRScsXG4gICAgICAgIDM1OiAnRU5EJyxcbiAgICAgIH07XG4gICAgY29uc3QgYWN0aW9uczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB0aGlzLmdldEtleUFjdGlvbnMoY3VycmVudFZhbHVlKTtcbiAgICBjb25zdCBrZXk6IHN0cmluZyA9IGtleXNba2V5Q29kZV07XG4gICAgY29uc3QgYWN0aW9uOiBudW1iZXIgPSBhY3Rpb25zW2tleV07XG5cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoYWN0aW9uKSB8fCBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5maXJzdEtleURvd24pIHtcbiAgICAgIHRoaXMuZmlyc3RLZXlEb3duID0gZmFsc2U7XG4gICAgICB0aGlzLnVzZXJDaGFuZ2VTdGFydC5lbWl0KHRoaXMuZ2V0Q2hhbmdlQ29udGV4dCgpKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb25WYWx1ZTogbnVtYmVyID0gTWF0aEhlbHBlci5jbGFtcFRvUmFuZ2UoYWN0aW9uLCB0aGlzLnZpZXdPcHRpb25zLmZsb29yLCB0aGlzLnZpZXdPcHRpb25zLmNlaWwpO1xuICAgIGNvbnN0IG5ld1ZhbHVlOiBudW1iZXIgPSB0aGlzLnJvdW5kU3RlcChhY3Rpb25WYWx1ZSk7XG4gICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSkge1xuICAgICAgdGhpcy5wb3NpdGlvblRyYWNraW5nSGFuZGxlKG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZTogbnVtYmVyID0gdGhpcy52aWV3SGlnaFZhbHVlIC0gdGhpcy52aWV3TG93VmFsdWU7XG4gICAgICBsZXQgbmV3TWluVmFsdWU6IG51bWJlcjtcbiAgICAgIGxldCBuZXdNYXhWYWx1ZTogbnVtYmVyO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgbmV3TWluVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgbmV3TWF4VmFsdWUgPSBuZXdWYWx1ZSArIGRpZmZlcmVuY2U7XG4gICAgICAgIGlmIChuZXdNYXhWYWx1ZSA+IHRoaXMudmlld09wdGlvbnMuY2VpbCkge1xuICAgICAgICAgIG5ld01heFZhbHVlID0gdGhpcy52aWV3T3B0aW9ucy5jZWlsO1xuICAgICAgICAgIG5ld01pblZhbHVlID0gbmV3TWF4VmFsdWUgLSBkaWZmZXJlbmNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgIG5ld01heFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIG5ld01pblZhbHVlID0gbmV3VmFsdWUgLSBkaWZmZXJlbmNlO1xuICAgICAgICBpZiAobmV3TWluVmFsdWUgPCB0aGlzLnZpZXdPcHRpb25zLmZsb29yKSB7XG4gICAgICAgICAgbmV3TWluVmFsdWUgPSB0aGlzLnZpZXdPcHRpb25zLmZsb29yO1xuICAgICAgICAgIG5ld01heFZhbHVlID0gbmV3TWluVmFsdWUgKyBkaWZmZXJlbmNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnBvc2l0aW9uVHJhY2tpbmdCYXIobmV3TWluVmFsdWUsIG5ld01heFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBvbkRyYWdTdGFydCBldmVudCBoYW5kbGVyLCBoYW5kbGVzIGRyYWdnaW5nIG9mIHRoZSBtaWRkbGUgYmFyXG4gIHByaXZhdGUgb25EcmFnU3RhcnQocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlLCBldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LFxuICAgIGJpbmRNb3ZlOiBib29sZWFuLCBiaW5kRW5kOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9IHRoaXMuZ2V0RXZlbnRQb3NpdGlvbihldmVudCk7XG5cbiAgICB0aGlzLmRyYWdnaW5nID0gbmV3IERyYWdnaW5nKCk7XG4gICAgdGhpcy5kcmFnZ2luZy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZHJhZ2dpbmcudmFsdWUgPSB0aGlzLnBvc2l0aW9uVG9WYWx1ZShwb3NpdGlvbik7XG4gICAgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlID0gdGhpcy52aWV3SGlnaFZhbHVlIC0gdGhpcy52aWV3TG93VmFsdWU7XG4gICAgdGhpcy5kcmFnZ2luZy5sb3dMaW1pdCA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgPyB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24gLSBwb3NpdGlvblxuICAgICAgICA6IHBvc2l0aW9uIC0gdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uO1xuICAgIHRoaXMuZHJhZ2dpbmcuaGlnaExpbWl0ID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/IHBvc2l0aW9uIC0gdGhpcy5tYXhIYW5kbGVFbGVtZW50LnBvc2l0aW9uXG4gICAgICAgIDogdGhpcy5tYXhIYW5kbGVFbGVtZW50LnBvc2l0aW9uIC0gcG9zaXRpb247XG5cbiAgICB0aGlzLm9uU3RhcnQocG9pbnRlclR5cGUsIGV2ZW50LCBiaW5kTW92ZSwgYmluZEVuZCk7XG4gIH1cblxuICAvKiogR2V0IG1pbiB2YWx1ZSBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgbmV3UG9zIGlzIG91dE9mQm91bmRzIGFib3ZlIG9yIGJlbG93IHRoZSBiYXIgYW5kIHJpZ2h0VG9MZWZ0ICovXG4gIHByaXZhdGUgZ2V0TWluVmFsdWUobmV3UG9zOiBudW1iZXIsIG91dE9mQm91bmRzOiBib29sZWFuLCBpc0Fib3ZlOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc1JUTDogYm9vbGVhbiA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQ7XG4gICAgbGV0IHZhbHVlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgaWYgKG91dE9mQm91bmRzKSB7XG4gICAgICBpZiAoaXNBYm92ZSkge1xuICAgICAgICB2YWx1ZSA9IGlzUlRMXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmZsb29yXG4gICAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLmNlaWwgLSB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGlzUlRMXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmNlaWwgLSB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2VcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuZmxvb3I7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gaXNSVExcbiAgICAgICAgPyB0aGlzLnBvc2l0aW9uVG9WYWx1ZShuZXdQb3MgKyB0aGlzLmRyYWdnaW5nLmxvd0xpbWl0KVxuICAgICAgICA6IHRoaXMucG9zaXRpb25Ub1ZhbHVlKG5ld1BvcyAtIHRoaXMuZHJhZ2dpbmcubG93TGltaXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yb3VuZFN0ZXAodmFsdWUpO1xuICB9XG5cbiAgLyoqIEdldCBtYXggdmFsdWUgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIG5ld1BvcyBpcyBvdXRPZkJvdW5kcyBhYm92ZSBvciBiZWxvdyB0aGUgYmFyIGFuZCByaWdodFRvTGVmdCAqL1xuICBwcml2YXRlIGdldE1heFZhbHVlKG5ld1BvczogbnVtYmVyLCBvdXRPZkJvdW5kczogYm9vbGVhbiwgaXNBYm92ZTogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgaXNSVEw6IGJvb2xlYW4gPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0O1xuICAgIGxldCB2YWx1ZTogbnVtYmVyID0gbnVsbDtcblxuICAgIGlmIChvdXRPZkJvdW5kcykge1xuICAgICAgaWYgKGlzQWJvdmUpIHtcbiAgICAgICAgdmFsdWUgPSBpc1JUTFxuICAgICAgICAgID8gdGhpcy52aWV3T3B0aW9ucy5mbG9vciArIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZVxuICAgICAgICAgIDogdGhpcy52aWV3T3B0aW9ucy5jZWlsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBpc1JUTFxuICAgICAgICAgID8gdGhpcy52aWV3T3B0aW9ucy5jZWlsXG4gICAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLmZsb29yICsgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNSVEwpIHtcbiAgICAgICAgdmFsdWUgPVxuICAgICAgICAgIHRoaXMucG9zaXRpb25Ub1ZhbHVlKG5ld1BvcyArIHRoaXMuZHJhZ2dpbmcubG93TGltaXQpICtcbiAgICAgICAgICB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9XG4gICAgICAgICAgdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zIC0gdGhpcy5kcmFnZ2luZy5sb3dMaW1pdCkgK1xuICAgICAgICAgIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yb3VuZFN0ZXAodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkRyYWdNb3ZlKGV2ZW50PzogTW91c2VFdmVudHxUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbmV3UG9zOiBudW1iZXIgPSB0aGlzLmdldEV2ZW50UG9zaXRpb24oZXZlbnQpO1xuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuYW5pbWF0ZSAmJiAhdGhpcy52aWV3T3B0aW9ucy5hbmltYXRlT25Nb3ZlKSB7XG4gICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgdGhpcy5zbGlkZXJFbGVtZW50QW5pbWF0ZUNsYXNzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgbGV0IGNlaWxMaW1pdDogbnVtYmVyLFxuICAgICAgICBmbG9vckxpbWl0OiBudW1iZXIsXG4gICAgICAgIGZsb29ySGFuZGxlRWxlbWVudDogU2xpZGVySGFuZGxlRGlyZWN0aXZlLFxuICAgICAgICBjZWlsSGFuZGxlRWxlbWVudDogU2xpZGVySGFuZGxlRGlyZWN0aXZlO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICBjZWlsTGltaXQgPSB0aGlzLmRyYWdnaW5nLmxvd0xpbWl0O1xuICAgICAgZmxvb3JMaW1pdCA9IHRoaXMuZHJhZ2dpbmcuaGlnaExpbWl0O1xuICAgICAgZmxvb3JIYW5kbGVFbGVtZW50ID0gdGhpcy5tYXhIYW5kbGVFbGVtZW50O1xuICAgICAgY2VpbEhhbmRsZUVsZW1lbnQgPSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlaWxMaW1pdCA9IHRoaXMuZHJhZ2dpbmcuaGlnaExpbWl0O1xuICAgICAgZmxvb3JMaW1pdCA9IHRoaXMuZHJhZ2dpbmcubG93TGltaXQ7XG4gICAgICBmbG9vckhhbmRsZUVsZW1lbnQgPSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQ7XG4gICAgICBjZWlsSGFuZGxlRWxlbWVudCA9IHRoaXMubWF4SGFuZGxlRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpc1VuZGVyRmxvb3JMaW1pdDogYm9vbGVhbiA9IChuZXdQb3MgPD0gZmxvb3JMaW1pdCk7XG4gICAgY29uc3QgaXNPdmVyQ2VpbExpbWl0OiBib29sZWFuID0gKG5ld1BvcyA+PSB0aGlzLm1heEhhbmRsZVBvc2l0aW9uIC0gY2VpbExpbWl0KTtcblxuICAgIGxldCBuZXdNaW5WYWx1ZTogbnVtYmVyO1xuICAgIGxldCBuZXdNYXhWYWx1ZTogbnVtYmVyO1xuICAgIGlmIChpc1VuZGVyRmxvb3JMaW1pdCkge1xuICAgICAgaWYgKGZsb29ySGFuZGxlRWxlbWVudC5wb3NpdGlvbiA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXdNaW5WYWx1ZSA9IHRoaXMuZ2V0TWluVmFsdWUobmV3UG9zLCB0cnVlLCBmYWxzZSk7XG4gICAgICBuZXdNYXhWYWx1ZSA9IHRoaXMuZ2V0TWF4VmFsdWUobmV3UG9zLCB0cnVlLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChpc092ZXJDZWlsTGltaXQpIHtcbiAgICAgIGlmIChjZWlsSGFuZGxlRWxlbWVudC5wb3NpdGlvbiA9PT0gdGhpcy5tYXhIYW5kbGVQb3NpdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXdNYXhWYWx1ZSA9IHRoaXMuZ2V0TWF4VmFsdWUobmV3UG9zLCB0cnVlLCB0cnVlKTtcbiAgICAgIG5ld01pblZhbHVlID0gdGhpcy5nZXRNaW5WYWx1ZShuZXdQb3MsIHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdNaW5WYWx1ZSA9IHRoaXMuZ2V0TWluVmFsdWUobmV3UG9zLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgbmV3TWF4VmFsdWUgPSB0aGlzLmdldE1heFZhbHVlKG5ld1BvcywgZmFsc2UsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uVHJhY2tpbmdCYXIobmV3TWluVmFsdWUsIG5ld01heFZhbHVlKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgbmV3IHZhbHVlIGFuZCBwb3NpdGlvbiBmb3IgdGhlIGVudGlyZSBiYXJcbiAgcHJpdmF0ZSBwb3NpdGlvblRyYWNraW5nQmFyKG5ld01pblZhbHVlOiBudW1iZXIsIG5ld01heFZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMubWluTGltaXQpICYmXG4gICAgICAgIG5ld01pblZhbHVlIDwgdGhpcy52aWV3T3B0aW9ucy5taW5MaW1pdCkge1xuICAgICAgbmV3TWluVmFsdWUgPSB0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0O1xuICAgICAgbmV3TWF4VmFsdWUgPSBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChuZXdNaW5WYWx1ZSArIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgfVxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5tYXhMaW1pdCkgJiZcbiAgICAgICAgbmV3TWF4VmFsdWUgPiB0aGlzLnZpZXdPcHRpb25zLm1heExpbWl0KSB7XG4gICAgICBuZXdNYXhWYWx1ZSA9IHRoaXMudmlld09wdGlvbnMubWF4TGltaXQ7XG4gICAgICBuZXdNaW5WYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KG5ld01heFZhbHVlIC0gdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IG5ld01pblZhbHVlO1xuICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG5ld01heFZhbHVlO1xuICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgdGhpcy51cGRhdGVIYW5kbGVzKFBvaW50ZXJUeXBlLk1pbiwgdGhpcy52YWx1ZVRvUG9zaXRpb24obmV3TWluVmFsdWUpKTtcbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWF4LCB0aGlzLnZhbHVlVG9Qb3NpdGlvbihuZXdNYXhWYWx1ZSkpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBuZXcgdmFsdWUgYW5kIHBvc2l0aW9uIHRvIHRoZSBjdXJyZW50IHRyYWNraW5nIGhhbmRsZVxuICBwcml2YXRlIHBvc2l0aW9uVHJhY2tpbmdIYW5kbGUobmV3VmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIG5ld1ZhbHVlID0gdGhpcy5hcHBseU1pbk1heExpbWl0KG5ld1ZhbHVlKTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMucHVzaFJhbmdlKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5hcHBseVB1c2hSYW5nZShuZXdWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5ub1N3aXRjaGluZykge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbiAmJlxuICAgICAgICAgICAgICBuZXdWYWx1ZSA+IHRoaXMudmlld0hpZ2hWYWx1ZSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5TWluTWF4UmFuZ2UodGhpcy52aWV3SGlnaFZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4ICYmXG4gICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA8IHRoaXMudmlld0xvd1ZhbHVlKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuYXBwbHlNaW5NYXhSYW5nZSh0aGlzLnZpZXdMb3dWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5hcHBseU1pbk1heFJhbmdlKG5ld1ZhbHVlKTtcbiAgICAgICAgLyogVGhpcyBpcyB0byBjaGVjayBpZiB3ZSBuZWVkIHRvIHN3aXRjaCB0aGUgbWluIGFuZCBtYXggaGFuZGxlcyAqL1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4gJiYgbmV3VmFsdWUgPiB0aGlzLnZpZXdIaWdoVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IHRoaXMudmlld0hpZ2hWYWx1ZTtcbiAgICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NaW4sIHRoaXMubWF4SGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy51cGRhdGVBcmlhQXR0cmlidXRlcygpO1xuICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IFBvaW50ZXJUeXBlLk1heDtcbiAgICAgICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXggJiZcbiAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA8IHRoaXMudmlld0xvd1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gdGhpcy52aWV3TG93VmFsdWU7XG4gICAgICAgICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWF4LCB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24pO1xuICAgICAgICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPSBQb2ludGVyVHlwZS5NaW47XG4gICAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmtleWJvYXJkU3VwcG9ydCkge1xuICAgICAgICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q3VycmVudFRyYWNraW5nVmFsdWUoKSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIsIHRoaXMudmFsdWVUb1Bvc2l0aW9uKG5ld1ZhbHVlKSk7XG4gICAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseU1pbk1heExpbWl0KG5ld1ZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5taW5MaW1pdCkgJiYgbmV3VmFsdWUgPCB0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0KSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5taW5MaW1pdDtcbiAgICB9XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1heExpbWl0KSAmJiBuZXdWYWx1ZSA+IHRoaXMudmlld09wdGlvbnMubWF4TGltaXQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLm1heExpbWl0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5TWluTWF4UmFuZ2UobmV3VmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgb3Bwb3NpdGVWYWx1ZTogbnVtYmVyID0gKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKVxuICAgICAgPyB0aGlzLnZpZXdIaWdoVmFsdWVcbiAgICAgIDogdGhpcy52aWV3TG93VmFsdWU7XG4gICAgY29uc3QgZGlmZmVyZW5jZTogbnVtYmVyID0gTWF0aC5hYnMobmV3VmFsdWUgLSBvcHBvc2l0ZVZhbHVlKTtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMubWluUmFuZ2UpKSB7XG4gICAgICBpZiAoZGlmZmVyZW5jZSA8IHRoaXMudmlld09wdGlvbnMubWluUmFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0hpZ2hWYWx1ZSAtIHRoaXMudmlld09wdGlvbnMubWluUmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0xvd1ZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1heFJhbmdlKSkge1xuICAgICAgaWYgKGRpZmZlcmVuY2UgPiB0aGlzLnZpZXdPcHRpb25zLm1heFJhbmdlKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgICAgIHJldHVybiBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdCh0aGlzLnZpZXdIaWdoVmFsdWUgLSB0aGlzLnZpZXdPcHRpb25zLm1heFJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgICAgIHJldHVybiBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdCh0aGlzLnZpZXdMb3dWYWx1ZSArIHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlQdXNoUmFuZ2UobmV3VmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZGlmZmVyZW5jZTogbnVtYmVyID0gKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKVxuICAgICAgICAgID8gdGhpcy52aWV3SGlnaFZhbHVlIC0gbmV3VmFsdWVcbiAgICAgICAgICA6IG5ld1ZhbHVlIC0gdGhpcy52aWV3TG93VmFsdWU7XG4gICAgY29uc3QgbWluUmFuZ2U6IG51bWJlciA9ICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSkpXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLm1pblJhbmdlXG4gICAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLnN0ZXA7XG4gICAgY29uc3QgbWF4UmFuZ2U6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2U7XG4gICAgLy8gaWYgc21hbGxlciB0aGFuIG1pblJhbmdlXG4gICAgaWYgKGRpZmZlcmVuY2UgPCBtaW5SYW5nZSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KFxuICAgICAgICAgIE1hdGgubWluKG5ld1ZhbHVlICsgbWluUmFuZ2UsIHRoaXMudmlld09wdGlvbnMuY2VpbCksIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICBuZXdWYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0hpZ2hWYWx1ZSAtIG1pblJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICAgICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKFBvaW50ZXJUeXBlLk1heCwgdGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3SGlnaFZhbHVlKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgIHRoaXMudmlld0xvd1ZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQoXG4gICAgICAgICAgTWF0aC5tYXgobmV3VmFsdWUgLSBtaW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5mbG9vciksIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICBuZXdWYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0xvd1ZhbHVlICsgbWluUmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWluLCB0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdMb3dWYWx1ZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVBcmlhQXR0cmlidXRlcygpO1xuICAgIH0gZWxzZSBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKG1heFJhbmdlKSAmJiBkaWZmZXJlbmNlID4gbWF4UmFuZ2UpIHtcbiAgICAgIC8vIGlmIGdyZWF0ZXIgdGhhbiBtYXhSYW5nZVxuICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KG5ld1ZhbHVlICsgbWF4UmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWF4LCB0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdIaWdoVmFsdWUpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgIHRoaXMudmlld0xvd1ZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQobmV3VmFsdWUgLSBtYXhSYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NaW4sIHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0xvd1ZhbHVlKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2hhbmdlQ29udGV4dCgpOiBDaGFuZ2VDb250ZXh0IHtcbiAgICBjb25zdCBjaGFuZ2VDb250ZXh0OiBDaGFuZ2VDb250ZXh0ID0gbmV3IENoYW5nZUNvbnRleHQoKTtcbiAgICBjaGFuZ2VDb250ZXh0LnBvaW50ZXJUeXBlID0gdGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyO1xuICAgIGNoYW5nZUNvbnRleHQudmFsdWUgPSArdGhpcy52YWx1ZTtcbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgY2hhbmdlQ29udGV4dC5oaWdoVmFsdWUgPSArdGhpcy5oaWdoVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VDb250ZXh0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2xpZGVyLXRvb2x0aXAtd3JhcHBlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRlbXBsYXRlXCI+XG4gIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7dG9vbHRpcDogdG9vbHRpcCwgcGxhY2VtZW50OiBwbGFjZW1lbnQsIGNvbnRlbnQ6IGNvbnRlbnR9XCI+PC9uZy10ZW1wbGF0ZT5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiIXRlbXBsYXRlXCI+XG4gIDxkaXYgY2xhc3M9XCJuZ3gtc2xpZGVyLWlubmVyLXRvb2x0aXBcIiBbYXR0ci50aXRsZV09XCJ0b29sdGlwXCIgW2F0dHIuZGF0YS10b29sdGlwLXBsYWNlbWVudF09XCJwbGFjZW1lbnRcIj5cbiAgICB7e2NvbnRlbnR9fVxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPmAsXG4gIHN0eWxlczogW2Aubmd4LXNsaWRlci1pbm5lci10b29sdGlwe2hlaWdodDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBXcmFwcGVyQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHBsYWNlbWVudDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGNvbnRlbnQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2xpZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNsaWRlckVsZW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1lbGVtZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTbGlkZXJIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNsaWRlckxhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9zbGlkZXItbGFiZWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2x0aXBXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLXdyYXBwZXIuY29tcG9uZW50JztcblxuLyoqXG4gKiBOZ3hTbGlkZXIgbW9kdWxlXG4gKlxuICogVGhlIG1vZHVsZSBleHBvcnRzIHRoZSBzbGlkZXIgY29tcG9uZW50XG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2xpZGVyQ29tcG9uZW50LFxuICAgIFNsaWRlckVsZW1lbnREaXJlY3RpdmUsXG4gICAgU2xpZGVySGFuZGxlRGlyZWN0aXZlLFxuICAgIFNsaWRlckxhYmVsRGlyZWN0aXZlLFxuICAgIFRvb2x0aXBXcmFwcGVyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTbGlkZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTbGlkZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFLRSxNQUFHOztJQUVILE9BQUk7O0lBRUosUUFBSzs7SUFFTCxPQUFJOztJQUVKLFlBQVM7O29CQVJULEdBQUc7b0JBRUgsSUFBSTtvQkFFSixLQUFLO29CQUVMLElBQUk7b0JBRUosU0FBUzs7OztBQThCWDs7Ozs7O3FCQUdtQixDQUFDOzs7OztvQkFJRixJQUFJOzs7OztvQkFJSixDQUFDOzs7Ozs7d0JBS0csSUFBSTs7Ozs7O3dCQUtKLElBQUk7Ozs7Ozs7eUJBTUYsS0FBSzs7Ozs7d0JBSVAsSUFBSTs7Ozs7d0JBSUosSUFBSTs7Ozs7eUJBSVEsSUFBSTs7Ozs7Ozs7NkJBT0ksSUFBSTs7Ozs7Ozs7O3lCQVFaLElBQUk7Ozs7OzZCQUlJLElBQUk7Ozs7Ozs7Ozs7MEJB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