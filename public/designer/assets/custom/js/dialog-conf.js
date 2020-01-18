/**
 * 设置请求的前缀————只针对弹出框
 *
 * 因为 modeler 页面引用了 conf 的js，请求前缀被覆盖
 * 而弹出框页面一般只引用了 base.js，请求前缀没有域名
 * 前后端一起部署时没有问题，前后端分开或者微服务部署时，会导致不能切换，出现404
 *
 */
window.__ctx = "https://bpm.ecloud.work/ecloud-bpm-platform";