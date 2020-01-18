/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
'use strict';

var KISBPM = KISBPM || {};
KISBPM.TOOLBAR_CONFIG = {
    "items" : [
        {
            "type" : "button",
            "title" : "保存",
            "cssClass" : "editor-icon editor-icon-save",
            "action" : "KISBPM.TOOLBAR.ACTIONS.saveModel"
        },
        {
            "type" : "separator",
            "title" : "",
            "cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "剪切",
            "cssClass" : "editor-icon editor-icon-cut",
            "action" : "KISBPM.TOOLBAR.ACTIONS.cut",
            "enabled" : false,
            "enabledAction" : "element"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.COPY",
            "cssClass" : "editor-icon editor-icon-copy",
            "action" : "KISBPM.TOOLBAR.ACTIONS.copy",
            "enabled" : false,
            "enabledAction" : "element"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.PASTE",
            "cssClass" : "editor-icon editor-icon-paste",
            "action" : "KISBPM.TOOLBAR.ACTIONS.paste",
            "enabled" : false
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.DELETE",
            "cssClass" : "editor-icon editor-icon-delete",
            "action" : "KISBPM.TOOLBAR.ACTIONS.deleteItem",
            "enabled" : false,
            "enabledAction" : "element"
        },
        {
            "type" : "separator",
            "title" : "",
            "cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.REDO",
            "cssClass" : "editor-icon editor-icon-redo",
            "action" : "KISBPM.TOOLBAR.ACTIONS.redo",
            "enabled" : false
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.UNDO",
            "cssClass" : "editor-icon editor-icon-undo",
            "action" : "KISBPM.TOOLBAR.ACTIONS.undo",
            "enabled" : false
        },
        {
            "type" : "separator",
            "title" : "",
            "cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ALIGNVERTICAL",
            "cssClass" : "editor-icon editor-icon-align-vertical",
            "action" : "KISBPM.TOOLBAR.ACTIONS.alignHorizontal",
            "enabled" : false,
            "enabledAction" : "element",
            "minSelectionCount" : 2
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ALIGNHORIZONTAL",
            "cssClass" : "editor-icon editor-icon-align-horizontal",
            "action" : "KISBPM.TOOLBAR.ACTIONS.alignVertical",
            "enabledAction" : "element",
            "enabled" : false,
            "minSelectionCount" : 2
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.SAMESIZE",
            "cssClass" : "editor-icon editor-icon-same-size",
            "action" : "KISBPM.TOOLBAR.ACTIONS.sameSize",
            "enabledAction" : "element",
            "enabled" : false,
            "minSelectionCount" : 2
        },
        {
        	"type" : "separator",
        	"title" : "",
        	"cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMIN",
            "cssClass" : "editor-icon editor-icon-zoom-in",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomIn"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMOUT",
            "cssClass" : "editor-icon editor-icon-zoom-out",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomOut"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMACTUAL",
            "cssClass" : "editor-icon editor-icon-zoom-actual",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomActual"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMFIT",
            "cssClass" : "editor-icon editor-icon-zoom-fit",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomFit"
        },
        {
            "type" : "separator",
            "title" : "",
            "cssClass" : "toolbar-separator"
        },
    	{
            "type" : "button",
            "title" : "TOOLBAR.ACTION.BENDPOINT.ADD",
            "cssClass" : "editor-icon editor-icon-bendpoint-add",
            "action" : "KISBPM.TOOLBAR.ACTIONS.addBendPoint",
            "id" : "add-bendpoint-button"
    	},
    	{
    	    "type" : "button",
    	    "title" : "TOOLBAR.ACTION.BENDPOINT.REMOVE",
    	    "cssClass" : "editor-icon editor-icon-bendpoint-remove",
    	    "action" : "KISBPM.TOOLBAR.ACTIONS.removeBendPoint",
    	    "id" : "remove-bendpoint-button"
    	}
    ],

    "shrinkAndArrowItems" : [
      {
        "type" : "separator",
        "title" : "",
        "cssClass" : "toolbar-separator"
      },
      {
        "type" : "button",
        "title" : "向左扩展画幕",
        "cssClass" : "editor-icon editor-icon-chevron-left",
        "direction" : "canvas-shrink-W"
      },
      {
        "type" : "button",
        "title" : "向右扩展画幕",
        "cssClass" : "editor-icon editor-icon-chevron-right",
        "direction" : "canvas-shrink-E"
      },
      {
        "type" : "button",
        "title" : "向上扩展画幕",
        "cssClass" : "editor-icon editor-icon-chevron-up",
        "direction" : "canvas-shrink-N"
      },
      {
        "type" : "button",
        "title" : "向下扩展画幕",
        "cssClass" : "editor-icon editor-icon-chevron-down",
        "direction" : "canvas-shrink-S"
      },
      {
        "type" : "separator",
        "title" : "",
        "cssClass" : "toolbar-separator"
      },
      {
        "type" : "button",
        "title" : "向左收缩画幕",
        "cssClass" : "editor-icon editor-icon-arrow-left",
        "direction" : "canvas-grow-W"
      },
      {
        "type" : "button",
        "title" : "向右收缩画幕",
        "cssClass" : "editor-icon editor-icon-arrow-right",
        "direction" : "canvas-grow-E"
      },
      {
        "type" : "button",
        "title" : "向上收缩画幕",
        "cssClass" : "editor-icon editor-icon-arrow-up",
        "direction" : "canvas-grow-N"
      },
      {
        "type" : "button",
        "title" : "向下收缩画幕",
        "cssClass" : "editor-icon editor-icon-arrow-down",
        "direction" : "canvas-grow-S"
      }
    ],
    
    "secondaryItems" : [
		{
		    "type" : "button",
		    "title" : "Close",
		    "cssClass" : "editor-icon editor-icon-close",
		    "action" : "KISBPM.TOOLBAR.ACTIONS.closeEditor"
		}
    ]
};