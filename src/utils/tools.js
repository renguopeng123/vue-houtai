export default {

    //颜色渐变计算
    getItemColors: function(color, colorLevel) {
        var colorRgb = this.colorRgb(color);

        var red = colorRgb[0],
            green = colorRgb[1],
            blue = colorRgb[2];

        red = parseInt(red - colorLevel);
        green = parseInt(green - colorLevel);
        blue = parseInt(blue - colorLevel);

        return ('rgb(' + red + ',' + green + ',' + blue + ')');;
    },

    //颜色渐变计算
    getItemColors2: function(color, colorLevel) {
        var colorRgb = this.colorRgb(color);

        var red = colorRgb[0],
            green = colorRgb[1],
            blue = colorRgb[2];

        red = parseInt(red + colorLevel);
        green = parseInt(green + colorLevel);
        blue = parseInt(blue + colorLevel);

        return ('rgb(' + red + ',' + green + ',' + blue + ')');;
    },

    reg: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
    /*RGB颜色转换为16进制*/
    colorHex: function(color) {
        var that = color;
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (this.reg.test(that)) {
            var aNum = that.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return that;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var n = 0; n < aNum.length; n += 1) {
                    numHex += (aNum[n] + aNum[n]);
                }
                return numHex;
            }
        } else {
            return that;
        }
    },

    /*16进制颜色转为RGB格式*/
    colorRgb: function(color) {
        var sColor = color.toLowerCase();
        if (sColor && this.reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var n = 1; n < 7; n += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(n, n + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    }

}