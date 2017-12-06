<template>
    <div>
        <el-button-group>
            <el-button  size="mini" plain icon="el-icon-refresh" @click="refresh()">刷新</el-button>
            <el-button  size="mini" plain icon="el-icon-circle-plus-outline" @click="addDevice()">新增账户</el-button>
            <el-button  size="mini" plain icon="el-icon-edit-outline" class="lastBtn">
                <el-select v-model="state" placeholder="请选择" size="mini"  @change="changeState(state)">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-button>
        </el-button-group>

        <el-input
                placeholder="请输入账户编码"
                prefix-icon="el-icon-search"
                v-model="searchValue"
                class="searchInput"
                size="mini"
                @keyup.enter.native="search(searchValue)"
        >
        </el-input>
        <el-table
                :data="tableData"
                border  size="mini"
                class="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
        >
            <el-table-column
                    type="selection"
                    width="55" align="center">
            </el-table-column>
            <el-table-column
                    label="账号编码"  align="center"
                    >
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="员工姓名" align="center"
                    >
                <template slot-scope="scope">
                       {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                    label="状态" align="center"
                   >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.online"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="备注" align="center"
                    >
                <template slot-scope="scope">
                        {{ scope.row.remark }}
                </template>
            </el-table-column>
            <el-table-column
                    label="登陆时间" align="center"
            >
                <template slot-scope="scope">
                    {{ scope.row.loginTime ? scope.row.loginTime : '-' }}
                </template>
            </el-table-column>
            <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"  icon="el-icon-edit" style="margin-bottom: 5px;">编辑</el-button>
                    <el-popover
                            ref="popover"
                            placement="top"
                            width="160"
                            v-model="scope.row.visible">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="cancel(scope.$index, scope.row)" >取消</el-button>
                            <el-button type="primary" size="mini" @click="confirm(scope.$index, scope.row)">确定</el-button>
                        </div>
                    </el-popover>
                    <el-button  size="mini" type="danger"  icon="el-icon-delete" v-popover:popover>删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title+'账户'" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm" >
                <el-form-item label="账号编码" :label-width="formLabelWidth" prop="id">
                    <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password" >
                    <el-input type="password" v-model="form.password"  placeholder="如果不设置，初始密码为123456" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联员工" :label-width="formLabelWidth" prop="name">
                    <el-select v-model="form.name" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in employee"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="form.online" auto-complete="off"></el-switch>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
                align="center"
        >
        </el-pagination>
    </div>
</template>
<style  lang="scss">
    .lastBtn{
        padding:0px 0 0px 15px;
        .el-input.el-input--mini{
            width:110px;
            input{
                border-width:0;
                height:26px;
            }
        }

    }
    .searchInput{
        margin: 10px 0;
        max-width:200px;
        display: block;
    }
    .tableData{
        width:100%;
        margin-bottom: 20px;
        text-align: center;
    }
    .el-dialog{
        max-width: 600px;
    }
</style>
<script>

    export default {
        data() {
            return {
                title:'',
                options: [{
                    value: '1',
                    label: '启用'
                }, {
                    value: '0',
                    label: '禁用'
                }],
                state: '状态操作',//状态
                searchValue: '',//搜索值
                tableData: [{
                    id: '001',
                    name: '张三',
                    remark:'这是sss',
                    visible:false,
                    online:false,
                    loginTime:'1992-12-25 10:10:10',
                },{
                    id: '002',
                    name: '张三',
                    remark:'这是sss',
                    visible:false,
                    online:false,
                    loginTime:'1992-12-25 10:10:10',
                },{
                    id: '003',
                    name: '张三',
                    remark:'这是sss',
                    visible:false,
                    online:false,
                    loginTime:'1992-12-25 10:10:10',
                }],
                employee:[{
                    name:'张三1',
                    id:'1'
                },{
                    name:'张三2',
                    id:'3'
                },{
                    name:'张三3',
                    id:'4'
                },],
                multipleSelection: [],//表格选中数据
                dialogFormVisible: false,//弹窗
                form: {
                    id: 1,
                    name: '',
                    password:'',
                    remark:'',
                    online:false
                },
                rules: {
                    name: { required: true, message: '请关联员工', trigger: 'blur' },
                    id: { required: true, message: '请输入账户编码', trigger: 'blur' },
                },
                formLabelWidth: '80px',
                activeType:'add',
                CurrentIndex:0
                }
            },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
               // console.log(this.multipleSelection)
            },
            //添加设备
            addDevice(){
                this.form = {};
                this.dialogFormVisible = true;
                this.activeType = 'add';
                this.title = '添加';
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(this.form);
                    if (valid) {
                        this.dialogFormVisible = false;
                        //const address = this.form.address;
                       // this.form.address = CodeToName(address);

                        if(this.activeType == 'add'){
                            this.tableData.push(this.form);
                        }else{
                            this.tableData[this.CurrentIndex] = this.form;
                        }

                        //this.CurrentRow = this.form;
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //编辑
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.CurrentIndex = index;
                this.activeType = 'edit';
               // row.address = NameToCode(row.address);
                this.title = '编辑';
                this.form = row;
            },
            //删除
            handleDelete(index, row) {

                console.log(index, row);
            },
            //
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //确认删除
            confirm(index,row){
                row.visible = false;
                this.tableData.splice(index, 1);
            },
            cancel(index,row){
                row.visible =false;

            },
            //搜索
            search(value){
                console.log(value)
            },
            //改变状态
            changeState(value){
                console.log(value,this.multipleSelection)
            }
        }
    }
</script>