
1.搜索html 文件全文替换 
bpm/definition/start.html      全文替换成        bpm/vueForm/start.html
bpm/task/taskComplete.html      全文替换成        bpm/vueForm/complete.html
bpm/instance/instanceDetail.html  全文替换成        bpm/vueForm/instanceDetail.html

2.
屏蔽 业务表单菜单  改成   vue表单

3.禁用angular表单入口，启用vue表单入口
UPDATE `sys_resource` SET `ENABLE_`='0' WHERE (`ID_`='30'); 
UPDATE `sys_resource` SET `ENABLE_`='1' WHERE (`ID_`='33');
