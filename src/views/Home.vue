<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>

			<el-col :span="2">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-navicon"></i>
				</div>
			</el-col>
			<el-col :span="10"  class="userinfo">
				<ul>
					<li class="dropdown">
						<el-dropdown trigger="hover">
							<el-badge :value="12" class="item message-count-badge">
								<i class="fa fa-bell-o"></i>
							</el-badge>
							<el-dropdown-menu slot="dropdown" class="message-dropdown">
								<ul class="dropdown-menu-i">
									<li class="dropdown-header clearfix">
										<p>
											你有8条消息
										</p>
									</li>
									<li class="dropdown-body">
										<ul class="dropdown-menu-list" >
											<li class="clearfix">
												<div class="clearfix">
													<span class="pull-left p-r-5">
                                                <img src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" alt="avatar 3" class="mCS_img_loaded">
                                                </span>
													<div>
														<strong>Alexa Johnson</strong>
														<small class="pull-right text-muted">
															<span class="fa fa-clock-o p-r-5"></span>12 mins ago
														</small>
													</div>
												</div>
													<p>Lorem ipsum dolor sit amet, consectetur...</p>
											</li>
											<li class="clearfix">
												<div class="clearfix">
													<span class="pull-left p-r-5">
                                                <img src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" alt="avatar 3" class="mCS_img_loaded">
                                                </span>
													<div>
														<strong>Alexa Johnson</strong>
														<small class="pull-right text-muted">
															<span class="fa fa-clock-o p-r-5"></span>12 mins ago
														</small>
													</div>
												</div>
												<p>Lorem ipsum dolor sit amet, consectetur...</p>
											</li>
											<li class="clearfix">
												<div class="clearfix">
													<span class="pull-left p-r-5">
                                                <img src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" alt="avatar 3" class="mCS_img_loaded">
                                                </span>
													<div>
														<strong>Alexa Johnson</strong>
														<small class="pull-right text-muted">
															<span class="fa fa-clock-o p-r-5"></span>12 mins ago
														</small>
													</div>
												</div>
												<p>Lorem ipsum dolor sit amet, consectetur...</p>
											</li>

										</ul>
									</li>
									<li class="dropdown-footer clearfix">
										<a href="mailbox.html" class="pull-left">See all messages</a>
										<a href="#" class="pull-right">
											<i class="fa fa-cog"></i>
										</a>
									</li>
								</ul>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li class="dropdown">
						<el-dropdown trigger="hover">
							<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
							<el-dropdown-menu slot="dropdown" class="userSet">
								<el-dropdown-item><a><i class="fa fa-user"></i> 我的个人信息</a></el-dropdown-item>
								<el-dropdown-item><a><i class="fa fa-cog"></i> 设置</a></el-dropdown-item>
								<el-dropdown-item @click.native="logout"><a><i class="fa fa-sign-out"></i> 退出登录</a></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
				</ul>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside>
				<el-menu :default-active="$route.path" class="el-menu-vertical-nav" @open="handleopen" @close="handleclose" @select="handleselect" background-color="#2b2e33"
						 text-color="#94989d"
						 active-text-color="#ffffff"
						 unique-opened router  :collapse="collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item  v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span> </el-menu-item>
					</template>
				</el-menu>

			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'DEMOADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';

	.userSet{
		padding:0;
		border-width:0;
		li{
			padding:0;
			min-width: 150px;
			line-height: 20px;
		}
		a{
		background: #2b2e33;
		color: #959FA9;
		display: block;
		font-size: 13px;
		padding: 10px 12px;
			i{
				margin-right: 7px;
			}
		}

	}
	.message-dropdown{
		padding:0;
		min-width:280px;
		border-width:0;box-shadow:0 0 0 transparent;
		.dropdown-menu-i{
			background-color: #ffffff;
			border: 1px solid rgba(0, 0, 0, 0.15);
			box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.03);
			.dropdown-header {
				background: #2b2e33;
				color: #E4E4E4;
				font-size: 15px;
				padding: 8px 15px;
			}
			.dropdown-body{
				max-height:300px;
				overflow-y:auto;
				 li {
					padding: 12px 10px 6px 10px;
					 img {
						height: 30px;
						margin-top: -5px;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						 margin-right: 5px;
					}

					p {
						font-size: 12px;
						font-style: italic;
						margin: 5px 0 5px;
					}
				}
			}
			.fa:before{
				font-size: 12px;
				color: #777;
				margin-right: 5px;
				vertical-align: text-bottom;
			}
			.dropdown-footer {
				background: #F8F8F8;
				border-top: 1px solid #E2E2E2;
				color: #121212;
				font-size: 12px;
				padding: 5px;
				overflow: hidden;
				a{
					color: #121212;
					text-decoration: none;
				}
			}
		}
	}

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
			background-color: #fff;

			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				ul {
					padding:0;margin:0;
					li{
						display: inline-block;
						padding:0 15px;
					}
				}
				.userinfo-inner {
					cursor: pointer;

					img {
						width: 36px;
						height: 36px;
						border-radius: 20px;
						margin: 10px 5px;
						vertical-align: middle;
						display: inline-block;
					}
				}

			}

			.logo {
				color: #fff;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				background: #181a1d;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:229px;
			}
			.logo-collapse-width{
				width:64px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				/*flex:0 0 230px;*/
				/*width: 230px;*/
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				border: 10px solid #f2f2f2;
				padding: 20px;
				border-right-width:0;

				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
					padding-top:15px;
				}
			}
		}
	}
</style>