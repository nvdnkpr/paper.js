/*
 * Paper.js
 *
 * This file is part of Paper.js, a JavaScript Vector Graphics Library,
 * based on Scriptographer.org and designed to be largely API compatible.
 * http://paperjs.org/
 * http://scriptographer.org/
 *
 * Copyright (c) 2011, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 */

/**
 * @name MouseEvent
 *
 * @extends Event
 */
var MouseEvent = this.MouseEvent = Event.extend(/** @lends MouseEvent# */{
	initialize: function(type, point, target, event) {
		this.base(event);
		this.type = type;
		this.point = point;
		this.target = target;
	},

	/**
	 * @return {String} A string representation of the key event.
	 */
	toString: function() {
		return '{ type: ' + this.type
				+ ', point: ' + this.point
				+ ', target: ' + this.target
				+ ', modifiers: ' + this.getModifiers()
				+ ' }';
	},

	// TODO: Move to Event perhaps?
	_call: function(bubble) {
		var item = this.target,
			called = false;
		while (item) {
			called = item.fire(this.type, this) || called;
			if (called && (!bubble || this._stopped))
				break;
			item = item.getParent();
		}
		return called;
	}
});
