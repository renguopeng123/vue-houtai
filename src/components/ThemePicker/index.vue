<template>
  <el-color-picker v-model="theme"
    :predefine="['#409EFF', '#2365A3', '#2E4E76','#5a5e66','#11a983', '#13c2c2', '#6959CD', '#7E1212', ]"
    class="theme-picker" popper-class="theme-picker-dropdown" />
</template>

<script>
  const version = require('element-ui/package.json').version // element-ui version from node_modules
  const ORIGINAL_THEME = '#409EFF' // default color
  import Cookies from 'js-cookie'
  import defaultSettings from '@/settings'

  const themeCookie = "theme";

  export default {
    data() {
      return {
        chalk: '', // content of theme-chalk css
        theme: defaultSettings.theme
      }
    },
    computed: {},
    mounted() {
      //首先从cookie中获取选择的颜色
      var themeColor = Cookies.get(themeCookie);
      if (themeColor) {
        this.theme = themeColor;
      }
    },
    watch: {
      //主要用于设置elementUI的主题色 以及记录cookie 以及更新store
      async theme(val) {
        const oldVal = this.chalk ? this.theme : ORIGINAL_THEME
        if (typeof val !== 'string') return
        const themeCluster = this.getThemeCluster(val.replace('#', ''))
        const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
        console.log(themeCluster, originalCluster)

        const $message = this.$message({
          message: '  Compiling the theme',
          customClass: 'theme-message',
          type: 'success',
          duration: 0,
          iconClass: 'el-icon-loading'
        })

        const getHandler = (variable, id) => {
          return () => {
            const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
            const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

            let styleTag = document.getElementById(id)
            if (!styleTag) {
              styleTag = document.createElement('style')
              styleTag.setAttribute('id', id)
              document.head.appendChild(styleTag)
            }
            styleTag.innerText = newStyle
          }
        }

        if (!this.chalk) {
          // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
          //这块版本需要根据当前的elementui对应
          const url = '/css/element-ui-2.10.1.css';
          await this.getCSSString(url, 'chalk')
        }

        const chalkHandler = getHandler('chalk', 'chalk-style')

        chalkHandler()

        const styles = [].slice.call(document.querySelectorAll('style'))
          .filter(style => {
            const text = style.innerText
            return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
          })
        styles.forEach(style => {
          const {
            innerText
          } = style
          if (typeof innerText !== 'string') return
          style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
        })

        //这里通过生成style标签修改标签页和loadingbar的颜色（主要用于不能直接通过监听store修改的样式）
        var cssText = ".tags-view-container .tags-view-wrapper .tags-view-item.active {background-color:" + val +
          "!important; border-color: " + val + "!important;} #nprogress .bar { background: " + val +
          "!important;} ";

        var styleID = "theme_view_style";
        var style = document.getElementById(styleID);

        if (style == null) {
          style = document.createElement("style");
          style.id = styleID;
          style.innerText = cssText;
          document.head.appendChild(style);
        } else {
          style.innerText = cssText;
        }

        //更新store
        if (this.$store) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'theme',
            value: val
          })
        }
        //记录到cookie中
        Cookies.set(themeCookie, val)
        //提交给父级的后续处理
        this.$emit('change', val)

        $message.close()
      }
    },

    methods: {
      updateStyle(style, oldCluster, newCluster) {
        let newStyle = style
        oldCluster.forEach((color, index) => {
          newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
        })
        return newStyle
      },

      getCSSString(url, variable) {
        return new Promise(resolve => {
          const xhr = new XMLHttpRequest()
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
              resolve()
            }
          }
          xhr.open('GET', url)
          xhr.send()
        })
      },

      getThemeCluster(theme) {
        const tintColor = (color, tint) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)

          if (tint === 0) { // when primary color is in its rgb space
            return [red, green, blue].join(',')
          } else {
            red += Math.round(tint * (255 - red))
            green += Math.round(tint * (255 - green))
            blue += Math.round(tint * (255 - blue))

            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)

            return `#${red}${green}${blue}`
          }
        }

        const shadeColor = (color, shade) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)

          red = Math.round((1 - shade) * red)
          green = Math.round((1 - shade) * green)
          blue = Math.round((1 - shade) * blue)

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }

        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
      }
    }
  }
</script>

<style>
  .theme-message,
  .theme-picker-dropdown {
    z-index: 99999 !important;
  }

  .theme-picker .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>