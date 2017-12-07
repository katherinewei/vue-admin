<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	<el-form-item label="活动名称" prop="name">
		<el-input v-model="ruleForm.name"></el-input>
	</el-form-item>
	<el-form-item label="活动区域" prop="region">
		<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
			<el-option label="区域一" value="shanghai"></el-option>
			<el-option label="区域二" value="beijing"></el-option>
		</el-select>
	</el-form-item>
	<el-form-item label="活动时间" required>
		<el-date-picker
				v-model="ruleForm.date1"
				type="datetime"
				placeholder="选择日期时间"
				align="right"
				value-format="yyyy-MM-dd HH:mm:ss"
				:picker-options="pickerOptions1">
		</el-date-picker>
	</el-form-item>
	<el-form-item label="即时配送" prop="delivery">
		<el-switch v-model="ruleForm.delivery"></el-switch>
	</el-form-item>
	<el-form-item label="活动性质" prop="type">
		<el-checkbox-group v-model="ruleForm.type">
			<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
			<el-checkbox label="地推活动" name="type"></el-checkbox>
			<el-checkbox label="线下主题活动" name="type"></el-checkbox>
			<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
		</el-checkbox-group>
	</el-form-item>
	<el-form-item label="特殊资源" prop="resource">
		<el-radio-group v-model="ruleForm.resource">
			<el-radio label="线上品牌商赞助"></el-radio>
			<el-radio label="线下场地免费"></el-radio>
		</el-radio-group>
	</el-form-item>
	<el-form-item label="活动形式" prop="desc">
		<el-input type="textarea" v-model="ruleForm.desc"></el-input>
	</el-form-item>
	<el-form-item label="地址" prop="address">
		<el-cascader
				:value="address"
				:options="address"
				change-on-select
				filterable
				@change="changeAddress"
				v-model="ruleForm.address"
		></el-cascader>
	</el-form-item>
	<el-form-item label="评分" prop="rate">
		<el-rate
				v-model="ruleForm.rate"
				:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
		</el-rate>
	</el-form-item>
	<el-form-item label="上传图片" prop="img">
		<el-upload
				class="upload-demo"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</el-form-item>
	<el-form-item label="数量" prop="count">
		<el-input-number v-model="ruleForm.num"  :min="1" :max="10" label="数量"></el-input-number>
	</el-form-item>
	<el-form-item label="滑块" prop="count">
		<el-slider
				v-model="ruleForm.slider"
				show-input>
		</el-slider>
	</el-form-item>

	<el-form-item>
		<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		<el-button @click="resetForm('ruleForm')">重置</el-button>
	</el-form-item>
</el-form>
</template>
<script>
	import Address from '../../api/address'
    import provinces from 'china-division/dist/provinces.json';
    import cities from 'china-division/dist/cities.json';
    import areas from 'china-division/dist/areas.json';
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
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
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],
                    address:  { type: 'array', required: true, message: '请选择地址', trigger: 'blur' },
                    rate:null,
                    num:1,
                    slider:0
                },
                address:Address,

            };
        },
        methods: {
            changeAddress(value,string){
                console.log(value,this.selectedOptions);
			},
            submitForm(formName) {


                this.$refs[formName].validate((valid) => {

                    if (valid) {

                        const address = this.ruleForm.selectedOptions;
                            provinces.map(province => {
                                if(province.code == address[0]){
                                    address[0] = province.name;
                                }
                            });
                            cities.map(city => {
                                if(city.code == address[1]){
                                    address[1] = city.name;
                                }
                            });
                            areas.map(area => {
                                if(area.code == address[2]){
                                    address[2] = area.name;
                                }
                            });
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