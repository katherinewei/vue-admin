<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" style="max-width: 600px" class="demo-ruleForm">
        <el-form-item label="访客姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="访问时间" required>
            <el-date-picker
                    v-model="ruleForm.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="预计访问结束时间" required>
            <el-date-picker
                    v-model="ruleForm.endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即预约</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    sex: '',
                    endTime: '',
                    startTime: '',
                    idCard:'',
                    phone:'',
                    visior:''
                },
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                rules: {

                },
            };
        },
        methods: {
            changeAddress(value,string){
                console.log(value,this.selectedOptions);
            },
            submitForm(formName) {


                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        console.log(this.$refs[formName]);
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>