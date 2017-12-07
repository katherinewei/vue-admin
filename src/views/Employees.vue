<template>
    <div>
        <el-button-group>
            <el-button  size="mini" plain icon="el-icon-refresh" @click="refresh()">刷新</el-button>
            <el-button  size="mini" plain icon="el-icon-circle-plus-outline" @click="addDevice()">新增员工</el-button>
            <el-button  size="mini" plain icon="el-icon-edit-outline" class="lastBtn">
                <el-select v-model="visited" placeholder="请选择" size="mini"  @change="changeVisited(visited)">
                    <el-option
                            v-for="item in visited_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-button>
            <el-button  size="mini" plain icon="el-icon-edit-outline" class="lastBtn">
                <el-select v-model="audit" placeholder="请选择" size="mini"  @change="changeAudit(audit)">
                    <el-option
                            v-for="item in audit_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-button>
            <el-button  size="mini" plain icon="el-icon-edit-outline" class="lastBtn">
                <el-select v-model="state" placeholder="请选择" size="mini"  @change="changeState(state)">
                    <el-option
                            v-for="item in state_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-button>
        </el-button-group>
        <el-input
                placeholder="请输入员工工号"
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
                    label="工号"  align="center"
                    >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名" align="center"
                    >
                <template slot-scope="scope">
                       {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                    label="身份证" align="center"
                   >
                <template slot-scope="scope">
                        {{ scope.row.idCard }}
                </template>
            </el-table-column>
            <el-table-column
                    label="手机号码" align="center"
                    >
                <template slot-scope="scope">
                        {{ scope.row.phone }}
                </template>
            </el-table-column>
            <el-table-column
                    label="邮箱" align="center"
            >
                <template slot-scope="scope">
                    {{ scope.row.email }}
                </template>
            </el-table-column>
            <el-table-column
                    label="性别" align="center"
            >
                <template slot-scope="scope">
                    {{ scope.row.sex ? '男':'女' }}
                </template>
            </el-table-column>
            <el-table-column
                    label="出生日期" align="center"
            >
                <template slot-scope="scope">
                    {{ scope.row.date }}
                </template>
            </el-table-column>
            <el-table-column
                    label="允许被访" align="center"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.visited"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否需要审核" align="center"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.audit"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="在职状态" align="center"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.online"
                    >
                    </el-switch>
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


        <el-dialog :title="title+'员工'" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm" >

                <el-tabs v-model="active" @tab-click="handleClick" >
                    <el-tab-pane label="基本信息" name="first">
                        <el-form-item label="工号" :label-width="formLabelWidth" prop="id">
                        <el-input v-model="form.id" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" >
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
                            <el-input v-model="form.idCard" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                            <el-input v-model="form.phone" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                            <el-input v-model="form.email" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="date">
                            <el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    placeholder="选择日期"
                                    align="right"
                            >
                            </el-date-picker>
                        </el-form-item></el-tab-pane>
                    <el-tab-pane label="更多信息" name="second">
                        <el-form-item label="允许被访" :label-width="formLabelWidth" prop="visited">
                        <el-switch v-model="form.visited"></el-switch>
                        </el-form-item>
                        <el-form-item label="是否需要审核" :label-width="formLabelWidth" prop="audit">
                            <el-switch v-model="form.audit" auto-complete="off"></el-switch>
                        </el-form-item>
                        <el-form-item label="在职状态" :label-width="formLabelWidth" prop="online">
                            <el-switch v-model="form.online" auto-complete="off"></el-switch>
                        </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth">
                            <el-input v-model="form.remark" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-tab-pane>

                </el-tabs>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<style  lang="scss">
    .lastBtn{
        padding:0px 0 0px 0px;
        .el-input.el-input--mini{
            width:100px;
            input{
                border-width:0;
                height:26px;
                padding:0;
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
                title:'添加',
                state_options: [{
                    value: '1',
                    label: '在职'
                }, {
                    value: '0',
                    label: '离职'
                }],
                visited_options: [{
                    value: '1',
                    label: '允许'
                }, {
                    value: '0',
                    label: '不允许'
                }],
                audit_options: [{
                    value: '1',
                    label: '需要审核'
                }, {
                    value: '0',
                    label: '不需要审核'
                }],
                visited:'允许被访操作',
                audit:'审核操作',
                state: '在职状态操作',//状态
                searchValue: '',//搜索值
                tableData: [{
                    id: 1,
                    name: 'vm001',
                    idCard:441525415474854,
                    remark:'这是sss',
                    visible:false,
                    online:false,
                    phone:13258548744,
                    email:'44@qq.com',
                    sex:1,
                    date:'1992-12-25',
                    visited:true,
                    audit:false

                },{
                    id: 2,
                    name: 'vm002',
                    idCard:441525415474854,
                    remark:'这是sss',
                    visible:false,
                    online:true,
                    phone:13258548744,
                    email:'44@qq.com',
                    sex:0,
                    date:'1992-12-25',
                    visited:false,
                    audit:false
                },{
                    id: 3,
                    name: 'vm003',
                    idCard:441525415474854,
                    remark:'这是sss',
                    visible:false,
                    online:false,
                    phone:13258548744,
                    email:'44@qq.com',
                    sex:1,
                    date:'1992-12-25',
                    visited:true,
                    audit:true
                }],
                multipleSelection: [],//表格选中数据
                dialogFormVisible: false,//弹窗
                form: {
                    id: 1,
                    name: '',
                    idCard:'',
                    remark:'',
                    visible:false,
                    online:false,
                    phone:'',
                    email:'',
                    sex:'',
                    date:'',
                    visited:false,
                    audit:false
                },
                active:'first',
                rules: {
                    id: { required: true, message: '请输入工号', trigger: 'blur' },
                    name: { required: true, message: '请输入姓名', trigger: 'blur' },
                },
                formLabelWidth: '100px',
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

                    if (valid) {
                        this.dialogFormVisible = false;
                        //const address = this.form.address;
                       // this.form.address = CodeToName(address);
                        console.log(this.form);
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
                //console.log(`每页 ${val} 条`);

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
            handleClick(){

            },
            //搜索
            search(value){
                console.log(value)
            },
            //改变状态
            changeState(value){
                console.log(value,this.multipleSelection)
            },
            changeVisited(value){
                console.log(value,this.multipleSelection)
            },
             changeAudit(value){
                 console.log(value,this.multipleSelection)
             }
        }
    }
</script>