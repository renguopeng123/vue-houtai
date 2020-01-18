//对数据获取之前的再次编译，可以理解为state的计算属性。
const getters = {
    user: state => state.settings.user,
    theme: state => state.settings.theme,
    pageObject: state => state.page.pageObject,
    editorState: state => state.page.editorState,
    editorSaved: state => state.page.editorSaved,
    businessColumn: state => state.component.businessColumn,
    activeComponent: state => state.component.activeComponent,
    editorColumn: state => state.component.editorColumn,
    componentPanel: state => state.component.componentPanel

}
export default getters