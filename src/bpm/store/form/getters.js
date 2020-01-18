//对数据获取之前的再次编译，可以理解为state的计算属性。
const getters = {
    custComponentData: state => state.form.custComponentData,

}
export default getters