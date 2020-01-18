import * as joint from "jointjs";

joint.dia.Element.define('gwssi.customRec', {

  optionHeight: 30,
  questionHeight: 45,
  // paddingBottom: 30,
  minWidth: 200,
  attrs: {
    '.': {
      magnet: false
    },
    '.body': {
      refWidth: '100%',
      refHeight: '100%',
      fill: '#316896',
      // rx: '1%',
      // ry: '2%',
      stroke: 'none',
      // fill: {
      //   type: 'linearGradient',
      //   stops: [
      //     { offset: '0%', color: '#FEB663' },
      //     { offset: '100%', color: '#31D0C6' }
      //   ],
      //   // Top-to-bottom gradient.
      //   attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
      // }
    },
    '.checkbox-simulation': {
      cursor: 'pointer',
      event: 'element:checkboxClick',
      refX: '7%',
      fill: 'white',
      height: 15,
      width: 15,
      refY: 15,
    },
    '.image-db-status': {
      width: 15,
      height: 15,
      refY: 15,
      refX: '85%',
      xlinkHref: "./db.svg",
    },
    // '.btn-add-option': {
    //   refX: 10,
    //   refDy: -22,
    //   cursor: 'pointer',
    //   fill: 'white'
    // },
    // '.btn-remove-option': {
    //   xAlignment: 10,
    //   yAlignment: 13,
    //   cursor: 'pointer',
    //   fill: 'white'
    // },
    '.options': {
      refX: 0,
    },

    // Text styling.
    text: {
      fontFamily: 'Arial',
      magnet: true,
    },
    '.option-text-left': {
      fontSize: 11,
      fill: '#4b4a67',
      refX: 10,
      yAlignment: 'middle'
    },
    '.option-text-right': {
      fontSize: 11,
      fill: '#4b4a67',
      refX: '95%',
      yAlignment: 'middle',
      textAnchor: 'end',
    },
    '.question-text': {
      fill: 'white',
      refX: '20%',
      refY: 15,
      fontSize: 14,
      textAnchor: 'left',
      style: {
        textShadow: '1px 1px 0px gray'
      }
    },

    // Options styling.
    '.option-rect': {
      // rx: 3,
      // ry: 3,
      stroke: 'white',
      strokeWidth: 1,
      strokeOpacity: .7,
      fillOpacity: .9,
      fill: '#f6f6f6',
      refWidth: '100%'
    }
  }
}, {

  markup: '<rect class="body"/>' +
    '<text class="question-text"/>' +
    '<rect class="checkbox-simulation"></rect>' +
    '<image class="image-db-status"></image>' +
    '<g class="options"></g>',
  optionMarkup: '<g class="option"><rect class="option-rect"/>' +
    '<text class="option-text-left"/><text class="option-text-right"/></g>',

  initialize: function () {

    joint.dia.Element.prototype.initialize.apply(this, arguments);
    this.on('change:options', this.onChangeOptions, this);
    this.on('change:question', function () {
      this.attr('.question-text/text', this.get('question') || '');
      this.autoresize();
    }, this);

    this.on('change:questionHeight', function () {
      this.attr('.options/refY', this.get('questionHeight'), {silent: true});
      this.autoresize();
    }, this);

    this.on('change:optionHeight', this.autoresize, this);

    this.attr('.options/refY', this.get('questionHeight'), {silent: true});
    this.attr('.question-text/text', this.get('question'), {silent: true});

    this.onChangeOptions();
  },

  onChangeOptions: function () {

    var options = this.get('options');
    var optionHeight = this.get('optionHeight');

    // First clean up the previously set attrs for the old options object.
    // We mark every new attribute object with the `dynamic` flag set to `true`.
    // This is how we recognize previously set attributes.
    var attrs = this.get('attrs');
    _.each(attrs, function (attrs, selector) {

      if (attrs.dynamic) {
        // Remove silently because we're going to update `attrs`
        // later in this method anyway.
        this.removeAttr(selector, {silent: true});
      }
    }.bind(this));

    // Collect new attrs for the new options.
    var offsetY = 0;
    var attrsUpdate = {};
    var questionHeight = this.get('questionHeight');

    _.each(options, function (option) {

      var selector = '.option-' + option.id;

      attrsUpdate[selector] = {transform: 'translate(0, ' + offsetY + ')', dynamic: true};
      attrsUpdate[selector + ' .option-rect'] = {height: optionHeight, dynamic: true};
      attrsUpdate[selector + ' .option-text-left'] = {text: option.text_left, dynamic: true, refY: optionHeight / 2};
      attrsUpdate[selector + ' .option-text-right'] = {text: option.text_right, dynamic: true, refY: optionHeight / 2};

      offsetY += optionHeight;

      // var portY = offsetY - optionHeight / 2 + questionHeight;
      // if (!this.getPort(option.id)) {
      //   this.addPort({ group: 'out', id: option.id, args: { y: portY }});
      // } else {
      //   this.portProp(option.id, 'args/y', portY);
      // }
    }.bind(this));

    this.attr(attrsUpdate);
    this.autoresize();
  },

  autoresize: function () {

    var options = this.get('options') || [];
    // var gap = this.get('paddingBottom') || 20;
    var height = options.length * this.get('optionHeight') + this.get('questionHeight');// + gap;
    var width = joint.util.measureText(this.get('question'), {
      fontSize: this.attr('.question-text/fontSize')
    }).width;
    this.resize(Math.max(this.get('minWidth') || 150, width), height);
  },

  addOption: function (option) {

    var options = JSON.parse(JSON.stringify(this.get('options')));
    options.push(option);
    this.set('options', options);
  },

  removeOption: function (id) {

    var options = JSON.parse(JSON.stringify(this.get('options')));
    this.removePort(id);
    this.set('options', _.without(options, _.find(options, {id: id})));
  },

  changeOption: function (id, option) {

    if (!option.id) {
      option.id = id;
    }

    var options = JSON.parse(JSON.stringify(this.get('options')));
    options[_.findIndex(options, {id: id})] = option;
    this.set('options', options);
  }
});

joint.shapes.gwssi.customRecView = joint.dia.ElementView.extend({

  events: {
    // 'click .btn-add-option': 'onAddOption',
    // 'click .btn-remove-option': 'onRemoveOption'
  },

  presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
    options: ['OPTIONS']
  }),

  confirmUpdate: function (flags) {
    joint.dia.ElementView.prototype.confirmUpdate.apply(this, arguments);
    if (this.hasFlag(flags, 'OPTIONS')) this.renderOptions();
  },

  renderMarkup: function () {

    joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

    // A holder for all the options.
    this.$options = this.$('.options');
    // Create an SVG element representing one option. This element will
    // be cloned in order to create more options.
    this.elOption = joint.V(this.model.optionMarkup);

    this.renderOptions();
  },

  renderOptions: function () {

    this.$options.empty();

    _.each(this.model.get('options'), function (option, index) {

      var className = 'option-' + option.id;
      var elOption = this.elOption.clone().addClass(className);
      elOption.attr('option-id', option.id);
      this.$options.append(elOption.node);

    }.bind(this));

    // Apply `attrs` to the newly created SVG elements.
    this.update();
  },

  onAddOption: function () {

    this.model.addOption({
      id: _.uniqueId('option-'),
      text: 'Option ' + this.model.get('options').length
    });
  },

  onRemoveOption: function (evt) {

    this.model.removeOption(joint.V(evt.target.parentNode).attr('option-id'));
  }
});

// Utils

joint.util.measureText = function (text, attrs) {

  var fontSize = parseInt(attrs.fontSize, 10) || 10;

  var svgDocument = joint.V('svg').node;
  var textElement = joint.V('<text><tspan></tspan></text>').node;
  var textSpan = textElement.firstChild;
  var textNode = document.createTextNode('');

  textSpan.appendChild(textNode);
  svgDocument.appendChild(textElement);
  document.body.appendChild(svgDocument);

  var lines = text.split('\n');
  // var lines = ["123", "3456"];
  var width = 0;

  // Find the longest line width.
  _.each(lines, function (line) {

    textNode.data = line;
    var lineWidth = textSpan.getComputedTextLength();

    width = Math.max(width, lineWidth);
  });

  var height = lines.length * (fontSize * 1.2);

  joint.V(svgDocument).remove();

  return {width: width, height: height};
};
