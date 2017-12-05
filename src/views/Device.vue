<template>
    <div>
        <el-button-group>
            <el-button  size="mini" plain icon="el-icon-refresh" @click="refresh()">刷新</el-button>
            <el-button  size="mini" plain icon="el-icon-circle-plus-outline" @click="addDevice()">新增设备</el-button>
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
                placeholder="请输入内容"
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
                    label="IP地址"  align="center"
                    >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ip }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="编号" align="center"
                    >
                <template slot-scope="scope">
                       {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                    label="位置" align="center"
                   >
                <template slot-scope="scope">
                        {{ scope.row.address }}
                </template>
            </el-table-column>

            <el-table-column
                    label="备注" align="center"
                    >
                <template slot-scope="scope">
                        {{ scope.row.remark ? scope.row.remark : '-' }}
                </template>
            </el-table-column>
            <el-table-column
                    label="状态" align="center"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.state"
                           >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"  icon="el-icon-edit">编辑</el-button>
                    <el-popover
                            ref="popover"
                            placement="top"
                            width="160"
                            v-model="scope.row.visible">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="cancel(scope.$index, scope.row)">取消</el-button>
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
        <el-dialog title="添加设备" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-position="left" >
                <el-form-item label="设备IP" :label-width="formLabelWidth" prop="ip">
                    <el-input v-model="form.ip" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备编号" :label-width="formLabelWidth" prop="name" >
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备地址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
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
</style>
<script>

    export default {
        data() {
            return {
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
                    ip: '192.2.101.251',
                    name: 'vm001',
                    address: '天安科技园东门入口',
                    remark:'这是一台设备',
                    visible:false,
                    state:false
                },{
                    ip: '192.2.101.251',
                    name: 'vm002',
                    address:  '天安科技园东门入口',
                    remark:'这是一台设备',
                    visible:false,
                    state:false
                },{
                    ip: '192.2.101.251',
                    name: 'vm003',
                    address:  '天安科技园东门入口',
                    remark:'',
                    visible:false,
                    state:true
                }],
                multipleSelection: [],//表格选中数据
                dialogFormVisible: false,//弹窗
                form: {
                    name: '',
                    ip: '',
                    address:  [],
                    remark: ''
                },
                rules: {
                    name: { required: true, message: '请输入设备名称', trigger: 'blur' },
                    ip: { required: true, message: '请输入设备IP', trigger: 'blur' },
                    address:  { required: true, message: '请输入地址', trigger: 'blur' },
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
                for(let item of this.tableData){
                    for(let itemSelect of this.multipleSelection){
                        if(itemSelect.name === item.name){
                            item.state = value == 1
                        }
                    }
                }


                console.log(value,this.multipleSelection,this.tableData)
            }
        }
    }
</script>