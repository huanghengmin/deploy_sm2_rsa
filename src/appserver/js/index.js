Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.BLANK_IMAGE_URL = './js/ext/resources/images/default/s.gif';
    Ext.form.Field.prototype.msgTarget = 'side';
    var cards = new Array();
    /************************************card0*****************************************************************************************/
    var card0 = new Ext.ux.Wiz.Card({
        title: '·系统部署',

        monitorValid: true,
        items: [
            {
                border: false,
                bodyStyle: 'background:none;',
                html: '<p align="center" style="font-size:15px;font-family:楷体_GB2312;font-weight:bolder;">欢迎来到系统部署界面</p><br/> '
            },
            {
                xtype: 'radiogroup',
                items: [
                    {id: 'deploy_1', boxLabel: '开始部署', name: 'deploy_start', inputValue: 1, checked: true}/*,
                     {id:'deploy_2',    boxLabel:'从备份中恢复',    name:'deploy_start',inputValue:2},
                     {id:'deploy_3',    boxLabel:'关机',     name:'deploy_start',     inputValue:3},
                     {id:'deploy_4',    boxLabel:'重启系统',name:'deploy_start',     inputValue:4}*/
                ]/*,
             listeners:{
             'change':function(group,checked){
             var value = checked.inputValue;
             if(value==1){
             wizard.nextButton.setDisabled(false);
             }else if(value == 2){
             wizard.nextButton.setDisabled(true);
             *//**
             * 还原操作，需要系统备份,如果没有备份提示未备份请先备份系统
             * -.还原到备份点
             * 1.解压ca_bak.tar.gz
             * 2.执行备份中的sql与ldap还原到备份点
             * 3.重启服务，完成还原操作
             * 二.还原到出厂设置
             * 1.解压ca.tar.gz
             * 2.执行ca.tar.gz中的sql与ldap脚本
             * 3.重启服务，还原到出厂设置
             *//*
             *//**
             * 备份流程
             * 1.备份ldap与mysql数据库脚本
             * 2.备份tar包到ca_bak.tar.gz
             *//*
             upgrade();
             }else if(value == 3){
             //关机
             wizard.nextButton.setDisabled(true);
             shutdown();
             } else if(value == 4 ){
             //重启
             wizard.nextButton.setDisabled(true);
             restart();
             }
             }
             }*/
            },
            {
                border: false, buttons: [
                /*{text: '<font color="blue">从备份中恢复</font>', handler: function () {
                 upgrade();
                 }},*/
                {
                    text: '关机', handler: function () {
                    shutdown();
                }
                },
                {
                    text: '重启系统', handler: function () {
                    restart();
                }
                }
            ]
            }
        ]
    });
    /************************************card0*****************************************************************************************/
    /************************************card1*****************************************************************************************/
    /*var card1 = new Ext.ux.Wiz.Card({
     title: '系统恢复·上传系统恢复包 ',
     labelAlign: 'right',
     labelWidth: 120,
     monitorValid: true,
     items: [
     {
     border: false,
     //            autoScroll:true,
     bodyStyle: 'background:none;',
     html: '<p align="center" style="font-size:15;font-family:楷体_GB2312;font-weight:bolder;">上传系统恢复包</p><br/> '
     },
     {
     xtype: 'fileuploadfield',//引入插件
     fieldLabel: '系统恢复包',
     //                allowBlank: false,
     anchor: '95%',
     name: 'file',
     id: 'uploadFile',
     buttonText: '浏览....',
     listeners: {
     'fileselected': function () {
     Ext.MessageBox.show({
     title: "信息",
     width: 250,
     msg: "是否上传系统恢复包?",
     icon: Ext.MessageBox.WARNING,
     buttons: {'ok': '确定', 'no': '取消'},
     fn: function (e) {
     if (e == 'ok') {
     var myMask = new Ext.LoadMask(Ext.getBody(), {
     msg: '正在上传,请稍后...',
     removeMask: true //完成后移除
     });
     myMask.show();
     Ext.Ajax.request({
     url: 'BakAction_upload_bak.action',
     method: 'POST',
     success: function (r, o) {
     myMask.hide();
     var respText = Ext.util.JSON.decode(r.responseText);
     var msg = respText.msg;
     Ext.MessageBox.show({
     title: "信息",
     msg: msg,
     buttons: {'ok': '确定'}
     });
     }
     });
     }
     }
     });
     }
     }
     }
     ]
     })*/
    /************************************card1*****************************************************************************************/
    /************************************card2*****************************************************************************************/
    var card2 = new Ext.ux.Wiz.Card({
        title: '部署流程·许可协议',
//      monitorValid:true,
        labelAlign: 'right',
        labelWidth: 120,
        items: [
            {
                autoScroll: true,
                height: 200,
                border: false,
                bodyStyle: 'background:none;',
                html: '<p align="center" style="font-size:15;font-family:楷体_GB2312;font-weight:bolder;">用户使用许可协议</p><br/> ' +
                '<p align="center" style="font-size:15;font-family:楷体_GB2312;"><br/>' +
                '<p>一、软件使用协议</br></p>' +
                '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议是用户 (自然人、法人或社会团体)与本公司之间关于"CA"软件产品(以下简称"CA软件产品")的法律协议。一旦安装、复制或以其他方式使用CA软件产品,即表示同意接受协议各项条件的约束。如果用户不同意协议的条件,请不要使用CA软件产品。</p></br>' +
                '<p>二、软件产品保护条款</p></br>' +
                '<p>(1).CA软件产品之著作权及其它知识产权等相关权利或利益(包括但不限于现已取得或未来可取得之著作权、专利权、商标权、营业秘密等)皆为本公司所有。CA软件产品受中华人民共和国版权法及国际版权条约和其他知识产权法及条约的保护。用户仅获得CA软件产品的非排他性使用权。</p>' +
                '<p>(2).用户不得：删除CA软件及其他副本上一切关于版权的信息；对CA软件进行反向工程,如反汇编、反编译等; </br>' +
                '<p>(3).CA软件产品以现状方式提供,本公司不保证CA软件产品能够或不能够完全满足用户需求,在用户手册、帮助文件、使用说明书等软件文档中的介绍性内容仅供用户参考,不得理解为对用户所做的任何承诺。本公司保留对软件版本进行升级,对功能、内容、结构、界面、运行方式等进行修改或自动更新的权利。</p>' +
                '<p>(4).为了更好地服务于用户,或为了向用户提供具有个性的信息内容的需要,CA软件产品可能会收集、传播某些信息,但本公司承诺不向未经授权的第三方提供此类信息,以保护用户隐私。</p>' +
                '<p>(5).使用CA软件产品由用户自己承担风险,在适用法律允许的最大范围内,本公司在任何情况下不就因使用或不能使用CA软件产品所发生的特殊的、意外的、非直接或间接的损失承担赔偿责任。即使已事先被告知该损害发生的可能性。 </p>' +
                '<p>(6).本公司定义的信息内容包括：文字、软件、声音；本公司为用户提供的商业信息,所有这些内容受版权、商标权、和其它知识产权和所有权法律的保护。所以,用户只能在本公司授权下才能使用这些内容,而不能擅自复制、修改、编撰这些内容、或创造与内容有关的衍生产品。</p>' +
                '<p>(7).如果您未遵守本协议的任何一项条款,本公司有权立即终止本协议,并保留通过法律手段追究责任。</p></br>' +
                '<p>三、软件解释权条款</br></p>' +
                '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司具有对以上各项条款内容的最终解释权和修改权。如用户对本公司的解释或修改有异议,应当立即停止使用CA软件产品。用户继续使用CA软件产品的行为将被视为对本公司的解释或修改的接受。</p></br>' +
                '<p>四、软件纠纷条款</br></p>' +
                '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因本协议所发生的纠纷,双方同意按照中华人民共和国法律,由本公司所在地的有管辖权的法院管辖。</p></br>' +
                '</p>'
            },
            {
                xtype: 'checkbox',
                fieldLabel: '同意',
                allowBlank: false,
                anchor: '95%',
                id: 'deploy_access',
                checked: true,
                listeners: {
                    check: function (obj, ischecked) {
                        if (ischecked) {
                            wizard.nextButton.setDisabled(false);
                        } else {
                            wizard.nextButton.setDisabled(true);
                        }
                    }
                }
            }
        ]
    })
    /************************************card2*****************************************************************************************/
    /************************************card3*****************************************************************************************/
    Ext.apply(Ext.form.VTypes, {
        password: function (val, field) {
            if (field.confirmTo) {
                var pwd = Ext.get(field.confirmTo);
                if (val.trim() == pwd.getValue().trim()) {
                    return true;
                } else {
                    return false;
                }
                return false;
            }
        }
    });

    var card3 = new Ext.ux.Wiz.Card({
        title: '系统部署·系统密码设置',
        labelAlign: 'right',
        labelWidth: 120,
        monitorValid: true,
        items: [
            {
                xtype: 'fieldset',
                autoScroll: true,
                title: '系统密码设置(默认123456)',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        hidden: true,
                        allowBlank: false,
                        id: 'pass_hidden'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '输入系统密码',
                        name: 'operatorNewPass',
                        id: 'p_NewPassword',
                        anchor: '95%',
                        value:'123456',
                        minLength: 6,
                        minLengthText: '密码长度最少6位！',
                        maxLength: 20,
                        maxLengthText: '密码长度最多20位！',
                        inputType: 'password',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '确认系统密码',
                        name: 'operatorConPass',
                        id: 'p_ConfirmPassword',
                        value:'123456',
                        anchor: '95%',
                        inputType: 'password',
                        vtype: 'password',
                        vtypeText: "两次输入密码不一致！",
                        confirmTo: 'p_NewPassword',
                        allowBlank: false
                    }
                ],
                buttons: ['->', {
                    text: '保存配置',
                    handler: function () {
                        Ext.getCmp("pass_hidden").reset();
                        var p_NewPassword = Ext.getCmp("p_NewPassword").getValue();
                        var passwd = hex_md5(p_NewPassword).toUpperCase();
                        Ext.Ajax.request({
                            url: 'SystemAction_save.action',
                            params: {
                                passwd: passwd
                            },
                            method: 'POST',
                            success: function (r, o) {
                                var respText = Ext.util.JSON.decode(r.responseText);
                                var msg = respText.msg;
                                if (respText.success == true) {
                                    Ext.MessageBox.show({
                                        title: '信息',
                                        width: 250,
                                        msg: msg,
                                        buttons: Ext.MessageBox.OK,
                                        buttons: {'ok': '确定'},
                                        icon: Ext.MessageBox.INFO,
                                        closable: false
                                    });
                                    Ext.getCmp("pass_hidden").setValue("hidden");
                                } else {
                                    Ext.MessageBox.show({
                                        title: '信息',
                                        width: 250,
                                        msg: msg,
                                        buttons: Ext.MessageBox.OK,
                                        buttons: {'ok': '确定'},
                                        icon: Ext.MessageBox.INFO,
                                        closable: false
                                    });
                                }
                            },
                            failure: function (r, o) {
                                var respText = Ext.util.JSON.decode(r.responseText);
                                var msg = respText.msg;
                                Ext.MessageBox.show({
                                    title: '信息',
                                    width: 250,
                                    msg: msg,
                                    buttons: Ext.MessageBox.OK,
                                    buttons: {'ok': '确定'},
                                    icon: Ext.MessageBox.INFO,
                                    closable: false
                                });
                            }
                        });
                    }
                }]
            }
        ]
    })
    /************************************card3*****************************************************************************************/
    /************************************card4*****************************************************************************************/
    var card4 = new Ext.ux.Wiz.Card({
        title: '系统部署·LDAP发布参数',
        labelWidth: 120,
        monitorValid: true,
        labelAlign: 'right',
        items: [
            {
                xtype: 'fieldset',
                autoScroll: true,
                title: 'LDAP发布参数',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        hidden: true,
                        allowBlank: false,
                        id: 'ldap_hidden'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: '启用内置LDAP',
                        allowBlank: false,
                        anchor: '95%',
                        id: 'check_allowLDAP',
                        checked: true,
                        listeners: {
                            check: function (obj, ischecked) {
                                if (ischecked) {
                                    var LDAP_ip = Ext.getCmp('LDAP_ip');
                                    LDAP_ip.reset();
                                   LDAP_ip.setDisabled(true);
                                    var LDAP_port = Ext.getCmp('LDAP_port');
                                    LDAP_port.reset();
                                   LDAP_port.setDisabled(true);
                                    var LDAP_baseDN = Ext.getCmp('LDAP_baseDN');
                                    LDAP_baseDN.reset();
                                   LDAP_baseDN.setDisabled(true);
                                    var LDAP_loginDN = Ext.getCmp('LDAP_loginDN');
                                    LDAP_loginDN.reset();
                                   LDAP_loginDN.setDisabled(true);
                                    var LDAP_loginPASS = Ext.getCmp('LDAP_loginPASS');
                                    LDAP_loginPASS.reset();
                                   LDAP_loginPASS.setDisabled(true);
//                                var LDAP_loginNUM = Ext.getCmp('LDAP_loginNUM');
//                                LDAP_loginNUM.reset();
//                                LDAP_loginNUM.setDisabled(true);
                                } else {
                                    Ext.getCmp('LDAP_ip').setDisabled(false);
                                    Ext.getCmp('LDAP_port').setDisabled(false);
                                    Ext.getCmp('LDAP_baseDN').setDisabled(false);
                                    Ext.getCmp('LDAP_loginDN').setDisabled(false);
                                    Ext.getCmp('LDAP_loginPASS').setDisabled(false);
//                                Ext.getCmp('LDAP_loginNUM').setDisabled(false);
                                }
                            }/*,*/
//                            render:function () {
//                                Ext.getCmp('check_allowLDAP').setDisabled(true);
//                                Ext.getCmp('LDAP_ip').setDisabled(true);
//                                Ext.getCmp('LDAP_port').setDisabled(true);
//                                Ext.getCmp('LDAP_baseDN').setDisabled(true);
//                                Ext.getCmp('LDAP_loginDN').setDisabled(true);
//                                Ext.getCmp('LDAP_loginPASS').setDisabled(true);
//                            Ext.getCmp('LDAP_loginNUM').setDisabled(true);
//                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'LDAP服务器IP',
                        value: '127.0.0.1',
                        allowBlank: false,
                        anchor: '95%',
                        disabled:true,
                        id: 'LDAP_ip'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'LDAP服务器端口',
                        allowBlank: false,
                        value: 389,
                        anchor: '95%',
                        disabled:true,
                        id: 'LDAP_port'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '发布DN',
                        value: 'dc=pkica',
                        allowBlank: false,
                        disabled:true,
                        anchor: '95%',
                        id: 'LDAP_baseDN'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '登陆DN',
                        disabled:true,
                        value: "cn=admin,dc=pkica",
                        allowBlank: false,
                        anchor: '95%',
                        id: 'LDAP_loginDN'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '登陆密码',
                        disabled:true,
                        value: '123456',
                        inputType: 'password',
                        allowBlank: false,
                        anchor: '95%',
                        id: 'LDAP_loginPASS'
                    }/* ,{
                     xtype: 'textfield',
                     fieldLabel: 'LDAP最大连接数',
                     allowBlank: false,
                     anchor: '95%',
                     value:5,
                     id: 'LDAP_loginNUM'
                     }*/
                ], buttons: ['->', {
                text: 'LDAP连通性校验',
                handler: function () {
                    Ext.getCmp("ldap_hidden").reset();
                    var LDAP_ip = Ext.getCmp("LDAP_ip").getValue();
                    var LDAP_port = Ext.getCmp("LDAP_port").getValue();
                    var LDAP_baseDN = Ext.getCmp("LDAP_baseDN").getValue();
                    var LDAP_loginDN = Ext.getCmp("LDAP_loginDN").getValue();
                    var LDAP_loginPASS = Ext.getCmp("LDAP_loginPASS").getValue();
                    Ext.Ajax.request({
                        url: 'LdapConfigAction_ldapConnections.action',
                        params: {
                            host: LDAP_ip,
                            port: LDAP_port,
                            base: LDAP_baseDN,
                            adm: LDAP_loginDN,
                            pwd: LDAP_loginPASS
                        },
                        method: 'POST',
                        success: function (r, o) {
                            var respText = Ext.util.JSON.decode(r.responseText);
                            var msg = respText.msg;
                            if (respText.success == true) {
                                Ext.MessageBox.show({
                                    title: '信息',
                                    width: 250,
                                    msg: msg,
                                    buttons: Ext.MessageBox.OK,
                                    buttons: {'ok': '确定'},
                                    icon: Ext.MessageBox.INFO,
                                    closable: false
                                });
                                Ext.getCmp("ldap_hidden").setValue('hidden');
                            } else {
                                Ext.MessageBox.show({
                                    title: '信息',
                                    width: 250,
                                    msg: msg,
                                    buttons: Ext.MessageBox.OK,
                                    buttons: {'ok': '确定'},
                                    icon: Ext.MessageBox.INFO,
                                    closable: false
                                });
                            }
                        },
                        failure: function (r, o) {
                            var respText = Ext.util.JSON.decode(r.responseText);
                            var msg = respText.msg;
                            Ext.MessageBox.show({
                                title: '信息',
                                width: 250,
                                msg: msg,
                                buttons: Ext.MessageBox.OK,
                                buttons: {'ok': '确定'},
                                icon: Ext.MessageBox.INFO,
                                closable: false
                            });
                        }
                    });
                }
            }]
            }

        ]
    })
    /************************************card4*****************************************************************************************/
    /************************************card5*****************************************************************************************/
    /* var card5 = new Ext.ux.Wiz.Card({
     title : '部署流程·签发管理根CA',
     monitorValid:true,
     labelWidth:120,
     labelAlign:'right',
     items : [{
     xtype:'fieldset',
     autoScroll:true,
     border:false,
     title:'服务器当前时间配置',
     //        collapsible:true,
     items:[
     new Ext.ux.form.DateTimeField({
     id:'time',
     fieldLabel: '时间',
     name:'date_time',
     anchor: '95%',
     value:new Date(),
     listeners:{

     }
     })
     ]
     },{
     xtype:'fieldset',
     autoScroll:true,
     title:'CA基本信息',
     border:false,
     //        collapsible:true,
     items:[
     {
     xtype: 'textfield',
     fieldLabel: '通用名',
     value:'adminCA',
     allowBlank: false,
     anchor: '95%',
     id: 'adminCA',
     checked:true
     },{
     xtype: 'textfield',
     fieldLabel: '有效期',
     value:3650,
     editable:false,
     readOnly:true,
     allowBlank: false,
     anchor: '95%',
     id: 'adminCA_validaty',
     checked:true
     }
     ]
     }
     ]
     })*/
    /************************************card5*****************************************************************************************/
    /************************************card6*****************************************************************************************/
    /* var card6 = new Ext.ux.Wiz.Card({
     title : '部署流程·签发管理根CA',
     labelWidth:120,
     monitorValid:true,
     labelAlign:'right',
     items : [
     {
     xtype:'fieldset',
     autoScroll:true,
     title: '管理根CA',
     border:false,
     //            border:true,
     items:[
     {
     xtype: 'textarea',
     autoScroll:true,
     height:120,
     fieldLabel:'信息',
     allowBlank: false,
     anchor: '95%',
     id: 'adminCAText'
     }
     ],  buttons:[
     {
     xtype: 'button',
     text:'保存到文件',
     id: 'saveToFile'
     }
     ]
     }
     ]
     })*/
    /************************************card6*****************************************************************************************/
    /************************************card7*****************************************************************************************/
    /* var card7 = new Ext.ux.Wiz.Card({
     title : '部署流程·签发系统站点证书',
     labelWidth:120,
     monitorValid:true,
     labelAlign:'right',
     items : [
     {
     xtype:'fieldset',
     autoScroll:true,
     title: '站点证书信息',
     border:false,
     items:[
     {
     xtype: 'textfield',
     fieldLabel: '域名',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_domain'
     },  {
     xtype: 'textfield',
     fieldLabel: 'IP',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_ip'
     },  {
     xtype: 'textfield',
     fieldLabel: '国家',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_CN'
     },  {
     xtype: 'textfield',
     fieldLabel: '省名',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_province'
     },  {
     xtype: 'textfield',
     fieldLabel: '市名',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_city'
     },  {
     xtype: 'textfield',
     fieldLabel: '组织',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_organization'
     },  {
     xtype: 'textfield',
     fieldLabel: '机构',
     allowBlank: false,
     anchor: '95%',
     id: 'pkiCA_institution'
     }
     ]
     }
     ]
     })*/
    /************************************card7*****************************************************************************************/
    /************************************card8*****************************************************************************************/
    /*var card8 = new Ext.ux.Wiz.Card({
     title : '部署流程·签发第一张管理员证书',
     labelWidth:120,
     monitorValid:true,
     labelAlign:'right',
     items : [
     {
     xtype:'fieldset',
     autoScroll:true,
     title: '签发第一张管理员证书',
     border:false,
     items:[
     {
     xtype: 'textfield',
     fieldLabel: '姓名',
     allowBlank: false,
     anchor: '95%',
     id: 'firstAdmin_name'
     },  {
     xtype: 'textfield',
     fieldLabel: '组织',
     allowBlank: false,
     anchor: '95%',
     id: 'firstAdmin_organization'
     },  {
     xtype: 'textfield',
     fieldLabel: '机构',
     allowBlank: false,
     anchor: '95%',
     id: 'firstAdmin_institution'
     },  {
     xtype: 'textfield',
     fieldLabel: '电子邮件',
     allowBlank: false,
     anchor: '95%',
     id: 'firstAdmin_email'
     },  {
     xtype: 'fieldset',
     title: '证书设备',
     border:false,
     items:[{
     fieldLabel: 'CSP加密设备',
     allowBlank: false,
     xtype: 'combo',
     anchor: '95%',
     id: 'firstAdmin_csp'
     }]
     }


     ]
     }
     ]
     })*/
    /************************************card8*****************************************************************************************/
    /************************************card9*****************************************************************************************/
    /* var card9 = new Ext.ux.Wiz.Card({
     title : '部署流程·签发备份管理员证书',
     labelWidth:120,
     monitorValid:true,
     labelAlign:'right',
     items : [
     {
     xtype:'fieldset',
     autoScroll:true,
     title: '签发备份管理员证书',
     border:false,
     items:[
     {
     xtype: 'textfield',
     fieldLabel: '姓名',
     allowBlank: false,
     anchor: '95%',
     id: 'bakAdmin_name'
     },  {
     xtype: 'textfield',
     fieldLabel: '组织',
     allowBlank: false,
     anchor: '95%',
     id: 'bakAdmin_organization'
     },  {
     xtype: 'textfield',
     fieldLabel: '机构',
     allowBlank: false,
     anchor: '95%',
     id: 'bakAdmin_institution'
     },  {
     xtype: 'textfield',
     fieldLabel: '电子邮件',
     allowBlank: false,
     anchor: '95%',
     id: 'bakAdmin_email'
     },  {
     xtype: 'fieldset',
     title: '证书设备',
     border:false,
     items:[{
     fieldLabel: 'CSP加密设备',
     allowBlank: false,
     xtype: 'combo',
     anchor: '95%',
     id: 'bakAdmin_csp'
     }]
     }


     ]
     }
     ]
     })*/
    /************************************card9*****************************************************************************************/
    /************************************card10*****************************************************************************************/
    var province_store = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            fields: ["id", "districtName"],
            totalProperty: 'totalCount',
            root: 'root'
        })
    });

    /*   var city_store = new Ext.data.Store({
     reader: new Ext.data.JsonReader({
     fields: ["id", "districtName"],
     totalProperty: 'totalCount',
     root: 'root'
     })
     });*/

    var rsa_keyBits = [
        ['1024', '1024 bits']/*,
        ['2048', '2048 bits'],
        ['4096', '4096 bits']*/
    ];

    var sm2_keyBits = [
        ['256', '256 bits']
    ];

    var card10 = new Ext.ux.Wiz.Card({
        title: '部署流程·签发CA',
        labelWidth: 100,
        monitorValid: true,
        labelAlign: 'right',
        autoScroll: true,
        buttonAlign: 'center',
        items: [
            {
                xtype: 'fieldset',
                title: '证书类型',
                anchor: '95%',
                buttonAlign: 'center', //居中
                border: false,
                items: [
                    {
                        id:"certType",
                        xtype: 'radiogroup',
                        items: [
                            {boxLabel: 'RSA', name: 'certType', inputValue: 'rsa', checked: true},
                            {boxLabel: 'SM2', name: 'certType', inputValue: 'sm2'}
                        ],
                     listeners: {
                         'change': function (group, checked) {
                             var value = checked.inputValue;
                             if (value == "rsa") {
                                 var cmp = Ext.getCmp("userCA_keyLength");
                                 cmp.reset();
                                 var store =cmp .getStore();
                                 store.loadData(rsa_keyBits);
                                 store.reload();
                             } else if (value == "sm2") {
                                 var cmp = Ext.getCmp("userCA_keyLength");
                                 cmp.reset();
                                 var store =cmp .getStore();
                                 store.loadData(sm2_keyBits);
                                 store.reload();
                             }
                         }
                     }
                    }]
            },
            {
                xtype: 'fieldset',
                title: '基本信息',
                buttonAlign: 'center', //居中
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        height:1,
                        hidden: true,
                        allowBlank: false,
                        id: 'userCA_hidden'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '通用名',
                        value: 'CA',
//                        readOnly:true,
                        maxLength:50,
                        blankText:"请输入通用名",
                        maxLengthText:"输入长度超出限制",
                        allowBlank: false,
                        anchor: '95%',
                        name: 'cn',
                        id: 'userCA_cn'
                    },
                    new Ext.form.ComboBox({
                        mode: 'remote',// 指定数据加载方式，如果直接从客户端加载则为local，如果从服务器断加载// 则为remote.默认值为：remote
                        border: true,
                        frame: true,
                        anchor: '95%',
                        pageSize: 10,// 当元素加载的时候，如果返回的数据为多页，则会在下拉列表框下面显示一个分页工具栏，该属性指定每页的大小
                        // 在点击分页导航按钮时，将会作为start及limit参数传递给服务端，默认值为0，只有在mode='remote'的时候才能够使用
                        editable: false,
                        fieldLabel: '省/行政区',
                        emptyText: '请选择所在省/行政区',
                        id: 'userCA_province',
//                hiddenName : 'x509Ca.province',
                        triggerAction: "all",// 是否开启自动查询功能
                        store: province_store,// 定义数据源
                        valueField: "districtName", // 关联某一个逻辑列名作为显示值
                        displayField: "districtName", // 关联某一个逻辑列名作为显示值
//                valueField: "id", // 关联某一个逻辑列名作为实际值
                        //mode : "local",// 如果数据来自本地用local 如果来自远程用remote默认为remote
                        allowBlank: false,
                        blankText: "请选择所在省/行政区",
                        listeners: {
                            /* select: function () {
                             var value = this.getValue();
                             city_store.proxy = new Ext.data.HttpProxy({
                             url: "../../DistrictAction_findCity.action?parentId=" + value
                             })
                             city_store.load();
                             },*/
                            render: function () {
                                province_store.proxy = new Ext.data.HttpProxy({
                                    url: '../../DistrictAction_findProvince.action',
                                    method: "POST"
                                })
                            }
                        }
                    }),
                    /*new Ext.form.ComboBox({
                     mode: 'remote',// 指定数据加载方式，如果直接从客户端加载则为local，如果从服务器断加载// 则为remote.默认值为：remote
                     border: true,
                     frame: true,
                     pageSize: 10,// 当元素加载的时候，如果返回的数据为多页，则会在下拉列表框下面显示一个分页工具栏，该属性指定每页的大小
                     // 在点击分页导航按钮时，将会作为start及limit参数传递给服务端，默认值为0，只有在mode='remote'的时候才能够使用
                     editable: false,
                     fieldLabel: '城市/乡镇',
                     emptyText: '请选择所在城市/乡镇',
                     id: 'x509Ca.msg.city',
                     //                hiddenName: 'x509Ca.orgCode',
                     triggerAction: "all",// 是否开启自动查询功能
                     store: city_store,// 定义数据源
                     displayField: "districtName", // 关联某一个逻辑列名作为显示值
                     valueField: "id", // 关联某一个逻辑列名作为实际值
                     //mode : "local",// 如果数据来自本地用local 如果来自远程用remote默认为remote
                     name: 'x509Ca.city',
                     //                hiddenName: 'x509Ca.city',
                     allowBlank: false,
                     blankText: "请选择所在城市/乡镇"
                     }),*/
                    new Ext.form.TextField({
                        fieldLabel: '城市/乡镇',
                        anchor: '95%',
                        emptyText: "请输入所在城市/乡镇",
                        regex: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                        regexText: '只能输入数字,字母,中文!',
                        id: 'userCA_city',
                        allowBlank: false,
                        blankText: "不能为空，请正确填写所在城市/乡镇"
                    }),
                    new Ext.form.ComboBox({
                        fieldLabel: '密钥位数',
                        emptyText: '请选择密钥位数',
                        anchor: '95%',
                        typeAhead: true,
                        triggerAction: 'all',
                        forceSelection: true,
                        id: "userCA_keyLength",
                        mode: 'local',
                        hiddenName: "x509Ca.keyLength",
                        store: new Ext.data.ArrayStore({
                            fields: [
                                'id',
                                'name'
                            ],
                            data: rsa_keyBits
                        }),
                        valueField: 'id', //下拉框具体的值（例如值为SM，则显示的内容即为‘短信’）
                        displayField: 'name'//下拉框显示内容
                    }),
                    {
                        xtype: 'textfield',
                        fieldLabel: '有效期(天)',
                        allowBlank: false,
                        enable: false,
                        value: 36500,
                        anchor: '95%',
                        id: 'userCA_validaty',
                        listeners: {
                            render: function () {
                                Ext.getCmp('userCA_validaty').setDisabled(true);
                            }
                        }
                    }
                    /* {
                     xtype:'fieldset',
                     anchor: '95%',
                     //                        title:'时间范围',
                     items:[{
                     plain:true,
                     border:false,
                     layout: 'form',
                     items:[{
                     plain:true,
                     labelWidth:0,
                     labelAlign:'right',
                     defaultType:'textfield',
                     border:false,
                     layout: 'form',
                     defaults:{
                     allowBlank:false,
                     blankText:'该项不能为空！'
                     },
                     items:[{
                     fieldLabel:'有效期',
                     name:'account.title',
                     regex:/^.{2,30}$/,
                     anchor: '95%',
                     regexText:'请输入任意2--30个字符',
                     emptyText:'请输入任意2--30个字符'
                     },{
                     fieldLabel:'单位',
                     xtype:'combo',
                     anchor: '95%',
                     typeAhead: true,
                     triggerAction: 'all',
                     forceSelection: true,
                     mode: 'local',
                     hiddenName:"day",
                     store: dayBits,
                     valueField: 'id',   //下拉框具体的值（例如值为SM，则显示的内容即为‘短信’）
                     displayField: 'name'//下拉框显示内容
                     }]
                     }]
                     }]
                     }*/
                ], buttons: ['->',
                {
                    xtype: 'button',
                    text: '签发证书',
                    id: 'sign_localCA',
                    handler: function () {
                        Ext.getCmp('userCA_hidden').reset();
                        var cn = Ext.getCmp('userCA_cn').getValue();
                        var province = Ext.getCmp('userCA_province').getValue();
                        var city = Ext.getCmp("userCA_city").getValue();
                        var bit = Ext.getCmp("userCA_keyLength").getValue();
                        var validaty = Ext.getCmp('userCA_validaty').getValue();
                        var certType = Ext.getCmp('certType').getValue().getGroupValue();
                        var base = Ext.getCmp("LDAP_baseDN").getValue();
                        var host = Ext.getCmp("LDAP_ip").getValue();
                        var port = Ext.getCmp("LDAP_port").getValue();
                        var adm = Ext.getCmp("LDAP_loginDN").getValue();
                        var pwd = Ext.getCmp("LDAP_loginPASS").getValue();
                        Ext.MessageBox.show({
                            title: "信息",
                            width: 250,
                            msg: "确定信息无误,确定后将签发CA证书?",
                            icon: Ext.MessageBox.WARNING,
                            buttons: {'ok': '确定', 'no': '取消'},
                            fn: function (e) {
                                if (e == 'ok') {
                                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                                        msg: '签发中,请等待...',
                                        removeMask: true //完成后移除
                                    });
                                    myMask.show();
                                    Ext.Ajax.request({
                                        timeout: 1000 * 60 * 5,
                                        url: 'X509CaAction_selfSign.action',
                                        params: {
                                            cn: cn, province: province, city: city, bit: bit,certType:certType,
                                            validaty: validaty, base: base, host: host, port: port, adm: adm, pwd: pwd
                                        },
                                        method: 'POST',
                                        success: function (r, o) {
                                            myMask.hide();
                                            var respText = Ext.util.JSON.decode(r.responseText);
                                            var msg = respText.msg;
                                            if (respText.success == true) {//如果你处理的JSON串中true不是字符串，就obj.success == true
                                                //你后台返回success 为 false时执行的代码
                                                Ext.MessageBox.show({
                                                    title: '信息',
                                                    width: 250,
                                                    msg: msg,
                                                    buttons: Ext.MessageBox.OK,
                                                    buttons: {'ok': '确定'},
                                                    icon: Ext.MessageBox.INFO,
                                                    closable: false
                                                });
                                                Ext.getCmp('userCA_hidden').setValue('hidden');
                                            } else {
                                                //你后台返回success 为 false时执行的代码
                                                Ext.MessageBox.show({
                                                    title: '信息',
                                                    width: 250,
                                                    msg: msg,
                                                    buttons: Ext.MessageBox.OK,
                                                    buttons: {'ok': '确定'},
                                                    icon: Ext.MessageBox.INFO,
                                                    closable: false
                                                });
                                                //你后台返回success 为 false时执行的代码
                                            }
                                        },
                                        failure: function (r, o) {
                                            myMask.hide();
                                            var respText = Ext.util.JSON.decode(r.responseText);
                                            var msg = respText.msg;
                                            Ext.MessageBox.show({
                                                title: '信息',
                                                width: 250,
                                                msg: msg,
                                                buttons: Ext.MessageBox.OK,
                                                buttons: {'ok': '确定'},
                                                icon: Ext.MessageBox.INFO,
                                                closable: false
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }/*, {
                 xtype: 'button',
                 text:'签发分发式CA',
                 id: 'sign_splitCA'
                 }*/
            ]
            }
        ]
    })
    /************************************card10*****************************************************************************************/
    /************************************card11*****************************************************************************************/
    /*var card11 = new Ext.ux.Wiz.Card({
     title : '部署流程·导出CA部署码',
     labelWidth:120,
     monitorValid:true,
     labelAlign:'right',
     items : [
     {
     xtype:'fieldset',
     autoScroll:true,
     title: '用户根CA',
     border:false,
     //            border:true,
     items:[
     {
     xtype: 'textarea',
     autoScroll:true,
     height:120,
     fieldLabel:'信息',
     allowBlank: false,
     anchor: '95%',
     id: 'userCAText'
     }
     ],  buttons:['->',
     {
     xtype: 'button',
     text:'保存到文件',
     id: 'saveUserCAToFile'
     }
     ]
     }
     ]
     })*/
    /************************************card11*****************************************************************************************/
    /************************************card12*****************************************************************************************/
    var card12 = new Ext.ux.Wiz.Card({
        title: '部署流程·完成部署',
        labelWidth: 120,
        labelAlign: 'right',
        monitorValid: true,
        items: [
            {
                xtype: 'fieldset',
                autoScroll: true,
                title: '完成部署',
                border: false,
                buttonAlign: 'right',
//            border: true,
                items: [

                    {
                        border: false,
                        bodyStyle: 'background:none;',
                        html: '<p style="text-align: center;" >部署已经完成,请点击"完成"按钮.确认部署完成!</p><br/> '
                    }
                ]/*,buttons:[
             {
             xtype: 'button',
             text: '<p align="center"  style="color: #0000ff;">部署完成</p>',
             id: 'end_deploy'
             }]*/
            }
        ]
    })
    /************************************card12*****************************************************************************************/
    /************************************card13*****************************************************************************************/
    /*var card13 = new Ext.ux.Wiz.Card({
     title: '部署流程·部署完成',
     labelWidth: 120,
     monitorValid:true,
     labelAlign: 'right',
     items: [
     {
     xtype: 'fieldset',
     title: '部署完成',
     autoScroll: true,
     border:false,
     buttonAlign: 'center',
     //            border: true,
     items: [

     {
     border: false,
     bodyStyle: 'background:none;',
     html: '<p align="left" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证书认证系统部署完成,请点击下面的按钮重启服务器,等待服务器启动完毕,</br>' +
     '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根椐用户手册提供的管理员访问网口地址,使用https协议进行访问.</p><br/> '
     }
     ],buttons:[
     {
     height:30,
     width:100,
     xtype: 'button',
     text: '<p align="center"  style="font-size: 18;color: #0000ff;font-weight:bolder;">重启系统</p>',
     id: 'saveUserCA'
     }]}
     ]
     })*/
    /************************************card13*****************************************************************************************/

    cards.push(card0);
//    cards.push(card1);
    cards.push(card2);
   cards.push(card3);
    cards.push(card4);
//    cards.push(card5);
//    cards.push(card6);
//    cards.push(card7);
//    cards.push(card8);
//    cards.push(card9);
    cards.push(card10);
//    cards.push(card11);
    cards.push(card12);
//    cards.push(card13);
    //部署主界面

    var wizard = new Ext.ux.Wiz({
        headerConfig: {
            title: "<font style=\"font-family:楷体_GB2312;font-size:15px;\">部署流程</font>"
        },
        cardPanelConfig: {
            defaults: {
                baseCls: 'x-small-editor',
                bodyStyle: 'padding:40px 15px 5px 120px;background-color:#212936;',
                border: false
            }
        },
        cards: cards,
        listeners: {
            'finish': function () {
                var host = Ext.getCmp("LDAP_ip").getValue();
                var port = Ext.getCmp("LDAP_port").getValue();
                var base = Ext.getCmp("LDAP_baseDN").getValue();
                var adm = Ext.getCmp("LDAP_loginDN").getValue();
                var pwd = Ext.getCmp("LDAP_loginPASS").getValue();
//                var disableReleaseService = Ext.getCmp("disable_release").getValue();
//                var disableLdapDownloadPoint = Ext.getCmp("ldap_release").getValue();
//                var disableHttpDownloadPoint = Ext.getCmp("http_release").getValue();
//                var downCA_point = Ext.getCmp("downCA_point").getValue();
//                var downCRL_point = Ext.getCmp("downCRL_point").getValue();
//                var downLDAP_point = Ext.getCmp("downLDAP_point").getValue();

                Ext.Ajax.request({
                    url: 'WizardAction_finish.action',
                    method: 'POST',
                    params: {
                        host: host,
                        port: port,
                        base: base,
                        adm: adm,
                        pwd: pwd/*,*/
//                        disableReleaseService: disableReleaseService,
//                        disableLdapDownloadPoint: disableLdapDownloadPoint,
//                        disableHttpDownloadPoint: disableHttpDownloadPoint,
//                        downCA_point: downCA_point,
//                        downCRL_point: downCRL_point,
//                        downLDAP_point: downLDAP_point
                    },
                    success: function (r, o) {
                        var respText = Ext.util.JSON.decode(r.responseText);
                        var msg = respText.msg;
                        if (respText.success == true) {
                            Ext.Msg.show({
                                title: '信息',
                                msg: msg,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                    Ext.Ajax.request({
                                        url: 'DeployAction_upgradeService.action',
                                        timeout: 20 * 60 * 1000,
                                        method: 'POST',
                                        success: function (r, o) {
                                            Ext.MessageBox.show({
                                                title: '信息',
                                                width: 250,
                                                msg: "服务重启中........!",
                                                buttons: Ext.MessageBox.OK,
                                                buttons: {'ok': '确定'},
                                                icon: Ext.MessageBox.INFO,
                                                closable: false
                                            });
                                        },
                                        failure: function (r, o) {
                                            Ext.MessageBox.show({
                                                title: '信息',
                                                width: 250,
                                                msg: "服务未正常重启!",
                                                buttons: Ext.MessageBox.OK,
                                                buttons: {'ok': '确定'},
                                                icon: Ext.MessageBox.INFO,
                                                closable: false
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            Ext.MessageBox.show({
                                title: '信息',
                                width: 250,
                                msg: msg,
                                buttons: Ext.MessageBox.OK,
                                buttons: {'ok': '关闭'},
                                icon: Ext.MessageBox.INFO,
                                closable: false
                            });
                        }
                    }
                });
            }
        }
    });

    // 显示部署界面
    wizard.show();


    Model.upgrade = function upgrade() {
        Ext.MessageBox.show({
            title: "信息",
            width: 250,
            msg: "确定还原系统到备份点吗?",
            icon: Ext.MessageBox.WARNING,
            buttons: {'ok': '确定', 'no': '取消'},
            fn: function (e) {
                if (e == 'ok') {
                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                        msg: '正在还原,请稍后...',
                        removeMask: true //完成后移除
                    });
                    myMask.show();
                    Ext.Ajax.request({
                        url: 'DeployAction_restore.action',
                        method: 'POST',
                        success: function (r, o) {
                            myMask.hide();
                            var respText = Ext.util.JSON.decode(r.responseText);
                            var msg = respText.msg;
                            Ext.MessageBox.show({
                                title: '信息',
                                width: 250,
                                msg: msg,
                                buttons: Ext.MessageBox.OK,
                                buttons: {'ok': '确定'},
                                icon: Ext.MessageBox.INFO,
                                closable: false
                            });
                            wizard.close();
                        }
                    });
                }
            }
        });
    }

    Model.restart = function restart() {
        Ext.MessageBox.show({
            title: "信息",
            width: 250,
            msg: "确定要重启系统吗?",
            icon: Ext.MessageBox.WARNING,
            buttons: {'ok': '确定', 'no': '取消'},
            fn: function (e) {
                if (e == 'ok') {
                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                        msg: '正在重启系统,请稍后...',
                        removeMask: true //完成后移除
                    });
                    myMask.show();
                    Ext.Ajax.request({
                        url: 'DeployAction_restart.action',
                        method: 'POST',
                        success: function (r, o) {
                            myMask.hide();
                            var respText = Ext.util.JSON.decode(r.responseText);
                            var msg = respText.msg;
                            Ext.MessageBox.show({
                                title: '信息',
                                width: 250,
                                msg: msg,
                                buttons: Ext.MessageBox.OK,
                                buttons: {'ok': '确定'},
                                icon: Ext.MessageBox.INFO,
                                closable: false
                            });
                            wizard.close();
                        }
                    });
                }
            }
        });
    }

    Model.shutdown = function shutdown() {
        Ext.MessageBox.show({
            title: "信息",
            width: 250,
            msg: "确定要关闭系统吗?",
            icon: Ext.MessageBox.WARNING,
            buttons: {'ok': '确定', 'no': '取消'},
            fn: function (e) {
                if (e == 'ok') {
                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                        msg: '正在关闭系统,请稍后...',
                        removeMask: true //完成后移除
                    });
                    myMask.show();
                    Ext.Ajax.request({
                        url: 'DeployAction_shutdown.action',
                        method: 'POST',
                        success: function (r, o) {
                            myMask.hide();
                            var respText = Ext.util.JSON.decode(r.responseText);
                            var msg = respText.msg;
                            Ext.MessageBox.show({
                                title: '信息',
                                width: 250,
                                msg: msg,
                                buttons: Ext.MessageBox.OK,
                                buttons: {'ok': '确定'},
                                icon: Ext.MessageBox.INFO,
                                closable: false
                            });
                            wizard.close();
                        }
                    });
                }
            }
        });
    }
});


var Model = new Object;
function upgrade() {
    Model.upgrade();
}

function restart() {
    Model.restart();
}

function shutdown() {
    Model.shutdown();
}





