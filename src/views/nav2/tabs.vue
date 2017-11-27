<template>
	<div>
	<el-row  :gutter="20">
		<el-col :span="12">
			<el-card>
				<el-tabs v-model="activeName" @tab-click="handleClick" >
					<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
					<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
					<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
					<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
				</el-tabs>
			</el-card>

		</el-col>

		<el-col :span="12">
			<el-card>
				<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
					<el-radio-button label="top">top</el-radio-button>
					<el-radio-button label="right">right</el-radio-button>
					<el-radio-button label="bottom">bottom</el-radio-button>
					<el-radio-button label="left">left</el-radio-button>
				</el-radio-group>

				<el-tabs :tab-position="tabPosition">
					<el-tab-pane label="用户管理">用户管理</el-tab-pane>
					<el-tab-pane label="配置管理">配置管理</el-tab-pane>
					<el-tab-pane label="角色管理">角色管理</el-tab-pane>
					<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-col>
	</el-row>
	<el-row :gutter="20" style="margin-top: 20px;">
		<el-col :span="12">
			<el-card>
				<el-tabs type="border-card">
					<el-tab-pane label="用户管理">用户管理</el-tab-pane>
					<el-tab-pane label="配置管理">配置管理</el-tab-pane>
					<el-tab-pane label="角色管理">角色管理</el-tab-pane>
					<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card>
				<el-tabs  type="card">
					<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
					<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
					<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
					<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-col>

	</el-row>
	</div>
</template>

<style scoped lang="scss">
	.el-card{
		height:300px;
	}
</style>
<script>
    export default {
        data() {
            return {
                activeName: 'second',
                tabPosition: 'top'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>