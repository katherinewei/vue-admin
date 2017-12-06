<template>
    <div>

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
                    label="设备编号"  align="center"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.deviceId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="访问者"  align="center"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.visitor }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="被访问者" align="center"
            >
                <template slot-scope="scope">
                    {{ scope.row.visier }}
                </template>
            </el-table-column>
            <el-table-column
                    label="访问类型" align="center"
            >
                <template slot-scope="scope">
                    {{ scope.row.type }}
                </template>
            </el-table-column>
            <el-table-column
                    label="访问状态" align="center"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.state">已结束访问</div>
                    <div v-else> <el-popover
                            ref="popover1"
                            placement="top"
                            width="160"
                            v-model="scope.row.visible1">
                        <p>确定结束访问？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="scope.row.visible1=false" >取消</el-button>
                            <el-button type="primary" size="mini" @click="scope.row.visible1=false">确定</el-button>
                        </div>
                    </el-popover><el-button  size="mini" plain  v-popover:popover1>正在访问中</el-button></div>
                </template>
            </el-table-column>

            <el-table-column
                    label="预约访问" align="center"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.audit">已预约</div>
                    <div v-else> <el-switch v-model="scope.row.audit"></el-switch></div>
                </template>
            </el-table-column>
            <el-table-column label="操作"  align="center">
                <template slot-scope="scope">

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
                    deviceId: '001',
                    visier: '张三',
                    visitor:'里斯',
                    type:'正常访问',
                    visible:false,
                    visible1:false,
                    state:false,
                    audit:true
                },{
                    deviceId: '001',
                    visier: '张三',
                    visitor:'里斯',
                    type:'正常访问',
                    visible:false,
                    visible1:false,
                    state:true,
                    audit:false
                },{
                    deviceId: '001',
                    visier: '张三',
                    visitor:'里斯',
                    type:'正常访问',
                    visible:false,
                    visible1:false,
                    state:true,
                    audit:true
                }],
                multipleSelection: [],//表格选中数据
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